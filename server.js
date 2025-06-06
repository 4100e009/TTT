const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'events.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'todo-app')));

function readEvents() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (e) {
    return [];
  }
}

function writeEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

app.get('/api/events', (req, res) => {
  res.json(readEvents());
});

app.post('/api/events', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const events = readEvents();
  const event = { id: Date.now(), name, bought: false };
  events.push(event);
  writeEvents(events);
  res.json(event);
});

app.post('/api/events/:id/buy', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const events = readEvents();
  const event = events.find(ev => ev.id === id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  event.bought = true;
  writeEvents(events);
  res.json(event);
});

app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let events = readEvents();
  const index = events.findIndex(ev => ev.id === id);
  if (index === -1) return res.status(404).json({ error: 'Event not found' });
  events.splice(index, 1);
  writeEvents(events);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
