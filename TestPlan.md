# Software Test Plan

## 1. Introduction
This document outlines the software test plan for the dental appointment management system following the Vertical Slice Architecture refactoring. The purpose is to ensure all functional requirements are still met.

## 2. Scope
The test scope includes the backend APIs and frontend UI for the following vertical slices:
- **Auth**: User registration and login
- **User Profile**: Viewing and updating user profile
- **Appointments**: Booking and viewing appointment history
- **Admin**: Dashboard statistics, managing users, managing slots, managing appointments
- **Dashboard**: Main user dashboard

## 3. Functional Requirements Coverage

| Req ID | Requirement | Status |
|--------|-------------|--------|
| FR-01 | User can register a new account | Covered |
| FR-02 | User can log in with valid credentials | Covered |
| FR-03 | User can view their dashboard | Covered |
| FR-04 | User can book an appointment using available slots | Covered |
| FR-05 | User can view their appointment history | Covered |
| FR-06 | Admin can view system statistics on the dashboard | Covered |
| FR-07 | Admin can manage (view, edit status) all appointments | Covered |
| FR-08 | Admin can create, view, and delete available appointment slots | Covered |
| FR-09 | Admin can view all registered users | Covered |

## 4. Test Cases & Test Scripts

### TC-01: Authentication (FR-01, FR-02)
- **Step 1**: Navigate to `/register` and create a new account.
- **Expected**: Account is created, user is redirected to login.
- **Step 2**: Navigate to `/login` and enter credentials.
- **Expected**: Successful login, redirected to user dashboard.

### TC-02: Patient Dashboard & Booking (FR-03, FR-04, FR-05)
- **Step 1**: Go to `/dashboard`.
- **Expected**: Dashboard loads successfully with relevant navigation.
- **Step 2**: Go to `/book`, select a date, pick a slot, and submit.
- **Expected**: Appointment is created successfully.
- **Step 3**: Go to `/history`.
- **Expected**: The newly booked appointment appears in the list.

### TC-03: Admin Management (FR-06, FR-07, FR-08, FR-09)
- **Step 1**: Log in as an Admin user.
- **Expected**: Redirected to `/admin/dashboard`. System statistics are visible.
- **Step 2**: Go to `/admin/slots`, create a new slot for a specific date.
- **Expected**: Slot is added to the database and appears in the list.
- **Step 3**: Go to `/admin/appointments`, view the list of appointments. Change a status from "pending" to "approved".
- **Expected**: Status updates successfully.
- **Step 4**: Go to `/admin/users`.
- **Expected**: List of all users is displayed.

## 5. Automated Test Cases
- **Backend Tests (Maven Surefire)**:
  - Repository Tests: Verify database mappings and simple CRUD operations for Entities (`User`, `Appointment`, `AvailableSlot`).
  - *Status*: Passing.
- **Frontend Tests (React Testing Library / Jest)**:
  - App Router rendering test (`App.test.js` or equivalent).
  - *Status*: Passing.
