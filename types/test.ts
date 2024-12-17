export interface TestReport {
  filename: string;
  content: string;
  timestamp: string;
}

export interface TestStatus {
  failures: number;
  total: number;
}

export interface TestResult {
  passed: boolean;
  stats: TestStatus;
}

export interface TestExecutionResponse {
  message: string;
  details?: {
    stdout: string;
    stderr: string;
  };
  error?: string;
}