import fs from 'fs/promises';
import path from 'path';

export async function findCypressTests() {
  const testDir = path.join(process.cwd(), 'cypress/e2e/api');
  try {
    const files = await fs.readdir(testDir);
    return files.filter(file => file.endsWith('.cy.ts'));
  } catch {
    return [];
  }
}

export async function getTestReports() {
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

export function parseTestName(filename: string) {
  return filename
    .replace('.cy.ts', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseTestResults(content: string) {
  const failuresMatch = content.match(/failures="(\d+)"/);
  const testsMatch = content.match(/tests="(\d+)"/);
  
  return {
    failures: failuresMatch ? parseInt(failuresMatch[1]) : 0,
    total: testsMatch ? parseInt(testsMatch[1]) : 0,
  };
}