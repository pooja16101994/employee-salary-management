import { db } from './db.js';
import { Employee, SalarySummary } from './types.js';

export function listEmployees(filters: { country?: string; department?: string; role?: string; search?: string; limit?: number; offset?: number }) {
  const { country, department, role, search, limit = 50, offset = 0 } = filters;

  const conditions: string[] = [];
  const params: string[] = [];

  if (country) {
    conditions.push('country = ?');
    params.push(country);
  }

  if (department) {
    conditions.push('department = ?');
    params.push(department);
  }

  if (role) {
    conditions.push('role = ?');
    params.push(role);
  }

  if (search) {
    conditions.push('(name LIKE ? OR email LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  const whereClause = conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
  const listQuery = `SELECT * FROM employees${whereClause} ORDER BY id LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) as count FROM employees${whereClause}`;

  const rows = db.prepare(listQuery).all(...params, String(limit), String(offset)) as Employee[];
  const total = db.prepare(countQuery).get(...params) as { count: number };

  return { employees: rows, total: total.count };
}

export function getSalarySummary() {
  const overall = db.prepare(`
    SELECT COUNT(*) as totalEmployees,
           ROUND(AVG(salary), 2) as averageSalary,
           MIN(salary) as lowestSalary,
           MAX(salary) as highestSalary,
           SUM(salary) as totalPayroll
    FROM employees
  `).get() as {
    totalEmployees: number;
    averageSalary: number;
    lowestSalary: number;
    highestSalary: number;
    totalPayroll: number;
  };

  const byCountry = db.prepare(`
    SELECT country,
           COUNT(*) as totalEmployees,
           SUM(salary) as totalPayroll,
           ROUND(AVG(salary), 2) as averageSalary
    FROM employees
    GROUP BY country
    ORDER BY totalPayroll DESC
  `).all() as Array<{ country: string; totalEmployees: number; totalPayroll: number; averageSalary: number }>;

  const byDepartment = db.prepare(`
    SELECT department,
           COUNT(*) as totalEmployees,
           SUM(salary) as totalPayroll,
           ROUND(AVG(salary), 2) as averageSalary
    FROM employees
    GROUP BY department
    ORDER BY totalPayroll DESC
  `).all() as Array<{ department: string; totalEmployees: number; totalPayroll: number; averageSalary: number }>;

  const summary: SalarySummary = {
    totalEmployees: overall.totalEmployees,
    totalPayroll: overall.totalPayroll,
    averageSalary: overall.averageSalary,
    highestSalary: overall.highestSalary,
    lowestSalary: overall.lowestSalary,
    byCountry,
    byDepartment,
  };

  return summary;
}
