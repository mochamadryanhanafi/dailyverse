# Pakai node image untuk development
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Salin package.json dan package-lock.json dulu untuk caching layer npm install
COPY package*.json ./

# Install dependencies dengan legacy-peer-deps agar kompatibel
RUN npm install --legacy-peer-deps

# Salin semua file source code
COPY . .

# Expose port Vite default (5173)
EXPOSE 5173

# Jalankan vite dev server, gunakan host 0.0.0.0 agar bisa diakses dari luar container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
