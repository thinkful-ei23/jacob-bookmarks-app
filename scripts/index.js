'use strict';
/* global $ api item bookmarkList store*/

$(document).ready(function() {
  bookmarkList.handleBookmarkListFunctions();
  api.getBookmarks((response) => {
    response.forEach((object) => store.addBookmark(object));
    bookmarkList.render();
  });
});
