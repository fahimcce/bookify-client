import { Button } from "antd";
import { useForm } from "react-hook-form";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import Swal from "sweetalert2";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [login, { error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const { token } = res;

      if (token) {
        localStorage.setItem("token", token); // Store the token
        console.log("Token stored in localStorage:", token);

        const user = verifyToken(token); // Decode token here
        dispatch(setUser({ user, token })); // Dispatch user information
        navigate("/"); // Navigate after login success

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("No token returned from login response.");
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "No token returned.",
        });
      }
    } catch (err) {
      console.error("Error during login:", err);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          {...register("email", { required: "Email is required" })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
      </div>
      <Button htmlType="submit">Login</Button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </form>
  );
};

export default Login;
