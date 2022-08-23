import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';
import { Segment } from '../models/Segment';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { Hyperlink } from '../models/Hyperlink';
import { TextNode } from '../models/Text';
import { RegularText } from '../models/RegularText';
import { TextComment } from '../models/TextComment';
import { TextResponse } from '../models/TextResponse';
import { IdResponse } from '../models/IdResponse';
import { UserInfo } from '../models/UserInfo';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { NewSegment } from '../models/NewSegment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseAddress = "http://localhost:7000"

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  public GetAllComments(postId: number): Observable<TextComment[]> {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http
      .get<TextComment[]>(`${this.baseAddress}/post-comments/${postId}`,
        { headers: { Authorization: this.storage.token } })
  }

  public AddComment(commentPostId: number, commentContent: string) {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.post<TextComment>(`${this.baseAddress}/comment`,
      {
        postId: commentPostId,
        content: commentContent,
      }, { headers: { Authorization: this.storage.token } })
  }

  public DeleteComment(commentId: number) {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.delete<IdResponse>(`${this.baseAddress}/comment/${commentId}`,
      { headers: { Authorization: this.storage.token } })
  }

  public AddSegment(newSegment: NewSegment) {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.post<Segment>(`${this.baseAddress}/segment`,
      newSegment, { headers: { Authorization: this.storage.token } })
  }

  public DeleteSegment(segmentId: number) {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.delete<IdResponse>(`${this.baseAddress}/segment/${segmentId}`,
      { headers: { Authorization: this.storage.token } })
  }

  public SegmentsOfPost(postId: number): Observable<Segment[]> {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.get<Segment[]>(`${this.baseAddress}/post-segments/${postId}`,
      { headers: { Authorization: this.storage.token } })
  }

  public AllPosts(): Observable<Post[]> {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.get<Post[]>(`${this.baseAddress}/posts`,
      { headers: { Authorization: this.storage.token } })
  }

  public GetPost(postId: number): Observable<Post> {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.get<Post>(`${this.baseAddress}/post/${postId}`,
      { headers: { Authorization: this.storage.token } })
  }

  public NewPost(postTitle: string) {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.post<IdResponse>(`${this.baseAddress}/post`, {
      title: postTitle
    }, { headers: { Authorization: this.storage.token } })
  }

  public DeletePost(deletePostId: number) {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.delete<IdResponse>(`${this.baseAddress}/post/${deletePostId}`,
      { headers: { Authorization: this.storage.token } })

  }

  public Login(loginEmail: string, loginPassword: string): Observable<TextResponse> {
    return this.http.post<TextResponse>(`${this.baseAddress}/login`,
      {
        email: loginEmail,
        password: loginPassword
      })
  }

  public Register(loginEmail: string, loginPassword: string) {
    return this.http.post<TextResponse>(`${this.baseAddress}/register`,
      {
        email: loginEmail,
        password: loginPassword
      })
  }

  public UserInfo() {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http
      .get<UserInfo>(`${this.baseAddress}/user-information`,
        { headers: { Authorization: this.storage.token } })
  }

  public Logout(): Observable<TextResponse> {
    if (this.storage.token === null) {
      throw Error("Token is null")
    }
    return this.http.post<TextResponse>(`${this.baseAddress}/logout`, null,
      { headers: { Authorization: this.storage.token } })
  }
}
