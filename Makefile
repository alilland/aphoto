lint:
	docker-compose -f docker-compose.yml run --rm nextjs npm run lint;
	docker-compose -f docker-compose.yml run --rm node yarn lint
test:
	docker-compose -f docker-compose.yml run --rm node yarn test;
	docker-compose -f docker-compose.yml run --rm nextjs npm run test
dev:
	docker compose up -d
