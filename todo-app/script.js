async function fetchEvents() {
  const res = await fetch('/api/events');
  const events = await res.json();
  const list = document.getElementById('event-list');
  list.innerHTML = '';
  events.forEach(renderEvent);
}

function renderEvent(event) {
  const list = document.getElementById('event-list');
  const li = document.createElement('li');
  li.dataset.id = event.id;
  li.innerHTML = `
    ${event.name}
    <button class="buy">${event.bought ? '已購票' : '購票'}</button>
    <button class="delete">刪除</button>
  `;
  const buyBtn = li.querySelector('.buy');
  buyBtn.disabled = event.bought;
  buyBtn.onclick = () => buyTicket(event.id, buyBtn);
  li.querySelector('.delete').onclick = () => deleteEvent(event.id, li);
  list.appendChild(li);
}

async function addEvent() {
  const input = document.getElementById('event-input');
  const name = input.value.trim();
  if (!name) return;
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  const event = await res.json();
  renderEvent(event);
  input.value = '';
}

async function buyTicket(id, btn) {
  const res = await fetch(`/api/events/${id}/buy`, { method: 'POST' });
  if (res.ok) {
    btn.textContent = '已購票';
    btn.disabled = true;
  }
}

async function deleteEvent(id, li) {
  const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
  if (res.ok) li.remove();
}

document.addEventListener('DOMContentLoaded', fetchEvents);
