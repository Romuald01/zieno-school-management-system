import { Test, TestingModule } from '@nestjs/testing';
import { AcademicTermsController } from './academic-terms.controller';

describe('AcademicTermsController', () => {
  let controller: AcademicTermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicTermsController],
    }).compile();

    controller = module.get<AcademicTermsController>(AcademicTermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
