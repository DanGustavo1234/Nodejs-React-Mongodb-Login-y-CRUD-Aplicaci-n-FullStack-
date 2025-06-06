import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate,Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(null);
  const {isAuthenticated, errors: singInErrors ,singIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    setLoading(true);
    singIn(data);
    // reset();
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-8">
        <CardHeader className={"space-y-2 text-center"}>
          <CardTitle>SingIn</CardTitle>
          <CardDescription>Enter your details to login</CardDescription>
        </CardHeader>
       {
          singInErrors.errors && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {singInErrors.errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          ) 
       }
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              size="sm"
              disabled={loading}
              className="w-full mt-5"
              type="submit"
            >
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
        <CardFooter className="text-center mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 dark:text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
export default LoginPage;
