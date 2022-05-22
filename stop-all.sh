#!/usr/bin/env bash

# Stop and delete the containers
docker-compose down

# Deleting network
docker network rm spring-cloud-microservices
