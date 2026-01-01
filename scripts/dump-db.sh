#!/bin/zsh

# Script to dump PostgreSQL database from Docker container to SQL file
# Usage: ./dump-db.sh [output-file.sql]

set -e

# Database configuration from docker-compose.yml
DB_SERVICE="db"
DB_NAME="postgres"
DB_USER="tkpremier"
DB_PASSWORD="tkpremier"

# Generate output filename with timestamp if not provided
if [ -z "$1" ]; then
  TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
  OUTPUT_FILE="db-dump_${TIMESTAMP}.sql"
else
  OUTPUT_FILE="$1"
fi

# Check if docker compose is available and service is running
if ! docker compose ps "${DB_SERVICE}" | grep -q "Up"; then
  echo "Error: Database service '${DB_SERVICE}' is not running."
  echo "Please start the database with: docker compose up -d db"
  exit 1
fi

echo "Dumping database '${DB_NAME}' from service '${DB_SERVICE}'..."
echo "Output file: ${OUTPUT_FILE}"

# Use pg_dump to create SQL dump via docker compose exec
docker compose exec -T -e PGPASSWORD="${DB_PASSWORD}" \
  "${DB_SERVICE}" \
  pg_dump -U "${DB_USER}" -d "${DB_NAME}" \
  --clean --if-exists \
  --no-owner --no-privileges \
  > "${OUTPUT_FILE}"

if [ $? -eq 0 ]; then
  FILE_SIZE=$(du -h "${OUTPUT_FILE}" | cut -f1)
  echo "✓ Database dump completed successfully!"
  echo "  File: ${OUTPUT_FILE}"
  echo "  Size: ${FILE_SIZE}"
else
  echo "✗ Error: Failed to dump database"
  exit 1
fi
