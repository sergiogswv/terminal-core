# Terminal Portfolio 👨‍💻

Un portafolio interactivo e inmersivo inspirado en la línea de comandos (CLI), construido para desarrolladores. Este proyecto simula una experiencia de terminal clásica donde los usuarios pueden interactuar mediante comandos para descubrir información sobre el perfil, experiencia, proyectos y redes sociales.

## ✨ Características

- 🖥️ **Diseño de Terminal Retro**: Una auténtica experiencia de línea de comandos con efectos visuales inmersivos.
- ⌨️ **Animación de Máquina de Escribir**: Efecto visual texto a texto fluido ('Typewriter') para la renderización de las respuestas.
- 📺 **Efecto CRT**: Superposición de escaneo clásico que emula los monitores antiguos de tubo de rayos catódicos.
- 📱 **Diseño Responsivo**: Adaptación perfecta tanto para pantallas de escritorio como para dispositivos móviles.
- ⚡ **Rápido y Moderno**: Desarrollado utilizando el ecosistema más reciente con React 19, Vite y la nueva versión de Tailwind CSS.
- ⚙️ **Fácilmente Configurable**: Toda la información del currículum se gestiona a través de un simple archivo JSON.

## 🛠️ Tecnologías Utilizadas

- **Framework Core**: [React 19](https://react.dev/)
- **Entorno de Construcción**: [Vite](https://vitejs.dev/)
- **Tipado Seguro**: [TypeScript](https://www.typescriptlang.org/)
- **Estilización Dinámica**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones y Transiciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/)

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd terminal-core
   ```

2. **Instalar las dependencias**
   ```bash
   npm install
   ```
   *Nota: O puedes usar `yarn`, `pnpm` o `bun` si lo prefieres.*
   
3. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la interfaz.

4. **Construir para despliegue en producción**
   ```bash
   npm run build
   ```

## 🎮 Comandos Disponibles

Una vez dentro de la aplicación, puedes escribir cualquiera de los siguientes comandos en la terminal:

- `help` 👉 Muestra esta lista de comandos para guía del usuario.
- `about` 👉 Imprime una descripción detallada, biografía y áreas de especialidad.
- `experience` 👉 Enumera el historial laboral cronológico y los logros específicos.
- `projects` 👉 Despliega los proyectos destacados con enlaces directos para visualizarlos.
- `social` 👉 Muestra enlaces a perfiles profesionales (LinkedIn, GitHub, etc.).
- `clear` 👉 Limpia todo el historial de la pantalla (como el comando real de terminal).

## 📁 Arquitectura Principal del Proyecto

- `src/components/Terminal.tsx`: El corazón de la aplicación. Maneja el estado del historial, evalúa los comandos del usuario y renderiza de forma condicional los nodos de React.
- `src/data.json`: La base de datos local del proyecto. Se puede editar este archivo para cambiar completamente el contenido del portfolio sin tocar ni una sola línea de código React.
- `src/index.css`: Contiene las directivas principales de Tailwind v4 y utilidades globales esenciales para el efecto de terminal (como ocultar scrollbars o la animación del cursor).

## 📄 Personalización (¡Hazlo tuyo!)

Adaptar este portafolio a ti es extremadamente sencillo. 
Solo abre el archivo **`src/data.json`** e intercambia tu propia información:
```json
{
  "username": "Tu Nombre",
  "bio": "Tu breve resumen profesional aquí...",
  "commands": {
    "about": "Acerca de ti...",
    "projects": [],
    "social": [],
    "experience": []
  }
}
```
Listo, al guardar los cambios, la terminal mostrará orgánicamente tus datos en las respuestas.

---
Construido con 💻 y ☕.
