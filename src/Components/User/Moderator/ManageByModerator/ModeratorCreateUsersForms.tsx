import { useState } from "react";
import { toast } from "react-toastify";
import { validateSignUpForm } from "../../../../auth/Validations";
import { ModeratorCreateUser } from "../ModeratorService";
import { capitalizeFirstLetter } from "../../SeoProcess/SEOReport/Reports";
 
interface Props {
  onClose: () => void; // ✅ add prop for close button
  onHandleSubmit: () => void;
}

const ModeratorCreateUsersForms = ({ onClose, onHandleSubmit }: Props) => {
  const [role, setRole] = useState<"user" | "moderator" | "admin">("user");
  const [formData, setFormData] = useState<any>({
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
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateSignUpForm(formData, role);
    if (Object.keys(errors).length === 0) {
      try {
        const payload: any = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: role,
        };

        if (role === "moderator") {
          payload.organization = {
            name: formData.organization.name,
            slug: formData.organization.slug,
            domain: formData.organization.domain,
            allow_public_signup: false,
          };
        }

        const response = await ModeratorCreateUser(payload);

        if (response.status === 201 || response.status === 200) {
          toast.success(
            `${capitalizeFirstLetter(role)} Created Successfully!`,
            { position: "top-right", autoClose: 2000 }
          );
          onHandleSubmit();
        }
      } catch (error) {
        console.error("SignUp failed:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const handleRoleChange = (newRole: "user" | "moderator" | "admin") => {
    setRole(newRole);
    setErrors({});
  };

  return (
    <div className="inner_content ">
      <div className="col-12 col-sm-8 col-lg-6">
        <div className="sign_body">
          <form onSubmit={handleSubmit}>
            <div className="sign_in_form">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="font_25 font_600">Create User</h2>
                <button
                  type="button"
                  className="btn primary_btn" // or your custom class
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              {/* Role Selection */}
              <div className="mb-3 d-flex gap-4 mt-4">
                <label>
                  <input
                    type="radio"
                    name="role"
                    checked={role === "user"}
                    onChange={() => handleRoleChange("user")}
                  />{" "}
                  Normal User
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
              <button type="submit" className="btn primary_btn w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorCreateUsersForms;
