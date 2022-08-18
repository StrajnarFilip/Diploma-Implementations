import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/rest-api/api.service';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.scss']
})
export class NewTextComponent implements OnInit {

  @Input()
  postId?: number
  @Output()
  addNodeEvent = new EventEmitter<string>();

  content?: string

  constructor(private api: ApiService) { }


  ngOnInit(): void {
  }

  submit() {
    if (this.postId && this.content) {
      this.api.AddSegment({
        postIdpost: this.postId,
        type: "p",
        text: this.content,
        source: ""
      })
        .subscribe(response => {
          this.addNodeEvent.emit("p")
        })
    }
  }
}
