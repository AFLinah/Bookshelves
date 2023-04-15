import { Injectable, resolveForwardRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(
      (resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if(user){
            resolve(true);
          }
          else{
            this.router.navigate(['/auth', 'signin']);
            resolve(false);
          }
        });
      }
    )
      
  }
}
