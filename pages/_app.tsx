import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";
import type {AppProps} from "next/app";
import "../styles/globals.css";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
