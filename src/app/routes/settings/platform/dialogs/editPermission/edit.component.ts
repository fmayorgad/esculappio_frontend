import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService, ConfigurationsService } from '../../../../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-banks-dialogs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditPermissionsDialogsEditComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditPermissionsDialogsEditComponent>,
    public configService: ConfigurationsService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }
  data = this.incomingdata;
  title = this.incomingdata.name;
  icon = 'playlist_add_check';
  color = '#4caf50';
  subtitle = 'Editando permisos';

  isLoading = true;

  menus;
  permissions;
  permissionprofile;

  iterabledraw = {};
  iterabledata = {};

  getPermissions() {
    this.globalService.getPermissions()
      .subscribe(
        response => {
          this.permissions = response;
          this.getPermissionsProfile();
        },
        error => {
          this.dialogRef.close({ state: 0, message: "No se pudo realizar la acción. Intenta de más tarde.." });
        },
      );
  }

  getPermissionsProfile() {
    this.globalService.getPermissionsByProfile(this.incomingdata.id)
      .subscribe(
        response => {
          this.permissionprofile = response['data'];

          // construcción del objeto iterable con datos actuales en db
          for (const menu of this.permissionprofile) {
            if (menu.menuId in this.iterabledata) {
              this.iterabledata[menu.menuId].push(menu.permissionId);
            } else {
              this.iterabledata[menu.menuId] = [];
              this.iterabledata[menu.menuId].push(menu.permissionId);
            }
          }

          // iterable a pintar
          for (const menu of this.menus) {

            if (menu.isFather === 0) {

              this.iterabledraw[menu.id] = {};
              this.iterabledraw[menu.id].name = menu.name;
              this.iterabledraw[menu.id].permissions = {};
              for (const permission of this.permissions) {
                this.iterabledraw[menu.id].permissions[permission.id] = (this.iterabledata[menu.id] && this.iterabledata[menu.id].includes(permission.id)) ? true : false;
              }
            } else {
              for (const submenu of menu.submenus) {
                this.iterabledraw[submenu.id] = {};
                this.iterabledraw[submenu.id].name = submenu.name;
                this.iterabledraw[submenu.id].permissions = {};
                this.iterabledraw[submenu.id].father = submenu.father;
                this.iterabledraw[submenu.id].fatherName = menu.name;
                for (const permission of this.permissions) {
                  this.iterabledraw[submenu.id].permissions[permission.id] = (this.iterabledata[submenu.id] && this.iterabledata[submenu.id].includes(permission.id)) ? true : false;
                }
              }
            }
          }
          this.isLoading = false;
        },
        error => {
          this.dialogRef.close({ state: 0, message: " No se pudo realizar la acción. Intenta de más tarde.." });
        },
      );
  }

  getMenus() {
    this.globalService.getMenus()
      .subscribe(
        response => {
          this.menus = response;
          this.getPermissions();
        },
        error => {
          this.dialogRef.close({ state: 0, message: "No se pudo realizar la acción. Intenta de más tarde.." });
        },
      );
  }

  editprofile() {
    let sendobj = [];
    let pushedfathers = [];
    // creación de objeto de envío
    // tslint:disable-next-line: forin
    for (const menu in this.iterabledraw) {
      // tslint:disable-next-line: forin
      for (const permission in this.iterabledraw[menu].permissions) {
        // se agregan solo los valores en true
        if (this.iterabledraw[menu].permissions[permission] === true) {
          sendobj.push({ profileId: this.incomingdata.id, menuId: parseInt(menu), permissionId: parseInt(permission) })
        }
        // si tiene father, agrego el father con el permiso ver (solo si uno de los valores tiene un true; sio tiene uno de los permisos dentro del modulo)
        if (
          ('father' in this.iterabledraw[menu]) && // que tenga father
          parseInt(permission) === 1 && // si tiene father y tiene el permiso VER en TRUE se agrega el father al objeto a guardar
          this.iterabledraw[menu].permissions[permission] === true && // y tiene el permiso de ver
          !pushedfathers.includes(this.iterabledraw[menu].father)
        ) {
          sendobj.push({ profileId: this.incomingdata.id, menuId: this.iterabledraw[menu].father, permissionId: parseInt(permission) });
          pushedfathers.push(this.iterabledraw[menu].father);
        }
      }
    }

    this.configService.savePermissions(sendobj, this.incomingdata.id).subscribe(
      response => {
        this.dialogRef.close({
          state: 1,
          message: 'Permisos editados satisfactoriamente. Tendrá efecto cuando el usuario vuelva a iniciar sesión.'
        });
      },
      error => {
        this._snackBar.open('Error al ejecutar la acción. Intentalo de nuevo más tarde.', 'Aceptar', {
          duration: 3000,
        });
      },
    );

  }

  ngOnInit() {
    this.getMenus();
  }

}
