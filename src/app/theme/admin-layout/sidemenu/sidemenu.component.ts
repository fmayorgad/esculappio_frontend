import { Component, Input } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menus;

  constructor(private menuService: MenuService) {
    this.menus =  this.menuService.getAll();
    console.log(this.menus);
  }

  // Delete empty value in array
  filterStates(states: string[]) {
    return states.filter(item => item && item.trim());
  }
}
