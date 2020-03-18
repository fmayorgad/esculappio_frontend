import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'bodycardtitle',
  templateUrl: './bodycardtitle.component.html',
  styleUrls: ['./bodycardtitle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BodycardtitleComponent implements OnInit {
  @Input() title = '';
  @Input() icon = '';
  @Input() subtitle = '';
  @Input() color = '';
  constructor() {}

  ngOnInit() {
  }

}

