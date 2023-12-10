import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import MainPage_Old from "./pages/MainPage_Old";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/old" element={<MainPage_Old />} />
      <Route path="/login" element={<LogInPage />} />
    </Routes>
  );
}

export default App;
