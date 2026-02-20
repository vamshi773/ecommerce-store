import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  username: yup.string().required("Username is required").min(3, "Min 3 chars"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min 6 chars"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // save mock user credentials in localStorage
    localStorage.setItem(
      "mock_user",
      JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );

    toast.success("Registered successfully ✅ Please login");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register("username")}
            placeholder="Username"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <p className="text-red-600 text-sm">{errors.username?.message}</p>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <p className="text-red-600 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <p className="text-red-600 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <p className="text-red-600 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-lg w-full">
          Create Account
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <Link className="text-blue-600 underline" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}