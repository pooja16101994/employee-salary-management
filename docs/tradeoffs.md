# Design Trade-offs

## SQLite instead of a full database server
SQLite was chosen because the dataset size is modest and the objective is to deliver a fast, local, portable solution for an assessment. It reduces setup complexity and allows the project to run without additional database infrastructure, which is appropriate for a 10,000-employee dataset.

## Express instead of a heavier framework
Express was selected because it allows a clean backend structure with minimal boilerplate. It keeps the service layer easy to reason about, which is valuable for a focused assessment where clarity and speed matter more than framework ceremony.

## React instead of Next.js
React is sufficient for the application because the requirement is a dashboard-driven UI rather than an SSR-heavy product. This keeps the frontend simpler while still delivering a polished user experience without unnecessary routing and rendering complexity.

## Focused data model instead of a full enterprise HR model
The schema intentionally focuses on salary-related employee data and analytics instead of modeling payroll processing, taxes, organizational hierarchy, or other HR workflows. This keeps the project aligned with the assignment brief and avoids unnecessary complexity that would not add value to the evaluation.
