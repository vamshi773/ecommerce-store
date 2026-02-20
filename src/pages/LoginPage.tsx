import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

type FormData = {
  emailOrUsername: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const saved = localStorage.getItem("mock_user");

    if (!saved) {
      toast.error("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(saved) as {
      username: string;
      email: string;
      password: string;
    };

    const matchUser =
      data.emailOrUsername === user.email ||
      data.emailOrUsername === user.username;

    const matchPass = data.password === user.password;

    if (!matchUser || !matchPass) {
      toast.error("Invalid credentials ❌");
      return;
    }

    dispatch(login({ username: user.username, email: user.email }));
    toast.success(`Welcome ${user.username} ✅`);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register("emailOrUsername", {
              required: "Email/Username required",
            })}
            placeholder="Email or Username"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <p className="text-red-600 text-sm">
            {errors.emailOrUsername?.message}
          </p>
        </div>

        <div>
          <input
            type="password"
            {...register("password", { required: "Password required" })}
            placeholder="Password"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <p className="text-red-600 text-sm">{errors.password?.message}</p>
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-lg w-full">
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        New here?{" "}
        <Link className="text-blue-600 underline" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}