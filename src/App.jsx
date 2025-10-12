import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ErrorBoundary from "../src/components/ErrorBoundary/ErrorBoundary"

function App() {

  return (
    <ErrorBoundary fallBack="Something went wrong">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
