require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { startDB } from './db';
import { Search } from './model/Search';
import { saveSearch } from './SearchController';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({ keys: ['secrets'] }));

startDB().then(() => {
  console.log('Connected to Database.');
  Search.sync().then(() => console.log('Table Search created'));
});

app.post('/savesearch', saveSearch);

app.listen(3001, () => {
  console.log('Listening on 3001');
});
