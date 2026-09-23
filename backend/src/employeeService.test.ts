import path from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

process.env.DB_PATH = path.resolve(process.cwd(), 'data', 'test-employees.db');

const { db, initDb } = await import('./db.js');
const { getSalarySummary, listEmployees } = await import('./employeeService.js');

beforeEach(() => {
  initDb();
  db.exec('DELETE FROM employees');

  db.prepare(`
    INSERT INTO employees (name, email, country, department, role, salary, joining_date)
    VALUES
      ('Alice', 'alice@acme.com', 'India', 'Engineering', 'Senior Engineer', 120000, '2020-01-01'),
      ('Bob', 'bob@acme.com', 'USA', 'Sales', 'Analyst', 70000, '2021-02-01'),
      ('Charlie', 'charlie@acme.com', 'India', 'Engineering', 'Manager', 150000, '2019-03-01'),
      ('Diana', 'diana@acme.com', 'Canada', 'HR', 'Associate', 60000, '2022-04-01')
  `).run();
});

describe('employeeService', () => {
  it('filters employees by country and search text', () => {
    const result = listEmployees({ country: 'India', search: 'ali' });

    expect(result.total).toBe(1);
    expect(result.employees[0].name).toBe('Alice');
  });

  it('calculates salary summary totals across all employees', () => {
    const summary = getSalarySummary();

    expect(summary.totalEmployees).toBe(4);
    expect(summary.totalPayroll).toBe(400000);
    expect(summary.averageSalary).toBe(100000);
    expect(summary.highestSalary).toBe(150000);
    expect(summary.lowestSalary).toBe(60000);
    expect(summary.byCountry[0].country).toBe('India');
    expect(summary.byDepartment[0].department).toBe('Engineering');
  });
});
