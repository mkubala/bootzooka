import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  isNotLogged(): boolean {
    return !this.isLogged();
  }

  getLoggedUserName(): string {
    return "TODO";
  }

  logout(): void {
    this.authService.logout();
  }

}
