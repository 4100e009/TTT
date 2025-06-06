function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  const list = document.getElementById('todo-list');
  const item = document.createElement('li');
  item.innerHTML = \`
    ${text}
    <button onclick="this.parentElement.remove()">❌</button>
  \`;
  list.appendChild(item);
  input.value = '';
}
