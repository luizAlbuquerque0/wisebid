

import { AuthProvider } from '~/context/AuthContext';
import './global.css';
import { Router } from '~/routes';

export default function App() {
  return (
    <>
     <AuthProvider>
       <Router />
       </AuthProvider>
    </>
  );
}
