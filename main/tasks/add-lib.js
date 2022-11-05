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
const templatePath = path.join(rootDir, 'tasks', 'templates', 'lib');
const libsDir = path.join(rootDir, 'libs');
const libPath = path.join(libsDir, libName);

// Create lib directory
try {
  fs.mkdirSync(libPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.error(
      chalk.red(`
          Directory ${libPath} already exists, refusing to overwrite.
        `)
    );
    process.exit(1);
  } else {
    throw err;
  }
}

// Copy template files
console.log(`\nCreating a new lib in ${chalk.green(libPath)}.\n`);
fs.copySync(templatePath, libPath);

// Get app name from package.json
const appPackageJsonPath = path.join(rootDir, 'package.json');
const appPackageJson = JSON.parse(fs.readFileSync(appPackageJsonPath));
const appName = appPackageJson.name;

// Update lib package.json
const libPackageJsonPath = path.join(libPath, 'package.json');
const libPackageJson = JSON.parse(fs.readFileSync(libPackageJsonPath));
libPackageJson.name = `@${appName}/${libName}`;
fs.writeFileSync(libPackageJsonPath, JSON.stringify(libPackageJson, null, 2));

// Install dependencies
console.log('Installing packages. This might take a couple of minutes.\n');
execSync(`yarn install`, {
  cwd: libPath,
  stdio: 'inherit',
});

// Display finished message
console.log();
console.log(chalk.green(`Success! Created ${libName} at ${libPath}`));
console.log(chalk.cyan(`Import as @${appName}/${libName} to use`));
