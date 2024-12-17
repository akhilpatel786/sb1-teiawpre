'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AvailableTestsProps {
  onRunTest: (testFile: string) => void;
  loading: boolean;
}

export function AvailableTests({ onRunTest, loading }: AvailableTestsProps) {
  const [tests, setTests] = useState<string[]>([]);
  const [loadingTests, setLoadingTests] = useState(true);

  useEffect(() => {
    fetchAvailableTests();
  }, []);

  const fetchAvailableTests = async () => {
    try {
      const response = await fetch('/api/tests/available');
      const data = await response.json();
      setTests(data.tests || []);
    } catch (error) {
      toast.error('Failed to fetch available tests');
    } finally {
      setLoadingTests(false);
    }
  };

  const formatTestName = (filename: string) => {
    return filename
      .replace('.cy.ts', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loadingTests) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Tests</h2>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Tests</h2>
      <div className="grid gap-4">
        {tests.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            No tests available
          </div>
        ) : (
          tests.map((test) => (
            <div
              key={test}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center gap-4">
                <FileText className="h-6 w-6" />
                <span className="font-medium">{formatTestName(test)}</span>
              </div>
              <Button
                onClick={() => onRunTest(test)}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                Run Test
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}