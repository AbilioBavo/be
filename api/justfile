default:
    just --list

web-admin:
    pnpm --dir web-admin dev

web-admin-i:
    pnpm --dir web-admin install --frozen-lockfile --prefer-offline
web-admin-build:
    pnpm --dir web-admin build

web-admin-preview:
    pnpm --dir web-admin preview

api:
    pnpm --dir api dev
api-i:
    pnpm --dir api install  --frozen-lockfile --prefer-offline
api-build:
    pnpm --dir api build

web:
    pnpm --dir web dev
web-i:
    pnpm --dir web install  --frozen-lockfile --prefer-offline
web-build:
    pnpm --dir web build
web-preview:
    pnpm --dir web preview

compose-up:
    docker compose -f compose.dev.yml up -d --build
compose-down:
    docker compose -f compose.dev.yml down
compose-build:
    docker compose -f compose.dev.yml build
compose-restart:
    docker compose -f compose.dev.yml restart
compose-logs:
    docker compose -f compose.dev.yml logs -f
compose:
    docker compose -f compose.dev.yml ps

compose-prod-up:
    docker compose -f compose.prod.yml up -d --build
compose-prod-down:
    docker compose -f compose.prod.yml down
compose-prod-build:
    docker compose -f compose.prod.yml build
compose-prod-res:
    @just compose-prod-down
    @just compose-prod-up
compose-prod-restart:
    docker compose -f compose.prod.yml restart
compose-prod-logs:
    docker compose -f compose.prod.yml logs -f
compose-prod:
    docker compose -f compose.prod.yml ps