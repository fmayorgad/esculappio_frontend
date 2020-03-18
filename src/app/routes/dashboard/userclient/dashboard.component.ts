import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSchoolAdminComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef
  ) {

  }
  cards = {
    aud: {
      title: 'Sesión',
      icon: 'security',
      color: '#419445',
      subtitle: 'Último inicio de sesión',
    },
  };

  windowwith = window.innerWidth;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  ngOnInit() { }
}
