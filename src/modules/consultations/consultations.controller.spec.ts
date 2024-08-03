import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationsController } from './consultations.controller';
import { ConsultationsService } from './consultations.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ConsultationsController', () => {
  let controller: ConsultationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationsController],
      providers: [ConsultationsService, PrismaService],
    }).compile();

    controller = module.get<ConsultationsController>(ConsultationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
