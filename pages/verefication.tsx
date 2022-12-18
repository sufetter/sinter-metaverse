import {VereficationCard} from "../components/Verification";
import {LayoutCard} from "../components/Layout";
import {ChakraProvider} from "@chakra-ui/react";

const verefication = () => {
  return (
    <LayoutCard card>
      <ChakraProvider>
        <VereficationCard />
      </ChakraProvider>
    </LayoutCard>
  );
};

export default verefication;
