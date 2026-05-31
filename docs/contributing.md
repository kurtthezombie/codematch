## Commit Message Rules

### Format
type(scope): short description

### Types
feat, fix, refactor, chore, docs, test, perf

### Rules
- lowercase only
- short and clear
- imperative tone (e.g. "add", not "added")
- no vague messages

### Examples
feat(auth): add login  
fix(news): handle missing slug  
refactor(api): simplify response  

### Avoid
update  
fix stuff  
WIP  

### Note
- use scope when possible  
- 1 commit = 1 logical change

### Branching
- feature/*, fix/*
- no direct push to main

### Coding Standards

- follow SRP (single responsibility per class/function)
- follow DRY (avoid duplication)
- keep controllers thin (http handling only)
- put business logic in service layer
- repositories handle DB access only
- use clear and consistent naming
- keep functions small and focused
- no hardcoded values (use config/constants)
- avoid deeply nested logic
- remove unused/dead code

### Prohibited

- no vague commit messages
- no dead code
- no unused variables/functions
- no large commented-out code blocks
- no skipping code review
