import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinationrecordDto } from './create-vaccinationrecord.dto';

export class UpdateVaccinationrecordDto extends PartialType(CreateVaccinationrecordDto) {}
