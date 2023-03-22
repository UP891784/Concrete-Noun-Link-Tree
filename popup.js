// Wait until the DOM content is loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the search UI elements
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');
  const resultsDiv = document.getElementById('results');
  
  // Get the search query from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  
  // If there's a search query in the URL, set it as the value of the search input and perform the search
  if (searchQuery) {
  searchInput.value = searchQuery;
  search();
  }
  
  // Add an event listener to the search button to perform the search
  searchButton.addEventListener('click', search);
  
  // Perform the search when the user clicks the search button or presses enter
  async function search() {
  console.log('Search button clicked');
  try {
    // Get the search text and convert it to lowercase for case-insensitive search
    const searchText = searchInput.value.toLowerCase();
    // Get the link to the database JSON file
    const databaseLink = chrome.runtime.getURL('database.json');
  
    // Fetch the data from the database JSON file
    const response = await fetch(databaseLink);
    const nounData = await response.json();
  
    // Filter the data to find the noun matching the search text
    const results = nounData.filter(function(db) {
      return db.noun.toLowerCase() === searchText;
    });
  
    // If results are found, display them in the results div
    if (results.length > 0) {
      while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
      }
      results[0].uses.forEach(function(use) {
        const li = document.createElement('li');
        li.textContent = use;
        resultsDiv.appendChild(li);
      });
    } 
    // If no results are found, display a message in the results div
    else {
      resultsDiv.textContent = 'Nothing found in the database.';
    }
  } 
  // If an error occurs while fetching data or parsing JSON, display an error message in the results div
  catch (error) {
    console.error('Error fetching data:', error);
    resultsDiv.textContent = 'An error occurred while searching the database. Please try again later.';
  }
  }
  });


