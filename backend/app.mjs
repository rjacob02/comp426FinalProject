import express from 'express';
import bodyParser from 'body-parser';
import { DiaryItem } from './diaryItem.mjs';
import { User } from './user.mjs';

const app = express();
const port = 3001;

app.use(bodyParser.json());

// fetch current diary items
app.get('/diary', async (req, res) => {
  let rows = await DiaryItem.getAll();

  if (!rows) {
    res.status(400).send("Bad request");
    return;
  }

  res.status(201).json(rows);
});

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
  console.log("ENDPOINT");
  const item = await DiaryItem.deleteEntryById(req.params.id)
  console.log(item);
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