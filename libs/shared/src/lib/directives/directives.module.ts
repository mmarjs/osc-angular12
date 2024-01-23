import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BindFormDirective } from './bind-form.directive';
import { DetectKeyDirective } from './detect-key.directive';
import { DisableCopyDirective } from './disable-copy.directive';
import { DropZoneDirective } from './drop-zone.directive';
import { LinkActiveDirective } from './link-active.directive';
import { LinkDirective, LinkHrefDirective } from './link.directive';
import { NumberOnlyDirective } from './number-only.directive';
import { TrimInputDirective } from './trim-input.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    BindFormDirective,
    DetectKeyDirective,
    DropZoneDirective,
    LinkActiveDirective,
    LinkDirective,
    LinkHrefDirective,
    NumberOnlyDirective,
    DisableCopyDirective,
    TrimInputDirective
  ],
  exports: [
    BindFormDirective,
    DetectKeyDirective,
    DropZoneDirective,
    LinkActiveDirective,
    LinkDirective,
    LinkHrefDirective,
    NumberOnlyDirective,
    DisableCopyDirective,
    TrimInputDirective
  ]
})
export class SharedDirectivesModule { }
