import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Patient } from '../lib/mockData/patients';
import { mockPatients } from '../lib/mockData/patients';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Initial Fetch
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate load
      setPatients(mockPatients);
      setIsLoading(false);
    };
    fetchPatients();
  }, []);

  // 2. Add New Patient Logic
  const addPatient = useCallback((newPatient: Omit<Patient, 'id' | 'lastVisit'>) => {
    const newEntry: Patient = {
      ...newPatient,
      id: `PT-0${patients.length + 1}`, // Generate fake ID
      lastVisit: 'Just now'
    };
    // Add to top of the list in the patient data
    setPatients(prev => [newEntry, ...prev]);
  }, [patients.length]);

  const updatePatientStatus = useCallback(async (id: string, newStatus: Patient['status'], name: string) => {
    // Update UI instantly (Optimistic Update)
    setPatients(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));

    // If status is Critical, trigger the Push Notification!
    if (newStatus === 'Critical') {
      try {
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Urgent: Critical Status Update',
            body: `Patient ${name} has been moved to Critical condition. Immediate review required.`
          })
        });
      } catch (error) {
        console.error("Failed to trigger push notification", error);
      }
    }
  }, []);

  // 4. Search Filter Logic (Memoized for performance)
  const filteredPatients = useMemo(() => {
    return patients.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  return { 
    patients: filteredPatients, 
    isLoading, 
    searchQuery, 
    setSearchQuery,
    addPatient,
    updatePatientStatus
  };
};