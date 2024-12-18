import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { DiaryItem } from './diaryItem.mjs';
import { User } from './user.mjs';

const app = express();
const port = 3001;

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'DELETE'], 
  credentials: true, 
};
app.use(cors(corsOptions));

// fetch current diary items
app.get('/diary', async (req, res) => {
  let rows = await DiaryItem.getAll();

  if (!rows) {
    res.status(400).send("Bad request");
    return;
  }

  res.status(201).json(rows);
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// create a new diary item
app.post('/diary', async (req, res) => {
  let entry = await DiaryItem.create(req.body);

  if (!entry) {
    res.status(400).send("Bad request");
    return;
  }

  res.status(201).json(entry.json());
})

// delete
app.delete('/diary/:id', async (req, res) => {
  const item = await DiaryItem.deleteEntryById(req.params.id)
  if (!item) {
      res.status(404).send("Entry not found");
      return;
  } 
  res.json(true);
})

app.post('/user', async (req, res) => {
  let user = await User.create(req.body);

  if (!user) {
    res.status(400).send("Bad request");
    return;
  }

  res.status(201).json(user.json());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})