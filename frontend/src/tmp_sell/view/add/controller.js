const item_data = JSON.parse(localStorage.getItem('item_data'));
const params = new URLSearchParams(window.location.search);
const mode = params.get('mode');
const product_code = params.get('code');
const product_name = params.get('name');

const saveButton = document.querySelector('.save');
const deleteButton = document.querySelector('.delete');
const rewriteButton = document.querySelector('.rewrite');
const closeButton = document.querySelector('.close');

if (mode === 'edit') {
  const codeInput = document.querySelector('.codeInput');
  codeInput.value = product_code;
  codeInput.disabled = true;
  const nameInput = document.querySelector('.nameInput');
  nameInput.value = product_name;
}

if (mode !== 'edit') {
  deleteButton.style.display = 'none';
}

saveButton.addEventListener('click', () => {
  if (mode === 'edit') {
    const nameValue = document.querySelector('.nameInput').value;

    // opener.document.getElementById(`product_${product_name}`).textContent = nameValue;
    // opener.postMessage('Hello from child!', window.location.origin);

    for (let i = 0; i < item_data.length; i++) {
      const { name, code } = item_data[i];
      if (code === product_code) {
        item_data[i] = { name: nameValue, code };
      }
    }
    localStorage.setItem(`item_data`, JSON.stringify(item_data));
    opener.parent.location.reload();
  }
  if (mode === 'new') {
    const codeValue = document.querySelector('.codeInput').value;
    const nameValue = document.querySelector('.nameInput').value;
    item_data.push({ name: nameValue, code: codeValue });
    localStorage.setItem(`item_data`, JSON.stringify(item_data));
    opener.parent.location.reload();
  }

  window.close();
});

deleteButton.addEventListener('click', () => {
  for (let i = 0; i < item_data.length; i++) {
    const { name, code } = item_data[i];
    if (code !== product_code) continue;
    item_data.splice(i, 1);
  }
  localStorage.setItem(`item_data`, JSON.stringify(item_data));
  opener.parent.location.reload();

  window.close();
});

rewriteButton.addEventListener('click', () => {
  const codeValue = document.querySelector('.codeInput');
  const nameValue = document.querySelector('.nameInput');
  codeValue.value = product_code;
  nameValue.value = product_name;
});
closeButton.addEventListener('click', () => {
  window.close();
});
