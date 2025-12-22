#!/bin/sh
# Database backup script for SQLite
# Runs daily at 2 AM via cron in docker-compose

set -e

BACKUP_DIR="/backups"
DB_PATH="/data/database.db"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/database_${DATE}.db"
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-7}

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Check if database exists
if [ ! -f "${DB_PATH}" ]; then
    echo "ERROR: Database not found at ${DB_PATH}"
    exit 1
fi

# Create backup using SQLite backup command
echo "Starting database backup: ${BACKUP_FILE}"
sqlite3 "${DB_PATH}" ".backup '${BACKUP_FILE}'"

# Verify backup was created
if [ -f "${BACKUP_FILE}" ]; then
    BACKUP_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
    echo "Backup completed successfully: ${BACKUP_FILE} (${BACKUP_SIZE})"
else
    echo "ERROR: Backup failed - file not created"
    exit 1
fi

# Compress backup
echo "Compressing backup..."
gzip -f "${BACKUP_FILE}"
echo "Compressed: ${BACKUP_FILE}.gz"

# Clean up old backups (older than RETENTION_DAYS)
echo "Cleaning up backups older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -name "database_*.db.gz" -type f -mtime +${RETENTION_DAYS} -delete

# List all remaining backups
echo "Current backups:"
ls -lh "${BACKUP_DIR}"

echo "Backup process completed!"
