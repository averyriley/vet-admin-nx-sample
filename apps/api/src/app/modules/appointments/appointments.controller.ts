import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDTO } from '../../models/pagination.dto';
import { AppointmentsService } from './appointments.service';
import { AppointmentModel } from '../../models/appointment.model';

@Controller('appointments')
@ApiTags('APPOINTMENTS')
export class AppointmentsController {

  constructor(private appointmentsService: AppointmentsService) {
  }

  @Post('by-patient/:id')
  async getAppointmentsByPatientId(@Param('id') id: string, @Body() page: PaginationDTO) {
    return await this.appointmentsService.getByPatientId(page, id);
  }

  @Post('page')
  async getAppointments(@Body() page: PaginationDTO, @Body('date') date: number) {
    return await this.appointmentsService.getAppointments(page, date);
  }

  @Post('')
  async upsertAppointment(@Body() appointment: AppointmentModel) {
    return await this.appointmentsService.upsert(appointment);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.appointmentsService.getById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.appointmentsService.deleteById(id);
  }
}
