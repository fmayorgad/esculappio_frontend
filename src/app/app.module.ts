import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';

import { DefaultInterceptor } from '@core';
import { StartupService } from '@core';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { MatPaginatorIntl } from '@angular/material';

import {GlobalsUser} from '../assets/data/globals';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items por página';
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página anterior';
  lastPageLabel = 'Última página';
  firstPageLabel = 'Primer página';

  //configuracion general de tablas
  getRangeLabel = function(page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    RoutesModule,
    FormlyModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    GlobalsUser,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
