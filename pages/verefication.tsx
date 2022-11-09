import VereficationCard from "../components/VereficationCard";
import LayoutCard from "../components/LayoutCard";
import {ChakraProvider} from "@chakra-ui/react";

const verefication = () => {
  return (
    <LayoutCard>
      <ChakraProvider>
        <VereficationCard />
      </ChakraProvider>
    </LayoutCard>
  );
};

export default verefication;
