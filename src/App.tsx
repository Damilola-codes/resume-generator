import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import ResumePage from './pages/ResumePage';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  return (
    <QueryClientProvider client={queryClient}>
      {isLoggedIn ? <ResumePage /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
    </QueryClientProvider>
  );
}

export default App;
