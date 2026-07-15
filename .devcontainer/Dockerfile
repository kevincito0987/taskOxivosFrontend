# 1. Imagen oficial con Node.js v24 (LTS) sobre Debian 12 Bookworm
FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

# Etiquetas de metadatos para rastreo del contenedor
LABEL org.opencontainers.image.title="taskOxivosFrontend" \
      org.opencontainers.image.description="Entorno de desarrollo seguro con Node 24 para la tienda de Oxivos" \
      org.opencontainers.image.version="1.1.0"

USER root

# 2. Actualización de paquetes e instalación de herramientas esenciales
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# 3. Habilitar Corepack e instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Definir variables de entorno
ENV PORT=5173 \
    NODE_ENV=development

# Directorio de trabajo
WORKDIR /workspaces

# 👇 CAMBIADO: Usamos 'node:node' en lugar de 'vscode:vscode'
RUN chown -R node:node /workspaces

# 👇 CAMBIADO: Cambiamos al usuario no-raíz 'node' (Best Practice: Least Privileged User)
USER node