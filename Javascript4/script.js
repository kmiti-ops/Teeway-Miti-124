/*
Author: Khetiwe Miti (JCCC)
Date: 2025-10-15
Project: My Recipe + Shopping List (Hold Shift to Check Multiple Checkboxes)
Sources: Starter adapted from https://javascript30.com

Student Notes – What I improved/added (JS):
• NEW: Live “Items left” counter (updates on every click; aria-live in HTML).
• NEW: Bulk actions (Select All / Clear) and a Print button (window.print()).
• NEW: localStorage persistence for checkbox states (reload remembers checks).
• NEW: Reviews feature (star rating radios + comment list rendered to the page).
• NEW: Scroll-to-top button visibility logic on scroll.
• CHANGED: Query selectors retargeted to recipe layout (shopping list scope).
• CHANGED: Defensive code patterns and tidy init sequence.
• REMOVED: Console logs and demo-only code from the original snippet.
*/

'use strict';


const listEl = document.getElementById('shoppingList');
const checkboxes = listEl.querySelectorAll('input[type="checkbox"]');
const itemsLeftEl = document.getElementById('itemsLeft');
const selectAllBtn = document.getElementById('selectAllBtn');
const clearAllBtn  = document.getElementById('clearAllBtn');
const printBtn     = document.getElementById('printBtn');
const imageInput   = document.getElementById('imageInput');
const recipeImg    = document.getElementById('recipeImg');

let lastChecked = null;
const STORAGE_KEY = 'recipe-checks';
const IMAGE_KEY   = 'recipe-image';


const saveChecks = () => {
  const data = Array.from(checkboxes).map(cb => ({ id: cb.dataset.id || cb.id, checked: cb.checked }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadChecks = () => {
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const data = JSON.parse(raw);
    const map = new Map(data.map(d => [d.id, d.checked]));
    checkboxes.forEach(cb => {
      const id = cb.dataset.id || cb.id;
      if(map.has(id)) cb.checked = !!map.get(id);
    });
  }catch(e){ /* ignore */ }
};

const updateItemsLeft = () => {
  const left = Array.from(checkboxes).filter(cb => !cb.checked).length;
  itemsLeftEl.textContent = `Items left: ${left}`;
};


const onCheckboxClick = (e) => {
 
  if (e.shiftKey && lastChecked && e.currentTarget.checked) {
    let inBetween = false;
    checkboxes.forEach(cb => {
    
      if (cb === e.currentTarget || cb === lastChecked) inBetween = !inBetween;
      if (inBetween) cb.checked = true;
    });
  }
  }



const selectAll = () => {
  checkboxes.forEach(cb => cb.checked = true);
  updateItemsLeft();
  saveChecks();
};

const clearAll = () => {
  checkboxes.forEach(cb => cb.checked = false);
  updateItemsLeft();
  saveChecks();
};


const loadImage = () => {
  const dataUrl = localStorage.getItem(IMAGE_KEY);
  if(dataUrl){
    recipeImg.src = dataUrl;
  }
};

const onImageSelected = (e) => {
  const file = e.target.files?.[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    recipeImg.src = dataUrl;
    try{
      localStorage.setItem(IMAGE_KEY, dataUrl);
    }catch(err){
      
      console.warn('Could not save image to localStorage:', err);
    }
  };
  reader.readAsDataURL(file);
};


const init = () => {
  loadChecks();
  loadImage();
  updateItemsLeft();

  checkboxes.forEach(cb => cb.addEventListener('click', onCheckboxClick));
  selectAllBtn.addEventListener('click', selectAll);
  clearAllBtn.addEventListener('click', clearAll);
  printBtn.addEventListener('click', () => window.print());
  
}

document.addEventListener('DOMContentLoaded', init);

  window.addEventListener('scroll', () => {
    const btn = document.getElementById('toTop');
    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reviewForm');
  const commentInput = document.getElementById('commentInput');
  const commentList = document.getElementById('commentList');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const rating = form.querySelector('input[name="rating"]:checked');
    const text = commentInput.value.trim();

    if (!rating || !text) {
      alert('Please select a star rating and write a comment.');
      return;
    }

    
    const div = document.createElement('div');
    div.classList.add('comment');

    const stars = '★'.repeat(rating.value);
    div.innerHTML = `
      <div class="rating">${stars}</div>
      <p>${text}</p>
    `;

    commentList.prepend(div); 
    form.reset();
  });
});