.PHONY: bootstrap dependencies generate format lint test build

TAXFIX_MAKEFILE_VERSION=1

bootstrap:
	@npm ci

dependencies:
	@npm ci

generate:
	@echo "This command is currently a Noop."

format:
	@echo "This command is currently a Noop."

lint:
	@npm run lint

test:
	@npm run ci

build:
	@npm run build