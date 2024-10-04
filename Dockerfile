# Sử dụng Node.js làm base image
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ project vào container
COPY . .

# Build project Vue.js
RUN npm run build

# Serve ứng dụng với Nginx hoặc một công cụ khác nếu cần
# Ví dụ với Nginx:
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
