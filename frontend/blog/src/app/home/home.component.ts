import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { Post } from '../models/Post';
import { ApiService } from '../rest-api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allPosts?: Post[]
  newTitle?: string

  userRole?: string

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {
    if (this.storage.token == null || !(this.storage.token.length == 64)) {
      this.router.navigate(["login"])
    }

    this.api.UserInfo().subscribe({
      next: resposne => {
        this.userRole = resposne.role
      },
      error: error => {
        this.router.navigate(["login"])
      }
    })

    this.updatePosts()
  }
  updatePosts() {
    this.api.AllPosts().subscribe(posts => {
      this.allPosts = posts
    })
  }

  newPost() {
    if (this.newTitle)
      this.api.NewPost(this.newTitle).subscribe(response => {
        this.router.navigateByUrl(`/post/${response.id}`)
      })
  }

  deletePost(postId: number) {
    this.api.DeletePost(postId).subscribe(response => {
      this.updatePosts()
    })
  }

}
