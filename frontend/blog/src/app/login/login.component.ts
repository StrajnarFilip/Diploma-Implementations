import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { ApiService } from '../rest-api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email?: string
  password?: string

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: LocalStorageService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email && this.password) {
      this.api.Login(this.email, this.password)
        .subscribe(response => {
          this.storage.setToken(response.text)
          this.router.navigate(["/"])
        })
    }
  }

}
