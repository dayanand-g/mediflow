import { mockPatients } from '../lib/mockData/patients';
import type { Patient } from '../lib/mockData/patients';

export const getPatients = async (): Promise<Patient[]> => {
  // Simulating a 1.2-second network delay to show off the skeleton loaders
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return mockPatients;
};