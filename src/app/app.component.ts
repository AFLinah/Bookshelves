import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyAAgf2qxPwmBjwAwxGEW92xCEWijilI8n8",
      authDomain: "bookshelves2-b5071.firebaseapp.com",
      databaseURL: "https://bookshelves2-b5071-default-rtdb.firebaseio.com/",
      projectId: "bookshelves2-b5071",
      storageBucket: "bookshelves2-b5071.appspot.com",
      messagingSenderId: "830521645754",
      appId: "1:830521645754:web:a49febdfcd055b81810083",
      measurementId: "G-TJXLEEM914"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
