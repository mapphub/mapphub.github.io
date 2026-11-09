# Обзор

Mapphub — offline-first платформа мини-приложений.

- **Оболочка** (Android): системные диалоги, пакеты, FS, LAN, разрешения.
- **Пакет** (`app.zip`): статика + `mappmanifest.json` + модули `api/`.
- Один dist для телефона, десктопа и web.
- **Bridge** проксирует вызовы в модули `api/<category>/<action>.js` (на хосте и по сети).
- **Каталог**: https://mapphub.github.io/market/catalog.json
- **Шаблон**: https://github.com/mapphub/mapp-template
