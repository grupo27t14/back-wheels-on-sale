set -o errexit

yarn
yarn typeorm migration:run -d ./src/data-source.ts