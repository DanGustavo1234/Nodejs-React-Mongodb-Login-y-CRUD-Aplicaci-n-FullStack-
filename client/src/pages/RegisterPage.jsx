import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function RegisterPage() {
  const { register, handleSubmit,reset } = useForm();
  const [loading, setLoading] = useState(null);


  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await registerRequest(data);
      console.log("Registration successful:", response);
      reset(); 
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <Card className="w-full max-w-md p-8">
        <CardHeader className={"space-y-2 text-center"}>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>

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
                required
              />
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
                required
              />
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
                required
              />
            </div>
          </CardContent>

          <CardFooter>
          <Button size="sm" disabled={loading} className="w-full mt-5" type="submit">
            {
              loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Register"
              )
            }
          </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
