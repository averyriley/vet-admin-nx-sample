import { Component } from '@angular/core';
import { MasterLayoutService } from './master.service';

@Component({
  templateUrl: './master.component.html',
  selector: 'vet-admin-master-layout',
  styleUrls: ['./master.component.scss'],
  providers: [MasterLayoutService]
})
export class MasterLayoutComponent {
  constructor(private service: MasterLayoutService) {
  }
}
