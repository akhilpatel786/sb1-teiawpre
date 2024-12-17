export async function fetchTestReports() {
  const response = await fetch('/api/tests');
  if (!response.ok) {
    throw new Error('Failed to fetch test reports');
  }
  const data = await response.json();
  return data.reports || [];
}

export async function runTest(testFile: string) {
  const response = await fetch('/api/tests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ testFile }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to execute test');
  }
  
  return response.json();
}

export async function startCypress() {
  const response = await fetch('/api/cypress', {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to start Cypress');
  }
  
  return response.json();
}