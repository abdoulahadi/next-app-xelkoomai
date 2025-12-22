#!/bin/sh
# Health monitoring script
# Checks application health and sends alerts if unhealthy

set -e

HEALTH_URL="${HEALTH_URL:-http://localhost:3000/api/health}"
MAX_RETRIES=3
RETRY_DELAY=5

check_health() {
    local attempt=1

    while [ $attempt -le $MAX_RETRIES ]; do
        echo "Health check attempt ${attempt}/${MAX_RETRIES}..."

        RESPONSE=$(curl -s -w "\n%{http_code}" "${HEALTH_URL}" || echo "000")
        HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
        BODY=$(echo "$RESPONSE" | head -n-1)

        if [ "$HTTP_CODE" = "200" ]; then
            echo "✓ Application is healthy"
            echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
            return 0
        else
            echo "✗ Health check failed (HTTP ${HTTP_CODE})"
            if [ $attempt -lt $MAX_RETRIES ]; then
                echo "Retrying in ${RETRY_DELAY} seconds..."
                sleep $RETRY_DELAY
            fi
        fi

        attempt=$((attempt + 1))
    done

    echo "ERROR: Application is unhealthy after ${MAX_RETRIES} attempts"
    return 1
}

# Run health check
if check_health; then
    exit 0
else
    # Send alert (configure your notification method here)
    # Example: send email, webhook, etc.
    echo "ALERT: Application health check failed!"
    exit 1
fi
