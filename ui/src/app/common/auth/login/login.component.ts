import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  doLogin() {
    this.authService.doLogin()
      .filter(v => v)
      .subscribe(() => 
        this.route
          .queryParams
          .map(p => p.redirectTo)
          .subscribe(targetUrl => 
            this.router.navigate([targetUrl])
          )
      );
    
  }

  ngOnInit() {

  }

}
