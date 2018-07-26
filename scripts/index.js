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
      '<form class="js-new-bookmark-form new-bookmark-form"><h3><label for="js-new-bookmark-form">Add Your New Bookmark</label></h3><p><label for="js-new-bookmark-title">Enter a title</label><input type="text" name="new-bookmark-title" class="js-new-bookmark-title" placeholder="eg. Facebook" required></p><p><label for="js-new-bookmark-url">Enter the URL</label><input type="text" name="new-bookmark-url" class="js-new-bookmark-url" placeholder="eg. www.aol.com" required></p><p><label for="js-new-bookmark-description">Enter a description</label><input type="text" name="js-new-bookmark-description" class="js-new-bookmark-description" placeholder="AOL is a web portal and online service provider based in New York." required></p><p><label for="js-new-bookmark-rating">Enter a Rating</label><input type="number" name="js-new-bookmark-rating" class="js-new-bookmark-rating" placeholder="Min: 1, max: 5" min="1" max="5" required></p><button type="submit">Add New Bookmark</button><button class="js-cancel-button" type="button">CANCEL</button></form>');
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
  bookmarkList.captureNewBookmarkInfo();
  api.getBookmarks((response) => {
    response.forEach((object) => store.addBookmark(object));
    bookmarkList.render();
  });
  bookmarkList.deleteSingleBookmark();
  bookmarkList.expandBookmarks();
}

$(document).ready(function() {
  bindEventListeners();
});
