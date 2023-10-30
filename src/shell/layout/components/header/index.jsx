import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Slide,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import routes from "shell/routes/index.jsx";
function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSmOrBigger = useBreakpointValue({ base: false, sm: true });

  return (
    <>
      <Box>
        {isOpen ? (
          <svg
            onClick={onClose}
            className={`fixed right-4 top-4 z-10 sm:hidden`}
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
          </svg>
        ) : (
          <svg
            onClick={onOpen}
            className={`z-2 fixed right-4 top-4 sm:hidden`}
            width="25"
            height="25"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            fill={`black`}
          >
            <path
              d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
              fillRule="nonzero"
            />
          </svg>
        )}
        <Slide direction="right" in={isOpen} style={{ zIndex: 1 }}>
          {!isSmOrBigger && (
            <Flex
              position="fixed"
              top={0}
              right={0}
              h="200px"
              w="200px"
              bg="yellow.400"
              color="white"
              p={5}
              zIndex={2}
              justify="center"
              align="center"
            >
              <VStack spacing={5}>
                <Link to={"/get-companies"} onClick={onClose}>
                  Companies
                </Link>
                <Link to={"/add-game"} onClick={onClose}>
                  Games
                </Link>
                <Link to={"/About"} onClick={onClose}>
                  About
                </Link>
              </VStack>
            </Flex>
          )}
        </Slide>
      </Box>
      <nav
        className={`flex h-14 items-center justify-end bg-amber-400 text-lg`}
      >
        {routes?.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`mx-4 hidden sm:inline-block`}
          >
            {route.name}
          </Link>
        ))}
        <Link to={"/about"} className={`mx-4 hidden sm:inline-block`}>
          About
        </Link>
      </nav>
    </>
  );
}

export default Header;
