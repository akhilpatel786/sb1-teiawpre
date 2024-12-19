import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getTestReports } from '@/lib/test-utils';

const execAsync = promisify(exec);
export const dynamic = "force-static";

export async function GET() {  
  try {
    const reports = await getTestReports();
    return NextResponse.json({ reports });
  } catch (error) {
    console.error('Error fetching test reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { testFile } = await request.json();     
    
    // Validate test file exists
    const testPath = path.join(process.cwd(), 'cypress/e2e/api', testFile);
    
    try {
      await fs.access(testPath);
    } catch {
      return NextResponse.json(
        { error: 'Test file not found' },
        { status: 404 }
      );
    }

    // Ensure results directory exists
    const resultsDir = path.join(process.cwd(), 'cypress/results');
    try {
      await fs.access(resultsDir);
    } catch {
      await fs.mkdir(resultsDir, { recursive: true });
    }

    // Execute the test
    const command = `npx cypress run --spec "cypress/e2e/api/${testFile}" --reporter junit --reporter-options "mochaFile=cypress/results/results-[hash].xml"`;
    
    try {
      const { stdout, stderr } = await execAsync(command);
      console.log('Test execution output:', stdout);
      if (stderr) console.error('Test execution errors:', stderr);
      
      return NextResponse.json({ 
        message: 'Test execution completed',
        details: { stdout, stderr }
      });
    } catch (execError: any) {    
      // Even if the test fails, we still return 200 as the execution itself completed
      return NextResponse.json({ 
        message: 'Test execution completed with failures',
        details: {
          stdout: execError.stdout,
          stderr: execError.stderr
        }
      });
    }
  } catch (error) {
    // console.error('Error handling test execution:', error);
    return NextResponse.json(
      { error: 'Failed to execute test' },
      { status: 500 }
    );
  }
}
