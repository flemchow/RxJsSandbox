import cors from 'cors';
import express from 'express';
import { IChooseYou } from './names';

(async () => {
  const app = express();
  app.use(cors())

  app.get('/', (req, res) => {
    res.send('Welcome to RequestSender');
  });

  app.get('/healthcheck', (req, res) => {
    console.log('healthy')
    res.status(200).send('healthy')
  });

  app.get('/ichooseyou', (req, res) => {
    IChooseYou('http://requestreciever:8000/gottacatchthemall');

    res.send('the pokemon has been chosen')
  })

  app.get('/ichooseyouevents', (req, res) => {
    IChooseYou('http://requestreciever:8000/gottacatchthemallevents');

    res.send('the pokemon has been chosen')
  })

  app.get('/ichooseyouall', (req, res) => {
    IChooseYou('http://requestreciever:8000/bulkgottacatchthemall');

    res.send('the pokemon has been chosen')
  })

  app.listen(8000, () => {
    console.log('RequestSender server started on port 8000');
  });
})().catch(error => console.log(error))

