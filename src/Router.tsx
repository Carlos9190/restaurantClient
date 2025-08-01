import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import firebase, { FirebaseContext } from "./firebase";

import Orders from "./views/Orders";
import Menu from "./views/Menu";
import NewDish from "./views/NewDish";
import Sidebar from "./components/Sidebar";

export default function Router() {
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={firebase}>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Orders />} index />
            <Route path="/menu" element={<Menu />} />
            <Route path="/new-dish" element={<NewDish />} />
          </Route>
        </Routes>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}
