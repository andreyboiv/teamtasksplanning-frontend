import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {RequestInterceptor} from "./auth/interceptor/request-interceptor.service";
import {TASK_URL_TOKEN} from "./business/services/TaskService";
import {CATEGORY_URL_TOKEN} from "./business/services/CategoryService";
import {PRIORITY_URL_TOKEN} from "./business/services/PriorityService";
import {STAT_URL_TOKEN} from "./business/services/StatService";
import {environment} from "../environments/environments";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},

    {
      provide: TASK_URL_TOKEN,
      useValue: environment.backendURL + '/task'
    },

    {
      provide: CATEGORY_URL_TOKEN,
      useValue: environment.backendURL + '/category'
    },


    {
      provide: PRIORITY_URL_TOKEN,
      useValue: environment.backendURL + '/priority'
    },


    {
      provide: STAT_URL_TOKEN,
      useValue: environment.backendURL + '/stat'
    }
  ]
};
