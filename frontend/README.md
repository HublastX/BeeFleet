Assim que baixar o projeto ou der git pull, use:

```bash
npm install
```

---

Para rodar o projeto, use:

```bash
npm run dev
```

---

Para rodar o lint(recomendo rodar antes de usar o git add), use:

```bash
npm run lint
```

---

# Recomendações extras

## Extenções:
- Tailwind CSS IntelliSense
- Tailwind Fold
- ESLint

## Uso:
Selecione o modo de linguagem de `JavaScript` para `JavaScript JSX`

**Ou**

configure seu ``settings.json`` do ``.vscode/`` da seguinte maneira:

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "always"
    },
    "files.associations": {
        "*.js": "javascriptreact"
    }
}
```
