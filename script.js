let addBookBTN = document.querySelector("#add-book");

let modalBackground = document.querySelector(".modal-background");
let modal = document.querySelector(".modal");
let bookTitle = document.querySelector("#book-title");

let bookAuthor = document.querySelector("#book-author");
let bookPageTotal = document.querySelector("#book-pages-total");
let pagesRead = document.querySelector("#book-pages-read");
 
let modalCancelBTN = document.querySelector(".modalBTN-cancel")

addBookBTN.addEventListener("click",showModal)


modalCancelBTN.addEventListener("click",unshowModal)


























function showModal (){
    modal.style.opacity = "1";
    modalBackground.style.opacity ="1";
    bookTitle.textContent =" ";
    bookAuthor.textContent =" ";
    bookPageTotal.textContent=" ";
    pagesRead.textContent=" ";
     
}function unshowModal (){
    modal.style.opacity ="0";
    modalBackground.style.opacity ="0";
    bookTitle.textContent =" ";
    bookAuthor.textContent =" ";
    bookPageTotal.textContent=" ";
    pagesRead.textContent=" ";
     
}