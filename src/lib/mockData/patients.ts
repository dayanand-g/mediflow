export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: 'Stable' | 'Observation' | 'Critical';
  lastVisit: string;
}

export const mockPatients: Patient[] = [
  { id: 'PT-001', name: 'Eleanor Pena', age: 42, gender: 'Female', condition: 'Hypertension', status: 'Critical', lastVisit: 'Oct 12, 2023' },
  { id: 'PT-002', name: 'Cody Fisher', age: 28, gender: 'Male', condition: 'Post-Op Recovery', status: 'Observation', lastVisit: 'Oct 24, 2023' },
  { id: 'PT-003', name: 'Esther Howard', age: 65, gender: 'Female', condition: 'Cardiac Arrhythmia', status: 'Critical', lastVisit: 'Nov 01, 2023' },
  { id: 'PT-004', name: 'Cameron Williamson', age: 34, gender: 'Male', condition: 'Type 2 Diabetes', status: 'Stable', lastVisit: 'Nov 05, 2023' },
  { id: 'PT-005', name: 'Brooklyn Simmons', age: 19, gender: 'Female', condition: 'Asthma', status: 'Stable', lastVisit: 'Nov 10, 2023' },
  { id: 'PT-006', name: 'Leslie Alexander', age: 51, gender: 'Male', condition: 'Pneumonia', status: 'Observation', lastVisit: 'Nov 12, 2023' },
  { id: 'PT-007', name: 'Eleanor Pena', age: 42, gender: 'Female', condition: 'Hypertension', status: 'Stable', lastVisit: 'Oct 12, 2023' },
  { id: 'PT-008', name: 'Cody Fisher', age: 28, gender: 'Male', condition: 'Post-Op Recovery', status: 'Observation', lastVisit: 'Oct 24, 2023' },
  { id: 'PT-009', name: 'Esther Howard', age: 65, gender: 'Female', condition: 'Cardiac Arrhythmia', status: 'Critical', lastVisit: 'Nov 01, 2023' },
  { id: 'PT-010', name: 'Cameron Williamson', age: 34, gender: 'Male', condition: 'Type 2 Diabetes', status: 'Stable', lastVisit: 'Nov 05, 2023' },
  { id: 'PT-011', name: 'Brooklyn Simmons', age: 19, gender: 'Female', condition: 'Asthma', status: 'Stable', lastVisit: 'Nov 10, 2023' },
  { id: 'PT-012', name: 'Leslie Alexander', age: 51, gender: 'Male', condition: 'Pneumonia', status: 'Observation', lastVisit: 'Nov 12, 2023' },
  { id: 'PT-013', name: 'Eleanor Pena', age: 42, gender: 'Female', condition: 'Hypertension', status: 'Stable', lastVisit: 'Oct 12, 2023' },
  { id: 'PT-014', name: 'Cody Fisher', age: 28, gender: 'Male', condition: 'Post-Op Recovery', status: 'Observation', lastVisit: 'Oct 24, 2023' },
  { id: 'PT-015', name: 'Cody Fisher', age: 28, gender: 'Male', condition: 'Post-Op Recovery', status: 'Observation', lastVisit: 'Oct 24, 2023' }
];