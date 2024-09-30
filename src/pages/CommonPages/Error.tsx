import { useNavigate } from "react-router-dom";
import Section from "../../components/common/Section";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Section className="bg-gray-50">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <p className="text-2xl mt-4">
            Oops! The page you’re trying to reach doesn’t exist.
          </p>
          <p className="mt-2 text-gray-600">It seems you’ve hit a dead end.</p>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
            >
              Go to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ErrorPage;
