import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";
import {useContext} from "react";
import type {AppProps} from "next/app";
import "../styles/globals.css";
import {AuthContextProvider} from "../context/AuthContext";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthContextProvider>
  );
}

export default MyApp;
