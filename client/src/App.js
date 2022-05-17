import ErrorBoundary from "./containers/ErrorBoundary";
import Layout from "./containers/Layout";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <AppRoutes />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
