import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image, Link, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
// import { addFavorite, removeFavorite } from "./firebase-functions";

const NewsDetail = ({ favoriteArticles }) => {
  const { articleIndex } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=dcd5965edf0b43f0bb0c0197f3a8c578"
    )
      .then((response) => response.json())
      .then((data) => {
        const articles = data.articles;

        if (articleIndex >= 0 && articleIndex < articles.length) {
          const selectedArticle = articles[articleIndex];
          setArticle(selectedArticle);

          // const isInFavorites = favoriteArticles.some(
          //   (favArticle) => favArticle.title === selectedArticle.title
          // );
          // setIsFavorite(isInFavorites);

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching article details:", error);
        setLoading(false);
      });
  }, [articleIndex, favoriteArticles]);

  // const handleFavoriteClick = () => {
  //   if (isFavorite) {
  //     removeFavorite(userId, article);

  //     setIsFavorite(false);
  //   } else {
  //     addFavorite(userId, article);

  //     setIsFavorite(true);
  //   }
  // };

  if (loading) {
    return (
      <Container maxW="container.lg" py={8}>
        <Box textAlign="center">Loading...</Box>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxW="container.lg" py={8}>
        <Box textAlign="center">Article not found.</Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
        <Heading as="h1" fontSize="2xl" mb={4}>
          {article.title}
        </Heading>
        <Image src={article.urlToImage} alt={article.title} mb={4} />
        <Text fontSize="lg" mb={4}>
          {article.description}
        </Text>
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.500"
          fontSize="lg"
          fontWeight="bold"
        >
          Read Full Article
        </Link>
        {/* <Button
          onClick={handleFavoriteClick}
          colorScheme={isFavorite ? "red" : "blue"}
          mt={4}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button> */}
      </Box>
    </Container>
  );
};

export default NewsDetail;
