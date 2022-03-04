const tBody = document.querySelector("tbody");
// let count = 0;

function Book(name, pages, hasRead){
    this.name = name;
    this.pages=pages;
    this.hasRead=hasRead;
    this.identifier=name+pages;

    // this.info=function(){
    //     return `This book's name is ${this.name} and it has ${this.pages} pages.  You ${this.hasRead} this book.`
    // }
}

Book.prototype.info = function (){
    return `This book's name is ${this.name} and it has ${this.pages} pages.  You ${this.hasRead} this book.`
}
Book.prototype.changeReadStatus = function(){
    if(this.hasRead=="have not read"){
        this.hasRead="have read";
    }
    else{
        this.hasRead="have not read";
    }
}

// function Waldo(hasTears){

//     this.name="Waldo";
//     this.pages=400;
//     this.hasRead="have not read";
//     this.hasTears=hasTears;
    
// }
// Waldo.prototype=Object.create(Book.prototype);


// const Waldorona = new Waldo("tearific");

// alert(`${Waldorona.info()} also it's ${Waldorona.hasTears}`)

function Library(){
    this.books = [];
}

let myLibrary = new Library();
//book book from library based on index
const getBookName = function(index){
    return myLibrary.books[index].name;
}

//Get book from library based on index
const getBookPages = function(index){
    return myLibrary.books[index].pages;
}

//get book read status from library based on index
const getBookReadStatus=function(index){
    return myLibrary.books[index].hasRead;
}
Library.prototype.bookName = getBookName;
Library.prototype.bookPages= getBookPages;
Library.prototype.bookReadStatus = getBookReadStatus;



//This function adds book to the library/
const addBookToLibrary = function (){
    let name = prompt("What is the name of your book?");
    let pages = prompt("Enter number of pages as an integer.");
    let hasRead = "have not read";
    let book = new Book(name, pages, hasRead);
    
    myLibrary.books.push(book);
    // count++;
    
}

const changeBookStatus = function(e){
    const target = e.target.getAttribute("data-row");
    const found = myLibrary.books.findIndex(element=>element.identifier=e.target.getAttribute("data-row"));
    myLibrary.books[found].changeReadStatus();
    const rowForChange = document.querySelector(`tr[data-row=${target}`)
  
    const dataCells = rowForChange.querySelectorAll("td");
    dataCells[2].textContent=myLibrary.books[found].hasRead;
}

const getBookFromLibraryAddToTable = function(index){
    let row = createElement("tr");
    let name = createElement("td");
    let pages = createElement("td");
    let hasRead = createElement("td");
    
    // let buttonCell=createElement("td");
    let button = createElement("button");

    //hasReadButton
    let hasReadButton = createElement("button");
    hasReadButton.classList.add("readStatus");
    

    hasReadButton.dataset.row=myLibrary.bookName(index)+myLibrary.bookPages(index);
    button.dataset.row=myLibrary.bookName(index)+myLibrary.bookPages(index);
    row.dataset.row=myLibrary.bookName(index)+myLibrary.bookPages(index);
    button.classList.add("remove");
    button.addEventListener("click",removeFunction);
    hasReadButton.addEventListener("click",changeBookStatus);

    name.textContent=myLibrary.bookName(index);
    pages.textContent=myLibrary.bookPages(index);
    hasRead.textContent=myLibrary.bookReadStatus(index);

    appendChild(row,name);
    appendChild(row,pages);
    appendChild(row,hasRead);
    // appendChild(buttonCell,button);
    appendChild(row,button);
    appendChild(row,hasReadButton);
    appendChild(tBody,row);
}



//create element based on tag name, return new element
const createElement = function(elementTag){
    const element = document.createElement(elementTag);
    return element;
}

//append child to parent
const appendChild = function(parent, child){
    parent.appendChild(child)
}


// const rowAndDataForNewBook = function(){
//     const row =createElement("row");
//     const name = createElement("td");
//     const pages = createElement("td");
//     const hasRead = createElement("td");
// }


const button =document.querySelector("button[class='add']");
const buttonFunction = function(){
    addBookToLibrary();
    
    getBookFromLibraryAddToTable(myLibrary.books.length -1);
}
button.addEventListener("click",buttonFunction);

// const removeButton = document.querySelector("button[class='remove']");
const removeFunction = function(e){
    const index = e.target.getAttribute("data-row");
    // alert(`The index of this thingy is ${index}`)
    const rowForDeletion = document.querySelector(`tr[data-row=${index}`)
  
    rowForDeletion.remove();
    const found = myLibrary.books.findIndex(element=>element.identifier=e.target.getAttribute("data-row"));
    myLibrary.books.splice(found,1);
}


// removeButton.addEventListener("click",removeFunction);

// const addEventListenerToAllRemovebuttons = function(){
//     const removeButtons = document.querySelector("button[class='remove']");
//     for(button in removeButtons){
//         button.addEventListener("click",removeFunction)
//     }
// }

