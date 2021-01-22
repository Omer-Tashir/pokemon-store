import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { LoggerService } from '../services/logger.service';

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
  
  constructor(private afAuth: AngularFireAuth, private logger: LoggerService) {
    this.afAuth.authState.subscribe(auth => {
      this.auth = auth;
      this.isLoading = false;
    }, error => {
      this.logger.error(error);
      this.isLoading = false;
    });
  }

  login() {
    this.inProcess = true;
    this.afAuth.signInAnonymously()
    .then(() => {
      this.logger.info('User is now logged in');  
      this.inProcess = false;
    })
    .catch((error) => {
      this.logger.error(error);
      this.inProcess = false;
    });
  }

  logout() {
    this.inProcess = true;
    this.afAuth.signOut().then(() => {
      this.logger.info('User is now logged out');
      this.inProcess = false;
      this.auth = undefined;
    }).catch(error => {
      this.logger.error(error);
      this.inProcess = false;
    })
  }
}
