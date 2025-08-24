/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/fetchData.ts

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  method: Method;
  body?: any; // Optional body for POST, PUT, etc.
}

export async function fetchData(url: string, options: FetchOptions): Promise<any> {
  try {
    const { method, body } = options;

    // Set up headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      // You can add authorization or other headers here if needed
    };

    // If body exists (for methods like POST, PUT), convert it to JSON
    const fetchOptions: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined, // Add body only if it exists
    };

    // Fetch data
    const response = await fetch(url, fetchOptions);

    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse response body as JSON
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
