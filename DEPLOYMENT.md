# Guía de Despliegue en Vercel

Para lanzar **VaultBit Capital Lounge** al mundo, la forma más profesional y fácil de mantener es usando Vercel.

## Opción A: Conexión con GitHub (Recomendado)
Esta opción permite que cada vez que guardes cambios, la web se actualice sola.

1.  **Sube este proyecto a GitHub**:
    *   Crea un nuevo repositorio en GitHub (ej: `vaultbit-lounge`).
    *   Sube los archivos de esta carpeta usando la terminal o GitHub Desktop.
    *   *Nota: Ya he inicializado el repositorio localmente por ti.*

2.  **Conecta Vercel**:
    *   Ve a [vercel.com](https://vercel.com) y regístrate/inicia sesión.
    *   Haz clic en **"Add New..."** -> **"Project"**.
    *   Selecciona "Import Git Repository" y busca `vaultbit-lounge`.
    *   Dale a **"Deploy"**.

## Opción B: Vercel CLI (Rápido / Manual)
Si prefieres lanzarlo directamente desde aquí sin pasar por GitHub:

1.  Abre una terminal en esta carpeta.
2.  Ejecuta el comando:
    ```bash
    npx vercel
    ```
3.  Sigue las instrucciones:
    *   Set up and deploy? **Yes**
    *   Link to existing project? **No**
    *   Project name? (Pulsa Enter para aceptar el defecto o escribe uno nuevo)
    *   In which directory? (Pulsa Enter para `.`)
    *   Want to modify settings? **No**

¡Listo! Vercel te dará una URL de producción (ej: `vaultbit-lounge.vercel.app`) en menos de un minuto.

---

### Verificación Post-Despliegue
Una vez online, verifica:
1.  Que el formulario de contacto funcione (la URL del webhook de n8n funciona desde cualquier dominio).
2.  Que las fuentes y las imágenes carguen rápido (Vercel optimiza esto automáticamente).
