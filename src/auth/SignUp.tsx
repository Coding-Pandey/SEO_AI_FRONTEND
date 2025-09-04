import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpFormData, validateSignUpForm } from "./Validations";
import { SignUpUser } from "./Services";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<"user" | "moderator">("moderator");  
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    organization: {
      name: "",
      slug: "",
      domain: "",
      allow_public_signup: false,
    },
  });

  const [errors, setErrors] = useState<any>({});

  const storedData = localStorage.getItem("user_Data");
  const userData = storedData ? JSON.parse(storedData) : null;

  useEffect(() => {
    if (userData) {
      if (
        userData.user?.role === "user" ||
        userData.user?.role === "moderator"
      ) {
        navigate("/dashBoard");
      } else if (userData.user?.role === "admin") {
        navigate("/adminDashBoard");
      }
    }
  }, [navigate, userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("organization.")) {
      const field = name.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        organization: { ...prev.organization, [field]: value },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(role, "role");
    const errors = validateSignUpForm(formData, role);
    if (Object.keys(errors).length === 0) {
      try {
        const payload: any = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: role === "user" ? "user" : "moderator",
        };

        if (role === "moderator") {
          payload.organization = {
            name: formData.organization.name,
            slug: formData.organization.slug,
            domain: formData.organization.domain,
            allow_public_signup: false,
          };
        }

        const response = await SignUpUser(payload);

        if (response.status === 201 || response.status === 200) {
          const { role } = response.data;
          toast.success("User SignUp Successful!", {
            position: "top-right",
            autoClose: 2000,
          });
          if (role === "user" || role === "moderator") {
            setTimeout(() => {
              navigate("/");
            }, 100);
          }
        }
      } catch (error) {
        console.error("SignUp failed:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const handleRoleChange = (newRole: "user" | "moderator") => {
    setRole(newRole);
    setErrors({});
  };

  return (
    <div className="sign_wrapper">
      <div className="row mx-0">
        <div className="col-12 col-sm-4 col-lg-3 bg_blue">
          <div className="sign_sidebar">
            <div className="sign_logo_wrapper">
              <img
                src="/assets/images/logo-white.svg"
                className="img-fluid sign-logo"
                alt="logo"
              />
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
                <h2 className="font_30 font_600 mb-3">Sign Up</h2>
                <p className="font_16">Create your account</p>

                {/* Role Selection */}
                <div className="mb-3 d-flex gap-4">
                  {/* <label>
                    <input
                      type="radio"
                      name="role"
                      checked={role === "user"}
                      onChange={() => handleRoleChange("user")}
                    />{" "}
                    User
                  </label> */}
                  <label>
                    <input
                      type="radio"
                      name="role"
                      checked={role === "moderator"}
                      onChange={() => handleRoleChange("moderator")}
                    />{" "}
                    Organization
                  </label>
                </div>

                {/* Username */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors?.username && (
                    <div className="text-danger mt-1">{errors?.username}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
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

                {/* Password */}
                <div className="mb-3">
                  <input
                    className="form-control"
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

                {/* Extra fields only for Organization */}
                {role === "moderator" && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Organization Name"
                        name="organization.name"
                        value={formData.organization.name}
                        onChange={handleChange}
                      />
                      {errors["organization.name"] && (
                        <p className="text-danger">
                          {errors["organization.name"]}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Organization Slug"
                        name="organization.slug"
                        value={formData.organization.slug}
                        onChange={handleChange}
                      />
                      {errors["organization.slug"] && (
                        <p className="text-danger">
                          {errors["organization.slug"]}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Organization Domain"
                        name="organization.domain"
                        value={formData.organization.domain}
                        onChange={handleChange}
                      />
                      {errors["organization.domain"] && (
                        <p className="text-danger">
                          {errors["organization.domain"]}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <button type="submit" className="btn primary_btn w-100">
                  Submit
                </button>

                <p className="font_14 gray_clr my-4 text-center">
                  Already have an account?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "600",
                      textDecoration: "underline",
                      color: "rgb(250, 122, 78)",
                    }}
                    onClick={() => navigate("/")}
                  >
                    SIGN IN
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
