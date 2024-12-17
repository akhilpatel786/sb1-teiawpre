import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST() {
  try {
    exec('npx cypress open', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    return NextResponse.json({ message: 'Cypress started successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to start Cypress' },
      { status: 500 }
    );
  }
}