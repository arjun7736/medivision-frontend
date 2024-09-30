import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import Bill from "./pages/Bill";
import BillingPage from "./pages/BillingPage";
import { Toaster } from "./components/ui/sonner";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { decrypt } from "./validators/tokenValidatior";
import ViewBill from "./pages/ViewBill";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <HashLoader color="#6964c4"/>
      </div>
    </div>
  );
};

const PublicRoute = ({ element }: { element: React.ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const deToken = decrypt(token);
      setTimeout(() => {
        if (deToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return isAuthenticated ? <Navigate to="/dashboard" /> : element;
};

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const deToken = decrypt(token);
    setTimeout(() => {
      if (deToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    },500);
  }else{
    setIsAuthenticated(false);
    setIsLoading(false);
  }
  }, []);
  

  if (isLoading) {
    return <Loading />;
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute element={<Login />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<BillingPage />} />} />
            <Route path="/bill" element={<ProtectedRoute element={<Bill />} />} />
            <Route path="/viewbill/:id" element={<ProtectedRoute element={<ViewBill />}/>}/>
          </Routes>
        </BrowserRouter>
        <Toaster className="bg-white" />
      </ThemeProvider>
    </>
  );
}

export default App;