import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

let diaryItems = [];

app.use(bodyParser.json());

// fetch current diary items
app.get('/diary', (req, res) => {
  res.json(diaryItems);
});

// create a new diary item
app.post('api/diary', (req, res) => {
  const { id, date, title, body } = req.body;
  const newItem = { id, date, title, body};
  diaryItems.push(newItem);
  res.status(201).json(newItem);
})

// delete

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})