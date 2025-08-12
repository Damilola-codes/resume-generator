import { useState } from "react";
import { login } from "../services/auth";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('testuser1@revampinsights.com');
  const [password, setPassword] = useState('R3v@mp!nsight5-2025');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onLogin();
    } catch {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
          className="border p-2 w-full mb-3" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"
          className="border p-2 w-full mb-3" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}