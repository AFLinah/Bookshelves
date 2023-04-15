import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[]=[];
  booksSubject: Subject<Book[]> = new Subject<Book[]>();


  constructor(private db: AngularFireDatabase,      private storage: AngularFireStorage) { }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  // saveBooks(){
  //   firebase.database().ref('/books').set(this.books);
  // }

  saveBooks(){
    const firebaseConfig = {
      apiKey: "AIzaSyAAgf2qxPwmBjwAwxGEW92xCEWijilI8n8",
      authDomain: "bookshelves2-b5071.firebaseapp.com",
      projectId: "bookshelves2-b5071",
      databaseURL: "https://bookshelves2-b5071-default-rtdb.firebaseio.com/",
      storageBucket: "bookshelves2-b5071.appspot.com",
      messagingSenderId: "830521645754",
      appId: "1:830521645754:web:a49febdfcd055b81810083",
      measurementId: "G-TJXLEEM914"
    };
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    set(ref(database, 'books'), this.books);
  }

  // getBooks(){
  //   firebase.database().ref('/books').on('value', (data) => {
  //     this.books = data.val() ? data.val():[];
  //     this.emitBooks();
  //   })
  //}

  getBooks(){
     return this.db.list('/books').valueChanges().subscribe((booksData: any) => { this.books = booksData.map((book: any) => new Book(book.title, book.author));
     this.emitBooks();
    })
  }

  getSingleBook(id: number): Observable<Book> {
    return this.db.object('/books/' + id).valueChanges().pipe( map((bookData: any) => new Book(bookData.title, bookData.author))
    );
  }

  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book){
          return true;
        }
        return false;
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  // uploadFile(file: File): Promise<string> {
  //   const filePath = 'images/' + file.name;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  
  //   return new Promise<string>((resolve, reject) => {
  //     task.snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           resolve(url); // résoudre la promesse avec l'URL de téléchargement
  //         }, error => {
  //           reject(error); // rejeter la promesse en cas d'erreur
  //         });
  //       })
  //     ).subscribe();
  //   });
  // }
  
  
}
