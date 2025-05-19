install:
	npm ci

test:
	npm run test

test-coverage:
	npm run test-coverage

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

publish:
	npm publish --dry-run