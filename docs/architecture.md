# Architecture Overview

## High-Level Design
The solution follows a simple layered full-stack architecture built with TypeScript.

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: SQLite for local persistence and quick evaluation
- Data flow: the UI calls REST endpoints, the backend queries SQLite, and aggregated data is returned as JSON

## Why this stack
This stack is a pragmatic fit for the assessment because it provides a clear separation between presentation, business logic, and persistence while keeping the implementation fast, maintainable, and easy to run. React and TypeScript provide a strong frontend foundation, while Express and SQLite offer a lightweight but production-appropriate backend for a dataset of 10,000 employees.

## Component Design
- API layer: Express routes for employee listing and financial summary queries
- Service layer: filtering logic and salary aggregation calculations
- Persistence layer: SQLite queries for employee data and summary reports
- UI layer: dashboard cards, filters, and employee records table

## Data Model
Employee records include the following fields:
- id
- name
- email
- country
- department
- role
- salary
- joining_date

## Scalability considerations
For 10,000 records, SQLite is sufficient for the workload and local evaluation requirements in this assignment. The structure is also designed so the persistence layer can be replaced with PostgreSQL or another relational database later without requiring a major change to the API contract.
