import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../rest-api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email?: string
  password?: string

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.email && this.password) {
      this.api.Register(this.email, this.password).subscribe(response => {
        this.router.navigate(["login"])
      })
    }
  }
}
