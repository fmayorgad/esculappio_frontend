import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'nodata',
  templateUrl: './nodata.component.html',
  styleUrls: ['./nodata.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoDataComponent implements OnInit {

  @Input() nodatamessage = '';
  @Input() nodataheight = '';
  @Input() nodataimg = Math.floor((Math.random() * 3) + 1);
  constructor() {}

  ngOnInit() {
  }
}


