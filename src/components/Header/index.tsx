import { Flex, Icon, Image, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

export function Header() {
  const { asPath } = useRouter();

  return (
    <Flex
      as="header"
      w="100%"
      alignItems="center"
      justifyContent="center"
      bg="white"
      height={100}
      px="6"
    >
      {asPath !== "/" && (
        <Link href="/">
          <Icon position="absolute" top={["40px"]} left="50px" h="25px" w="25px" as={IoIosArrowBack} cursor="pointer" />
        </Link>
      )}

      <Link href="/">
        <Image src="/images/logo.png" />
      </Link>
    </Flex>
  );
}
