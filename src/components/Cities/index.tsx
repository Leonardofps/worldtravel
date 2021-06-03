import { Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

interface Cities100 {
  cities100: {
    city_name: string;
    country_name: string;
    city_image: string;
    flag: string;
  }[];
}

export function Cities({ cities100 }: Cities100) {
  return (
    <Flex direction="column">
      <Text fontWeight="500" fontSize="3xl" mb={[5, 12]}>
        Cidades +100
      </Text>

      <Flex margin={["auto", "0"]}>
        <SimpleGrid gap={[1, 5]} mx="auto" w="100%" columns={[1, null, 4]} mb="50px">
          {cities100.map(cities => (
            <Flex
            direction="column"
            border="1px solid rgba(255, 186, 8, 0.5)"
            borderRadius="4px"
            w="256px"
            h="279px"
            justify="space-between"
            key={cities.city_image}
            mb={5}
          >
            <Image
              borderRadius="4px 4px 0 0"
              w="256px"
              h="173px"
              src={cities.city_image}
            />
            <Flex justify="space-between" align="center" padding="0 24px" mb="25px">
              <Flex direction="column">
                <Text fontWeight="600" fontSize="lg" color="gray.800" mb="12px">{cities.city_name}</Text>
                <Text fontWeight="500" color="gray.400">{cities.country_name}</Text>
              </Flex>
              <Image
                w="30px"
                h="30px"
                borderRadius="50%"
                src={cities.flag}
              />
            </Flex>
          </Flex>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
