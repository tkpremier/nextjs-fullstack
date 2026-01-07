---
description: Type creation and organization
alwaysApply: true
globs:
  - "**/*.ts"
---

## Type Organization

- **Typescript types and interfaces** When there are new types created in `.tsx` or `.ts` files created by an agent or the user, always move those types to the file's respective `*/types/` folder. If there is no specific types file created for that file's parent folder context, ie: `learn`, `drive`, or `drive-db`, create a file with template `{parent-folder}.ts`, ie: `learn.ts`, `drive.ts`, or `drive-db.ts`.
