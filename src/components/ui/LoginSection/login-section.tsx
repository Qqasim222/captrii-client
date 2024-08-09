import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../config/authConfig";
import useAuth from "../../../hooks/useAuth";
import { LogoMini, EyeIcon, CrossEyeIcon } from "../Images/images";
import AppleSignin from 'react-apple-signin-auth';

// Define the type for the Apple Sign-In response
interface AppleSignInResponse {
  code: string;
  id_token: string;
  // Add more fields as necessary
}

// Define the type for the onSuccess handler parameter
const handleCredentialResponse = (response: AppleSignInResponse) => {
  console.log('Apple credential response:', response);
  // Handle the response, e.g., send it to your backend for further processing
};


// TypeScript types for props and state.
interface LoginSectionProps { }

const LoginSection: React.FC<LoginSectionProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isGetQuestion, setIsGetQuestion] = useState<boolean>(false);
  const { instance } = useMsal();
  const { handleAuth } = useAuth(`${process.env.REACT_APP_API_URL}`);

  const handleMicrosoftLogin = async () => {
    try {
      const response = await instance.loginPopup({
        ...loginRequest,
        prompt: "select_account",
      });
      await handleAuth({ credential: response.accessToken }, "microsoft");
    } catch (e) {
      console.error("Error during Microsoft login:", e);
      toast.error("Microsoft login failed");
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
        callback: (response: any) => handleAuth({ credential: response.credential }, "google"),
      });

      window.google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
        {
          theme: "outline",
          text: "continue_with",
          shape: "pill",
          display: "block",
          width: "100%",
        }
      );
    }
  }, [handleAuth]);


  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = (): void => {
    setIsSignUp(true);
  };
  const handleGetQuestion = (): void => {
    setIsGetQuestion(true);
  };

  return (
    <div className="bg-gray-50 md:max-w-[46rem] pb-10 w-[90%] mx-5 flex justify-center">
      <div className="md:max-w-[28rem] w-[100%] bg-white mx-5 p-8 rounded-lg shadow-lg md:mt-12 mt-4 mb-4">
        <div className="flex justify-center mb-8">
          <LogoMini />
        </div>
        <div
          id="microsoft-signin-button"
          className="text-sm mb-6"
          onClick={handleMicrosoftLogin}
        >
          <button
            id="msal-signin"
            className="social-button bg-white text-gray-700 rounded-full flex items-center justify-center p-2 w-full mb-2 border border-gray-300 cursor-pointer hover:bg-gray-100"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Icon"
              className="mr-2 w-6 h-6"
            />
            <span>Continue with Microsoft</span>
          </button>
        </div>
        <AppleSignin
          authOptions={{
            clientId: "com.localhost.captriiapp",
            scope: 'name email',
            redirectURI: "http://localhost:3000/auth/callback",
            state: 'state', // optional, use this to prevent CSRF
            nonce: 'nonce', // optional, use this to prevent replay attacks
            usePopup: true, // or false defaults to false
          }}
          onSuccess={handleCredentialResponse}
          onError={(error: Error) => console.error(error)}
          render={(props: any) => <div id="apple-signin-button" className="text-sm mb-6">
            <button
              {...props}
              id="apple-signin"
              className="social-button bg-white text-gray-700 rounded-full flex items-center justify-center p-2 w-full mb-2 border border-gray-300 cursor-pointer hover:bg-gray-100"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Icon"
                className="mr-2 w-6 h-6"
              />
              <span>Continue with Apple</span>
            </button>
          </div>}
          uiType="light" // Add the required uiType prop
        />
        <div className=" w-full">
          <div className="w-full" id="loginDiv"></div>
        </div>

             {/* <div id="fake-button" className="text-sm" >
          <button id="fake-google-signin-button" className="social-button bg-white text-gray-700 rounded-full flex items-center justify-center p-2 w-full mb-2 border border-gray-300 cursor-pointer hover:bg-gray-100">
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google Icon" className="mr-2 w-6 h-6" />
            <span>Continue with Google</span>
          </button>
        </div> */}

        <div className="flex justify-center items-center mb-4">
          <hr className="border-t-1 border-gray-300 w-[50%] mr-3"></hr>
          <span>OR</span>
          <hr className="border-t-1 border-gray-300 w-[50%] ml-3"></hr>
        </div>
        {isSignUp ? (
          <div className="" id="signupPanel">
            <form id="signupForm">
              <div className="font-xl font-bold mb-10">REGISTER</div>
              <label htmlFor="newUsername">Username:</label>
              <br />
              <input
                className="bg-white-200 p-2 w-full mb-4"
                placeholder="Logon Name..."
                type="text"
                id="newUsername"
                name="newUsername"
                required
              />
              <br />
              <label htmlFor="newPassword">Password:</label>
              <br />
              <input
                className="bg-white-200 p-2 w-full mb-4"
                placeholder="Password..."
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                required
              />
              <div
                className="mb-6 text-gray-200 hover:cursor-pointer"
                id="showNewPassword"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? "Show" : "Hide"}
              </div>
              <label htmlFor="email">@name:</label>
              <br />
              <input
                className="bg-white-200 p-2 w-full mb-4"
                placeholder="Email..."
                type="text"
                id="email"
                name="email"
                required
              />
              <br />
              <div className="p-2"></div>
              {/* <button
                                className="bg-purple-400 p-2 mb-10 w-full text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600"
                                type="submit"
                                id="signupButton"
                            >
                                Continue Sign Up
                            </button> */}
            </form>

            {isGetQuestion ? (
              <>
                <p id="signupMessage"></p>
                <div id="questionDiv">
                  <p>Please solve the following maths question: 10 - 9</p>
                </div>
                <div id="answerContainer" className="p-2">
                  <input
                    type="text"
                    className="w-full"
                    id="answerInput"
                    placeholder="Your answer"
                  />
                </div>
                <button
                  className="bg-green-200 p-2 mb-10 w-full sm-radius border"
                  id="submitButton"
                  onClick={handleGetQuestion}
                >
                  Submit Answer
                </button>{" "}
              </>
            ) : (
              <button
                className="bg-green-200 p-2 mb-10 w-full sm-radius border"
                id="submitButton"
                onClick={handleGetQuestion}
              >
                Get Question
              </button>
            )}
            <br />
            <hr />
          </div>
        ) : (
          <>
            <form action="/submit-your-form-handler" method="POST">
              <div className="form-group mb-4">
                <input
                  className="p-3 border border-gray-300 rounded-md w-full"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  required
                  className="w-full p-3 border border-gray-300 rounded pr-10"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  id="toggle-password"
                  className="absolute right-3 top-3 text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <CrossEyeIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </button>
              </div>
            </form>
            <form id="loginForm">
              <div className="font-xl font-bold mb-10"></div>
              <button
                className="bg-purple-400 p-2 mb-10 w-full radius-sm block text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600"
                type="submit"
              >
                Login with Email
              </button>
            </form>
            <div className="flex justify-center items-center mb-4">
              <hr className="border-t-1 border-gray-300 w-full" />
            </div>
            <p className="text-sm text-light mt-8">
              Contact your account manager if you cannot Sign in
            </p>
          </>
        )}

        <div className="text-sm text-center">
          <div className="p-2">
            {" "}
            Don't have an account?{" "}
            <a
              href="#"
              id="signupLink"
              className="text-purple-600"
              onClick={handleSignUp}
            >
              Sign Up
            </a>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <span className="border-t border-gray-300 flex-grow"></span>
        </div>
        <div className="flex text-sm items-center justify-center p-2">
          <div className="p-2">
            <a
              href="https://www.captrii.com/paps/terms.html"
              className="text-purple-600"
            >
              Terms of Use
            </a>
          </div>
          <div className="p-2">
            <a
              href="https://www.captrii.com/paps/privacy.html"
              className="text-purple-600"
            >
              Privacy Policy
            </a>
          </div>
          <div className="p-2">
            <a href="#" id="open-modal" className="text-purple-600">
              Video Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;