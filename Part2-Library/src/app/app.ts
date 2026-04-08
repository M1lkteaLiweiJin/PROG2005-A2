import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  currentRoute = '';

  books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, quantity: 1 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, quantity: 1 }
  ];

  newBook: Book = { id: 0, title: '', author: '', year: 0, quantity: 1 };
  searchKeyword = '';
  filteredBooks: Book[] = [];

  constructor(public router: Router) {
    this.currentRoute = router.url;
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author || this.newBook.year <= 0) {
      alert('Please fill all fields!');
      return;
    }
    const newId = Date.now();
    this.books.push({ ...this.newBook, id: newId });
    this.newBook = { id: 0, title: '', author: '', year: 0, quantity: 1 };
  }

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
  }

  increaseQuantity(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book) book.quantity++;
  }

  decreaseQuantity(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book && book.quantity > 1) book.quantity--;
  }

  searchBooks() {
    const key = this.searchKeyword.toLowerCase();
    this.filteredBooks = this.books.filter(b =>
      b.title.toLowerCase().includes(key) || b.author.toLowerCase().includes(key)
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.currentRoute = path;
  }
}