import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { PatientsModel } from '../../models/patients.model';
import { PaginationDTO } from '../../models/pagination.dto';

@Controller('patients')
@ApiTags('PATIENTS')
export class PatientsController {
  constructor(private patientsService: PatientsService) {
  }

  @Post('page')
  async getPatients(@Body() page: PaginationDTO) {
    return await this.patientsService.getPatients(page);
  }

  @Post()
  async savePatient(@Body() patientModel: PatientsModel) {
    const patient = await this.patientsService.upsertPatient(patientModel)
    return patient;
  }

  @Get(':id')
  async getPatientById(@Param('id') id: string) {
    return await this.patientsService.getById(id)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.patientsService.deleteById(id)
  }
}
