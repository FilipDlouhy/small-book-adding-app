let addBookBTN = document.querySelector("#add-book");

let modalBackground = document.querySelector(".modal-background");
let modal = document.querySelector(".modal");

let allertText = document.querySelector("#allert-text");
 let inputs = document.querySelectorAll("input");
let modalCancelBTN = document.querySelector(".modalBTN-cancel")
let modalAddBTN = document.querySelector(".modalBTN-add");
let bookDisplay = document.querySelector(".book-display");

let deleteAllBTN = document.querySelector("#deleteBTN");
let author =document.getElementById("author");
let title = document.getElementById("title");
let total = document.getElementById("total");
let read = document.getElementById("read");
let totalOfToal=0;
let totalOfRead=0;
let bookTotal =0;
let completeTotal =0;
let pageTotalDisplay =document.getElementById("page-total");
let pageReadDisplay =document.getElementById("page-read");
let bookTotalDisplay=document.getElementById("book-total");

let completeTotalDisplay =document.getElementById("complete-total");

if (localStorage.getItem("books") === null){
  var books =[];
}else{
  books = JSON.parse(localStorage.getItem("books"));
  displayFromStorage();
}


addBookBTN.addEventListener("click",()=>{
  showModal()
  modalClear()
});


modalCancelBTN.addEventListener("click",()=>{
  unshowModal()
    modalClear()
});


deleteAllBTN.addEventListener("click",deleteALL)

modalAddBTN.addEventListener("click",(e)=>{

  addBook()


modalClear()

  e.preventDefault()
})




function Book(title,author, total, read) {
  this.title = title;
  this.author = author;
  this.total = total;
  this.read = read;
}


function modalClear(){
  inputs.forEach(input=> {
    input.value = " ";
  });
}









function addBook(){
 
    displayBook();
    unshowModal();
  
 
}  
 function showModal() {modal.style.opacity ="1";
modalBackground.style.opacity ="0.8";
modal.style.zIndex ="1010";
modalBackground.style.zIndex ="900";} 



function unshowModal() {modal.style.opacity ="0";
modalBackground.style.opacity ="0";
modal.style.zIndex ="-1010";
modalBackground.style.zIndex ="-900";}






function displayBook(){
let book = new Book(title.value,author.value,total.value,read.value );
  books.push(book);

bookDisplay.innerHTML = ` <div class="book-item  hvr-pulse-grow" id="add-book">
<i class="fa-solid fa-plus  "></i>
</div> `;

  books.forEach((book,index)=>{

    JSONbook = JSON.stringify(books);
    localStorage.setItem("books",JSONbook);


 
let div = document.createElement("div");


bookTotal = books.length;
bookTotalDisplay.textContent = bookTotal.toString();

div.setAttribute("id",index);


 if(parseInt(total.value) ==  parseInt(read.value)){
  completeTotal += 1;
  completeTotalDisplay.textContent = completeTotal.toString();
  div.innerHTML= ` <div class="book-item" id="book-complete">
    <div class="bookBTNS">
        <button class="bookBTN-one hvr-pop">Edit</button>
        <button class="bookBTN-two hvr-pop">Delete</button> 
    </div>
    <div class="book-text">
        <h1>${book.title}</h1>
        <h1>${book.author}</h1>
        <p class="pages"><span id="pages-read">${book.read}</span> <span id="total-pages">${book.total}</span></p>
    </div>
       
        <div class="delone-complete-plusone">
            <button class="delone">-</button>
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            <button class="plusone">+</button>
        </div>
  </div>
  `;
  }else{
    div.innerHTML= ` <div class="book-item" id="book">
    <div class="bookBTNS">
        <button class="bookBTN-one hvr-pop">Edit</button>
        <button class="bookBTN-two hvr-pop">Delete</button> 
    </div>
    <div class="book-text">
        <h1>${book.title}</h1>
        <h1>${book.author}</h1>
        <p class="pages"><span id="pages-read">${book.read}</span> <span id="total-pages">${book.total}</span></p>
    </div>
       
        <div class="delone-complete-plusone">
            <button class="delone">-</button>
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            <button class="plusone">+</button>
        </div>
  </div>
  `;
  }
  patchInfoPanel(books);
  
bookDisplay.appendChild(div);

  }) // end of for each


  buttonFuctionUpdate()
    document.querySelector("#add-book").addEventListener("click",()=>{
      showModal()
      modalClear()
    
    });
  
    //patchRead(books);
    //patchTotal(books);
   
   }



