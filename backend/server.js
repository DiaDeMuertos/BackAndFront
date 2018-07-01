import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import RoutesUser from './routes/User';

const app = express();
const port = process.env.port || 3000;
const urlMongo = 'mongodb://db:/Examen';

mongoose.Promise = global.Promise;
mongoose.connect(urlMongo).then(
  () => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    RoutesUser(app);

    app.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    });

    app.listen(port);

    console.log(`RESTful server started on ${port}`);
  },
  error => {
    console.error(error);
  },
);
