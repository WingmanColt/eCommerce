import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media/media.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    NgxDropzoneModule,
    SharedModule,
    NgbModule
  ]
})
export class MediaModule { }
