# Dakipati Customer Portal Proof of Concept

## Current Mock Implementation

This portal is a client-side proof-of-concept for presentations. It does not use production authentication, server sessions, or a database.

Customer login is validated in the browser against a static JSON file. Admin login uses hardcoded demo credentials for presentation purposes only.

## JSON Data Source

Mock customer records are stored at:

`/dakipati/data/customers.json`

Source file:

`public/data/customers.json`

The current records include name, email, demo password, points balance, lifetime spend, and total order count.

## localStorage Usage

The portal stores the selected demo user in `localStorage` under:

`daki-pati-customer-session`

The admin proof-of-concept stores admin session state under:

`daki-pati-admin-session`

This is intentionally lightweight and browser-only. It should not be treated as secure authentication.

## Future Supabase/PostgreSQL Migration Path

The data access layer is centralized in:

`src/services/customer-portal.ts`

Future production migration should replace the mock functions in that service with:

- Supabase Authentication for customer/admin sign-in
- PostgreSQL tables for customer profiles, orders, points ledger, and rewards
- Row-level security policies for customer-owned data
- Server-side admin authorization
- Real order sync from POS, DoorDash, Square, or another ordering provider

Suggested future tables:

- `customers`
- `orders`
- `order_items`
- `rewards_ledger`
- `admin_users`

The current React pages should be able to keep most of their presentation structure while the service layer changes from JSON/localStorage to Supabase queries.
