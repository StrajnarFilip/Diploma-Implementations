import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  Segment } from 'src/app/models/Segment';
import { ApiService } from 'src/app/rest-api/api.service';

@Component({
  selector: 'app-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss']
})
export class HyperlinkComponent implements OnInit {

  @Input()
  segment?: Segment
  @Output()
  removeNodeEvent = new EventEmitter<string>();

  userRole?: string

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.UserInfo().subscribe(resposne => {
      this.userRole = resposne.role
    })
  }

  delete() {
    if (this.segment)
      this.api.DeleteSegment(this.segment.idsegment).subscribe(response => {
        this.removeNodeEvent.emit("deleted")
      })
  }

}
