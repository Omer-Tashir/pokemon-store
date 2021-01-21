import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = this.auth.isLoggedIn$;

  constructor(private auth: AuthService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.logger.debug('init HeaderComponent');
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}
