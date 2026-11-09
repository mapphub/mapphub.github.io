# MiniApp API

Подключите в HTML:

```html
<script src="./miniapps-bridge.js"></script>
```

## Вызов

```js
await MiniApps.fs('read', { path: 'data.json' });
await MiniApps.shell('setChrome', { topBar: false });
await MiniApps.share('start', { appId: 'chat' });
```

### fs
`read` | `write` | `list` | `remove` — файлы пакета / data-области приложения.

### shell
`setAppearance` | `setCssTokens` | `setKeepAwake` | `openSystemMenu` | `setChrome`

### share
LAN: `start` | `stop` | `status` — HTTP + единый WS на порту хоста.

### net
`fetch` — прокси запросов с хоста (обход CORS PWA).

## WebSocket

```js
const ws = await MiniApps.ws.open({ path: '/room' });
ws.send(JSON.stringify({ type: 'ping' }));
```

На хосте шелл делает fan-out всем клиентам комнаты. Отдельный `+ws.js` не нужен.
