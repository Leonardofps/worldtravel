import { Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

export function TravelTips() {
  return (
    <Flex align="center" justify="center">
        <SimpleGrid
          gap={[1, 5]}
          mx="auto"
          maxW="1400px"
          w="100%"
          columns={[2, null, 5]}
          mt={["0", "0", "28"]}
        >
          <Flex direction="column" align="center" justify="center" mt="12">
            <Image width={["70px", "80px"]} height={["75px", "85px"]} src="/images/cocktail.png" />
            <Text fontWeight="600" fontSize="xl" mt="6">
              vida noturna
            </Text>
          </Flex>
          <Flex direction="column" align="center" justify="center" mt="12">
            <Image width={["70px", "80px"]} height={["75px", "85px"]} src="/images/surf.png" />
            <Text fontWeight="600" fontSize="xl" mt="6">
              praia
            </Text>
          </Flex>
          <Flex direction="column" align="center" justify="center" mt="12">
            <Image width={["70px", "80px"]} height={["75px", "85px"]} src="/images/building.png" />
            <Text fontWeight="600" fontSize="xl" mt="6">
              moderno
            </Text>
          </Flex>
          <Flex direction="column" align="center" justify="center" mt="12">
            <Image width={["70px", "80px"]} height={["75px", "85px"]} src="/images/museum.png" />
            <Text fontWeight="600" fontSize="xl" mt="6">
              clássico
            </Text>
          </Flex>
          <Flex direction="column" align="center" justify="center" mt="12">
            <Image width={["70px", "80px"]} height={["75px", "85px"]} src="/images/group.png" />
            <Text fontWeight="600" fontSize="xl" mt="6">
              e mais...
            </Text>
          </Flex>
        </SimpleGrid>
      </Flex>
  );
}