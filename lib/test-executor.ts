import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export interface TestExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
}

export async function executeTest(testFile: string): Promise<TestExecutionResult> {
  // Validate test file exists
  const testPath = path.join(process.cwd(), 'cypress/e2e/api', testFile);
  await fs.access(testPath);

  // Ensure results directory exists
  const resultsDir = path.join(process.cwd(), 'cypress/results');
  await fs.mkdir(resultsDir, { recursive: true });

  // Execute the test
  const command = `npx cypress run --spec "cypress/e2e/api/${testFile}" --reporter junit --reporter-options "mochaFile=cypress/results/results-[hash].xml"`;
  
  try {
    const { stdout, stderr } = await execAsync(command);
    return { success: true, stdout, stderr };
  } catch (error: any) {
    return {
      success: false,
      stdout: error.stdout || '',
      stderr: error.stderr || error.message,
    };
  }
}