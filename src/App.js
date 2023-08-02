// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import './App.css';

// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { AuthProvider } from './context/AuthProvider';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
