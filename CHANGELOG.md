# Changelog

## 0.1.0 — 2026-11-09

- Организационное пространство `mapphub` на GitHub.
- Публичный сайт и каталог `market/catalog.json`.
- Приватный `mobile-shell`, публичный `gateway`, официальные `app-*`.
- Мини-приложения без `+server.js`: логика через MiniApp API и общий WS.
- В `mobile-shell`: `pkgServe` только статика (410 на `+server.js`), seed через `DEFAULT_HOME_APP`, скрипт `fetch-home-app.mjs`.
- `miniapps-bridge.js` во всех официальных app-репозиториях.
