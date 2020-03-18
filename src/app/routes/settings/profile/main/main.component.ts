import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationsService } from '../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-banks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class ProfileMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public configurationsService: ConfigurationsService
    ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  cards = {
    profiles: {
      title: 'Asignación de Permisos',
      icon: 'person_add',
      color: '#ee4e1c',
      subtitle: 'Asignar permisos a los perfiles existentes',
    },
    aud: {
      title: 'Editar datos',
      icon: 'person_pin',
      color: '#f7555c',
      subtitle: 'Editar datos personales',
    },
  };

  profile;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  userdata = JSON.parse(localStorage.getItem('currentUser')).user;

  profileFormGroup = new FormGroup(
    {
      name: new FormControl(this.userdata.name, [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
      surname: new FormControl(this.userdata.surname, [Validators.maxLength(40), Validators.required, Validators.minLength(6)]),
      phone: new FormControl(this.userdata.phone, [Validators.maxLength(30), Validators.required, Validators.minLength(7)]),
      cellphone: new FormControl(this.userdata.cellphone, [Validators.maxLength(30), Validators.required, Validators.minLength(10)]),
    }
  );

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  getAllProfiles() {

  }

  applyFilter() {

  }

  editProfile() {

    let obj = {
      name: this.profileFormGroup.value.name,
      surname: this.profileFormGroup.value.surname,
      phone: this.profileFormGroup.value.phone,
      cellphone: this.profileFormGroup.value.cellphone,
    };

    this.configurationsService.saveProfile(obj).subscribe(
      data => {
        this._snackBar.open('Perfil editado. Los cambios serán visibles en el próximo inicio de sesión.', 'Aceptar', {
					duration: 3000,
				});
      },
      error => {
      });
  }

  ngOnInit() {
    console.log(this.userdata)
  }
}
