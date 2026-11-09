# Манифест

Файл `mappmanifest.json` в корне репозитория (копируется в dist при сборке).

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

- `routes.root` — корень UI (для Pages = `/`).
- `routes.app` — точка входа хоста внутри root.
- `web: true` — CI публикует GitHub Pages.
- `author` — GitHub login; сверяется при PR в gateway / app-репо.
