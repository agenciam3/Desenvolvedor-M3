const Header = require("../components/Header/index.jsx");
const Cards = require("../components/Cards/index.jsx");
const Footer = require("../components/Footer/index.jsx");
const Cards_mock = require("../../../db.json");

const HomePage = () => {
  return (
    <>
      <Header />
      <Cards cards={Cards_mock.products} />
      <Footer />
    </>
  );
};

module.exports = HomePage;
