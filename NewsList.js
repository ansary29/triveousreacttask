import React, { useState, useEffect } from "react";

import {
  Box,
  Center,
  Container,
  SimpleGrid,
  Spinner,
  Text,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const NewsList = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=dcd5965edf0b43f0bb0c0197f3a8c578"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        if (data.articles.length === 0) {
          setError("No news articles available.");
        } else {
          setArticles(data.articles);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error.message);
        setError("Failed to fetch news data.");
        setLoading(false);
      });
  }, []);
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Text fontSize="3xl" mb={4}>
        Latest News
      </Text>
      <Button onClick={toggleView} mb={4}>
        {isGridView ? "List View" : "Grid View"}
      </Button>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <>
          {isGridView ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {articles.map((article, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  boxShadow="md"
                >
                  <Text fontSize="xl" fontWeight="semibold" mb={2}>
                    {article.title}
                  </Text>
                  <Text fontSize="sm">{article.description}</Text>
                  <Link
                    to={`/article/${index}`}
                    onClick={() => navigate(`/article/${index}`)}
                  >
                    Read More
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={1} spacing={4}>
              {articles.map((article, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  boxShadow="md"
                >
                  <Text fontSize="xl" fontWeight="semibold" mb={2}>
                    {article.title}
                  </Text>
                  <Text fontSize="sm">{article.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
    // <Container maxW="container.xl" py={8}>
    //   <Text fontSize="3xl" mb={4}>
    //     Latest News
    //   </Text>
    //   <Button onClick={toggleView} mb={4}>
    //     {isGridView ? "List View" : "Grid View"}
    //   </Button>
    //   {isGridView ? (
    //     <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
    //       {articles.map((article, index) => (
    //         <Box
    //           key={index}
    //           borderWidth="1px"
    //           borderRadius="md"
    //           p={4}
    //           boxShadow="md"
    //         >
    //           <Text fontSize="xl" fontWeight="semibold" mb={2}>
    //             {article.title}
    //           </Text>
    //           <Text fontSize="sm">{article.description}</Text>
    //           <Link
    //             to={`/article/${index}`}
    //             onClick={() => navigate(`/article/${index}`)}
    //           >
    //             Read More
    //           </Link>
    //         </Box>
    //       ))}
    //     </SimpleGrid>
    //   ) : (
    //     <SimpleGrid columns={1} spacing={4}>
    //       {articles.map((article, index) => (
    //         <Box
    //           key={index}
    //           borderWidth="1px"
    //           borderRadius="md"
    //           p={4}
    //           boxShadow="md"
    //         >
    //           <Text fontSize="xl" fontWeight="semibold" mb={2}>
    //             {article.title}
    //           </Text>
    //           <Text fontSize="sm">{article.description}</Text>
    //         </Box>
    //       ))}
    //     </SimpleGrid>
    //   )}
    // </Container>
  );
};

export default NewsList;
