# Employee Salary Management Assessment

A full-stack salary management dashboard for HR and payroll review. The application helps managers inspect employee compensation data across countries, departments, and roles using a lightweight but production-friendly stack.

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: SQLite
- Testing: Vitest

This stack was chosen because it matches the assessment goals, keeps the project easy to run locally, and delivers a clear separation between UI, API logic, and persistence.

## Features

- Employee dashboard with salary records
- Search by employee name or email
- Filters by country, department, and role
- Salary summary cards for payroll totals and averages
- Department and country spending breakdowns
- Seeded dataset with 10,000 employee records
- REST APIs for employee and payroll summary access

## Architecture

The app follows a layered architecture:

- Frontend UI for dashboard interactions
- Express API for employee listing and analytics
- Service layer for filtering and aggregation logic
- SQLite persistence for employee data and reporting

## Project Structure

- frontend/: React dashboard client
- backend/: Express API and SQLite logic
- docs/: assessment artifacts
- scripts/: supporting project scripts

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open the frontend at:
   ```text
   http://localhost:5173
   ```
4. Backend API runs at:
   ```text
   http://localhost:5001
   ```

## API Endpoints

- GET /api/health
- GET /api/employees
- GET /api/salary-summary

## Deployment

- Backend: Render
- Frontend: Vercel

Live backend URL:

```text
https://employee-salary-management-puga.onrender.com
```

## Validation

The project includes backend tests for filtering logic and salary summary calculations.

Run checks with:

```bash
npm test --workspace backend
npm run build --workspace backend
npm run build --workspace frontend
```

## Assessment Artifacts

- Requirements: docs/requirements.md
- Architecture: docs/architecture.md
- Trade-offs: docs/tradeoffs.md

## Notes

This solution intentionally focuses on the core assignment requirement: reviewing salary data, filtering employee records, and summarizing payroll metrics at scale without adding unnecessary enterprise complexity.
