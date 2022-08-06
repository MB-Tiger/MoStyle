import "../styles/globals.css";
import { useRef } from "react";
import MainLayout from "../layout/MainLayout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import Store from "../redux/Store";

function MyApp({ Component, pageProps }) {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={Store}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
