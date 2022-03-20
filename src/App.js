import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Popular from "./components/dashboard/Popular";
import Library from "./components/dashboard/Library";
import MakeAdmin from "./components/dashboard/MakeAdmin";
import AddBook from "./components/dashboard/AddBook";
import ReturnBooks from "./components/dashboard/ReturnBooks";
import IssueBooks from "./components/dashboard/IssueBooks";
import BooksIssued from "./components/dashboard/BooksIssued";
import Dashboard from "./components/dashboard/Dashboard";
import { Slide, ToastContainer } from "react-toastify";
import UserDetails from "./components/dashboard/UserDetails";

export const UserContext = createContext({});

function LayoutWithDashboard() {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
}

function App() {
  const [user, setuser] = useState(false);
  return (
    <UserContext.Provider value={{ user, setuser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="dashboard" element={<LayoutWithDashboard />}>
            <Route path="popular" element={<Popular />} />
            <Route path="library" element={<Library />} />
            <Route path="makeadmin" element={<MakeAdmin />} />
            <Route path="addbook" element={<AddBook />} />
            <Route path="returnbooks" element={<ReturnBooks />} />
            <Route path="issuebooks" element={<IssueBooks />} />
            <Route path="booksissued" element={<BooksIssued />} />
            <Route path="userdetails" element={<UserDetails />} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer transition={Slide} />
    </UserContext.Provider>
  );
}

export default App;
