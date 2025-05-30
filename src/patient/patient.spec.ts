import { Test, TestingModule } from '@nestjs/testing';
import { Patient } from './patient.service.ts';

describe('Patient', () => {
  let provider: Patient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Patient],
    }).compile();

    provider = module.get<Patient>(Patient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
