console.log('Background script loaded');

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'what-can-you-do-with',
    title: 'Search "%s" for its uses!',
    contexts: ['selection']
  });
});

// Search for the selected text in the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'what-can-you-do-with') {
    const searchText = info.selectionText.toLowerCase();
    chrome.tabs.create({ url: `popup.html?search=${searchText}` });
  }
});

// Define a function to handle the context menu click event
function handleContextMenuClick(selectedText, tab) {
    // Check if the clicked menu item has the ID 'what-can-you-do-with'
    if (info.menuItemId === 'what-can-you-do-with') {
      // Get the selected text and convert it to lowercase
      const searchText = selectedText.selectionText.toLowerCase();
      // Create a new browser tab with the popup.html file and pass the selected text as a search query parameter
      chrome.tabs.create({ url: `popup.html?search=${searchText}` });
    }
  }
  
  // Add a listener to the context menu that triggers the handleContextMenuClick function
  chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
  