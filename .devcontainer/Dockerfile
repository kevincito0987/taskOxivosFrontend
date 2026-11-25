# 1. Imagen oficial con Node.js v24 (LTS) sobre Debian 12 Bookworm
FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

# Etiquetas de metadatos para rastreo del contenedor
LABEL org.opencontainers.image.title="taskOxivosFrontend" \
      org.opencontainers.image.description="Entorno de desarrollo endurecido con Node 24 para la tienda de Oxivos" \
      org.opencontainers.image.version="1.2.0"

USER root

# 2. Instalación mínima de herramientas esenciales sin paquetes recomendados innecesarios
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# 3. Habilitar Corepack e instalar versión fijada de pnpm
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Variables de entorno del entorno de desarrollo
ENV PORT=5173 \
    NODE_ENV=development

# Crear directorios de trabajo y caché con permisos para 'node'
RUN mkdir -p /workspaces /home/node/.vscode-server /home/node/.cache /home/node/.local /home/node/.config \
 && chown -R node:node /workspaces /home/node

WORKDIR /workspaces

# Ejecutar con privilegios limitados
USER node