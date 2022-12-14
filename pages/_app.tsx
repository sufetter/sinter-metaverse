import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";
import {useContext} from "react";
import type {AppProps} from "next/app";
import "../styles/globals.css";
import {AuthContextProvider} from "../context/AuthContext";
import {Provider} from "react-redux";
import {setupStore} from "../src/store";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const store = setupStore();
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
