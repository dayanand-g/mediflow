import { TrendingUp, Users, Clock } from 'lucide-react';

export const OVERVIEW_STATS = [
  { id: 1, label: 'Monthly Revenue', value: '$45,231', trend: '+12.5%', isPositive: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 2, label: 'New Patients', value: '342', trend: '+8.2%', isPositive: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 3, label: 'Avg Wait Time', value: '14 min', trend: '-2.4%', isPositive: true, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' }, // Decrease is good
];

export const DEMOGRAPHICS = [
  { id: 'd1', age: '0-18 Years', percentage: 15, color: 'bg-blue-200' },
  { id: 'd2', age: '19-35 Years', percentage: 35, color: 'bg-blue-400' },
  { id: 'd3', age: '36-50 Years', percentage: 28, color: 'bg-blue-600' },
  { id: 'd4', age: '51+ Years', percentage: 22, color: 'bg-blue-800' },
];

export const DEPARTMENTS = [
  { id: 'dep1', name: 'General Practice', patients: 1245, capacity: 85 },
  { id: 'dep2', name: 'Cardiology', patients: 432, capacity: 60 },
  { id: 'dep3', name: 'Orthopedics', patients: 312, capacity: 92 }, // High capacity = warning
  { id: 'dep4', name: 'Pediatrics', patients: 289, capacity: 45 },
];