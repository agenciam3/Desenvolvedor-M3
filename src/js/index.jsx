const HomePage = require('./pages/HomePage.jsx');
const serverurl = process.env.SERVER_API;

function main() {
    const container = document.getElementById('react-app');
    const root = ReactDOM.createRoot(container);
    root.render(<HomePage />);
}

window.onload = main;
