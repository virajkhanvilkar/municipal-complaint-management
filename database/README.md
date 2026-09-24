# Municipal Complaint Management Database

## Overview

The Municipal Complaint Management System uses MySQL as its relational database.

Database name:

`municipal_complaint_management`

## Database Schema

The database contains the following tables:

### 1. users

Stores citizen, officer, and administrator account information.

Important fields:

- `id` - Unique user ID
- `name` - User name
- `email` - User email
- `password` - User password
- `phone` - Contact number
- `role` - User role
- `created_at` - Account creation time

### 2. complaints

Stores complaints submitted by citizens.

Important fields:

- `id` - Unique complaint ID
- `user_id` - User who submitted the complaint
- `title` - Complaint title
- `description` - Complaint details
- `category` - Complaint category
- `location` - Complaint location
- `status` - Current complaint status
- `priority` - Complaint priority
- `created_at` - Complaint creation time
- `updated_at` - Last update time

### 3. complaint_status_history

Stores the history of complaint status changes.

Important fields:

- `id` - Unique history ID
- `complaint_id` - Related complaint
- `old_status` - Previous status
- `new_status` - New status
- `changed_by` - User who changed the status
- `remarks` - Additional remarks
- `changed_at` - Status change time

## Relationships

```text
users
  |
  | 1 : N
  |
  v
complaints
  |
  | 1 : N
  |
  v
complaint_status_history