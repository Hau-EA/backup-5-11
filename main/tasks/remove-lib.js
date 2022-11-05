const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

const args = process.argv.slice(2); // slice to remove first two items.
const libName = args[0];

// Get lib name from args
if (!libName) {
  console.log(chalk.red(`Please provide a library name. Example: my-lib`));
  process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const libsDir = path.join(rootDir, 'libs');
const libPath = path.join(libsDir, libName);

console.log(`\nRemoving a lib in ${chalk.green(libPath)}.\n`);
fs.removeSync(libPath);

// Re-Install dependencies
execSync(`yarn install`, {
  cwd: rootDir,
  stdio: 'inherit',
});

// Display finished message
console.log();
console.log(chalk.green(`Success! Removed ${libName} at ${libPath}`));
