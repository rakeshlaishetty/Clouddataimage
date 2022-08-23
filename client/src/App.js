import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Error from "./pages/Error";
import Single from "./pages/Single";
import Menu from "./components/menu";
import "../src/App.css";
export default function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="upload" element={<Upload />} />
        <Route path="post/:id" exact element={<Single />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
