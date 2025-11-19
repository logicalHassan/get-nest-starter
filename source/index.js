#!/usr/bin/env node

import { readFileSync } from 'fs';
import { log } from './custom-logger.js';

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
// Main CLI
// --------------------------------------------------
async function main() {
  log.info('\n⏳ Preparing your NestJS starter...\n');
  await new Promise((res) => setTimeout(res, 700));

  log.title('🔥 get-nest-starter is coming soon!');
  console.log(`
We're actively working on a flexible, plugin-ready NestJS scaffolding tool.

Features planned:
  • TypeScript-first
  • REST / GraphQL / Microservices
  • Authentication & RBAC
  • Database integrations (Prisma, Drizzle, MongoDB)
  • Code generators (modules, controllers, services)
  • Plugin/add-on ecosystem like get-express-starter
  • Docker support
  • And more...

Stay tuned for updates!  
Follow: github.com/logicalHassan 🚀\n
  `);

  process.exit(0);
}

main();
