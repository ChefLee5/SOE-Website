---
name: creating-skills
description: >
  Creates well-structured Antigravity agent skills under `.agent/skills/`.
  Use when the user asks to "create a skill", "add a new skill", "make a skill",
  or mentions building agent capabilities, automation recipes, or reusable workflows.
---

# Antigravity Skill Creator

## When to use this skill

- User asks to create, generate, or scaffold a new skill
- User wants to add reusable agent capabilities or automation recipes
- User mentions `.agent/skills/` or `SKILL.md`

## Folder Structure

Every skill lives under `.agent/skills/<skill-name>/`:

```
<skill-name>/
├── SKILL.md          # Required — main logic & instructions
├── scripts/          # Optional — helper scripts
├── examples/         # Optional — reference implementations
└── resources/        # Optional — templates or assets
```

## Workflow

- [ ] Clarify the skill's purpose, triggers, and scope with the user
- [ ] Choose a gerund-style name (e.g., `testing-code`, `managing-databases`)
- [ ] Write `SKILL.md` with YAML frontmatter + body
- [ ] Add `scripts/`, `examples/`, or `resources/` if needed
- [ ] Validate the result

## YAML Frontmatter Rules

| Field         | Rule                                                                    |
|---------------|-------------------------------------------------------------------------|
| `name`        | Gerund form, lowercase + hyphens only, max 64 chars                     |
| `description` | Third person, includes trigger keywords, max 1024 chars                 |

Forbidden words in `name`: "claude", "anthropic".

## Writing Principles

1. **Conciseness** — Assume the agent is smart. Skip obvious definitions. Focus on unique logic.
2. **Progressive Disclosure** — Keep `SKILL.md` under 500 lines. Link to secondary files (`[See ADVANCED.md](ADVANCED.md)`) only one level deep.
3. **Forward Slashes** — Always use `/` for paths.
4. **Degrees of Freedom**:
   - **Bullet points** → high freedom (heuristics, guidelines)
   - **Code blocks** → medium freedom (templates, patterns)
   - **Exact commands** → low freedom (fragile or critical operations)

## Body Template

Use this template for the `SKILL.md` body (after frontmatter):

```markdown
# [Skill Title]

## When to use this skill
- [Trigger 1]
- [Trigger 2]

## Workflow
[Checklist or step-by-step guide]

## Instructions
[Specific logic, code snippets, or rules]

## Resources
- [Link to scripts/ or resources/ if applicable]
```

## Validation Checklist

Before finalizing, confirm:

- [ ] `name` is gerund-form, lowercase+hyphens, ≤ 64 chars
- [ ] `description` is third-person, includes triggers, ≤ 1024 chars
- [ ] `SKILL.md` body is < 500 lines
- [ ] All paths use forward slashes `/`
- [ ] Scripts include `--help` guidance for the agent
- [ ] Complex tasks use Plan → Validate → Execute pattern

## Error Handling

- If a skill requires scripts, instruct the agent to run `<script> --help` before executing.
- Scripts should be treated as black boxes — the agent reads their help output, not their source, to decide how to call them.
- If validation fails, fix the issue and re-validate before reporting completion.
