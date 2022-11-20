import React, {useEffect} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {Box} from "@chakra-ui/react";

const Test = () => {
  let router = useRouter();

  let load;
  useEffect(() => {
    let window: any = Window;
    if (window) {
      load = true;
      console.log(window);
    }
  });
  return (
    <div>
      {load && (
        <motion.div
          key={router.route}
          initial={{
            // clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            y: "100%",
          }}
          animate={{
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            y: "0%",
          }}
          exit={
            {
              // clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            }
          }
          transition={{
            duration: 0.5,
          }}
        >
          <Box w="400px" h="400px" bg="red"></Box>
        </motion.div>
      )}
    </div>
  );
};

export default Test;
