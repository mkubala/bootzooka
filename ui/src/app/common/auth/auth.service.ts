import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService implements OnInit {
  private isLoggedIn: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoggedIn = false;
  }

  canAccess(url: string): Observable<boolean> {
    return Observable.of<boolean>(this.isLoggedIn);
  }

  private simulateLogin(): Observable<boolean> {
    return Observable.of<boolean>(true).delay(1000);
  }

  doLogin(): Observable<boolean> {
    return this.simulateLogin()
      .do(
        res => this.isLoggedIn = res,
        () => this.isLoggedIn = false
      );
  }

  isLogged(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
