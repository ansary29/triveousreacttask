import React, { useState } from "react";
import { ChakraProvider, Container, CSSReset } from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import NewsList from "./Components/NewsList";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import NewsDetail from "./Components/NewsDetail";
import Navbar from "./Components/Navbar";

// import Favorites from "./Components/Favorite";
// import { addToFavorites, removeFromFavorites } from "./firebase-functions";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [favoriteArticles, setFavoriteArticles] = useState([]);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => setLoggedIn(true))
      // console.log("login success"))
      .then((value) => navigate("/newspost"))
      .catch((err) => console.log(err));

    setError(true);
    if (!email) {
      setError("Please fill the email");
      return;
    }
    if (!password) {
      setError("Please fill the password");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => alert("user added"))
      .then((value) => navigate("/login"))
      .catch((err) => console.log(err));
    if (!email) {
      setError("Please fill the email");
      return;
    }
    if (!password) {
      setError("Please fill the password");
      return;
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  // const handleFavoriteToggle = (article, isFavorite) => {
  //   if (isFavorite) {
  //     setFavoriteArticles([...favoriteArticles, article]);
  //   } else {
  //     const updatedFavorites = favoriteArticles.filter(
  //       (favArticle) => favArticle.title !== article.title
  //     );
  //     setFavoriteArticles(updatedFavorites);
  //   }
  // };
  // const handleAddFavorite = (article) => {
  //   addFavoriteToFirebase(userId, article)
  //     .then(() => {
  //       setFavoriteArticles([...favoriteArticles, article]);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding article to favorites:", error);
  //     });
  // };

  // const handleRemoveFavorite = (article) => {
  //   removeFavoriteFromFirebase(userId, article)
  //     .then(() => {
  //       const updatedFavorites = favoriteArticles.filter(
  //         (favArticle) => favArticle.title !== article.title
  //       );
  //       setFavoriteArticles(updatedFavorites);
  //     })
  //     .catch((error) => {
  //       console.error("Error removing article from favorites:", error);
  //     });
  // };

  return (
    <ChakraProvider>
      <CSSReset />
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Container maxW="container.md" p={4}>
        
        <Routes>
          <Route
            path="/"
            element={
              <Register
                handleSubmit={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                handleLogin={handleLogin}
                setEmail={setEmail}
                setPassword={setPassword}
                error={error}
              />
            }
          />
          {loggedIn ? (
            <>
              <Route path="/newslist" element={<NewsList />} />

              <Route
                path="/logout"
                element={<Logout handleLogout={handleLogout} />}
              />

              <Route
                path="/article/:articleIndex"
                element={
                  <NewsDetail
                  // userId={12345}
                  // handleAddFavorite={handleAddFavorite}
                  // handleRemoveFavorite={handleRemoveFavorite}
                  // favoriteArticles={favoriteArticles}
                  // onFavoriteToggle={handleFavoriteToggle}
                  />
                }
              />
              {/* <Route path="/favorites" element={<Favorites />} /> */}
              <Route path="/*" element={<Navigate to="/newslist" />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;
