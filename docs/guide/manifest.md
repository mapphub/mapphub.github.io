# Манифест

Файл `mappmanifest.json` в корне (копируется в dist).

```json
{
  "id": "my-app",
  "name": "My App",
  "version": "1.0.0",
  "author": "github-username",
  "description": "…",
  "icon": "icon.svg",
  "permissions": ["net", "fs", "share"],
  "web": true,
  "routes": {
    "root": "/",
    "app": "/index.html"
  }
}
```

- `routes.root` — корень UI
- `routes.app` — точка входа
- `web: true` — CI публикует GitHub Pages
- `author` — GitHub login владельца
