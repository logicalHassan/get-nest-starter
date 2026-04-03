#!/usr/bin/env node

import { log } from './custom-logger.js';
import { execSync } from 'child_process';
import { rmSync, existsSync, copyFileSync, readFileSync } from 'fs';
import prompts from 'prompts';
import path from 'path';

// --------------------------------------------------
// Version flag
// --------------------------------------------------
if (process.argv.includes('--version') || process.argv.includes('-v')) {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
  console.log(`v${pkg.version}`);
  process.exit(0);
}

// --------------------------------------------------
// Help flag
// --------------------------------------------------
if (process.argv.includes('--help') || process.argv.includes('-h') || process.argv.includes('help')) {
  console.log(`
get-nest-starter - Create a NestJS Starter Project

Usage:
  get-nest-starter [options]

Options:
  -v, --version     Show version
  -h, --help        Show help menu

Description:
  NestJS starter scaffolding is under active development and coming soon.
  Stay tuned!
`);
  process.exit(0);
}

// --------------------------------------------------
// Utilities
// --------------------------------------------------

function removeGit(dir) {
  if (existsSync(path.join(dir, '.git'))) {
    rmSync(path.join(dir, '.git'), { recursive: true, force: true });
  }
}

// --------------------------------------------------
// Main CLI
// --------------------------------------------------
async function main() {
  log.info('\n⏳ Preparing your NestJS starter...\n');

  const onCancel = () => {
    log.error('Cancelled by user.');
    process.exit(0);
  };

  const { projectName } = await prompts(
    {
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: 'my-api-server',
    },
    { onCancel },
  );

  const projectPath = path.resolve(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    log.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  try {
    execSync(`git clone --depth 1 https://github.com/logicalHassan/nest-bolierplate.git ${projectName}`, {
      stdio: 'ignore',
    });

    removeGit(projectPath);
  } catch (e) {
    log.error('Failed to clone repository');
    process.exit(1);
  }

  const envExample = path.join(projectPath, '.env.example');
  const envFile = path.join(projectPath, '.env');
  if (existsSync(envExample)) {
    copyFileSync(envExample, envFile);
  }

  log.success(`Project ${projectName} created successfully!\n`);
  console.log(`   cd ${projectName}`);
  console.log(`   pnpm install`);
  console.log(`   pnpm run dev\n`);

  console.log(`
We're actively working on a flexible, plugin-ready NestJS scaffolding tool.

Features planned:
  • REST / GraphQL / Microservices
  • Database integrations (MongoDB, cassandraDB)
  • Code generators (modules, controllers, services)
  • Plugin/add-on ecosystem like get-express-starter
  • Multi Env Docker support
  • And more...

Stay tuned for updates!  
Follow: github.com/logicalHassan 🚀\n
  `);

  process.exit(0);
}

main();
