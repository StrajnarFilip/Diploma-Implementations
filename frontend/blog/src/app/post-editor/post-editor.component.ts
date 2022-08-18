import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../rest-api/api.service';
import { Segment } from "../models/Segment"
import { ActivatedRoute, Router } from '@angular/router';
import { TextComment } from '../models/TextComment';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  postId?: number
  segments?: Segment[]
  title?: string

  addingSegment: "text" | "hyperlink" | "image" | "none" = "none"
  userRole?: string

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  updateSegments() {
    if (this.postId) {
      this.api.UserInfo().subscribe(response => {
        this.userRole = response.role
      })

      this.api.SegmentsOfPost(this.postId).subscribe(resposne => {
        this.segments = resposne
      })
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.postId = parseInt(id)
      this.api.GetPost(this.postId)
        .subscribe(response => this.title = response.title)
    }
    this.updateSegments()
  }

  newImage() {
    this.addingSegment = "image"
    console.log(this.addingSegment)
  }
  newText() {
    this.addingSegment = "text"
    console.log(this.addingSegment)
  }
  newLink() {
    this.addingSegment = "hyperlink"
    console.log(this.addingSegment)
  }

  segmentModified(text: string) {
    this.updateSegments()
  }
}
