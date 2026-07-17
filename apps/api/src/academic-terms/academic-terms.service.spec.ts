import { Test, TestingModule } from '@nestjs/testing';
import { AcademicTermsService } from './academic-terms.service';

describe('AcademicTermsService', () => {
  let service: AcademicTermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicTermsService],
    }).compile();

    service = module.get<AcademicTermsService>(AcademicTermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
