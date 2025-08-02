'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestPage() {
  const [testResult, setTestResult] = useState('Testing...');

  useEffect(() => {
    const testAPI = async () => {
      try {
        // Direct test without environment variables
        const response = await axios.get('https://rddb-3-production.up.railway.app/api/cards');
        setTestResult(`SUCCESS: Got ${response.data.cards?.length || 0} cards`);
      } catch (error) {
        setTestResult(`ERROR: ${error.message}`);
      }
    };
    testAPI();
  }, []);

  return (
    <div className="p-8">
      <h1>API Test Page</h1>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>API URL from env: {process.env.NEXT_PUBLIC_API_URL || 'NOT SET'}</p>
      <p>Test Result: {testResult}</p>
    </div>
  );
}