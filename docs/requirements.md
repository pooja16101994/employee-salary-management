# Requirements Document

## Goal
Build a salary management system that allows the HR manager at ACME to review employee compensation data efficiently, without relying on spreadsheets. The system should support quick analysis of current payroll distribution across departments, countries, and roles.

## Scope
The application should support the following:
- employee master data with country, department, role, and salary
- salary summaries such as total payroll, average salary, and salary range
- filtering and search by country, department, role, and employee name/email
- dashboard views that help the HR manager answer compensation-related questions
- realistic seed data for 10,000 employees

## In Scope
- employee record listing
- search and filtering
- aggregate salary metrics
- dashboard-based reporting
- API-backed data access
- seed script for realistic sample data

## Out of Scope
- payroll processing or tax calculation
- authentication and authorization
- integration with external HR or payroll systems
- forecasting, analytics beyond core reporting, or AI-based compensation recommendations
- enterprise-grade multi-tenant management

## Exclusions and Rationale
This solution focuses on the core product requirement: managing salary data and answering organizational compensation questions at scale. Payroll execution and identity management are important in real enterprise systems, but they are not necessary to demonstrate the architecture, product thinking, and engineering quality expected for this assessment.

## Success Criteria
The software should help the HR manager answer questions such as:
- What is the total payroll by country or department?
- Which employees are above or below the average salary?
- How are salaries distributed across countries and roles?
- Which teams or regions have the highest spend?
