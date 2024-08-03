import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TreatmentsController', () => {
  let controller: TreatmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentsController],
      providers: [TreatmentsService, PrismaService],
    }).compile();

    controller = module.get<TreatmentsController>(TreatmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
