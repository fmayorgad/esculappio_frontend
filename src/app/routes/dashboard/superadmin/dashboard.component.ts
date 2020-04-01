import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogContent} from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSuperAdminComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
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
      title: 'Consultas pendientes amigos mios',
      icon: 'question_answer',
      color: '#f7555c',
      subtitle: 'Pendientes por responder',
    },
  };
  subtitle = '';
  ngOnInit() { }
}
