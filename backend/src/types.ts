export type Employee = {
  id: number;
  name: string;
  email: string;
  country: string;
  department: string;
  role: string;
  salary: number;
  joining_date: string;
};

export type SalarySummary = {
  totalEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  highestSalary: number;
  lowestSalary: number;
  byCountry: Array<{ country: string; totalEmployees: number; totalPayroll: number; averageSalary: number }>;
  byDepartment: Array<{ department: string; totalEmployees: number; totalPayroll: number; averageSalary: number }>;
};
