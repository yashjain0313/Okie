import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/index";
import Profile from "./pages/profile/index";
import Chat from "./pages/chat/index";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth"/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
