import "../styles/globals.css";
import MainLayout from "../layout/MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
