import { Route, Routes } from "react-router-dom";
import { ContactsPage } from "./pages/ContactsPage";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { Navigation } from "./components/navigation/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts/:id" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