function editBookItem(){
  document.querySelectorAll(".bookBTN-one").forEach((button)=>{ button.addEventListener("click",(event)=>{

    let parent= event.target.parentElement.parentElement.parentElement;
    let index =event.target.parentElement.parentElement.parentElement.id;

    
    showModal();
    read.value = books[index].read;
    title.value = books[index].title;

    total.value =books[index].total;
    author.value= books[index].author;
    document.querySelector(".modalBTN-edit").addEventListener("click",()=>{
      books[index].read = read.value;
      books[index].title = title.value;
      books[index].total= total.value;
  
      books[index].author =author.value;
      JSONbook = JSON.stringify(books);
    localStorage.setItem("books",JSONbook);
      if(parseInt( books[index].read) == parseInt( books[index].total)){
        parent.innerHTML = ` <div class="book-item" id="book-complete">
        <div class="bookBTNS">
            <button class="bookBTN-one hvr-pop">Edit</button>
            <button class="bookBTN-two hvr-pop">Delete</button> 
        </div>
        <div class="book-text">
            <h1>${ books[index].title}</h1>
            <h1>${ books[index].author}</h1>
            <p class="pages"><span id="pages-read">${ books[index].read}</span> <span id="total-pages">${books[index].total}</span></p>
        </div>
           
            <div class="delone-complete-plusone">
                <button class="delone">-</button>
                <button class="complete"><i class="fa-solid fa-check"></i></button>
                <button class="plusone">+</button>
            </div>
      </div>
      `;
      buttonFuctionUpdate();
      patchInfoPanel(books);
      }else{

        parent.innerHTML = ` <div class="book-item" id="book">
        <div class="bookBTNS">
            <button class="bookBTN-one hvr-pop">Edit</button>
            <button class="bookBTN-two hvr-pop">Delete</button> 
        </div>
        <div class="book-text">
            <h1>${ books[index].title}</h1>
            <h1>${ books[index].author}</h1>
            <p class="pages"><span id="pages-read">${ books[index].read}</span> <span id="total-pages">${books[index].total}</span></p>
        </div>
           
            <div class="delone-complete-plusone">
                <button class="delone">-</button>
                <button class="complete"><i class="fa-solid fa-check"></i></button>
                <button class="plusone">+</button>
            </div>
      </div>
      `;
      if(books[index].read === books[index].total){
        completeTotal++;
        completeTotalDisplay.textContent= completeTotal.toString();
        
           }
           buttonFuctionUpdate();
           patchInfoPanel(books)
      }

     
    })





   })})


}

function deleteBookITem(){
  document.querySelectorAll(".bookBTN-two").forEach((button)=> button.addEventListener("click", (event)=>{
    let index =event.target.parentElement.parentElement.parentElement.id;
    let parent= document.getElementById(`${index}`);
    bookTotal--;
    bookTotalDisplay.textContent = bookTotal.toString();
    if(books[index].read === books[index].total){
 completeTotal--;
 completeTotalDisplay.textContent= completeTotal.toString();
 
    }
    books.splice(index,1);
    parent.remove();
    JSONbook = JSON.stringify(books);
    localStorage.setItem("books",JSONbook);
    patchInfoPanel(books);
  }))


}


