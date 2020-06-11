import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { ChartOptions, Chart, ChartDataSets } from 'chart.js';
import { AdminUsersService } from '@services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardSuperAdminComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private adminUsersService: AdminUsersService
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
      title: 'Pacientes',
      icon: 'question_answer',
      color: '#f7555c',
      subtitle: 'Pendientes por completar procedimiento y en tratamiento',
    },
  };
  subtitle = '';


  mainChart: Chart;
  mainChartbars: Chart;
  lineChartData: ChartDataSets[] = [];

  mainChart2: Chart;
  mainChartbars2: Chart;
  lineChartData2: ChartDataSets[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    legend: { display: false },
    title: {
      display: true,
      text: 'Estado de los pacientes'
    }
  };

  lineChartOptions2: ChartOptions = {
    responsive: true,
    legend: { display: false },
    title: {
      display: true,
      text: 'Por organo'
    }
  };


  canvasbars: any;
  ctxbars: any;
  lineChartLabels = [];

  canvasbars2: any;
  ctxbars2: any;
  lineChartLabels2 = [];


  getuser() {

    let d = 0;
    let di = 0;
    let t = 0;

    this.adminUsersService.getPacients().subscribe(
      data => {
        console.log(data);

        let mama = 0;
        let estomago = 0;
        let colo = 0;
        let piel = 0;
        let tiroide = 0;
        let sarcoma = 0;
        let esofago = 0;
        let melanoma = 0;

        for (let p of data) {
          console.log(p)
          for (let mp of p.medicalProcedures) {

            console.log(mp)
            if (mp.state === 1) {
              d++
            }

            if (mp.state === 2) {
              di++
            }

            if (mp.state === 3) {
              t++
            }

            if (mp.organId === 1) {
              mama++
            }
            if (mp.organId === 2) {
              estomago++
            }
            if (mp.organId === 3) {
              colo++
            }
            if (mp.organId === 4) {
              piel++
            }
            if (mp.organId === 5) {
              tiroide++
            }
            if (mp.organId === 6) {
              sarcoma++
            }

            if (mp.organId === 7) {
              esofago++
            }

            if (mp.organId === 8) {
              melanoma++
            }

          }
        }



        this.canvasbars = document.getElementById('myChartbars');
        console.log(this.canvasbars)
        if (this.canvasbars !== undefined && this.canvasbars !== null) {
          this.canvasbars = document.getElementById('myChartbars');

          this.ctxbars = this.canvasbars.getContext('2d');
          this.mainChartbars = new Chart(this.ctxbars, {
            type: 'bar',
            data: {
              labels: ["Pendientes de documento", 'Pendientes de diagnostico', 'En tratamiento'],//this.lineChartLabels,
              datasets: [
                {
                  label: "Total de pacientes",
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                  data: [d, di, t]
                }
              ] // this.lineChartData,
            },
            options: this.lineChartOptions
          });
        }




        this.canvasbars2 = document.getElementById('myChartbars2');
        console.log(this.canvasbars)
        if (this.canvasbars2 !== undefined && this.canvasbars2 !== null) {
          this.canvasbars2 = document.getElementById('myChartbars2');

          this.ctxbars2 = this.canvasbars2.getContext('2d');
          this.mainChartbars2 = new Chart(this.ctxbars2, {
            type: 'bar',
            data: {
              labels: ["Máma", 'Colon-recto','Estomago-Esofago',  'Piel y tej. blandos', 'Tiroide', 'Sarcoma', 'Esofago', 'Melanoma'],//this.lineChartLabels,
              datasets: [
                {
                  label: "Total de pacientes activos",
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", 'tomato', 'blue'],
                  data: [mama,
                   colo, 
                   estomago,                 
                    piel,
                    tiroide,
                    sarcoma,
                    esofago,
                    melanoma]
                }
              ] // this.lineChartData,
            },
            options: this.lineChartOptions2
          });
        }



        this.cdr.detectChanges();


      },
      error => {
      });

    /*
        this.adminUsersService.getPendingMedicalProcedures().subscribe(
          data => {
    
            console.log(data);
            // se filtran los tipos de archivo biopsia e imagenes: si existe por lo menos uno de cada uno, ya esta listo para diagnostico.
            let pendingFiles = data.filter(p => {
              return p.state === 1;
            })
    
            let pendingDiagnosis = data.filter(p => {
              return p.state === 2;
            })
    
    
          },
          error => {
          }); */




  }

  ngOnInit() {

    this.getuser();
  }
}
