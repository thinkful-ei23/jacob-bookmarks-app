'use strict';
/* global $ api item bookmarkList store*/

// Add new Bookmark...
function closeAddBookmarkButton() {
  $('.js-add-new-bookmark-container').on('click','.js-cancel-button', function() {
    $('.js-new-bookmark-form').remove();
  });
}
// listen for Add Bookmark button
function addBookmarkButton() {
  $('.js-add-bookmark-button').on('click', function() {
    $('.js-add-new-bookmark-container').html(
      `<form class="js-new-bookmark-form new-bookmark-form">
        <div class="form-container">
          <h3><label for="js-new-bookmark-form">Add Your New Bookmark</label></h3>
          <div class="form-grid-container">
            <label for="js-new-bookmark-title" class="form-grid">Enter a title</label>
            <input type="text" name="new-bookmark-title" class="js-new-bookmark-title form-grid" placeholder="eg. Facebook" required>
            <label for="js-new-bookmark-url" class="form-grid">Enter the URL</label>
            <input type="text" name="new-bookmark-url" class="js-new-bookmark-url form-grid" placeholder="eg www.aol.com" required>
            <label for="js-new-bookmark-description" class="form-grid">Enter a description</label>
            <textarea rows="4" type="text" name="js-new-bookmark-description" class="js-new-bookmark-description form-grid" placeholder="AOL is a web portal and online service provider based in New York." required></textarea>
            <label for="js-new-bookmark-rating" class="form-grid">Enter a Rating</label>
            <input type="number" name="js-new-bookmark-rating" class="js-new-bookmark-rating form-grid" placeholder="Min: 1, max: 5" min="1" max="5" required>
          </div>
          <button type="submit">Add New Bookmark</button>
          <button class="js-cancel-button" type="button">CANCEL</button>
        </div>
      </form>`);
  });
}

//upon click add in a new input

// listen for submit and capture 'title', 'url', 'description, and 'stars'

// clear out bookmark input...

//use captured variables to make new object, 

//send new object to API, 

//use response to render the page...

function bindEventListeners() {
  addBookmarkButton();
  closeAddBookmarkButton();
  
  api.getBookmarks((response) => {
    response.forEach((object) => store.addBookmark(object));
    bookmarkList.render();
  });
  
  bookmarkList.handleBookmarkListFunctions();
}

$(document).ready(function() {
  bindEventListeners();
});
