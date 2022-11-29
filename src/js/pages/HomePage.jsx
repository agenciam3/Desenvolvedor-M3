const Header = require("../components/Header/index.jsx");
const Cards = require("../components/Cards/index.jsx");

const HomePage = () => {
  const [nome, setNome] = React.useState("Adriane");

  return (
    <>
      <Header />
      <Cards />
    </>
  );
};

module.exports = HomePage;
