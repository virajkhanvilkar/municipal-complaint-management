USE municipal_complaint_management;

-- 1. Verify the selected database
SELECT DATABASE() AS current_database;

-- 2. Display all database tables
SHOW TABLES;

-- 3. Count records in each table
SELECT COUNT(*) AS users_count
FROM users;

SELECT COUNT(*) AS complaints_count
FROM complaints;

SELECT COUNT(*) AS history_count
FROM complaint_status_history;

-- 4. Display all users
SELECT
    id,
    name,
    email,
    phone,
    role,
    created_at
FROM users;

-- 5. Display complaints with the citizen who submitted them
SELECT
    c.id AS complaint_id,
    c.title,
    c.category,
    c.status,
    c.priority,
    c.location,
    u.name AS citizen_name,
    c.created_at
FROM complaints c
JOIN users u
    ON c.user_id = u.id
ORDER BY c.created_at DESC;

-- 6. Display complaint status history
SELECT
    h.id AS history_id,
    h.complaint_id,
    h.old_status,
    h.new_status,
    h.remarks,
    h.changed_at,
    u.name AS changed_by_user
FROM complaint_status_history h
LEFT JOIN users u
    ON h.changed_by = u.id
ORDER BY h.changed_at DESC;

-- 7. Count complaints by status
SELECT
    status,
    COUNT(*) AS total_complaints
FROM complaints
GROUP BY status;

-- 8. Count complaints by category
SELECT
    category,
    COUNT(*) AS total_complaints
FROM complaints
GROUP BY category;

-- 9. Count complaints by priority
SELECT
    priority,
    COUNT(*) AS total_complaints
FROM complaints
GROUP BY priority;