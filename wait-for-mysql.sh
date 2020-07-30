#!/bin/sh

set -e

cmd="$@"

echo "starting"

until mysql -h$DB_HOST -u$DB_USER -p$DB_PASS -e '\q'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "Done"

echo "MySQL is up - executing command = $cmd"

exec $cmd
