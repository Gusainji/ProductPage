// Responsive Navbar Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});



// Thumbnail click: update main image
document.querySelectorAll('#thumbnails img').forEach(img => {
  img.addEventListener('click', () => {
    document.querySelector('#mainImage').src = img.src;
    document.querySelectorAll('#thumbnails img').forEach(i => i.classList.remove('active'));
    img.classList.add('active');
  });
});

// Color swatch click: update selection and store in localStorage
document.querySelectorAll('.color-swatch').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    localStorage.setItem('selectedColor', button.textContent); // Store selected color
    updateVariantLabel();
  });
});

// Size selection change: update label and store in localStorage
document.getElementById('sizeSelect').addEventListener('change', () => {
  const size = document.getElementById('sizeSelect').value;
  localStorage.setItem('selectedSize', size); // Store selected size
  updateVariantLabel();
});

// Update label function
function updateVariantLabel() {
  const color = document.querySelector('.color-swatch.active')?.textContent || '-';
  const size = document.getElementById('sizeSelect').value || '-';
  document.getElementById('variantLabel').textContent = `Selected: ${color} / ${size}`;
}

// Load stored selections on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem('selectedColor');
  const savedSize = localStorage.getItem('selectedSize');

  if (savedColor) {
    document.querySelectorAll('.color-swatch').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === savedColor);
    });
  }

  if (savedSize) {
    document.getElementById('sizeSelect').value = savedSize;
  }

  updateVariantLabel();
});

// Size Chart Modal Logic
const sizeChartBtn = document.getElementById('sizeChartBtn');
const sizeChartModal = document.getElementById('sizeChartModal');
const closeSizeChart = document.getElementById('closeSizeChart');

sizeChartBtn.addEventListener('click', () => {
  sizeChartModal.style.display = 'flex';
});
closeSizeChart.addEventListener('click', () => {
  sizeChartModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === sizeChartModal) {
    sizeChartModal.style.display = 'none';
  }
});

// Compare Colours Modal Logic
const compareModal = document.getElementById('compareModal');
const openModalBtn = document.getElementById('compareColorsBtn');
const closeModalBtn = document.getElementById('closeCompare');
const compareBtn = document.getElementById('compareBtn');
const resultContainer = document.getElementById('comparisonResult');

openModalBtn.addEventListener('click', () => {
  compareModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  compareModal.classList.add('hidden');
  resultContainer.innerHTML = '';
  resultContainer.classList.add('hidden');
});

compareBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.swatch-checkbox:checked');
  resultContainer.innerHTML = '';

  if (checkboxes.length < 2) {
    resultContainer.innerHTML = '<p>Please select at least two colours to compare.</p>';
  } else {
    checkboxes.forEach(cb => {
      const swatchDiv = document.createElement('div');
      swatchDiv.classList.add('swatch-result');

      const colorBlock = document.createElement('div');
      colorBlock.classList.add('color-block');
      colorBlock.style.backgroundColor = cb.dataset.color;

      const label = document.createElement('p');
      label.textContent = cb.dataset.name;

      const img = document.createElement('img');
      img.src = cb.dataset.img;
      img.alt = cb.dataset.name;
      img.style.width = '100px';

      swatchDiv.appendChild(colorBlock);
      swatchDiv.appendChild(label);
      swatchDiv.appendChild(img);

      resultContainer.appendChild(swatchDiv);
    });
  }

  resultContainer.classList.remove('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === compareModal) {
    compareModal.classList.add('hidden');
    resultContainer.innerHTML = '';
    resultContainer.classList.add('hidden');
  }
});

// Tabs Animation
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});
