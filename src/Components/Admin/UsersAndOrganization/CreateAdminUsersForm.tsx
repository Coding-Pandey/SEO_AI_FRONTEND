import { useState } from "react";
import { toast } from "react-toastify";
import { SignUpFormData, validateSignUpForm } from "../../../auth/Validations";
import { AdminCreateUser } from "../Service";
import { capitalizeFirstLetter } from "../../User/SeoProcess/SEOReport/Reports";

interface Props {
  onClose: () => void; // ✅ add prop for close button
  onHandleSubmit: () => void;
}

const CreateAdminUsersForm = ({ onClose, onHandleSubmit }: Props) => {
  const [role, setRole] = useState<"user" | "moderator" | "admin">("user");
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

        const response = await AdminCreateUser(payload);

        if (response.status === 201 || response.status === 200) {
          toast.success(
            `${capitalizeFirstLetter(role)} Created Successfully!`,
            { position: "top-right", autoClose: 2000 }
          );
          onHandleSubmit(); // ✅ close after success
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
              {/* ✅ Title + Close Button */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="font_20 font_500">
                  Create User / Admin / Organization
                </h2>
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
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    checked={role === "admin"}
                    onChange={() => handleRoleChange("admin")}
                  />{" "}
                  Admin
                </label>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminUsersForm;
