import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MenusRoutingModule } from './menus-routing.module';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListMenuComponent, CreateMenuComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class MenusModule { }
