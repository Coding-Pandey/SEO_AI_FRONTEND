import { useEffect, useState } from "react";
import logoWhite from "../assets/images/logo-white.svg";
import {
  LoginFormData,
  validateLoginForm,
  ValidationErrors,
} from "./Validations";
import { googleLoginService, loginUser } from "./Services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { setUsers } = useAuth();
  const userData = localStorage.getItem("user_Data");

  useEffect(() => {
    if (userData) {
      navigate("/dashBoard");
    }
  }, [navigate, userData]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await loginUser(formData);
        if (response.status === 201 || response.status === 200) {
          console.log("user Login Successfully",response.data);
          const { access_token, user } = response.data;
          const combinedData = { access_token, user };
          localStorage.setItem("user_Data", JSON.stringify(combinedData));
          setUsers(combinedData);
          setTimeout(() => {
            navigate("/dashBoard");
          }, 100);
          setFormData({ email: "", password: "" });
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const handleGoogleSubmit = async (profile: any) => {
 
    try {
      const userDetails = {
        username: profile.name,
        email: profile.email,
        oAuthId: profile.sub,
        role: "user",
      };
      const response = await googleLoginService(userDetails);
      const { access_token, user } = response.data;
      if (response.status === 201 || response.status === 200) {
        const combinedData = { access_token, user };
        localStorage.setItem("user_Data", JSON.stringify(combinedData));
        setTimeout(() => {
          navigate("/dashBoard");
        }, 100);
        setUsers(combinedData);
      }
    } catch (error) {
        console.error("Google Login failed:", error);
    }
  };

  const Login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        handleGoogleSubmit(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });

  return (
    <div className="sign_wrapper">
      <div className="row mx-0">
        <div className="col-12 col-sm-4 col-lg-3 bg_blue">
          <div className="sign_sidebar">
            <div className="sign_logo_wrapper">
              <img src={logoWhite} className="img-fluid sign-logo" alt="logo" />
            </div>
            <div className="sign_plan">
              <h3 className="font_25 font_600 mb-3">Plan includes</h3>
              <ul className="plan_list">
                <li>
                  <span>
                    <i className="bi bi-check-circle-fill"></i>
                  </span>
                  <p className="font_16 mb-0">Unlimited employee uploads</p>
                </li>
                <li>
                  <span>
                    <i className="bi bi-check-circle-fill"></i>
                  </span>
                  <p className="font_16 mb-0">Free forever</p>
                </li>
                <li>
                  <span>
                    <i className="bi bi-check-circle-fill"></i>
                  </span>
                  <p className="font_16 mb-0">Full author permissions</p>
                </li>
                <li>
                  <span>
                    <i className="bi bi-check-circle-fill"></i>
                  </span>
                  <p className="font_16 mb-0">Pro tips</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-8 col-lg-9">
          <div className="sign_body">
            <form onSubmit={handleSubmit}>
              <div className="sign_in_form">
                <h2 className="font_30 font_600 mb-3">Sign in</h2>
                <p className="font_16">Sign in using your account with</p>
                <div className="signin_option">
                  <button
                    type="button"
                    onClick={() => Login()}
                    className="btn primary_btn_outline"
                  >
                    <i className="bi bi-google"></i>
                    <span>Google</span>
                  </button>
                  <button type="button" className="btn primary_btn_outline">
                    <i className="bi bi-windows"></i>
                    <span>Microsoft</span>
                  </button>
                </div>

                <p className="font_16">Or log in with your email address</p>
                <div className="mb-3">
                  <label htmlFor="sign_email" className="form-label d-none">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="sign_email"
                    placeholder="Email address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="text-danger mt-1">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="sign_password" className="form-label d-none">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="sign_password"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="text-danger mt-1">{errors.password}</div>
                  )}
                </div>
                <button type="submit" className="btn primary_btn w-100">
                  Submit
                </button>
                <p className="font_14 gray_clr my-2">
                  The site is protected by reCAPTCHA and the Google Privacy
                  Policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
