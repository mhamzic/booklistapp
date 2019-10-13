// Book class - represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class - handle ui tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: 1234567
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: 1874567
      }
    ];

    const books = StoredBooks;

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    console.log(div);
    div.className = `alert alert-${className}`;
    div.textContent = message;
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Vanish in 3 sec
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store class - handle storage

// Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: add a book
document.querySelector("#book-form").addEventListener("submit", e => {
  //   prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector("#title").value;
  const isbn = document.querySelector("#isbn").value;
  const author = document.querySelector("#author").value;

  //   Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //   instatiate book
    const book = new Book(title, author, isbn);

    //   add book to UI
    UI.addBookToList(book);

    //   clear fields
    UI.clearFields();
  }
});

// Event: remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
});
