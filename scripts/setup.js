#!/usr/bin/env node

/**
 * Claude Code Setup Script
 * Cross-platform setup for Windows, macOS, and Linux
 *
 * Usage: node scripts/setup.js [--global] [--project]
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const SETUP_DIR = path.dirname(__dirname);
const HOME_DIR = os.homedir();
const GLOBAL_CLAUDE_DIR = path.join(HOME_DIR, '.claude');
const PROJECT_CLAUDE_DIR = path.join(process.cwd(), '.claude');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    const destDir = path.dirname(dest);
    ensureDir(destDir);
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${path.basename(src)} -> ${dest}`);
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function mergeSettings(existingPath, newSettingsPath) {
  let existing = {};
  let newSettings = {};

  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    } catch (e) {
      console.warn(`Warning: Could not parse existing settings at ${existingPath}`);
    }
  }

  if (fs.existsSync(newSettingsPath)) {
    newSettings = JSON.parse(fs.readFileSync(newSettingsPath, 'utf8'));
  }

  // Merge permissions
  if (newSettings.permissions) {
    existing.permissions = existing.permissions || {};
    existing.permissions.allow = [
      ...new Set([
        ...(existing.permissions.allow || []),
        ...(newSettings.permissions.allow || [])
      ])
    ];
    existing.permissions.deny = [
      ...new Set([
        ...(existing.permissions.deny || []),
        ...(newSettings.permissions.deny || [])
      ])
    ];
  }

  // Merge hooks
  if (newSettings.hooks) {
    existing.hooks = existing.hooks || {};
    for (const [hookType, hookConfigs] of Object.entries(newSettings.hooks)) {
      existing.hooks[hookType] = [
        ...(existing.hooks[hookType] || []),
        ...hookConfigs
      ];
    }
  }

  return existing;
}

function setupGlobal() {
  console.log('\n=== Setting up Global Claude Code Configuration ===\n');

  ensureDir(GLOBAL_CLAUDE_DIR);

  // Copy commands
  const commandsSrc = path.join(SETUP_DIR, '.claude', 'commands');
  const commandsDest = path.join(GLOBAL_CLAUDE_DIR, 'commands');
  copyDir(commandsSrc, commandsDest);

  // Merge settings
  const settingsDest = path.join(GLOBAL_CLAUDE_DIR, 'settings.json');
  const settingsSrc = path.join(SETUP_DIR, '.claude', 'settings.json');
  const mergedSettings = mergeSettings(settingsDest, settingsSrc);
  fs.writeFileSync(settingsDest, JSON.stringify(mergedSettings, null, 2));
  console.log(`Merged settings: ${settingsDest}`);

  console.log('\nGlobal setup complete!');
}

function setupProject() {
  console.log('\n=== Setting up Project Claude Code Configuration ===\n');

  ensureDir(PROJECT_CLAUDE_DIR);

  // Copy CLAUDE.md to project root
  const claudeMdSrc = path.join(SETUP_DIR, 'CLAUDE.md');
  const claudeMdDest = path.join(process.cwd(), 'CLAUDE.md');

  if (!fs.existsSync(claudeMdDest)) {
    copyFile(claudeMdSrc, claudeMdDest);
  } else {
    console.log('CLAUDE.md already exists, skipping...');
  }

  // Copy commands to project
  const commandsSrc = path.join(SETUP_DIR, '.claude', 'commands');
  const commandsDest = path.join(PROJECT_CLAUDE_DIR, 'commands');
  copyDir(commandsSrc, commandsDest);

  // Copy settings to project
  const settingsSrc = path.join(SETUP_DIR, '.claude', 'settings.json');
  const settingsDest = path.join(PROJECT_CLAUDE_DIR, 'settings.json');

  if (!fs.existsSync(settingsDest)) {
    copyFile(settingsSrc, settingsDest);
  } else {
    const mergedSettings = mergeSettings(settingsDest, settingsSrc);
    fs.writeFileSync(settingsDest, JSON.stringify(mergedSettings, null, 2));
    console.log(`Merged settings: ${settingsDest}`);
  }

  console.log('\nProject setup complete!');
  console.log('\nNext steps:');
  console.log('1. Edit CLAUDE.md to add project-specific instructions');
  console.log('2. Commit .claude/ and CLAUDE.md to your repository');
  console.log('3. Share with your team!');
}

function showHelp() {
  console.log(`
Claude Code Setup Script

Usage: node scripts/setup.js [options]

Options:
  --global    Install configuration globally (~/.claude/)
  --project   Install configuration to current project (.claude/)
  --both      Install both global and project configurations
  --help      Show this help message

Examples:
  node scripts/setup.js --global     # Set up for all projects
  node scripts/setup.js --project    # Set up current project only
  node scripts/setup.js --both       # Set up both

Note: Run from the claude-code-setup directory or provide full path.
`);
}

// Parse arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.length === 0) {
  showHelp();
  process.exit(0);
}

if (args.includes('--global') || args.includes('--both')) {
  setupGlobal();
}

if (args.includes('--project') || args.includes('--both')) {
  setupProject();
}

console.log('\nSetup complete! Start Claude Code and try /commit-push-pr');
