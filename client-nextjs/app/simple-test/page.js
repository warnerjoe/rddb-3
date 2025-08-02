export default function SimpleTest() {
  return (
    <div>
      <h1>Simple Test Page</h1>
      <p>If you can see this, Next.js is working</p>
      <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'Not set'}</p>
    </div>
  );
}