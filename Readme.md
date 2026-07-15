# 🛍️ Oxivos Fashion Store - Frontend System Design Implementation

Un storefront de moda moderno, altamente responsivo, optimizado y escalable, diseñado bajo patrones de **Frontend System Design** de nivel empresarial.  

Este proyecto fue desarrollado como solución para la prueba técnica de **Oxivos Web Development Agency**, implementando una arquitectura desacoplada que separa de manera estricta el renderizado de la UI, la lógica de negocio y el estado de la aplicación.  



## 🎨 Dirección de Arte & Diseño (Figma)

Para garantizar un estándar visual profesional, limpio y centrado en la conversión (e-commerce real), la interfaz y experiencia de usuario de este desarrollo están basadas en la reinterpretación web responsiva del kit de diseño de la comunidad de Figma:

- **Figma Design Reference:** [Kutuku — eCommerce Mobile App UI Kit Figma High Quality Template](https://www.figma.com/design/H5ALdAF8BezthF20wOVc9E/Kutuku----eCommerce-Mobile-App-UI-Kit-Figma-High-Quality-Template--Community-?node-id=0-1&p=f&t=wjbjPyEzhQ4tHB9c-0)

- **Enfoque de UI/UX:** Inspirado en las paletas minimalistas, contrastes de tipografía, espaciado generoso, bordes redondeados y transiciones fluidas de **Kutuku**. El diseño original para móviles fue escalado de manera fluida y adaptado para ofrecer una experiencia de escritorio (Desktop) igualmente intuitiva y elegante.  

  

  ![](https://i.imgur.com/QOp7vBk.png)



## 🏗️ Patrones de Arquitectura e Ingeniería Aplicados

Para evitar la típica estructura monolítica y desorganizada de React, esta aplicación se rige por los siguientes principios de ingeniería:  

> 📝 **Inspiración Arquitectónica:** El diseño del sistema y la separación de capas implementadas en este repositorio están inspirados y fundamentados en los conceptos de diseño de sistemas a gran escala presentados en el artículo: [Frontend System Design Patterns for Large-scale React Applications](https://medium.com/@dmitriilobanov3/frontend-system-design-patterns-for-large-scale-react-applications-699ef9bb3b1d) por Dmitrii Lobanov.  

### 1. Patrón CVVM (Container, View, ViewModel)

- **Containers (`src/containers/`):** Actúan como orquestadores de datos y ciclo de vida de cada pantalla. Se encargan de leer parámetros de rutas (URL State), consumir del contexto global y pasar los datos listos a las vistas.  
- **ViewModels (`src/viewmodels/`):** Custom hooks puros que encapsulan la lógica de negocio, transformación y filtrado de datos. Abstraen por completo a las vistas de la estructura original del JSON.  
- **Views (`src/components/`):** Componentes visuales puros (o tontos). No conocen la procedencia de los datos; solo reciben datos formateados vía *props* y renderizan interfaces pulidas y responsivas con **Tailwind CSS**.  

### 2. Separación Estricta de Estado (State Separation)

El flujo de estado se divide para evitar cuellos de botella de rendimiento y re-renders masivos:  

- **URL State:** Filtros de categorías, ordenamiento por precio y búsquedas controlados directamente en la barra de direcciones (`?category=x&search=y&sort=asc`) mediante **React Router Dom**. Esto permite que el catálogo sea indexable, navegable e intercambiable.  
- **Persistent State:** El carrito de compras se sincroniza automáticamente en `localStorage` con rehidratación controlada.  
- **Local UI State:** Los modales, selectores y animaciones de carga se manejan estrictamente a nivel de componente local.  

## ⚙️ Flujo Unidireccional de Datos (Ejemplo: Catálogo)

Cuando el usuario interactúa con la Página de Catálogo (`ProductsPage`), el flujo sigue este diseño limpio:  

Plaintext

```
[Ruta: ProductsPage] ──> [ProductListContainer]
                               │
                               ├── (Lee parámetros de la URL: ?category=Shoes&search=polo)
                               ├── (Pasa los datos al ViewModel: useProductListViewModel)
                               │
                        [ViewModel] (Aplica filtros, ordenamiento y búsquedas de forma pura)
                               │
                               └── (Retorna: { filteredProducts, totalCount })
                               │
                        [ProductGrid] (Recibe los productos limpios y los renderiza sin lógica interna)
```

## 🛠️ Stack Tecnológico

- **Runtime & Build:** React + Vite + TypeScript (Tipado estricto de punta a punta)  
- **Estilos:** Tailwind CSS (Arquitectura Mobile-First de alta precisión)  
- **Manejador de Paquetes:** pnpm v9 (Ejecutado de forma segura en entornos aislados)  
- **Enrutamiento:** React Router Dom v6  
- **Entorno de Contenedores:** Docker + Docker Compose + DevContainers

## 📂 Estructura del Proyecto

La arquitectura se organiza de la siguiente manera para garantizar escalabilidad[cite: 2]:

Plaintext

```
src/
├── assets/                  # Logos, vectores y estilos globales
│   └── styles/main.css      # Configuración y directivas de Tailwind CSS
│
├── components/              # Componentes visuales puros (Vistas tontas / Reutilizables)
│   ├── common/              # UI Primitives independientes de negocio (Botones, Badges, etc.)
│   │   ├── Button.tsx
│   │   ├── Badge.tsx        # Etiquetas visuales para stock (In Stock / Out of Stock)
│   │   ├── RatingStars.tsx  # Componente visual para ratings de productos
│   │   └── Skeletons.tsx    # Skeleton loaders para transiciones e interfaces asíncronas
│   │
│   ├── layout/              # Estructura del sitio (Headers, footers, etc.)
│   │   ├── Header.tsx       # Barra de navegación con contador de carrito persistente
│   │   └── Footer.tsx
│   │
│   └── product/             # Componentes específicos del dominio de catálogo (Views)
│       ├── ProductCard.tsx  # Tarjeta individual con interactividad y validación de stock
│       ├── ProductGrid.tsx  # Grid responsivo de productos de 2 a 4 columnas según dispositivo
│       └── SizeSelector.tsx # Control interactivo de tallas
│
├── containers/              # Capa lógica de obtención de datos y control del ciclo de vida (Containers)
│   ├── HomeContainer.tsx    # Orquesta productos destacados
│   ├── ProductListContainer.tsx    # Sincroniza búsqueda y filtros con la URL
│   ├── ProductDetailContainer.tsx  # Controla la lógica de selección y adición al carro
│   └── CartContainer.tsx           # Maneja operaciones, sumatorias y cantidades
│
├── context/                 # Estado global de la aplicación (Inyección de dependencias)[cite: 2]
│   └── CartContext.tsx      # Lógica global y exclusiva del estado del carrito
│
├── data/                    # Mock de datos local estructurado
│   └── products.ts          # Base de datos local tipada (10-12 productos según especificaciones)
│
├── hooks/                   # Custom hooks utilitarios transversales
│   ├── useCart.ts           # Interfaz para interactuar con CartContext de forma segura
│   └── useDebounce.ts       # Optimización de búsquedas reactivas en tiempo real
│
├── pages/                   # Enrutamiento físico y puntos de composición
│   ├── HomePage.tsx         # Page 1: Hero banner & Productos destacados
│   ├── ProductsPage.tsx     # Page 2: Grid interactivo con filtros
│   ├── ProductDetailPage.tsx# Page 3: Detalle del producto, colores, tallas y stock
│   └── CartPage.tsx         # Page 4: Checkout simulado, edición y totales
│
├── routes/                  # Configuración de rutas
│   └── AppRoutes.tsx        # Definición de rutas del cliente utilizando React Router Dom
│
├── types/                   # Tipado estricto global
│   └── index.ts             # Interfaces tipadas de Product, CartItem, Filters, etc.
│
├── viewmodels/              # Lógica pura de manipulación de datos para la UI (ViewModels)
│   ├── useProductListViewModel.ts   # Filtrado categórico, búsquedas y ordenamiento
│   └── useProductDetailViewModel.ts # Gestión de variaciones y validación estricta de stock
│
├── App.tsx                  # Root Provider Wrapper (Router + Cart Context)
└── main.tsx                 # Inicializador de la aplicación
```



## ✨ Requisitos de la Prueba & Características Implementadas

### 🎯 Páginas Requeridas Cumplidas

1. **Page 01: Home:** Banner hero sofisticado y grid de productos destacados.  
2. **Page 02: Products (Listing):** Grid completamente interactivo y responsivo con filtrado por categorías.  
3. **Page 03: Product Details:** Ficha del producto con galería de imágenes, selector de tallas/colores y llamada a la acción.  
4. **Page 04: Cart:** Vista del carrito con control dinámico de cantidades, eliminación y sumatoria de totales.  

### 💎 Funcionalidades Extra (Bonus Points)

- **Buscador en Tiempo Real:** Optimizado con un custom hook `useDebounce` para evitar re-renders excesivos de búsqueda.
- **Filtros de Ordenamiento:** Ordenamiento dinámico por precio (menor a mayor y viceversa).
- **Skeleton Loaders:** Interfaces de carga elegantes en transiciones de páginas para una óptima experiencia de usuario (UX).
- **Empty States Inteligentes:** Diseños pulidos para búsquedas sin coincidencias o carritos vacíos.
- **Validación de Stock Extrema:** Los botones de compra se inhabilitan y los indicadores visuales cambian dinámicamente según el inventario (`inStock: false`) para asegurar la integridad de la compra.

## 🚀 Instalación y Ejecución Local

### Opción A: Con Docker & VS Code DevContainers (Recomendado)

El proyecto cuenta con un entorno Dockerizado y blindado bajo la versión más segura y actualizada de **Node.js v24 (LTS)** sobre **Debian 12 Bookworm**:

1. Abre el directorio del proyecto en VS Code.

2. Presiona `F1` y selecciona: `Dev Containers: Reopen in Container`.

3. El contenedor instalará de manera automatizada las dependencias con `pnpm`.

4. En la terminal integrada del contenedor, ejecuta:

   Bash

   ```
   pnpm dev
   ```

### Opción B: Ejecución Local Tradicional

Asegúrate de contar con Node.js v20+ y `pnpm` v9+ instalados localmente:

1. Instalar las dependencias de forma segura:

   Bash

   ```
   pnpm install
   ```

2. Levantar el servidor de desarrollo en Vite (Puerto `5173`):

   Bash

   ```
   pnpm dev
   ```

3. Compilar para producción (Validación estricta de compilación libre de errores):

   Bash

   ```
   pnpm build
   ```

## 📈 Buenas Prácticas de Git (Commit Discipline)

El historial de este repositorio no contiene un único push gigante. Se realizaron **más de 8 commits significativos** aplicando metodologías de **Conventional Commits** (ej: `feat:`, `fix:`, `docs:`, `refactor:`), reflejando un flujo de trabajo iterativo e incremental propio de un entorno real de producción.



---

## 💫 Una Reflexión Profesional

> *"Escribir código limpio, modular y bien estructurado no se trata simplemente de darle instrucciones a una máquina para que funcione; se trata de respetar a los seres humanos que heredarán, mantendrán y harán crecer nuestro trabajo en el futuro. El software de calidad no solo se ejecuta con éxito, se lee como buena literatura."*