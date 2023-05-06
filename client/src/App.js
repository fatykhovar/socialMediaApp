import './App.css';
import Navbar from './components/navbar/Navbar';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import GroupsPage from "./pages/groupsPage/GroupsPage";
import FriendsPage from './pages/friendsPage/FriendsPage';
import Group from './pages/group/Group';
import LeftBar from "./components/leftBar/LeftBar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from 'react';
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "react-query"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";


function App() {
const { currentUser } = useContext(AuthContext);
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          {/* <RightBar /> */}
        </div>
    </QueryClientProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const LoggedInRoute = ({ children }) => {
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/groups",
        element: <GroupsPage />,
      },
      {
        path: "/friends",
        element: <FriendsPage />,
      },
      {
        path: "/group/:id",
        element: <Group />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LoggedInRoute>
        <Login />
      </LoggedInRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
    // <QueryClientProvider client={queryClient}>
    // <>
    //    <Navbar />
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/register"  element={<Register />} />
    //       {/* <LoggedInRoute> */}
    //         <Route path="/login"  element={<Login />} />
    //         {/* </LoggedInRoute> */}
          
    //       {/* <Route path="/upload" element={<Upload />} /> */}
    //       <Route path="/profile" element={<Profile />} />
    //     </Routes>
    //  </Router> 
    // </>
    // </QueryClientProvider>
  );
}

export default App;
