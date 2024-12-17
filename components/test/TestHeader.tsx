'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, PlayCircle } from 'lucide-react';

interface TestHeaderProps {
  onRefresh: () => void;
  onStartCypress: () => void;
}

export function TestHeader({ onRefresh, onStartCypress }: TestHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">API Test Dashboard</h1>
      <div className="flex gap-3">
        <Button
          onClick={onStartCypress}
          variant="default"
          className="flex items-center gap-2"
        >
          <PlayCircle className="h-4 w-4" />
          Start Cypress
        </Button>
        <Button
          onClick={onRefresh}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Reports
        </Button>
      </div>
    </div>
  );
}