import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { PatientsService } from '../patients.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientModel } from '../../../shared/models/patient.model';
import { PatientTypeEnum } from '../../../shared/models/enums/patient-type.enum';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnModel } from '../../../shared/table/table.model';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
  templateUrl: './detail.component.html'
})
export class PatientDetailComponent {

  patientFormGroup: FormGroup;
  patientTypes = Object.keys(PatientTypeEnum)
                       .filter(type => isNaN(Number(type)))
                       .map((type, index) => ({
                         label: type,
                         value: index
                        }))
  formWasValidated = false;

  patient = new PatientModel()

  appointmentsColumns: TableColumnModel[] = [{
    key: '_id',
    label: 'ID'
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
  }]
  unpaidBill = 0

  @ViewChild(TableComponent) table: TableComponent

  constructor(private patientService: PatientsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {

    this.patient = new PatientModel();

    if (!!activatedRoute.snapshot.data.patient) {
      this.patient = activatedRoute.snapshot.data.patient;
    }
    this.patientFormGroup = formBuilder.group({
      name: new FormControl(this.patient.name),
      type: new FormControl(this.patient.type),
      contactInfo: formBuilder.group({
        name: new FormControl(this.patient.contactInfo?.name || ''),
        phone: new FormControl(this.patient.contactInfo?.phone || ''),
      }),
      unpaidBills: new FormControl(this.patient.unpaidBills)
    })

    this.onAppointmentsLoaded = this.onAppointmentsLoaded.bind(this);
  }

  save() {
    this.formWasValidated = true;
    this.patient = Object.assign(this.patient ,this.patientFormGroup.value)
    if (!this.patientFormGroup.invalid) {
      this.patientFormGroup.disable()
      this.patientService.upsert(this.patient).toPromise().then((response: PatientModel) => {
        this.toastrService.success('Patient Saved')
        if (!!this.patient._id) {
          this.router.navigateByUrl(`/patients/${response._id}`)
        }
      }).catch(error => {
        this.toastrService.error('Error saving patient details.')
      }).then(() => {
        this.formWasValidated = true;
        this.patientFormGroup.enable()
      })
    }
  }

  back(event) {
    event.stopPropagation();
    event.preventDefault()
    this.router.navigateByUrl('/patients')
  }

  delete(event) {
    event.stopPropagation();
    event.preventDefault()
    const confirmation = confirm('Are you sure you want to delete this patient?')
    if (confirmation) {
      this.patientService.delete(this.patient._id).then(response => {
        this.toastrService.success('Patient deleted')
        this.router.navigateByUrl('/patients')
      })
    }
  }

  createAppointment() {
    this.router.navigate(['patients', this.patient._id, 'appointments','new'])
  }

  onAppointmentsLoaded(skip, limit) {
    return this.patientService.getPatientAppointments(skip, limit, this.patient._id)
  }

  openRow(event) {
    this.router.navigate(['patients',this.patient._id,'appointments',event._id])
  }
}
