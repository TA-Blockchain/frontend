FROM node:18-alpine

ENV NEXT_PUBLIC_API_ROUTE=http://localhost:3000/api
ENV NEXT_PUBLIC_BASE_URL=http://localhost:8080
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

WORKDIR /web
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Use pnpm to install dependencies
RUN pnpm install
COPY . .

# Build the project using pnpm
RUN pnpm run build

# Install next globally using pnpm
RUN pnpm install -g next

EXPOSE 8080
CMD ["next", "start", "-p", "8080"]
