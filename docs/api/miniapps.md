# MiniApps API

Подключайте на каждой странице:

```html
<script src="./miniapps-bridge.js"></script>
```

## Вызов

```js
await MiniApps.fs('read', { path: 'notes.txt' });
await MiniApps.shell('setChrome', { topBar: false });
await MiniApps.call('rooms', 'list', {});
```

`MiniApps.<category>(action, params)` → то же, что `MiniApps.call(category, action, params)`.

## Как это устроено

Модули приложения лежат в пакете:

```
api/
  fs/
    read.js
    write.js
  rooms/
    list.js
```

Каждый файл экспортирует обработчик:

```js
// api/rooms/list.js
export default async function list(ctx) {
  // ctx: { appId, params, method, request }
  return { ok: true, rooms: [] };
}
```

### На хосте (WebView)

Bridge делает dynamic import `api/<category>/<action>.js` в рантайме оболочки и возвращает результат в страницу.

### Из сети (другой телефон / PWA / ПК)

Тот же путь обрабатывает **LAN HTTP-сервер** оболочки:

`POST http://<host-ip>:<port>/api/<category>/<action>`

Тело — JSON params. Ответ — JSON результата модуля.

WebSocket: один канал на сессию share (`MiniApps.ws.open({ path: '/...' })`).

## Встроенные категории оболочки

| Category | Примеры actions |
|----------|-----------------|
| `fs` | `read`, `write`, `list`, `remove` |
| `shell` | `setChrome`, `setAppearance`, `setKeepAwake` |
| `share` | `start`, `stop`, `status` |
| `net` | `fetch` |

Приложение может добавлять свои категории в `api/`.
