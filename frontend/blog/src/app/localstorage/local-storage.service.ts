import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get token(): string | null {
    return localStorage.getItem("token")
  }

  setToken(token: string) {
    localStorage.setItem("token", token)
  }

  removeToken() {
    localStorage.removeItem("token")
  }
  get tokenEmpty(): boolean {
    return (this.token === null)
  }
  get tokenExists(): boolean {
    return !this.tokenEmpty
  }
}
