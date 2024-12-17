'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TestHeader } from './test/TestHeader';
import { AvailableTests } from './test/AvailableTests';
import { TestReports } from './test/TestReports';
import { TestReport } from '@/types/test';
import { fetchTestReports, runTest, startCypress } from '@/lib/test-service';

export default function TestDashboard() {
  const [reports, setReports] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchReports = async () => {
    try {
      const data = await fetchTestReports();
      setReports(data);
    } catch (error) {
      toast.error('Failed to fetch test reports');
    }
  };

  useEffect(() => {
    handleFetchReports();
  }, []);

  const handleRunTest = async (testFile: string) => {
    setLoading(true);
    try {
      const result = await runTest(testFile);
      toast.success(result.message || 'Test execution started');
      // Wait a bit longer to ensure the test has time to complete
      setTimeout(handleFetchReports, 8000);
    } catch (error) {
      toast.error('Failed to execute test');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCypress = async () => {
    try {
      const result = await startCypress();
      toast.success(result.message || 'Cypress started successfully');
    } catch (error) {
      toast.error('Failed to start Cypress');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <TestHeader
        onRefresh={handleFetchReports}
        onStartCypress={handleStartCypress}
      />
      <div className="grid gap-6">
        <AvailableTests onRunTest={handleRunTest} loading={loading} />
        <TestReports reports={reports} />
      </div>
    </div>
  );
}