'use strict';
/* global $  */
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jacob';
  
  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };
  const createItem = function(name, callback, onError) {
    const strJSON =  JSON.stringify(name);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: strJSON,
      success: callback,
      error: onError
    });
  };
  const deleteItem = function(id, callback, onError) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
      error: onError
    });
  };
  const changeRating = function(id, newRating, callback, onError) {
    let starCount = { "rating": newRating};
    let strStarCount = JSON.stringify(starCount);
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: strStarCount,
      success: callback,
      error: onError
    });
  };
  const changeDescription = function(id, newDesc, callback, onError) {
    let descObj = { "desc": newDesc};
    let strDescObj = JSON.stringify(descObj);
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: strDescObj,
      success: callback,
      error: onError
    });
  };
  return {
    getBookmarks,
    createItem,
    deleteItem,
    changeRating,
    changeDescription,
  };
}());