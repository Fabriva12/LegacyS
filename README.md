# LegacySport

Catálogo deportivo con React + Firebase Storage.

## Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── WhatsAppButton.jsx
│   └── ProductCard.jsx
├── lib/                 # Configuración y lógica de negocio
│   ├── firebase.js      # Inicialización de Firebase
│   └── catalog.js       # Lógica del catálogo (Firebase Storage)
├── pages/               # Páginas de la app
│   ├── Home.jsx
│   └── Category.jsx
└── main.jsx             # Entry point
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy en Render

### 1. Crear un nuevo Web Service

1. Entrá a [render.com](https://render.com) → **New → Web Service**
2. Conectá tu repositorio de GitHub
3. Configuración:

| Campo | Valor |
|-------|-------|
| **Name** | `legacysport` |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npx serve -s dist -l $PORT` |
| **Branch** | `main` |
| **Instance Type** | Free |

### 2. Variables de entorno (obligatorias)

En **Environment → Add Environment Variable**, agregá:

| Variable | Valor |
|----------|-------|
| `VITE_FIREBASE_API_KEY` | Tu API key de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `legacysport-7275c.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `legacysport-7275c` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `legacysport-7275c.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Tu sender ID |
| `VITE_FIREBASE_APP_ID` | Tu app ID |
| `VITE_WHATSAPP_NUMBER` | Tu número de WhatsApp |

> ⚠️ **Importante:** Las variables `VITE_*` se inyectan en el build, no en runtime.
> Si cambiás alguna, tenés que hacer un nuevo deploy.

### 3. Deploy automático

Cada push a `main` dispara un deploy automático.

## Agregar productos

1. Subí la imagen a Firebase Storage en la carpeta correcta
2. Recargá la página (el catálogo se descubre dinámicamente)

## Reglas de Firebase Storage

Las reglas actuales permiten lectura pública y escritura solo para usuarios autenticados:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
