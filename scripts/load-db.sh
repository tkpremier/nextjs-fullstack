#!/bin/zsh

# Script to load SQL file into PostgreSQL database in Docker container
# Usage: ./load-db.sh <sql-file>

set -e

# Database configuration from docker-compose.yml
DB_SERVICE="db"
DB_NAME="postgres"
DB_USER="tkpremier"
DB_PASSWORD="tkpremier"

# Check if SQL file argument is provided
if [ -z "$1" ]; then
  echo "Error: SQL file path is required."
  echo "Usage: ./load-db.sh <sql-file>"
  echo "Example: ./load-db.sh db-dump_20241220_143022.sql"
  exit 1
fi

SQL_FILE="$1"

# Check if SQL file exists
if [ ! -f "${SQL_FILE}" ]; then
  echo "Error: SQL file '${SQL_FILE}' not found."
  exit 1
fi

# Check if docker compose is available and service is running
if ! docker compose ps "${DB_SERVICE}" | grep -q "Up"; then
  echo "Error: Database service '${DB_SERVICE}' is not running."
  echo "Please start the database with: docker compose up -d db"
  exit 1
fi

echo "Loading SQL file '${SQL_FILE}' into database '${DB_NAME}'..."
echo "Warning: This will modify the database. Existing data may be affected."

# Read the SQL file and pipe it to psql via docker compose exec
cat "${SQL_FILE}" | docker compose exec -T -e PGPASSWORD="${DB_PASSWORD}" \
  "${DB_SERVICE}" \
  psql -U "${DB_USER}" -d "${DB_NAME}"

if [ $? -eq 0 ]; then
  echo "✓ Database loaded successfully!"
else
  echo "✗ Error: Failed to load database"
  exit 1
fi
