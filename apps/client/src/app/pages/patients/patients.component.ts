import { Component, ViewChild } from '@angular/core';
import { PatientsService } from './patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnModel } from '../../shared/table/table.model';
import { PatientModel } from '../../shared/models/patient.model';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  templateUrl: './patients.component.html'
})
export class PatientsComponent{

  page = 1

  tableColumns: TableColumnModel[] = [{
    key: '_id',
    label: 'ID'
  },{
    key: 'name',
    label: 'Name'
  },{
    key: 'contactInfo.name',
    label: 'Contact'
  },{
    key: 'creation',
    label: 'Creation Date',
    isDate: true
  },{
    key: 'lastUpdated',
    label: 'Last Updated',
    isDate: true
  }]

  rows: PatientModel[] = []

  @ViewChild(TableComponent) table;

  constructor(public patientsService: PatientsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad(skip, limit) {
    return this.patientsService.getPatients(skip, limit).toPromise()
  }

  createPatient = async () => {
    await this.router.navigateByUrl('/patients/new')
  }

  openRow = async (row: PatientModel) => {
    await this.router.navigateByUrl('/patients/' + row._id)
  }
}
