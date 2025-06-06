function addEvent() {
  const input = document.getElementById('event-input');
  const text = input.value.trim();
  if (!text) return;

  const list = document.getElementById('event-list');
  const item = document.createElement('li');
  item.innerHTML = `
    ${text}
    <button class="buy" onclick="buyTicket(this)">購票</button>
    <button class="delete" onclick="this.parentElement.remove()">刪除</button>
  `;
  list.appendChild(item);
  input.value = '';
}

function buyTicket(btn) {
  btn.textContent = '已購票';
  btn.disabled = true;
}
