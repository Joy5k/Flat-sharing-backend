#!/bin/bash
# Supabase Setup Script

echo "Setting up Supabase connection for your Flat-sharing application..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found!"
    exit 1
fi

echo "Environment file found. Checking Prisma setup..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated successfully!"
else
    echo "❌ Error generating Prisma client"
    exit 1
fi

echo "Setup complete! You can now connect to Supabase."
echo ""
echo "To push your schema to Supabase, run:"
echo "  npx prisma db push"
echo ""
echo "To run migrations, use:"
echo "  npx prisma migrate dev"
echo ""
echo "To open Prisma Studio for database inspection:"
echo "  npx prisma studio"