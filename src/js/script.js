{

  'use strict'

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

  class bookList {

    constructor() {
      const thisBookList = this;

      thisBookList.initData()
      thisBookList.getElements()
      thisBookList.renderBooks()
      thisBookList.initActions()
      thisBookList.filterBooks()
    }

    initData() {
      const thisBookList = this;

      thisBookList.data = dataSource.books
      thisBookList.favoriteBooks = []
      thisBookList.filters = []
    }

    getElements() {
      const thisBookList = this;

      thisBookList.dom = {};

      thisBookList.dom.booksList = document.querySelector(select.containerOf.booksList)
      thisBookList.dom.filtersForm = document.querySelector(select.containerOf.filters)
    } 

    renderBooks() {
      const thisBookList = this;

      for(let bookData in thisBookList.data) {
        const bookObject = thisBookList.data[bookData]
        const generatedHTML = templates.bookList(bookObject)
        const domElement = utils.createDOMFromHTML(generatedHTML)
        thisBookList.dom.booksList.appendChild(domElement)
      }  
    }

    initActions() {
      const thisBookList = this;

      thisBookList.dom.booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        const bookId = clickedElement.getAttribute('data-id');
        if(!thisBookList.favoriteBooks.includes(bookId)){
          clickedElement.classList.add(classNames.favorite)
          thisBookList.favoriteBooks.push(bookId);
        } else if(thisBookList.favoriteBooks.includes(bookId)) {
          clickedElement.classList.remove(classNames.favorite)
          thisBookList.favoriteBooks = thisBookList.favoriteBooks.filter(x => x !== bookId)
        }
      })

      thisBookList.dom.filtersForm.addEventListener('click', function(event){
        const target = event.target
        const formName = target.getAttribute('name')
        const formType = target.getAttribute('type')
        const formValue = target.getAttribute('value')
  
        if (formName == 'filter' || formType == 'checkbox') {
          const filterIndex = thisBookList.filters.indexOf(formValue)
    
          if (target.checked){
            thisBookList.filters.push(formValue)
          } else {
            thisBookList.filters.splice(filterIndex, 1)
          }
  
          thisBookList.filterBooks();
        }
      })
    }

    filterBooks(){
      const thisBookList = this;

      for(let book of thisBookList.data) {
        const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;

        for(let filter of thisBookList.filters){
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
  }

  const app = new bookList()

}