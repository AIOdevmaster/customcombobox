document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('combo-input');
  const listBox = document.getElementById('combo-list');
  const options = listBox.querySelectorAll('li');

  function filterList() {
    const filter = inputField.value.toLowerCase();
    options.forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = text.startsWith(filter);
      item.style.display = match ? 'block' : 'none';
    });
  }

  inputField.addEventListener('input', filterList);

  inputField.addEventListener('focus', () => {
    listBox.hidden = false;
    inputField.setAttribute('aria-expanded', 'true');
  });

  inputField.addEventListener('blur', () => {
    // Delay hiding the list so we can capture click events on options
    setTimeout(() => {
      listBox.hidden = true;
      inputField.setAttribute('aria-expanded', 'false');
    }, 200);
  });

  options.forEach(option => {
    option.addEventListener('click', (event) => {
      inputField.value = event.target.innerText;
      listBox.hidden = true;
      inputField.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.target === inputField) {
      switch (event.key) {
        case 'ArrowDown':
          listBox.hidden = false;
          const firstOption = listBox.querySelector('li:not([style*="display: none"])');
          if (firstOption) {
            firstOption.focus();
          }
          break;
        case 'Escape':
          listBox.hidden = true;
          inputField.blur();
          break;
        // Implement other keyboard interactions as needed
      }
    }
  });

  listBox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const current = document.activeElement;
      const next = event.key === 'ArrowDown' ? current.nextElementSibling : current.previousElementSibling;

      if (next && next.tagName === 'LI' && next.style.display !== 'none') {
        current.setAttribute('tabindex', '-1');
        next.setAttribute('tabindex', '0');
        next.focus();
      }
      event.preventDefault();
    } else if (event.key === 'Enter') {
      inputField.value = document.activeElement.innerText;
      listBox.hidden = true;
      inputField.focus();
    }
  });
});