function delOnePage (){
  document.querySelectorAll(".delone").forEach((button)=>{

button.addEventListener("click",(event)=>{

  
  let parent = event.target.parentElement.parentElement.parentElement;
  let index =event.target.parentElement.parentElement.parentElement.id;

  if(books[index].read === books[index].total){
    completeTotal--;
    completeTotalDisplay.textContent= completeTotal.toString();
    
       }
  if(books[index].read == 0){
    books[index].read +=0;
  }else{
    books[index].read--;
  }
  JSONbook = JSON.stringify(books);
  localStorage.setItem("books",JSONbook);
 
 if(parseInt( books[index].read) == parseInt( books[index].total)){
  parent.innerHTML = ` <div class="book-item" id="book-complete">
  <div class="bookBTNS">
      <button class="bookBTN-one hvr-pop">Edit</button>
      <button class="bookBTN-two hvr-pop">Delete</button> 
  </div>
  <div class="book-text">
      <h1>${ books[index].title}</h1>
      <h1>${ books[index].author}</h1>
      <p class="pages"><span id="pages-read">${ books[index].read}</span> <span id="total-pages">${books[index].total}</span></p>
  </div>
     
      <div class="delone-complete-plusone">
          <button class="delone">-</button>
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="plusone">+</button>
      </div>
</div>
`;
buttonFuctionUpdate();
patchInfoPanel(books)
}else{

  parent.innerHTML = ` <div class="book-item" id="book">
  <div class="bookBTNS">
      <button class="bookBTN-one hvr-pop">Edit</button>
      <button class="bookBTN-two hvr-pop">Delete</button> 
  </div>
  <div class="book-text">
      <h1>${ books[index].title}</h1>
      <h1>${ books[index].author}</h1>
      <p class="pages"><span id="pages-read">${ books[index].read}</span> <span id="total-pages">${books[index].total}</span></p>
  </div>
     
      <div class="delone-complete-plusone">
          <button class="delone">-</button>
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="plusone">+</button>
      </div>
</div>
`;

     buttonFuctionUpdate();
     patchInfoPanel(books);
}


})

    
  })
}




function plusOnePage (){
  document.querySelectorAll(".plusone").forEach((button)=>{

button.addEventListener("click",(event)=>{
  let parent = event.target.parentElement.parentElement.parentElement;
  let index =event.target.parentElement.parentElement.parentElement.id;
  if(books[index].read == books[index].total){
    books[index].read +=0;
  }else{
    books[index].read++;
  }
  if(books[index].read === books[index].total){
    completeTotal++;
    completeTotalDisplay.textContent= completeTotal.toString();
    
       }
       JSONbook = JSON.stringify(books);
       localStorage.setItem("books",JSONbook);
 if(parseInt( books[index].read) == parseInt( books[index].total)){
  parent.innerHTML = ` <div class="book-item" id="book-complete">
  <div class="bookBTNS">
      <button class="bookBTN-one hvr-pop">Edit</button>
      <button class="bookBTN-two hvr-pop">Delete</button> 
  </div>
  <div class="book-text">
      <h1>${ books[index].title}</h1>
      <h1>${ books[index].author}</h1>
      <p class="pages"><span id="pages-read">${ books[index].read}</span> <span id="total-pages">${books[index].total}</span></p>
  </div>
     
      <div class="delone-complete-plusone">
          <button class="delone">-</button>
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="plusone">+</button>
      </div>
</div>
`;
patchInfoPanel(books)
buttonFuctionUpdate();
}else{

  parent.innerHTML = ` <div class="book-item" id="book">
  <div class="bookBTNS">
      <button class="bookBTN-one hvr-pop">Edit</button>
      <button class="bookBTN-two hvr-pop">Delete</button> 
  </div>
  <div class="book-text">
      <h1>${ books[index].title}</h1>
      <h1>${ books[index].author}</h1>
      <p class="pages"><span id="pages-read">${ books[index].read}</span> <span id="total-pages">${books[index].total}</span></p>
  </div>
     
      <div class="delone-complete-plusone">
          <button class="delone">-</button>
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="plusone">+</button>
      </div>
</div>
`;
patchInfoPanel(books)
     buttonFuctionUpdate()
}


})

    
  })
}


function bookComplete(){
  document.querySelectorAll(".complete").forEach((button)=>{

button.addEventListener("click",(event)=>{
  let parent = event.target.parentElement.parentElement.parentElement;
  let index =event.target.parentElement.parentElement.parentElement.id;
 books[index].read = books[index].total;
 JSONbook = JSON.stringify(books);
 localStorage.setItem("books",JSONbook);
 
  parent.innerHTML = ` <div class="book-item" id="book-complete">
  <div class="bookBTNS">
      <button class="bookBTN-one hvr-pop">Edit</button>
      <button class="bookBTN-two hvr-pop">Delete</button> 
  </div>
  <div class="book-text">
      <h1>${ books[index].title}</h1>
      <h1>${ books[index].author}</h1>
      <p class="pages"><span id="pages-read">${ books[index].total}</span> <span id="total-pages">${books[index].total}</span></p>
  </div>
     
      <div class="delone-complete-plusone">
          <button class="delone">-</button>
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="plusone">+</button>
      </div>
</div>
`;

buttonFuctionUpdate();
patchInfoPanel(books)
completeTotal++;
completeTotalDisplay.textContent= completeTotal.toString();
})

    
  })
}



