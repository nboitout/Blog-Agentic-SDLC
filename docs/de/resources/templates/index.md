# Templates

## AGENTS.md

```markdown
# AGENTS.md

## Build & test
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

## Scope rules
- NEVER modify files outside feature_list.json scope
- NEVER edit .env, infra/ or generated files
- ALWAYS run verification before marking complete

## Session protocol
1. Read feature_list.json
2. Set active task to in_progress
3. Implement within scope
4. Run test + lint + build
5. Update progress.md
```

## feature_list.json

```json
{
  "version": "1.0",
  "features": [
    {
      "id": "feat-001",
      "title": "Short task title",
      "status": "pending",
      "priority": "high",
      "scope": ["src/module/", "tests/module/"],
      "acceptance": ["Specific criterion", "All tests pass"]
    }
  ]
}
```
