import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BasicLayout, LayoutComponentsModule } from '@ocean/layout';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { documentsFeatureKey, reducer } from './state';
import { DocumentEffects } from './state/effects';
import { SignDocumentComponent } from './components/sign-document/sign-document.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DialogsModule } from '@ocean/dialogs';

export const ROUTES = {
  LIST: '',
  BY_JOB_ID: 'job/:jobId',
  SIGN_DOCUMENT: 'sign/:documentId',
};

@NgModule({
  imports: [
    CommonModule,
    LayoutComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BasicLayout,
        children: [
          { path: ROUTES.LIST, component: DocumentListComponent },
          { path: ROUTES.BY_JOB_ID, component: DocumentListComponent },
          { path: ROUTES.SIGN_DOCUMENT, component: SignDocumentComponent },
        ],
      },
    ]),
    TranslateModule,
    StoreModule.forFeature(documentsFeatureKey, reducer),
    EffectsModule.forFeature([DocumentEffects]),

    MatButtonModule,
    MatProgressSpinnerModule,
    DialogsModule,
  ],
  declarations: [DocumentListComponent, SignDocumentComponent],
})
export class DocumentsModule {
  static forChild() {
    return [
      StoreModule.forFeature(documentsFeatureKey, reducer),
      EffectsModule.forFeature([DocumentEffects]),
    ];
  }
}
