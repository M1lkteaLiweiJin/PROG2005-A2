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
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchKeyword = '';
  filteredBooks: Book[] = [];

  books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
  ];

  searchBooks() {
    const key = this.searchKeyword.toLowerCase();
    this.filteredBooks = this.books.filter(b =>
      b.title.toLowerCase().includes(key) || b.author.toLowerCase().includes(key)
    );
  }
}