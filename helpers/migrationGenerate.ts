import { exec } from 'child_process';

const command = `docker-compose -f docker-compose-cli.yml run --rm cli yarn typeorm-ts migration:generate  -- -d ./src/config/ormConfig.ts ./src/migrations/${process.argv[2]}`;

(() => exec(command, (error, stdout, stderr) => {
  if (error !== null) {
    console.error(stderr);
  }
  console.log(stdout);
}))();
