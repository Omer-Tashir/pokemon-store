import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class LoginComponent {
  auth: any;
  isLoading: boolean = true;
  inProcess: boolean = false;
  
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      this.auth = auth;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  login() {
    this.inProcess = true;
    this.afAuth.signInAnonymously()
    .then(() => {
      this.inProcess = false;
    })
    .catch((error) => {
      console.log(error);
      this.inProcess = false;
    });
  }

  logout() {
    this.inProcess = true;
    this.afAuth.signOut().then(() => {
      this.inProcess = false;
      this.auth = undefined;
    }).catch(error => {
      console.log(error);
      this.inProcess = false;
    })
  }
}
