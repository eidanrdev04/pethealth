import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationrecordController } from './vaccinationrecords.controller';
import { VaccinationrecordService } from './vaccinationrecords.service';
import { PrismaService } from '../prisma/prisma.service';

describe('VaccinationrecordsController', () => {
  let controller: VaccinationrecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationrecordController],
      providers: [VaccinationrecordService, PrismaService],
    }).compile();

    controller = module.get<VaccinationrecordController>(VaccinationrecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
