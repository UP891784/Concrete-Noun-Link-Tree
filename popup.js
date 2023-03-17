document.addEventListener('DOMContentLoaded', function() {
    // Get references to the UI elements Global variables so that they can be used in functions
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
  
    // Get the search query from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
  
    // If there's a search query, set it as the value of the search input and perform the search
    if (searchQuery) { //checks if empty
      searchInput.value = searchQuery;
      search();
    }
  
    // Add a listener to the search button
    searchButton.addEventListener('click', search);
  
    chrome.contextMenus.onClicked.addListener(function(info, tab) {
      if (info.menuItemId === 'what-can-you-do-with') {
        const searchText = info.selectionText.toLowerCase();
        chrome.tabs.update(tab.id, { url: 'popup.html?search=' + searchText });
      }
    });
  
    // Search for the entered text
    async function search() {
      console.log('Search button clicked');
      try {
        const searchText = searchInput.value.toLowerCase();
        const databaseLink = chrome.runtime.getURL('database.json');
        const response = await fetch(databaseLink);
        const nounData = await response.json();
        const results = nounData.filter(function(db) {
          return db.noun.toLowerCase() === searchText;
        });
        if (results.length > 0) {
          resultsDiv.textContent = results[0].uses;
        } else {
          resultsDiv.textContent = 'Nothing found in the database.';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.textContent = 'An error occurred while searching the database. Please try again later.';
      }
    }
  
    // Search for the selected text in the context menu
    function searchSelection(info, tab) {
      const searchText = info.selectionText.toLowerCase();
      searchInput.value = searchText;
      search();
    }
  });
  