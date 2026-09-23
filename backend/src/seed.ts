import { db, initDb } from './db.js';

const countries = ['India', 'USA', 'UK', 'Germany', 'Canada', 'Australia', 'Singapore'];
const departments = ['Engineering', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations'];
const roles = ['Software Engineer', 'Senior Engineer', 'Manager', 'Analyst', 'Associate', 'Director'];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function seedEmployees(count = 10000) {
  initDb();

  const existingCount = db.prepare('SELECT COUNT(*) as total FROM employees').get() as { total: number };
  if (existingCount.total > 0) {
    return { inserted: 0, total: existingCount.total };
  }

  const insert = db.prepare(`
    INSERT INTO employees (name, email, country, department, role, salary, joining_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction((total: number) => {
    for (let i = 1; i <= total; i += 1) {
      const country = countries[i % countries.length];
      const department = departments[i % departments.length];
      const role = roles[i % roles.length];
      const name = `Employee ${i}`;
      const email = `employee${i}@acme.com`;
      const salary = randomBetween(35000, 220000);
      const joiningDate = new Date(2018 + (i % 7), (i % 12), (i % 28) + 1).toISOString();
      insert.run(name, email, country, department, role, salary, joiningDate);
    }
  });

  transaction(count);

  return { inserted: count, total: count };
}

seedEmployees();
