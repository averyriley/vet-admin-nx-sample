import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    NgbPaginationModule,
    CommonModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {}
