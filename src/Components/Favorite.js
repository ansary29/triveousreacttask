import React from "react";
import { Box, Container } from "@chakra-ui/react";
import NewsDetail from "./NewsDetail";

const Favorite = ({ favoriteArticles, handleFavoriteToggle }) => {
  return (
    <Container maxW="container.lg" py={8}>
      <Box>
        {favoriteArticles.length === 0 ? (
          <p>No favorite articles yet.</p>
        ) : (
          favoriteArticles.map((article, index) => (
            <NewsDetail
              key={index}
              article={article}
              isFavorite={true}
              onFavoriteToggle={() => handleFavoriteToggle(article, false)}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default Favorite;
