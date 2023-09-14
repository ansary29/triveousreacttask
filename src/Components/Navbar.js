import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Link as ChakraLink,
  Button,
  HStack,
} from "@chakra-ui/react";

const Navbar = ({ loggedIn, handleLogout }) => {
  return (
    <Box bg="teal" color="white" p={4} width="100%">
      <Flex alignItems="center">
        <Link to="/">
          <ChakraLink color="white" fontSize="lg" fontWeight="bold">
            My App
          </ChakraLink>
        </Link>
        <Spacer />
        <HStack spacing={4}>
          {loggedIn ? (
            <Link to="/logout" onClick={handleLogout}>
              <Button colorScheme="red">Logout</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/">
                <Button colorScheme="teal">Register</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
