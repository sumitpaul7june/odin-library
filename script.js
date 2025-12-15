
const addButton = document.querySelector('.add-btn');
const closeButton = document.querySelector('.close-btn');
const modal = document.querySelector('#modal');
const submitButton = document.querySelector('.submit-btn');
const bookContainer = document.querySelector('.book-container');


const books = [
    new Book("1984", "George Orwell", "328", "Unread"),
    new Book("Pride and Prejudice", "Jane Austen", "392", "Read"),
    new Book("The Alchemist", "Paulo Coelho", "197", "Unread")

];
books[0].id = "book1";
books[1].id = "book2";
books[2].id = "book3";


function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


Book.prototype.toggleRead = function () {
    this.status = this.status === "Read" ? "Unread" : "Read";
};



bookContainer.addEventListener("click", (e) => {
    const bookDiv = e.target.closest(".books");
    if (!bookDiv) return;

    const bookId = bookDiv.dataset.id;
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    
    if (e.target.classList.contains("remove-button")) {
        const index = books.findIndex(b => b.id === bookId);
        books.splice(index, 1);
        bookDiv.remove();
    }


    if (e.target.classList.contains("markasread-button")) {
        book.toggleRead();
        bookDiv.querySelector(".status").textContent = book.status;
    }
});


submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const form = e.target.closest("form");

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const isRead = form.querySelector("#read").checked;

    if (title && author && pages)
    {
        addBookToLibrary(title, author, pages, isRead ? "Read" : "Unread");
    }
    modal.close();
    form.reset();
});


addButton.addEventListener("click", () => modal.showModal());
closeButton.addEventListener("click", () => modal.close());



function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    books.push(book);
    renderBook(book);
}

function renderBook(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('books');

   
    bookDiv.dataset.id = book.id;

    bookDiv.innerHTML = `
        <h3 class="title">${book.title}</h3>
        <p class="author">by ${book.author}</p>
        <p class="pages">${book.pages} pages</p>
        <p class="status">${book.status}</p>
        <div class="book-action-button-group">
            <button class="markasread-button">Mark as Read</button>
            <button class="remove-button">Remove</button>
        </div>
    `;

    bookContainer.appendChild(bookDiv);
}