import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './localstorage/local-storage.service';
import { ApiService } from './rest-api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private api: ApiService,
    private router: Router,
    private storage: LocalStorageService
  ) { }
  title = 'blog';

  logout() {
    this.api.Logout().subscribe(response => {
      this.storage.removeToken()
      this.router.navigate(["login"])
    })
  }
}
