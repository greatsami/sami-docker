FROM node:14 as base


FROM base as development

WORKDIR /app
COPY package.json .
RUN npm install
ARG NODE_ENV
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start-dev"]

FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
ARG NODE_ENV
COPY . .
EXPOSE 4000
CMD ["npm", "start"]