#!/usr/bin/env bash

# Deleting network if available
docker network rm spring-cloud-microservices

# Creating network for services
docker network create spring-cloud-microservices

# Increasing default HTTP Timeout from 60 to 300
export COMPOSE_HTTP_TIMEOUT=300

# Start all services in background with -d flag
docker-compose up --build
