import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/rest-api/api.service';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.scss']
})
export class NewImageComponent implements OnInit {
  @Input()
  postId?: number
  @Output()
  addNodeEvent = new EventEmitter<string>();

  imageSource?: string
  imageDescription?: string

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  addNewImage() {
    if (this.postId && this.imageSource && this.imageDescription) {
      this.api.AddSegment({
        postIdpost: this.postId,
        type: "img",
        text: this.imageDescription,
        source: this.imageSource
      })
        .subscribe(newImage => {
          this.addNodeEvent.emit("img")
        })
    }
  }

}
