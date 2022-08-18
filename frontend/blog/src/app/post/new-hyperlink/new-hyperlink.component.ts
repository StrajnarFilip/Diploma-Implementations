import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/rest-api/api.service';

@Component({
  selector: 'app-new-hyperlink',
  templateUrl: './new-hyperlink.component.html',
  styleUrls: ['./new-hyperlink.component.scss']
})
export class NewHyperlinkComponent implements OnInit {
  @Input()
  postId?: number
  @Output()
  addNodeEvent = new EventEmitter<string>();

  linkText?: string
  linkHref?: string
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.postId && this.linkHref && this.linkText) {
      this.api.AddSegment({
        postIdpost: this.postId,
        type: "a",
        text: this.linkText,
        source: this.linkHref
      })
        .subscribe(response => {
          this.addNodeEvent.emit("a")
        })
    }
  }
}
