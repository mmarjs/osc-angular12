import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { API_ENVIRONMENT } from "@ocean/api/shared";
import { ApiStateTestModule } from "@ocean/api/state";
import { InternationalizationModule, Locale } from "@ocean/internationalization";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
  ],
})
export class TestModule { }


@NgModule({
  imports: [
    ApiStateTestModule.forParent(),
    InternationalizationModule.forRoot({ locale_id: Locale.EN }),
    StoreModule.forRoot({}),
  ],
  exports: [
    ApiStateTestModule,
    InternationalizationModule,
    StoreModule,
  ],
  providers: [ {
    provide: API_ENVIRONMENT,  // That's the token we defined previously
    useValue: {
      api: {
        baseURL: 'http://localhost:3000'
      },
      webURL: 'http://localhost:3000'
    },  // That's the actual service itself
  }]
})
export class TestStoreEnvModule { }

@NgModule({
  exports: [
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatNativeDateModule
  ],
})
export class TestMatModule { }
