FROM oven/bun:1 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy all the application files to the container
COPY . .

ENV HUSKY=0

# Run your build process
RUN bun i
RUN bun run build

# Step 2: Create a smaller image for running the application
# FROM oven/bun:1
FROM nginx:stable-alpine-slim as production 

WORKDIR /app

# Copy only the necessary files from the builder image to the final image
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the application will run on
EXPOSE 5173

ENTRYPOINT ["nginx", "-g", "daemon off;"]
