import { Component, ViewChild } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import { TableColumnModel } from '../../shared/table/table.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../../shared/table/table.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {
  tableColumns: TableColumnModel[] = [{
    key: '_id',
    label: 'ID'
  }, {
    key: 'name',
    label: 'Name'
  }, {
    key: 'date',
    label: 'Date',
    isDate: true
  }, {
    key: 'startTime',
    label: 'Start',
    isTime: true
  }, {
    key: 'endTime',
    label: 'End',
    isTime: true
  }];

  searchDate: NgbDate;

  @ViewChild(TableComponent) table: TableComponent

  constructor(private appointmentsService: AppointmentsService,
              private router: Router) {
    this.onLoad = this.onLoad.bind(this)
  }

  onLoad(skip, limit) {
    const nDate = this.searchDate ? (new Date(this.searchDate.year,
        this.searchDate.month - 1,
        this.searchDate.day)) : null
    return this.appointmentsService.getAppointments(skip, limit, nDate?.getTime()).toPromise()
  }

  openRow(event) {
    this.router.navigateByUrl('/appointments/' + event._id)
  }

  onDateChange(date: NgbDate) {
    this.searchDate = date
    this.table.refresh()
  }
}
