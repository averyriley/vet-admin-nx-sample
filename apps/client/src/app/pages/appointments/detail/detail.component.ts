import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientModel } from '../../../shared/models/patient.model';
import { PatientTypeEnum } from '../../../shared/models/enums/patient-type.enum';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { AppointmentModel } from '../../../shared/models/appointment.model';

@Component({
  templateUrl: './detail.component.html'
})
export class AppointmentDetails {


  formWasValidated = false;
  appointmentFormGroup: FormGroup;
  startTime: number
  endTime: number
  minDate: { year: number, month: number, day: number }
  patientId: string

  appointment: AppointmentModel = new AppointmentModel();

  constructor(private appointmentsService: AppointmentsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
    const schedule = {
      endTime: {
        hour: 0,
        minute: 0
      },
      startTime: {
        hour: 0,
        minute: 0
      },
      date: {
        year: 0,
        day: 0,
        month: 0
      }
    }
    if (activatedRoute.snapshot.data.appointment) {
      this.appointment = activatedRoute.snapshot.data.appointment
      const date = new Date(this.appointment.date)
      schedule.date = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }

      date.setMilliseconds(this.appointment.startTime)
      schedule.startTime = {
        hour: date.getHours(),
        minute: date.getMinutes()
      }

      date.setMilliseconds(this.appointment.endTime - this.appointment.startTime)
      schedule.endTime = {
        hour: date.getHours(),
        minute: date.getMinutes()
      }

    }
    this.patientId = this.appointment._id || activatedRoute.snapshot.params.id

    this.appointmentFormGroup = formBuilder.group({
      date: new FormControl(schedule.date),
      startTime: new FormControl(schedule.startTime),
      endTime: new FormControl(schedule.endTime),
      description: new FormControl(this.appointment.description),
      isPaid: new FormControl(this.appointment.isPaid || false),
      fee: new FormControl(this.appointment.fee || 0),
      _id: new FormControl(this.appointment._id)
    })
    const dateToday = new Date();
    this.minDate = {
      year: dateToday.getFullYear(),
      month: dateToday.getMonth() + 1,
      day: dateToday.getDate()
    }
  }

  save($event) {
    $event.stopPropagation()
    $event.preventDefault()
    this.formWasValidated = true

    if (!this.appointmentFormGroup.invalid) {

      const { date, startTime, endTime } = this.appointmentFormGroup.value

      const dDate = new Date(date.year, date.month - 1, date.day)
      const eTime = new Date(dDate)
      const sTime = new Date(dDate)

      if (startTime) {
        sTime.setHours(startTime.hour, startTime.minute)
      }

      if (endTime) {
        eTime.setHours(endTime.hour, endTime.minute)
      }

      const object = Object.assign({}, this.appointmentFormGroup.value, {
        endTime: eTime.getTime() - dDate.getTime(),
        startTime: sTime.getTime() - dDate.getTime(),
        date: dDate.getTime()
      }) as AppointmentModel;

      if (this.patientId) {
        object.patientId = this.patientId
      }

      this.appointmentsService.upsertAppointment(object).toPromise().then(response => {
        this.toastrService.success('Appointment Updated')
        history.back()
      })
    }

  }

  back($event) {
    $event.stopPropagation();
    $event.preventDefault();
    history.back()
  }

  delete($event) {
    $event.stopPropagation();
    $event.preventDefault();
    const confirmation = confirm('Are you sure you want to delete this appointment?')
    if (confirmation) {
      this.appointmentsService.deleteById(this.appointment._id).toPromise().then(() => {
        this.toastrService.success('Appointment Deleted')
        history.back()
      })
    }
  }


}
