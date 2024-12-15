Oriane Frontend
Este es el frontend del proyecto Oriane, desarrollado con Vite y React. Proporciona la interfaz de usuario para interactuar con el backend del proyecto, utilizando NestJS y una base de datos en Supabase.

🚀 Tecnologías utilizadas
React: Librería para construir la interfaz de usuario.
Vite: Herramienta de construcción para aplicaciones rápidas.
TypeScript: Lenguaje de programación que extiende JavaScript con tipado estático.
Axios: Cliente HTTP para la comunicación con el backend.
Radix UI: Componentes accesibles y reutilizables para la UI.
Netlify: Despliegue del frontend.

📂 Estructura del proyecto
bash
Copiar código
src/
├── api/ # Métodos de interacción con la API
├── components/ # Componentes reutilizables
├── hooks/ # Hooks personalizados
├── lib/ # Utilidades compartidas
├── pages/ # Páginas principales
├── styles/ # Estilos globales y específicos
└── App.tsx # Punto de entrada principal

🛠️ Configuración del entorno
Asegúrate de tener un archivo .env en la raíz del proyecto con las siguientes variables:

env
Copiar código
VITE_API_URL=https://oriane-backend.onrender.com
💻 Instalación y uso
Clonar el repositorio

bash
Copiar código
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instalar dependencias

bash
Copiar código
bun install
Iniciar el entorno de desarrollo

bash
Copiar código
bun run dev
Esto abrirá la aplicación en http://localhost:5173.

Construir para producción

bash
Copiar código
bun run build
Los archivos construidos estarán en la carpeta dist.

Desplegar en Netlify Configura la URL base de tu backend en el entorno de Netlify como VITE_API_URL.

🔄 Interacción con el backend
Este frontend interactúa con el backend a través de la URL definida en VITE_API_URL. Asegúrate de que el backend esté desplegado y funcionando correctamente antes de probar las funcionalidades.

📚 Documentación de la API
Para conocer más sobre las rutas y el comportamiento del backend, consulta el README del backend.

🐛 Contribución
Si encuentras errores o quieres mejorar algo, siéntete libre de crear un issue o abrir un pull request.

📄 Licencia
Este proyecto está bajo la licencia MIT.
