#!/bin/sh

echo "Checking if 'mysql' host is resolvable..."

# Чекаємо, поки DNS-ім’я mysql почне вирішуватись
until getent hosts mysql > /dev/null; do
  echo "Host 'mysql' not found in DNS. Waiting..."
  sleep 1
done

echo "Host 'mysql' is resolvable. Checking port 3306..."

# Чекаємо, поки порт відкритий
until nc -z mysql 3306; do
  echo "MySQL not ready on port 3306. Waiting..."
  sleep 1
done

echo "MySQL is up. Starting service..."
exec "$@"
