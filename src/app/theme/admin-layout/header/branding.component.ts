import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="#/">
      <img src="./assets/images/mainlogo.jpg" class="matero-branding-logo-expanded" alt="" />
      <span class="matero-branding-name">ESCULAPPIO</span>
    </a>
  `,
})
export class BrandingComponent {}
