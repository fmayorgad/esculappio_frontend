import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleGuard } from '../../../../helpers/role.guard';

@Component({
  selector: 'app-banks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class ProfileMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private adminUsersService: AdminUsersService,
    private roleGuard: RoleGuard
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  cards = {
    sign: {
      title: 'Firma',
      icon: 'edit',
      color: 'blue',
      subtitle: 'Editar firma de especialista',
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
      lastname: new FormControl(this.userdata.lastname, [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
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
      lastname: this.profileFormGroup.value.lastname,
      surname: this.profileFormGroup.value.surname,
      phone: this.profileFormGroup.value.phone,
      cellphone: this.profileFormGroup.value.cellphone,
    };

    this.adminUsersService.selfEdit(obj).subscribe(
      data => {
        this._snackBar.open('Perfil editado. Los cambios serán visibles en el próximo inicio de sesión.', 'Aceptar', {
          duration: 3000,
        });
      },
      error => {
      });
  }

  canview(permission) {
    return this.roleGuard.canview('configuracion,profile', permission);
  }

  fileToUpload: File = null;
  fileButton = false;

  uploadFile(e) {
    this.fileToUpload = e.target.files[0];

    if (this.fileToUpload !== undefined) {
      this.fileButton = false;
    } else {
      this.fileButton = true;
    }
    console.log(this.fileButton)

  }

  upload() {

    const fd = new FormData();

    

    fd.append('files', this.fileToUpload, this.fileToUpload.name);


    this.adminUsersService.uploadSign(fd).subscribe(data => {

      this.fileButton = true;
      this._snackBar.open('Archivo ' + this.fileToUpload.name + ' subido correctamente.', 'Aceptar', {
        duration: 3000,
        panelClass: 'snackbarSuccess'
      });
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  ngOnInit() {
    console.log(this.userdata)
  }
}
