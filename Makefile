install:
	npm ci

test:
	npm run test

test-coverage:
	node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest.js --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

publish:
	npm publish --dry-run