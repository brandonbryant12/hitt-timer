declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    export interface NextPWAOptions {
      dest: string;
      register?: boolean;
      skipWaiting?: boolean;
      disable?: boolean;
      sw?: string;
      cacheOnFrontEndNav?: boolean;
      reloadOnOnline?: boolean;
      [key: string]: any;
    }
  
    export default function nextPWA(options: NextPWAOptions): (config: NextConfig) => NextConfig;
  }
  