import { PropertyProvider } from './context/PropertyContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import AppRoutes from './Routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';

// const CustomErrorFallback = (error: Error, reset: () => void) => (
//   <div>
//     <h1>An error occurred</h1>
//     <p>{error.message}</p>
//     <button onClick={reset}>Reset</button>
//   </div>
// );
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <Layout>
            <PropertyProvider>
              <AppRoutes />
            </PropertyProvider>
          </Layout>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
