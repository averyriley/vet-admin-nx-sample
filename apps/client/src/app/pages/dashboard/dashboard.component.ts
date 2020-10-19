import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private dashboardService: DashboardService) { }
}
