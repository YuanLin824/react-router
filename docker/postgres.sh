#!/bin/bash
set -e

echo "========== Postgres 初始化 =========="

echo "========== 创建用户和数据库 =========="
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
-- 创建用户
CREATE USER ${POSTGRES_APP_USERNAME} WITH LOGIN CREATEDB PASSWORD '${POSTGRES_APP_PASSWORD}';
-- 创建数据库
CREATE DATABASE ${POSTGRES_APP_DATABASE} OWNER ${POSTGRES_APP_USERNAME};
-- 把新建的库授权给新创建的用户
GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_APP_DATABASE} TO ${POSTGRES_APP_USERNAME};
EOSQL

echo "========== 创建表并插入数据 =========="
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_APP_USERNAME" --dbname "$POSTGRES_APP_DATABASE" <<-EOSQL
EOSQL

echo "========== Postgres 初始化完成 =========="
