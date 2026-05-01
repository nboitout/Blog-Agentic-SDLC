#!/usr/bin/env node
/**
 * check-translations.js
 * Detects stale and missing translations by comparing git history.
 *
 * Usage: node scripts/check-translations.js
 * Run from the project root (agentic-sdlc/).
 *
 * Exit code 0 = all translations up to date
 * Exit code 1 = stale or missing translations found
 */

import { execSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT       = join(__dirname, '..')
const DOCS_DIR   = join(ROOT, 'docs')
const SOURCE     = 'en'
const TARGETS    = ['fr', 'ro']

function gitLastModified(filePath) {
  const rel = relative(ROOT, filePath).replace(/\\/g, '/')
  try {
    const out = execSync(`git log -1 --format="%aI" -- "${rel}"`, {
      encoding: 'utf8',
      cwd: ROOT,
    }).trim()
    return out ? new Date(out) : null
  } catch {
    return null
  }
}

function findMarkdownFiles(dir) {
  const files = []
  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.md')) files.push(full)
    }
  }
  walk(dir)
  return files
}

const sourceDir   = join(DOCS_DIR, SOURCE)
const sourceFiles = findMarkdownFiles(sourceDir)

const stale   = []
const missing = []

for (const sourceFile of sourceFiles) {
  const rel    = relative(sourceDir, sourceFile).replace(/\\/g, '/')
  const enDate = gitLastModified(sourceFile)

  for (const locale of TARGETS) {
    const targetFile = join(DOCS_DIR, locale, rel)

    if (!existsSync(targetFile)) {
      missing.push({ locale, file: rel })
      continue
    }

    const targetDate = gitLastModified(targetFile)
    if (!enDate || !targetDate) continue

    if (enDate > targetDate) {
      const daysBehind = Math.round((enDate - targetDate) / (1000 * 60 * 60 * 24))
      stale.push({ locale, file: rel, enDate, targetDate, daysBehind })
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

let hasIssues = false

if (stale.length > 0) {
  hasIssues = true
  console.log('\nSTALE translations (en updated after translation):')

  const byFile = {}
  for (const item of stale) {
    ;(byFile[item.file] ??= []).push(item)
  }

  for (const [file, items] of Object.entries(byFile)) {
    console.log(`\n  ${file}`)
    for (const { locale, enDate, targetDate, daysBehind } of items) {
      const enStr = enDate.toISOString().slice(0, 10)
      const tStr  = targetDate.toISOString().slice(0, 10)
      console.log(`    ${locale}/  last updated: ${tStr}  (en updated: ${enStr}) ← ${daysBehind}d behind`)
    }
  }
}

if (missing.length > 0) {
  hasIssues = true
  console.log('\nMISSING translations:')
  for (const { locale, file } of missing) {
    console.log(`  ${locale}/  ${file}`)
  }
}

if (!hasIssues) {
  console.log('\nAll translations are up to date.')
}

console.log('')
process.exit(hasIssues ? 1 : 0)
