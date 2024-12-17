import fs from 'fs/promises';
import path from 'path';
import { TestReport } from '@/types/test';

export async function findCypressTests(): Promise<string[]> {
  const testDir = path.join(process.cwd(), 'cypress/e2e/api');
  try {
    const files = await fs.readdir(testDir);
    return files.filter(file => file.endsWith('.cy.ts'));
  } catch {
    return [];
  }
}

export async function getTestReports(): Promise<TestReport[]> {
  const resultsDir = path.join(process.cwd(), 'cypress/results');
  
  try {
    await fs.access(resultsDir);
  } catch {
    await fs.mkdir(resultsDir, { recursive: true });
    return [];
  }

  const files = await fs.readdir(resultsDir);
  return Promise.all(
    files
      .filter(file => file.endsWith('.xml'))
      .map(async (file) => {
        const content = await fs.readFile(
          path.join(resultsDir, file),
          'utf-8'
        );
        return {
          filename: file,
          content,
          timestamp: (await fs.stat(path.join(resultsDir, file))).mtime,
        };
      })
  );
}