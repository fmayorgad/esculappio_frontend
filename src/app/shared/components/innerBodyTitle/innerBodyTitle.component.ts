import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'innerBodyTitle',
  templateUrl: './innerBodyTitle.component.html',
  styleUrls: ['./innerBodyTitle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InnerBodyTitleComponent implements OnInit {
  @Input() title = '';
  @Input() icon = '';
  @Input() color = '';
  @Input() line = '';
  iconA;
  constructor() {
  }

  visibleIcon = true;

  ngOnInit() {
    this.visibleIcon = this.icon ? true : false;
  }

}

