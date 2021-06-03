import { Box, Flex, Image, Text, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Header } from "../components/Header";
import Prismic from "@prismicio/client";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { CountriesSlider } from "../components/Carousel";
import { TravelTips } from "../components/TravelTips";

SwiperCore.use([Navigation]);

interface Continent {
  uid?: string;
  data: {
    image: string;
    name_of_continent: string;
    little_description: string;
  };
}

interface HomeProps {
  continents: Continent[];
}

export default function Home({ continents }: HomeProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const alignProperty = useBreakpointValue({
    base: 'center',
    lg: 'normal',
  });

  const maxWidth = useBreakpointValue({
    base: "297px",
    lg: "initial",
  });

  return (
    <Flex direction="column" w="100%">
      <Header />
      <Flex
        backgroundImage="url('/images/bgBackground.png')"
        h={["378", "368"]}
        bgSize="cover"
        bgRepeat="no-repeat"
        align="center"
      >
        <Box w="100%" pos="relative" maxW="1600px" mx="auto" align={alignProperty} >
          <Box direction="column" maxW="524px" ml={[0, 0, 0, "200"]}>
            <Text color="gray.50" fontWeight="500" fontSize="4xl">
              5 Continentes,
            </Text>
            <Text color="gray.50" fontWeight="500" fontSize="4xl">
              infinitas possibilidades.
            </Text>
            <Text color="gray.400" fontWeight="400" fontSize="lg" mt="5">
              Chegou a hora de tirar do papel a viagem que você sempre sonhou.
            </Text>
          </Box>
          {isWideVersion &&
            <Image src="/images/airplane.png" pos="absolute" right="60" top="4" />
          }
        </Box>
      </Flex>
      
      <TravelTips />

      <Flex margin="auto" justify="center" borderTop="2px" w="90px" mt={["16", "20"]} />

      <Flex maxW={maxWidth} w="100%" margin="auto" textAlign="center" justify="center" mt={["8", "16"]}>
        <Text fontSize={["xl", "4xl"]} fontWeight="500">
          Vamos nessa?
          <br />
          Então escolha seu continente
        </Text>
      </Flex>

      <CountriesSlider continents={continents} />
    </Flex>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.predicates.at("document.type", "continents"),
  ]);

  const continents = response.results.map((continent) => {
    return {
      uid: continent.uid,
      data: {
        image: continent.data.image.url,
        name_of_continent: continent.data.name_of_continent,
        little_description: continent.data.little_description,
      },
    };
  });

  return {
    props: {
      continents,
    },
    redirect: 60 * 30, // 30 minutes
  };
};
