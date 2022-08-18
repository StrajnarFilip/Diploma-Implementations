# This script will make a cryptographically secure random password for database
import os

safe_random=os.urandom(24).hex()

def render(random_number: str):
    return f'''#   Copyright 2022 Filip Strajnar
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
version: "3.4"
services:
  postgres:
    networks:
      - dbstack
    image: postgres:14-alpine3.15
    restart: always
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "{random_number}"
      POSTGRES_DB: "postgres"
    ports:
      - 5432:5432
      #- 0.0.0.0:5432:5432
    volumes:
      - ./postgres:/var/lib/postgresql/data

  pgadmin:
    networks:
      - dbstack
    image: dpage/pgadmin4:6
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: "admin@admin.admin"
      PGADMIN_DEFAULT_PASSWORD: "admin"
    ports:
      - 127.0.0.1:9000:80

networks:
  dbstack:'''

with open("docker-compose.yaml","w") as file:
    file.write(render(safe_random))