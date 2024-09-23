import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Spotlight } from "../components/ui/Spotlight";
import { loginValidator } from "../validators/LoginValidator";
import { toast } from "sonner";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "../intersepter/axiosIntersepter";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../validators/tokenValidatior";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const res = loginValidator(email, password);
    if (!res) {
      setLoading(false);
      return;
    }
    await axios
      .post("/auth/login", { email, password })
      .then((data) => {
        const hToken =encrypt(data.data);
        localStorage.setItem("token", hToken);
        toast.success("Login successful");
        setLoading(false);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Spotlight
          className="-top-40 left-10 md:left-60 md:-top-20"
          fill="gray"
        />
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  value={password}
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                {loading ? <ScaleLoader /> : "Login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;



