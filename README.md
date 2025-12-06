🎬 MovieMatch

Un buscador interactivo de películas y series con modo Tinder, integración con la API de OMDb y diseño moderno con glassmorphism.

🌟 Descripción

MovieMatch es una aplicación web frontend construida con React + Vite, que permite a los usuarios:

Buscar películas y series

Ver resultados con filtros

Explorar detalles completos de cada título

Guardar favoritos

Probar un modo Tinder de películas, donde pueden deslizar para encontrar recomendaciones

Usar modo oscuro/claro

Navegar mediante una interfaz moderna, intuitiva y responsiva

Este proyecto fue desarrollado para el IEEE ESTl Frontend Hackathon.

🚀 Tecnologías Utilizadas

React (JavaScript)

Vite

Tailwind CSS

React Router

OMDb API

LocalStorage

Glassmorphism UI

Dark Mode toggle automático/manual

📂 Estructura del Proyecto
src/
├── components/
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── SearchResults.jsx
│   ├── MovieDetails.jsx
│   ├── Favorites.jsx
│   └── MovieTinder.jsx
├── context/
├── App.jsx
├── main.jsx
└── styles/

🔌 API Utilizada (OMDb)

Sitio web: https://www.omdbapi.com

Endpoint de búsqueda:

https://www.omdbapi.com/?s=TITLE&apikey=API_KEY


Endpoint de detalles:

https://www.omdbapi.com/?i=IMDB_ID&apikey=API_KEY


Para usar tu propia clave, coloca tu api key en un archivo:

src/config.js


Ejemplo:

export const API_KEY = "TU_API_KEY";

🛠️ Instalación y Ejecución
1. Clona el repositorio
git clone https://github.com/CeciG24/MovieMatch.git
cd MovieMatch

2. Instala dependencias
npm install
# o
pnpm install

3. Ejecuta la app
npm run dev
# o
pnpm dev

4. Abre en tu navegador
http://localhost:5173/

🎨 Diseño

El diseño está inspirado en un estilo glassmorphism + neon gradients, con enfoque en:

Minimalismo

Interfaz limpia

Jerarquía visual clara

Animaciones suaves

Pantallas totalmente responsivas

💡 Funcionalidades Principales
✔ Página Home

Películas sugeridas

Búsqueda rápida

Grid responsivo

✔ Página de Resultados

Filtros por año, tipo y más

Vista de grid

Manejo de errores

✔ Detalle de Película/Serie

Póster HD

Sinopsis, reparto, director, género

Calificaciones IMDb

Botón de favoritos

Recomendaciones

✔ Favoritos

Guardado en localStorage

Lista visual atractiva

Eliminar con un clic

✔ Movie Tinder (🔥 función extra)

Un sistema de recomendaciones tipo Tinder:

Swipe derecha → Like

Swipe izquierda → Skip

Construido usando animaciones y estado local

✔ Navbar con Dark Mode

Modo oscuro/claro

📘 Documentación de Componentes
MovieCard.jsx

Muestra póster, título y acciones

Estilo glassmorphism con Tailwind

Reusable en todas las páginas

Navbar.jsx

Links de navegación

Botón de modo oscuro

Automático y manual

MovieTinder.jsx

Lógica de deslizamiento

Manejo de recomendaciones

Más componentes documentados en comentarios dentro del código.

🧪 Buenas Prácticas

Código modular

Componentes reutilizables

Separación UI / lógica

ESLint + Prettier (opcional pero recomendado)

⚠️ Manejo de errores

Validación de inputs

Mensajes de error de la API

Fallback para pósters rotos

Estado “Loading…”

Estado “No results found”

📱 Responsividad

Mobile-first

Breakpoints Tailwind

Navegación touch-friendly

Tarjetas fluidas

🤖 Futuras Mejoras

Paginación real

Carruseles animados

Perfil de usuario

Guardado en la nube

🏆 Créditos

Desarrollado por Cecilia Garcia
Para el IEEE ESTl Frontend Hackathon.
