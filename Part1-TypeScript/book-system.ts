// Interface defining a Book structure
interface Book {
  bookId: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  isAvailable: boolean;
}

// Array to store the library collection
let library: Book[] = [];

// Add a new book to the library
function addNewBook() {
  const idInput = document.getElementById("bookId") as HTMLInputElement | null;
  const titleInput = document.getElementById("title") as HTMLInputElement | null;
  const authorInput = document.getElementById("author") as HTMLInputElement | null;
  const genreInput = document.getElementById("genre") as HTMLInputElement | null;
  const yearInput = document.getElementById("year") as HTMLInputElement | null;
  const output = document.getElementById("output") as HTMLElement | null;

  if (!idInput || !titleInput || !authorInput || !genreInput || !yearInput || !output) {
    return;
  }

  const bookId = parseInt(idInput.value);
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const genre = genreInput.value.trim();
  const year = parseInt(yearInput.value);

  // Validate inputs
  if (isNaN(bookId) || bookId <= 0) {
    output.innerText = "Error: Book ID must be a positive number.";
    return;
  }

  if (!title || !author || !genre) {
    output.innerText = "Error: Please fill all required fields.";
    return;
  }

  if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
    output.innerText = "Error: Enter a valid publication year.";
    return;
  }

  // Check for duplicate ID
  const exists = library.some(book => book.bookId === bookId);
  if (exists) {
    output.innerText = "Error: This Book ID already exists.";
    return;
  }

  // Create and add new book
  const newBook: Book = {
    bookId,
    title,
    author,
    genre,
    year,
    isAvailable: true
  };

  library.push(newBook);
  output.innerText = "Book added successfully!";
  clearInputs();
}

// Display all books in the library
function showAllBooks() {
  const output = document.getElementById("output") as HTMLElement | null;
  if (!output) return;

  if (library.length === 0) {
    output.innerText = "No books in the library yet.";
    return;
  }

  let html = "<h3>Library Collection</h3><ul>";
  library.forEach(book => {
    html += `<li>ID: ${book.bookId} | "${book.title}" | ${book.author} | ${book.year} | Available: ${book.isAvailable ? "Yes" : "No"}</li>`;
  });
  html += "</ul>";
  output.innerHTML = html;
}

// Search books by title
function searchBook() {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
  const output = document.getElementById("output") as HTMLElement | null;

  if (!searchInput || !output) return;

  const keyword = searchInput.value.toLowerCase().trim();
  const results = library.filter(book => book.title.toLowerCase().includes(keyword));

  if (results.length === 0) {
    output.innerText = "No matching books found.";
    return;
  }

  let html = "<h3>Search Results</h3><ul>";
  results.forEach(book => {
    html += `<li>ID: ${book.bookId} | "${book.title}" | ${book.author}</li>`;
  });
  html += "</ul>";
  output.innerHTML = html;
}

// Clear all input fields
function clearInputs() {
  const inputs = ["bookId", "title", "author", "genre", "year"];
  inputs.forEach(id => {
    const element = document.getElementById(id) as HTMLInputElement | null;
    if (element) element.value = "";
  });
}

// Expose functions to HTML buttons
(window as any).addNewBook = addNewBook;
(window as any).showAllBooks = showAllBooks;
(window as any).searchBook = searchBook;