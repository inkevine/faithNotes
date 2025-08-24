function getCurrentVerse() {
  const verseEl = document.querySelector('span.v1');  // main verse text
  const refEl = document.querySelector('a.vc');      // verse reference
  if (verseEl && refEl) {
    return `${verseEl.innerText} — ${refEl.innerText}`;
  }
  return null;
}

// Respond to popup asking for verse
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getVerse") {
    sendResponse({ verse: getCurrentVerse() });
  }
});
