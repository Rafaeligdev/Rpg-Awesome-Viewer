function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayIcons() {
  const body = document.body;
  const startCode = 0xe900;
  const endCode = 0xeb40;

  for (let codePoint = startCode; codePoint <= endCode; codePoint++) {
    const icon = String.fromCodePoint(codePoint);
    const span = document.createElement('span');
    span.textContent = icon;
    span.setAttribute('data-code', 'U+' + codePoint.toString(16).toUpperCase());
    span.style.color = getRandomColor();
    span.addEventListener('click', () => copyToClipboard(icon, span));
    body.appendChild(span);
  }
}

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const message = document.getElementById('copy-message');
    message.classList.add('show');
    setTimeout(() => message.classList.remove('show'), 1500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function applyColorToIcons(color) {
  const spans = document.querySelectorAll('span');
  spans.forEach(span => {
    span.style.color = color;
  });
}

function toggleOutline(enable) {
  const spans = document.querySelectorAll('span');
  spans.forEach(span => {
    if (enable) {
      span.classList.remove('no-outline');
    } else {
      span.classList.add('no-outline');
    }
  });
}

document.getElementById('applyColor').addEventListener('click', () => {
  const color = document.getElementById('colorPicker').value;
  applyColorToIcons(color);
});

document.getElementById('randomColor').addEventListener('click', () => {
  const spans = document.querySelectorAll('span');
  spans.forEach(span => {
    span.style.color = getRandomColor();
  });
});

document.getElementById('toggleOutline').addEventListener('change', (event) => {
  toggleOutline(event.target.checked);
});

displayIcons();
