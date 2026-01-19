export interface GeneratedApp {
  id: string;
  name: string;
  description: string;
  code: string; // The React component code
  timestamp: number;
}

export interface GenesisResponse {
  appName: string;
  description: string;
  reactCode: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
