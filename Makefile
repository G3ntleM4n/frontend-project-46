install:
	npm ci

test:
	npm run test

lint:
	npx eslint .

publish:
	npm publish --dry-run