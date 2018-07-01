FROM node:8.11.3-jessie
COPY ./backend /app
COPY ./wait-for-it/wait-for-it.sh /bin
WORKDIR /app
RUN npm install
CMD ["npm","start"]