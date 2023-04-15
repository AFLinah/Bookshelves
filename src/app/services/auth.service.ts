import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string){
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signInUser(email: string, password: string){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  signOutUser(){
    const auth = getAuth();
    return signOut(auth);
  }

}
