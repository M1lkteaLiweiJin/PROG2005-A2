import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
  ];

  newBook: Book = { id: 0, title: '', author: '', year: 0 };

  addBook() {
    if (!this.newBook.title || !this.newBook.author || this.newBook.year <= 0) {
      alert('Please fill all fields correctly!');
      return;
    }
    const newId = Date.now();
    this.books.push({ ...this.newBook, id: newId });
    this.newBook = { id: 0, title: '', author: '', year: 0 };
  }

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
  }
}