{
  'use strict'

  // 1. Reference to tags and templates

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      filters: '.filters',
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
    hidden: 'hidden'
}

  const templates = {
    bookList: 
      Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML)
  };

  // 2. Get access to data file

  const data = dataSource
  let favoriteBooks = []
  let filters = []

  console.log(filters)

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
    const filtersForm = document.querySelector(select.containerOf.filters)

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      const bookId = clickedElement.getAttribute('data-id');
      if(!favoriteBooks.includes(bookId)){
        clickedElement.classList.add(classNames.favorite)
        favoriteBooks.push(bookId);
      } else if(favoriteBooks.includes(bookId)) {
        clickedElement.classList.remove(classNames.favorite)
        favoriteBooks = favoriteBooks.filter(x => x !== bookId)
      }
    })

    filtersForm.addEventListener('click', function(event) {
      const target = event.target
      const formName = target.getAttribute('name')
      const formType = target.getAttribute('type')
      const formValue = target.getAttribute('value')

      if (formName == 'filter' || formType == 'checkbox') {
        const filterIndex = filters.indexOf(formValue)
  
        if (target.checked){
          filters.push(formValue)
        } else {
          filters.splice(filterIndex, 1)
        }

        filterBooks();
      }
    })
  }

  function filterBooks(){
    for(let book of data.books){
      const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;

      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      if(!shouldBeHidden){
        filteredBook.classList.remove(classNames.hidden);
      } else {
        filteredBook.classList.add(classNames.hidden);
      }
    }
}


render()
initActions()


}