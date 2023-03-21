# используем образ node в качестве базового
FROM node:16-alpine

# создаем директорию приложения
WORKDIR /app

# копируем файлы package.json и package-lock.json
COPY package.json ./

COPY .env .

# устанавливаем зависимости
RUN npm install

# копируем исходный код приложения
COPY . .

# компилируем TypeScript
RUN npm run build

# устанавливаем переменные окружения
ENV NODE_ENV production
ENV PORT 3000

# открываем порт
EXPOSE $PORT

# запускаем приложение
CMD ["npm", "start"]
