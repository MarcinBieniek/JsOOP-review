{
  'use strict'

  // 1. Reference to tags and templates

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      filter: '.filters',
      booksPanel: '.books-panel',
      booksList: '.books-list'
    },
    singleBook: {
      header: '.book__header',
      name: '.book__name',
      price: '.product__base-price',
      image: 'book__image',
      rating: '.book__rating',
    }
  };

  const templates = {
    bookList: 
      Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
  };

  // 2. Get access to data file

  const data = dataSource

  // 3. Render books

  function render () {

    for (bookData in data.books) {
      // Finding single book
      const bookObject = data.books[bookData];
      // Generating HTML
      const generatedHTML = templates.bookList(bookObject)
      // Creating DOM element (with external function)
      const domElement = utils.createDOMFromHTML(generatedHTML)
      // Adding DOM element to list
      const bookListContainer = document.querySelector(select.containerOf.booksList);
      bookListContainer.appendChild(domElement)
    }

  }

  render()
}