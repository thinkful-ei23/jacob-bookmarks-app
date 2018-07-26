'use strict';
/* global $ cuid  */
// eslint-disable-next-line no-unused-vars
const item = (function() {
  const validateNewBookmark = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const create = function(name, url, description, stars) {
    const rating = Number(stars);
    return {
      title: name,
      url: url,
      desc: description,
      rating: rating,
      expanded: false
    };
  };

  return {
    validateNewBookmark,
    create,
  };
}());