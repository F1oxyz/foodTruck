# 🍔 FoodTruck App

FoodTruck es una aplicación web moderna orientada a la gestión de pedidos y catálogo para un Food Truck. Desarrollada con las últimas tecnologías del ecosistema frontend, prioriza la velocidad, la reactividad y una experiencia de usuario (UX) de primer nivel.

## ✨ Características Principales

- **Catálogo Dinámico**: Visualización de productos con detalles completos, disponibilidad en tiempo real, precios y categorías.
- **Carrito de Compras**: Sistema de carrito integrado con persistencia de datos en DB.
- **Autenticación y Formularios**: Sistema de login fluido y moderno, construido con `ReactiveFormsModule` y validaciones estrictas.
- **Notificaciones Amigables**: Integración con SweetAlert2 para una experiencia interactiva sin fricciones al agregar productos.
- **Diseño Premium**: Interfaz construida con Tailwind CSS v4, utilizando utilidades modernas como *glassmorphism*, blur backdrops y micro-interacciones (animaciones de hover y foco).

## 🛠️ Stack Tecnológico

La arquitectura de este proyecto fue diseñada pensando en escalabilidad y rendimiento:

- **Framework**: [Angular 21](https://angular.dev/) (Standalone Components, Signals, Reactive Forms)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) + tailwind-animations
- **Backend as a Service (BaaS)**: [Supabase](https://supabase.com/) (Autenticación y Base de Datos)
- **Alertas**: [SweetAlert2](https://sweetalert2.github.io/)

## 🏗️ Estructura del Proyecto

La aplicación sigue una arquitectura limpia basada en dominio de componentes:

```text
src/app/
├── components/          # Componentes presentacionales aislados (ej: card_food)
├── pages/               # Componentes contenedores/vistas principales (login, carrito, etc.)
├── services/            # Lógica de negocio y acceso a datos (food_supabase_sevice)
├── interfaces/          # Modelos de datos estocados (Food, newItemCarrito)
├── app.routes.ts        # Configuración de enrutamiento
└── app.component.ts     # Componente raíz
```

## 🚀 Instalación y Uso Local

Sigue estos pasos para levantar el entorno de desarrollo local:

### 1. Prerequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) v11+
- Angular CLI global (`npm install -g @angular/cli@21`)

### 2. Clonar e Instalar
```bash
# Clona el repositorio (reemplaza con tu URL)
git clone https://github.com/F1oxyz/foodTruck.git

# Entra al directorio
cd foodTruck

# Instala las dependencias
npm install
```

### 3. Configuración de Entorno
La aplicación requiere conexión a Supabase. Asegurate de configurar tu URL y Anon Key proporcionados por Supabase en tu entorno o en la inicialización del cliente en el servicio correspondiente (`food_supabase_sevice.ts`).

### 4. Servidor de Desarrollo
Ejecuta el servidor local de Angular:
```bash
ng serve
```
Abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## 📐 Buenas Prácticas y Patrones Aplicados

- **Componentes Standalone**: Reducción de boilerplate eliminando NgModules.
- **ChangeDetectionStrategy.OnPush**: Optimización del ciclo de detección de cambios para máximo rendimiento, actualizando la vista solo cuando cambian las referencias de los Inputs.
- **Inyección de Dependencias Moderna**: Uso de la función `inject()` para una sintaxis más limpia y legible en las clases.
- **UI Consistente**: Uso estricto de tokens de diseño mediante Tailwind CSS, evitando CSS custom (hojas de estilo llenas de !important) e integrando un diseño atómico.
- **Container-Presentational Pattern**: Separación clara entre componentes 'Smart' (Pages) que manejan la lógica de estado y 'Dumb' (Components) que solo renderizan UI.

---
*Desarrollado cuidando los fundamentos del buen diseño y la arquitectura de software. Nada de atajos, acá las cosas se hacen bien.*
