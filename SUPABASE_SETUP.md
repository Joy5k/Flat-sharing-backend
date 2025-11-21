# Connecting to Supabase

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard
3. Note down your Project URL and Database password

## Environment Variables

Update your `.env` file with the correct Supabase connection details:

```env
DATABASE_URL="postgresql://postgres:[YOUR_SUPABASE_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR_SUPABASE_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres"
```

Replace:
- `[YOUR_SUPABASE_PASSWORD]` with the database password from your Supabase dashboard
- `[YOUR_PROJECT_REF]` with your unique project reference (you can find this in the connection string on your Supabase dashboard)

## Setting up the Database Schema

Once you have the correct credentials, run the following commands:

1. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

2. Push your schema to Supabase:
   ```bash
   npx prisma db push
   ```

## Alternative: Using Migrations

For production applications, it's recommended to use migrations:

1. Create a migration:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Apply the migration:
   ```bash
   npx prisma migrate deploy
   ```

## Testing the Connection

You can test your database connection using Prisma Studio:

```bash
npx prisma studio
```

## Troubleshooting

- If you get an authentication error, double-check your database password
- If you get a connection error, make sure your IP is allowed in Supabase settings
- Ensure your connection string has the correct format with proper URL encoding if needed