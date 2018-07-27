'use strict';
const store = (function() {
  const addBookmark = function(bookmark) {
    bookmark.expanded = false;
    this.bookmarks.push(bookmark);
  };
  const deleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmarks => bookmarks.id !== id);
  };
  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };
  const toggleExpanded = function(id) {
    const bookmark = this.findById(id);
    bookmark.expanded = !bookmark.expanded;
  };
  const setError = function(error) {
    this.error = error;
  };
  return {
    bookmarks: [],
    miniumumRating: 0,
    addBookmark,
    deleteBookmark,
    findById,
    toggleExpanded,
    setError,
  };
}());