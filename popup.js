document.addEventListener('DOMContentLoaded', () => {
  // Ask content script for the verse
  function getVerseFromTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getVerse" }, (response) => {
        if (response && response.verse) {
          document.getElementById('currentVerse').textContent = response.verse;
        } else {
          document.getElementById('currentVerse').textContent = "No verse found.";
        }
      });
    });
  }

  // Load saved verses into the list
  function loadSavedVerses() {
    chrome.storage.local.get(['verses'], (result) => {
      const list = result.verses || [];
      const ul = document.getElementById('savedList');
      ul.innerHTML = '';

      list.forEach((verse) => {
        const li = document.createElement('li');
        li.textContent = verse;
        li.classList.add('savedVerse'); // apply the card style
        ul.appendChild(li);
      });
    });
  }

  // Save current verse to storage
  const saveButton = document.getElementById('saveVerse');
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      const verse = document.getElementById('currentVerse').textContent;
      chrome.storage.local.get(['verses'], (result) => {
        const list = result.verses || [];
        if (verse && !list.includes(verse)) {
          list.push(verse);
          chrome.storage.local.set({ verses: list }, () => {
            loadSavedVerses();
          });
        }
      });
    });
  }

  // Run functions after DOM is ready
  getVerseFromTab();
  loadSavedVerses();
});
