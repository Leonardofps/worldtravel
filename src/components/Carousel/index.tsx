import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from 'next/link';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

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

export function CountriesSlider({ continents }: HomeProps) {
  return (
    <Flex
      w="100%"
      h={["250px", "450px"]}
      maxW="1240px"
      mx="auto"
      mb={["5", "10"]}
      mt={["5", "12"]}
      textAlign="center"
    >
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
        }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        style={{ width: "100%", flex: "1" }}
      >
        {continents.map((continent) => (
          <SwiperSlide key={continent.uid}>
            <Link href={`/continent/${continent.uid}`} >
              <Flex
                cursor="pointer"
                w="100%"
                h="100%"
                bgImage={`url("${continent.data.image}")`}
                bgSize="cover"
                bgPosition="100% 30%"
                align="center"
                justify="center"
                direction="column"
                _before={{
                  content: '""',
                  pos: "absolute",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                  bgColor: "rgba(0,0,0,0.25)",
                }}
              >
                <Heading
                  pos="relative"
                  color="gray.50"
                  fontWeight="700"
                  fontSize={["2xl", "xl", "4xl"]}
                  mt={["2", "4"]}
                >
                  {continent.data.name_of_continent}
                </Heading>
                  <Text
                    pos="relative"
                    color="gray.50"
                    fontWeight="700"
                    fontSize={["0.8rem","1xl", "2xl"]}
                  >
                    {continent.data.little_description}
                  </Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
}
