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

  const classNames = {
    favorite: 'favorite',
}

  const templates = {
    bookList: 
      Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
  };

  // 2. Get access to data file

  const data = dataSource
  let favoriteBooks = []

  // 3. Render books

  function render () {
    for (bookData in data.books) {
      const bookObject = data.books[bookData];
      const generatedHTML = templates.bookList(bookObject)
      const domElement = utils.createDOMFromHTML(generatedHTML)
      const bookListContainer = document.querySelector(select.containerOf.booksList);
      bookListContainer.appendChild(domElement)
    }
  }

  // 4. Add / remove book from [] favourite 

  function initActions() {

    const booksList = document.querySelector(select.containerOf.booksList)

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const clickedElement = event.target.offsetParent
      const bookId = clickedElement.getAttribute('data-id')

      if(!favoriteBooks.includes(bookId)){
        clickedElement.classList.add(classNames.favorite)
        favoriteBooks.push(bookId);
      } else if(favoriteBooks.includes(bookId)) {
        clickedElement.classList.remove(classNames.favorite)
        favoriteBooks = favoriteBooks.filter(x => x !== bookId)
      }
    })
    


  }



  render()
  initActions()


}