#!/bin/sh
# Database restore script for SQLite
# Usage: ./restore-db.sh <backup_file.db.gz>

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file.db.gz>"
    echo "Available backups:"
    ls -lh /backups/database_*.db.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"
DB_PATH="/data/database.db"
DB_BACKUP_CURRENT="/data/database_before_restore_$(date +%Y%m%d_%H%M%S).db"

# Check if backup file exists
if [ ! -f "${BACKUP_FILE}" ]; then
    echo "ERROR: Backup file not found: ${BACKUP_FILE}"
    exit 1
fi

# Backup current database before restore
if [ -f "${DB_PATH}" ]; then
    echo "Creating safety backup of current database..."
    cp "${DB_PATH}" "${DB_BACKUP_CURRENT}"
    echo "Current database backed up to: ${DB_BACKUP_CURRENT}"
fi

# Decompress backup
TEMP_FILE="/tmp/restore_temp.db"
echo "Decompressing backup..."
gunzip -c "${BACKUP_FILE}" > "${TEMP_FILE}"

# Verify backup file
echo "Verifying backup file integrity..."
sqlite3 "${TEMP_FILE}" "PRAGMA integrity_check;" || {
    echo "ERROR: Backup file is corrupted"
    rm -f "${TEMP_FILE}"
    exit 1
}

# Restore database
echo "Restoring database..."
mv "${TEMP_FILE}" "${DB_PATH}"
echo "Database restored successfully from: ${BACKUP_FILE}"

# Verify restored database
echo "Verifying restored database..."
sqlite3 "${DB_PATH}" "PRAGMA integrity_check;"

echo "Restore completed successfully!"
echo "Previous database backup: ${DB_BACKUP_CURRENT}"
