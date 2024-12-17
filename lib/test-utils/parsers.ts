import { TestStatus } from '@/types/test';

export function parseTestName(filename: string): string {
  return filename
    .replace('.cy.ts', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseTestResults(content: string): TestStatus {
  const failuresMatch = content.match(/failures="(\d+)"/);
  const testsMatch = content.match(/tests="(\d+)"/);
  
  return {
    failures: failuresMatch ? parseInt(failuresMatch[1]) : 0,
    total: testsMatch ? parseInt(testsMatch[1]) : 0,
  };
}