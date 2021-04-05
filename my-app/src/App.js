import Navbar from "./components/Navbar"
import './App.css';
import User from "./components/Users";
// import SearchBar from "./components/search";

function App() {
  return (
    <div>
    <Navbar />
    {/* <SearchBar /> */}
    <User />
    </div>
  );
}

export default App;
