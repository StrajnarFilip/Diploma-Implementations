import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../models/Image';
import { Segment } from '../../models/Segment';
import { ApiService } from '../../rest-api/api.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

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
