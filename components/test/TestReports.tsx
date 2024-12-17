'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { TestReport } from '@/types/test';
import { Badge } from '@/components/ui/badge';

interface TestReportsProps {
  reports: TestReport[];
}

export function TestReports({ reports }: TestReportsProps) {
  const getTestStatus = (content: string) => {
    const failuresMatch = content.match(/failures="(\d+)"/);
    const testsMatch = content.match(/tests="(\d+)"/);
    
    return {
      failures: failuresMatch ? parseInt(failuresMatch[1]) : 0,
      total: testsMatch ? parseInt(testsMatch[1]) : 0,
    };
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Test Reports</h2>
      {reports.length === 0 ? (
        <div className="text-center p-4 text-muted-foreground">
          No test reports available
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Results</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => {
              const status = getTestStatus(report.content);
              const passed = status.failures === 0;
              
              return (
                <TableRow key={report.filename}>
                  <TableCell className="font-medium">{report.filename}</TableCell>
                  <TableCell>{format(new Date(report.timestamp), 'PPpp')}</TableCell>
                  <TableCell>
                    {status.total - status.failures}/{status.total} passed
                  </TableCell>
                  <TableCell>
                    <Badge variant={passed ? "success" : "destructive"}>
                      {passed ? 'Passed' : 'Failed'}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}