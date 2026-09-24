import { useEffect, useMemo, useState } from 'react';

type Employee = {
  id: number;
  name: string;
  email: string;
  country: string;
  department: string;
  role: string;
  salary: number;
};

type Summary = {
  totalEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  highestSalary: number;
  lowestSalary: number;
  byCountry: Array<{ country: string; totalEmployees: number; totalPayroll: number; averageSalary: number }>;
  byDepartment: Array<{ department: string; totalEmployees: number; totalPayroll: number; averageSalary: number }>;
};

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api`;

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [filters, setFilters] = useState({ country: '', department: '', role: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const countries = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.country))).sort(),
    [employees]
  );
  const departments = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.department))).sort(),
    [employees]
  );
  const roles = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.role))).sort(),
    [employees]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (filters.country) params.set('country', filters.country);
        if (filters.department) params.set('department', filters.department);
        if (filters.role) params.set('role', filters.role);
        if (filters.search) params.set('search', filters.search);

        const [employeesRes, summaryRes] = await Promise.all([
          fetch(`${API_URL}/employees?${params.toString()}`),
          fetch(`${API_URL}/salary-summary`),
        ]);

        if (!employeesRes.ok || !summaryRes.ok) {
          throw new Error('Failed to load employee data from the backend.');
        }

        const employeeData = await employeesRes.json();
        const summaryData = await summaryRes.json();

        setEmployees(employeeData.employees || []);
        setSummary(summaryData || null);
      } catch (fetchError) {
        console.error(fetchError);
        setError('Unable to connect to the backend service. Please check the Render deployment and the VITE_API_URL value.');
        setEmployees([]);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters.country, filters.department, filters.role, filters.search]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">ACME HR Dashboard</p>
          <h1>Employee Salary Management</h1>
        </div>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="Search employee or email"
          value={filters.search}
          onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
        />
        <select value={filters.country} onChange={(event) => setFilters((prev) => ({ ...prev, country: event.target.value }))}>
          <option value="">All countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select value={filters.department} onChange={(event) => setFilters((prev) => ({ ...prev, department: event.target.value }))}>
          <option value="">All departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        <select value={filters.role} onChange={(event) => setFilters((prev) => ({ ...prev, role: event.target.value }))}>
          <option value="">All roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </section>

      {error && (
        <section className="panel" style={{ marginBottom: '1rem' }}>
          <h2>Connection Error</h2>
          <p>{error}</p>
        </section>
      )}

      {summary && (
        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Employees</span>
            <strong>{summary.totalEmployees.toLocaleString()}</strong>
          </div>
          <div className="stat-card">
            <span>Total Payroll</span>
            <strong>{formatCurrency(summary.totalPayroll)}</strong>
          </div>
          <div className="stat-card">
            <span>Average Salary</span>
            <strong>{formatCurrency(summary.averageSalary)}</strong>
          </div>
          <div className="stat-card">
            <span>Highest Salary</span>
            <strong>{formatCurrency(summary.highestSalary)}</strong>
          </div>
        </section>
      )}

      <section className="panel-grid">
        <div className="panel">
          <h2>Top Countries</h2>
          <ul>
            {summary?.byCountry.slice(0, 5).map((country) => (
              <li key={country.country}>
                <span>{country.country}</span>
                <strong>{formatCurrency(country.totalPayroll)}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Departments</h2>
          <ul>
            {summary?.byDepartment.slice(0, 5).map((department) => (
              <li key={department.department}>
                <span>{department.department}</span>
                <strong>{formatCurrency(department.totalPayroll)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="table-panel">
        <h2>Employee Records</h2>
        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Department</th>
                <th>Role</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.country}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{formatCurrency(employee.salary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
