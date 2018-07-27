'use strict';
/* global $ item api store*/

const bookmarkList = (function() {

  function closeAddBookmarkButton() {
    $('.js-add-new-bookmark-container').on('click','.js-cancel-button', function() {
      $('.js-input-hidden').prop('hidden', true);
      $('.js-new-bookmark-form').remove();
    });
  }
  // listen for Add Bookmark button
  function addBookmarkButton() {
    $('.js-add-bookmark-button').on('click', function() {
      $('.js-input-hidden').prop('hidden', false);
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
  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }
    $('.error-container').prop('hidden', false);
    return `
      <section class="error-content">
        <p>${message}</p>
        <button id="cancel-error">X</button> 
      </section>
    `;
  }
  const generateBookmarkString = function(item) {
    let colorChooser = ['#FF6B35', '#F7C59F', '#c6c6b3', '#004E89', '#1A659E'][Math.floor(Math.random()*5)];
      
    if (item.rating < store.minimumRating) {
      return '';
    } else {
      let expandedSection = '';
      if (item.expanded === true) expandedSection =`<textarea class="js-bookmark-description">${item.desc}</textarea><button class="js-change-description">Submit Change</button><a href="${item.url}">Visit ${item.title}'s Site</a><button class="js-delete-bookmark">Delete</button>`;
      let starString = '';
      for (let i = 1; i <= 5; i++) {
        let checkedClass = '';
        if (i <= item.rating) checkedClass = 'checked';
        starString+= `<span class="fa fa-star ${checkedClass}  js-star" name="js-star${i}"></span>`;
      }
      return `<li data-item-id="${item.id}" style="background-color:${colorChooser}"><h2>${item.title}</h2><div class="js-star-rating star-rating">${starString}</div>${expandedSection}<svg width="4%" aria-hidden="true" data-prefix="fas" data-icon="expand" class="svg-inline--fa fa-expand fa-w-14 js-li-expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg></li>`;
    }
  };
  const generateFullBookmarkListString = function(bookmarksArray) {
    const stringedBookmarks = bookmarksArray.map(eachObject => generateBookmarkString(eachObject));
    return stringedBookmarks.join('');
  };
  const updateStoreState = function () {
    api.getBookmarks(function(response) {
      
    });
  };

  const render = function() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
    updateStoreState();
    let bookmarks = store.bookmarks;
    const fullBookmarkString = generateFullBookmarkListString(bookmarks);
    $('.js-bookmark-list').html(fullBookmarkString);
    hiddenElementAttrChange();
  };

  const onErrorFunction = (err) => {
    console.log(err);
    store.setError(err);
    render();
  };

  function captureNewBookmarkInfo() {
    $('.js-add-new-bookmark-container').on('submit', function(event) {
      event.preventDefault();
      const newTitle = $('.js-new-bookmark-title').val();
      const newUrl = $('.js-new-bookmark-url').val();
      const newDescription = $('.js-new-bookmark-description').val();
      const newStarRating = $('.js-new-bookmark-rating').val();
      $('.js-new-bookmark-form').remove(); 
      $('.js-input-hidden').prop('hidden', true);
      const newItem = item.create(newTitle, newUrl, newDescription, newStarRating);
      api.createItem(newItem, function(response) {
        newItem.id = response.id;
        store.addBookmark(newItem);
        render();
      }, onErrorFunction);
    });
  }
  const getIdFromElement = function(element) {
    return $(element)
      .closest('li')
      .data('item-id');
  };
  const deleteSingleBookmark = function() {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark', function(event) {
      const id = getIdFromElement(event.currentTarget);
      api.deleteItem(id, function() {
        store.deleteBookmark(id);
        render();
      }, onErrorFunction);
    });
  };
  const expandBookmarks = function() {
    $('.js-bookmark-list').on('click', '.js-li-expand', function(event) {
      const id = getIdFromElement(event.currentTarget);
      store.toggleExpanded(id);
      render();
    });
  };

  const changeStarRating = function() {
    $('.js-bookmark-list').on('click', '.js-star', function(event) {
      let rating = $(this).attr('name');
      let starRating = rating[7];
      let id = $(this).closest('li').data('item-id');
      api.changeRating(id, starRating, function(response) {
        const bookmarkObject = store.findById(id);
        bookmarkObject.rating = starRating;
        render();
      });
    });
  };
  const minimumRatingChange = function() {
    $('.js-min-rating').on('change', function(event) {
      const minRating = this.value;
      store.minimumRating = minRating;
      render();
    });
  };
  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      $('.error-container').prop('hidden', true);
      render();
    });
  }

  function hiddenElementAttrChange() {
    if (store.bookmarks.length === 0) {
      $('ul').prop('hidden', true);
    } else {
      $('ul').prop('hidden', false);
    }
  }
  function handleDescriptionChange() {
    $('.js-bookmark-list').on('click', '.js-change-description', function(event) {
      const newDesc = $('.js-bookmark-description').val();
      let id = $(this).closest('li').data('item-id');
      api.changeDescription(id, newDesc, function(response){
        const bookmarkObject = store.findById(id);
        bookmarkObject.desc = newDesc;
        render();
      });
    });
  }

  const handleBookmarkListFunctions =function() {
    closeAddBookmarkButton();
    addBookmarkButton();
    captureNewBookmarkInfo();
    deleteSingleBookmark();
    expandBookmarks();
    changeStarRating();
    minimumRatingChange();
    handleCloseError();
    hiddenElementAttrChange();
    handleDescriptionChange();
  };
  return {
    render,
    handleBookmarkListFunctions,
  };
}());

