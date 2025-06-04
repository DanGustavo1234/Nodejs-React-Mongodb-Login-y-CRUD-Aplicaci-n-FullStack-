import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEffect } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(null);
  const { singUp, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    setLoading(true);
    singUp(data);
    reset();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-8">
        <CardHeader className={"space-y-2 text-center"}>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>
        {RegisterErrors.length > 0 &&
          RegisterErrors.map((err, i) => (
            <p key={i} className="text-red-500">
              {err}
            </p>
          ))}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="your_username"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  Username is required
                </span>
              )}
            </div>

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
                "Register"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
