import express from 'express';
import bodyParser from 'body-parser';
import { DiaryItem } from './diaryItem.mjs';
import { User } from './user.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// fetch current diary items
app.get('/diary', async (req, res) => {
  let rows = await DiaryItem.getAllEntryIds();

  if (!rows) {
    res.status(400).send("Bad request");
    return;
  }

  res.status(201).json(rows);
});

// create a new diary item
app.post('/diary', async (req, res) => {
  console.log("BODY" + req.body);
  let entry = await DiaryItem.create(req.body);
  console.log("ENTRY" + entry);

  if (!entry) {
    res.status(400).send("Bad request");
    return;
  }

  res.status(201).json(entry.json());
})

// delete

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