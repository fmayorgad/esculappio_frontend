import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter, } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsUser } from '../../../assets/data/globals'
export interface Tag {
  color: string; // Background Color
  value: string;
}

export interface ChildrenItem {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: ChildrenItem[];
  icon: string;
}

export interface Menu {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: Tag;
  badge?: Tag;
  children?: ChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // private readonly router: Router;
  constructor(
    private globals: GlobalsUser,
  ) {
    console.log("comprobando que existe local")
    if (localStorage.getItem('currentUser')) {
    this.getAll();
    }

  }


  // const router = new Router();
  private menu: Menu[] = [];

  getAll(): Menu[] {
    console.log("creando menu desde login")
    let localvariable: any = JSON.parse(localStorage.getItem('currentUser'));

    if (localStorage.getItem('currentUser')) {

      const localuser = JSON.parse(localStorage.getItem('currentUser'));
      const helper = new JwtHelperService();
      localvariable = localvariable.token;
      let decodedToken = helper.decodeToken(localvariable);
      const menucopy = [];
      const t12 = this.menu;

      if (!decodedToken) {
        //this.router.navigate(['/']);
      }

      // Filtering menu
      // se hace asi por ahora porque no esta el valor en el endpoint

      // se recorre el menu y se elimina lo que no se encuentre en el token
      let i1 = 0;
      let incomingmenu = decodedToken.menus;

      // Se realiza el proceso con Objetos y no con arrays para reutilizar dichos onbjetos en la validación de permisos como crear, ver eliminar etc,
      // y que no sea necesario filtrar un array (usando una funcion especifica para dicho proceso) y validar si mostrar o no la opción

      // converción del menu del token
      const tokenmenu = {};
      for (const i of incomingmenu) {
        tokenmenu[i.name] = {};
        tokenmenu[i.name].name = i.name;
        if (i.submenus.length === 0) {
          tokenmenu[i.name].permissions = i.permissions;
        }
        if (i.submenus.length > 0) {
          for (const i2 of i.submenus) {
            if (!tokenmenu[i.name].children) {
              tokenmenu[i.name].children = {};
              tokenmenu[i.name].children[i2.name] = {};
              tokenmenu[i.name].children[i2.name].permissions = i2.permissions;
            } else {
              tokenmenu[i.name].children[i2.name] = {};
              tokenmenu[i.name].children[i2.name].permissions = i2.permissions;
            }
          }
        }
      }

      // conversion del menu de la app
      const appmenu = {}
      for (const i of this.menu) {
        appmenu[i.state] = {};
        appmenu[i.state].name = i.name;
        appmenu[i.state].state = i.state;
        appmenu[i.state].type = i.type;
        appmenu[i.state].icon = i.icon;

        if (i.children) {
          for (let i2 of i.children) {
            if (!appmenu[i.state].children) {
              appmenu[i.state].children = {};
              appmenu[i.state].children[i2.state] = {};
              appmenu[i.state].children[i2.state].state = i2.state;
              appmenu[i.state].children[i2.state].name = i2.name;
              appmenu[i.state].children[i2.state].type = i2.type;
              appmenu[i.state].children[i2.state].icon = i2.icon;

            } else {
              appmenu[i.state].children[i2.state] = {};
              appmenu[i.state].children[i2.state].state = i2.state;
              appmenu[i.state].children[i2.state].name = i2.name;
              appmenu[i.state].children[i2.state].type = i2.type;
              appmenu[i.state].children[i2.state].icon = i2.icon;
            }
          }
        }
      }
      // se recorre el array de la app y se compara con el array del token, para crear el menu a pintar
      // tslint:disable-next-line: forin

      const finalmenu = [];

      // tslint:disable-next-line: forin
      for (const i in appmenu) {
        if (tokenmenu[i]) {
          let tmp = {
            icon: appmenu[i].icon,
            state: appmenu[i].state,
            type: appmenu[i].type,
            name: appmenu[i].name
          };

          // se filtran ahora los submenus
          if (appmenu[i].children) {
            let tmp2 = []
            // se recorren todos los children del token y se pasan al menu final desde el menu app 
            // (si existe en el token, debe exizstir en el menu app, pues este ultimo tiene a todos)
            // tslint:disable-next-line: forin
            for (const i2 in tokenmenu[i].children) {
              tmp2.push(appmenu[i].children[i2])
            }
            tmp['children'] = tmp2;
          }

          finalmenu.push(tmp);
        }
      }

      this.globals.tree = finalmenu;
      this.globals.nav = tokenmenu;
      return finalmenu;

    }
    else{
      return [];
    }
  }

  set(menu: Menu[]): Menu[] {
    this.menu = this.menu.concat(menu);
    return this.menu;
  }

  add(menu: Menu) {
    this.menu.push(menu);
  }

  getMenuItemName(stateArr: string[]): string {
    return this.getMenuLevel(stateArr)[stateArr.length - 1];
  }

  // TODO:
  getMenuLevel(stateArr: string[]): string[] {
    const tmpArr = [];
    this.menu.map(item => {
      if (item.state === stateArr[0]) {
        tmpArr.push(item.name);
        // Level1
        if (item.children && item.children.length) {
          item.children.forEach(itemlvl1 => {
            if (stateArr[1] && itemlvl1.state === stateArr[1]) {
              tmpArr.push(itemlvl1.name);
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (stateArr[2] && itemlvl2.state === stateArr[2]) {
                    tmpArr.push(itemlvl2.name);
                  }
                });
              }
            } else if (stateArr[1]) {
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (itemlvl2.state === stateArr[1]) {
                    tmpArr.push(itemlvl1.name, itemlvl2.name);
                  }
                });
              }
            }
          });
        }
      }
    });
    return tmpArr;
  }

  createAppNavigation() {
    console.log(this.menu);
    return "fabio";
  }
}
