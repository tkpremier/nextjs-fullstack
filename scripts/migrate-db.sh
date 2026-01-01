#!/bin/zsh

# Script to run database migration on Docker PostgreSQL database
# Usage: ./migrate-db.sh [migration-file.sql]
#
# Defaults to: migrateDriveDatesToTimestamps.sql

set -e

# Database configuration from docker-compose.yml
DB_SERVICE="db"
DB_NAME="postgres"
DB_USER="tkpremier"
DB_PASSWORD="tkpremier"

# Default migration file if not provided
if [ -z "$1" ]; then
  MIGRATION_FILE="migrateDriveDatesToTimestamps.sql"
else
  MIGRATION_FILE="$1"
fi

# Check if migration file exists
if [ ! -f "${MIGRATION_FILE}" ]; then
  echo "Error: Migration file '${MIGRATION_FILE}' not found."
  exit 1
fi

# Check if docker compose is available and service is running
if ! docker compose ps "${DB_SERVICE}" | grep -q "Up"; then
  echo "Error: Database service '${DB_SERVICE}' is not running."
  echo "Please start the database with: docker compose up -d db"
  exit 1
fi

echo "=========================================="
echo "Database Migration Script"
echo "=========================================="
echo "Migration file: ${MIGRATION_FILE}"
echo "Database: ${DB_NAME}"
echo "Service: ${DB_SERVICE}"
echo ""
echo "Warning: This will modify the database schema."
echo "Make sure you have a backup before proceeding."
echo ""

# Ask for confirmation
read "?Do you want to proceed? (yes/no): " CONFIRM
if [ "${CONFIRM}" != "yes" ]; then
  echo "Migration cancelled."
  exit 0
fi

echo ""
echo "Running migration..."

# Read the SQL file and pipe it to psql via docker compose exec
cat "${MIGRATION_FILE}" | docker compose exec -T -e PGPASSWORD="${DB_PASSWORD}" \
  "${DB_SERVICE}" \
  psql -U "${DB_USER}" -d "${DB_NAME}"

if [ $? -eq 0 ]; then
  echo ""
  echo "✓ Migration completed successfully!"
else
  echo ""
  echo "✗ Error: Migration failed"
  exit 1
fi

