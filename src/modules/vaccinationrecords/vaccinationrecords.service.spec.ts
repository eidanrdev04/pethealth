import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationrecordsService } from './vaccinationrecords.service';

describe('VaccinationrecordsService', () => {
  let service: VaccinationrecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationrecordsService],
    }).compile();

    service = module.get<VaccinationrecordsService>(VaccinationrecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
