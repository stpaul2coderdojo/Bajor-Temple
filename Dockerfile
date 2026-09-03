# Temple of Bajor Multi-Stage Container Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Vite frontend and bundled Node/Express server (dist/server.cjs)
RUN npm run build

# Production runtime container
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built frontend assets and server bundle
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Run with non-root user for security
USER node

# Start the bundled Express + Vite static server
CMD ["node", "dist/server.cjs"]
