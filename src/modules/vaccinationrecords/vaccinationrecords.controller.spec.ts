import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationrecordsController } from './vaccinationrecords.controller';
import { VaccinationrecordsService } from './vaccinationrecords.service';

describe('VaccinationrecordsController', () => {
  let controller: VaccinationrecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationrecordsController],
      providers: [VaccinationrecordsService],
    }).compile();

    controller = module.get<VaccinationrecordsController>(VaccinationrecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
