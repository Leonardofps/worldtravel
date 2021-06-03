import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import Prismic from "@prismicio/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { Cities } from "../../components/Cities";
import { Header } from "../../components/Header";
import { getPrismicClient } from "../../services/prismic";

interface Continent {
  data: {
    name_of_continent: string;
    little_description: string;
    image: string;
    description: {
      text: string;
    }[];
    cities100: {
      city_name: string;
      country_name: string;
      city_image: string;
      flag: string;
    }[];
    countries: number;
    languages: number;
  };
}

interface ContinentProps {
  continent: Continent;
}

export default function Continent({ continent }: ContinentProps) {
  return (
    <Flex direction="column" w="100%">
      <Header />
      <Flex
        bgImage={`url("${continent.data.image}")`}
        h={["375px", "500px"]}
        bgRepeat="no-repeat"
        bgPosition={["0% 0%", "100% 30%"]}
        bgSize="cover"
        justify={["center", "left"]}
        align={["center", "flex-end"]}
      >
        <Text
          color="gray.50"
          fontWeight="600"
          fontSize={"4xl"}
          ml={["0", "120px"]}
          mb="59px"
        >
          {continent.data.name_of_continent}
        </Text>
      </Flex>
      <Flex
        direction="column"
        justify="space-between"
        margin="auto"
        w="100%"
        maxW="1600px"
        pl={[5, 0]}
        pr={[5, 0]}
      >
        <Flex
          direction={["column", "row"]}
          justify="space-between"
          w="100%"
          maxW="1600px"
          mt={[8, 28]}
          mb={[10, 28]}
        >
            <Text
              w="100%"
              maxW="600px"
              textAlign="justify"
              lineHeight="32px"
            >
              {continent.data.description.map((description) => description.text)}
            </Text>

          <Flex
            maxW="390px"
            w="100%"
            align="center"
            justify="space-between"
            mt={[5, 0]}
            mr="120px"
          >
            <Flex direction="column" align="center" mr="16px">
              <Text color="yellow.400" fontWeight="600" fontSize="24px">
                {continent.data.countries}
              </Text>
              <Text fontWeight="600">países</Text>
            </Flex>
            <Flex direction="column" align="center" mr="16px">
              <Text color="yellow.400" fontWeight="600" fontSize="24px">
                {continent.data.languages}
              </Text>
              <Text fontWeight="600">línguas</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text color="yellow.400" fontWeight="600" fontSize="24px">
                {continent.data.cities100.length}
              </Text>
              <Flex align="center">
                <Text fontWeight="600">cidades +100</Text>
                <Tooltip label={continent.data.cities100.map(cities => (
                  <Flex key={cities.city_name} direction="column">
                    {cities.city_name}
                  </Flex>
                ))}>
                  <Image ml="2" src="/images/info.png" w="14px" h="14px"  />
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Cities cities100={continent.data.cities100} />
      </Flex>
    </Flex>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const continents = await prismic.query([
    Prismic.predicates.at("document.type", "continents"),
  ]);

  const slugContinent = continents.results.map((continentUid) => {
    return {
      params: {
        slug: continentUid.uid,
      },
    };
  });

  return {
    paths: slugContinent,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID("continents", String(slug), {});

  const continent = {
    uid: response.uid,
    data: {
      name_of_continent: response.data.name_of_continent,
      little_description: response.data.little_description,
      image: response.data.image.url,
      description: response.data.description.map((description) => ({
        text: description.text,
      })),
      cities100: response.data.cities100.map((cities100) => ({
        city_name: cities100.city_name,
        country_name: cities100.country_name,
        city_image: cities100.city_image.url,
        flag: cities100.flag.url,
      })),
      countries: response.data.countries,
      languages: response.data.languages,
    },
  };

  return {
    props: {
      continent,
    },
    redirect: 60 * 30, // 30 minutes
  };
};
