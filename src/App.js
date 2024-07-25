import "./App.css";
import BlogList from "./Blog/BlogList/BlogList";
import BlogDetails from "./Blog/BlogDetails/BlogDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import SearchResults from "./Components/SearchResults/SearchResults";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/blogDetails/:id" element={<BlogDetails />}></Route>
        <Route path="/blogList" element={<BlogList />}></Route>
        <Route path="/" element={<BlogList />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
