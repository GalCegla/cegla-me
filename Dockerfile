# Build stage
FROM node:16-slim AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies without running prepare script
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-engines --ignore-scripts

# Copy all source files first
COPY . .

# Generate Prisma client and GraphQL types
RUN npx prisma generate --schema=/app/prisma/schema.prisma
RUN NEXUS_SHOULD_GENERATE_ARTIFACTS=true NODE_PATH=/app/src npx ts-node --transpile-only /app/src/schema/index.ts

# Build the application
RUN yarn build

# Production stage
FROM node:16-slim AS runner

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install production dependencies only
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --ignore-engines --ignore-scripts

# Copy built files and generated types from builder
# COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/src/__generated__ ./src/__generated__

# Copy Prisma schema and migrations
COPY prisma ./prisma

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node"] 