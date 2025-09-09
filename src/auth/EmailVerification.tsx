import { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import {
  validateVerifyEmailForm,
  ValidationEmailErrors,
  VerifyEmailFormData,
} from "./Validations";
import { ValidateInvitation, VerifyUserByEmail } from "./Services";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const email = queryParams.get("email");
  const id = queryParams.get("org_id");
  const token = queryParams.get("token");
  const [formData, setFormData] = useState<VerifyEmailFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationEmailErrors>({});
   const [isValidInvitation, setIsValidInvitation] = useState<boolean | null>(null); 

  // Step 1: Validate invitation when first load
  useEffect(() => {
    const validate = async () => {
      try {
        const response = await ValidateInvitation({
          token,
          moderator_id: id,
          email,
        });

        if (response.status === 200) {
          setIsValidInvitation(true);
          if (email) {
            setFormData((prev) => ({ ...prev, email }));
          }
        } else {
          setIsValidInvitation(false);
          toast.error("Invalid or expired invitation link.");
        }
      } catch (error) {
        console.error("Validation failed:", error);
        setIsValidInvitation(false);
        toast.error("Invalid or expired invitation link.");
      }
    };

    validate();
  }, [token, id, email]);

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateVerifyEmailForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const payload: any = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "user",
          OrganizerId: id,
        };

        const response = await VerifyUserByEmail(payload);

        if (response.status === 201 || response.status === 200) {
          const { role } = response.data;
          toast.success("Your account has been verified successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          if (role === "user") {
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

    // Step 3: Handle loading & invalid cases
  if (isValidInvitation === null) {
    return <div className="text-center mt-5">Validating your invitation...</div>;
  }

  if (isValidInvitation === false) {
    return (
      <div className="text-center mt-5 text-danger">
        ❌ This invitation link is invalid or expired.
      </div>
    );
  }
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
                <h2 className="font_30 font_600 mb-3">Create your account</h2>
                <p className="font_16">
                  Complete the form below to finish creating your account
                </p>

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
                    readOnly
                    style={{
                      backgroundColor: "#f5f5f5",
                      color: "#6c757d",
                      cursor: "not-allowed",
                    }}
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

                <button type="submit" className="btn primary_btn w-100">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
