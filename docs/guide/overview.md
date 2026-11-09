# Обзор

Mapphub — offline-first платформа мини-приложений.

- **Оболочка** (Android): без UI, кроме системных диалогов. Запускает пакеты, FS, LAN, разрешения.
- **Пакет** (`app.zip`): статика + `mappmanifest.json`. Один и тот же dist для телефона, десктопа и web.
- **Без `+server.js`**: серверной логики в пакете нет. Данные и сеть — через `MiniApps.*` и единый WebSocket шелла.
- **Каталог**: `https://mapphub.github.io/market/catalog.json`