function buttonFuctionUpdate(){
  document.querySelectorAll(".bookBTN-one").forEach((button)=> button.addEventListener("click",  editBookItem));
  document.querySelectorAll(".bookBTN-two").forEach((button)=> button.addEventListener("click",  deleteBookITem));
  document.querySelectorAll(".delone").forEach((button)=> button.addEventListener("click",  delOnePage));
  document.querySelectorAll(".plusone").forEach((button)=> button.addEventListener("click", plusOnePage));
  document.querySelectorAll(".complete").forEach((button)=> button.addEventListener("click",  bookComplete));
  document.querySelector
}






function displayFromStorage(){
bookDisplay.innerHTML=" ";
let myStorage = localStorage.getItem("books");
let myStorageJSOM = JSON.parse(myStorage);
bookDisplay.innerHTML = ` <div class="book-item  hvr-pulse-grow" id="add-book">
<i class="fa-solid fa-plus  "></i>
</div> `;
document.querySelector("#add-book").addEventListener("click",()=>{
  showModal()
  modalClear()
});
bookTotal = myStorageJSOM.length;
bookTotalDisplay.textContent = bookTotal.toString();
myStorageJSOM.forEach((book,index)=>{
  let div = document.createElement("div");
  
div.setAttribute("id",index);



if(parseInt(book.total) ==  parseInt(book.read)){
  completeTotal += 1;
  completeTotalDisplay.textContent = completeTotal.toString();
  div.innerHTML= ` <div class="book-item" id="book-complete">
    <div class="bookBTNS">
        <button class="bookBTN-one hvr-pop">Edit</button>
        <button class="bookBTN-two hvr-pop">Delete</button> 
    </div>
    <div class="book-text">
        <h1>${book.title}</h1>
        <h1>${book.author}</h1>
        <p class="pages"><span id="pages-read">${book.read}</span> <span id="total-pages">${book.total}</span></p>
    </div>
       
        <div class="delone-complete-plusone">
            <button class="delone">-</button>
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            <button class="plusone">+</button>
        </div>
  </div>
  `;
  }else{
    div.innerHTML= ` <div class="book-item" id="book">
    <div class="bookBTNS">
        <button class="bookBTN-one hvr-pop">Edit</button>
        <button class="bookBTN-two hvr-pop">Delete</button> 
    </div>
    <div class="book-text">
        <h1>${book.title}</h1>
        <h1>${book.author}</h1>
        <p class="pages"><span id="pages-read">${book.read}</span> <span id="total-pages">${book.total}</span></p>
    </div>
       
        <div class="delone-complete-plusone">
            <button class="delone">-</button>
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            <button class="plusone">+</button>
        </div>
  </div>
  `;
  }

  
bookDisplay.appendChild(div);
patchInfoPanel(books)

buttonFuctionUpdate();


})



}




function patchInfoPanel(books){
  totalOfToal=0;
 totalOfRead=0;

books.forEach((book)=>{
  
  totalOfToal += parseInt( book.total);
  totalOfRead += parseInt( book.read);
  pageTotalDisplay.innerHTML =' ';
  pageReadDisplay.innerHTML= ' ';

  pageTotalDisplay.innerHTML = totalOfToal;
  pageReadDisplay.innerHTML = totalOfRead;
})


}

function deleteALL(){
  bookDisplay.innerHTML =' ';
  localStorage.clear();
  pageReadDisplay.innerHTML =' ';
  pageTotalDisplay.innerHTML =' ';
  completeTotalDisplay.innerHTML= ' ';
  bookTotalDisplay.innerHTML = ' ';
  bookDisplay.innerHTML = ` <div class="book-item  hvr-pulse-grow" id="add-book">
<i class="fa-solid fa-plus  "></i>
</div> `;
document.querySelector("#add-book").addEventListener("click",()=>{
  showModal()
  modalClear()
});
}
