# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy application files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --production

# Copy the build files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js application
CMD ["npm", "run", "start"]
