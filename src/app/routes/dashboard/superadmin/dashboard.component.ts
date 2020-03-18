import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSuperAdminComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef
  ) {

  }

  cards = {
    profiles: {
      title: 'Asignación de Permisos',
      icon: 'person_add',
      color: '#ee4e1c',
      subtitle: 'Asignar permisos a los perfiles existentes',
    },
    aud: {
      title: 'Auditoría',
      icon: 'playlist_add_check',
      color: '#f7555c',
      subtitle: 'Activar/desactivar auditoria de módulos',
    },
  };
  subtitle = '';
  ngOnInit() { }
}
