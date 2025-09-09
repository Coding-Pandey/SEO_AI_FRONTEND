import { useState } from "react";
import { toast } from "react-toastify";
import { ModeratorCreateUser } from "../ModeratorService";
 
interface Props {
  onClose: () => void;
  onHandleSubmit: () => void;
}

const ModeratorCreateUsersForms = ({ onClose, onHandleSubmit }: Props) => {
  const [formData, setFormData] = useState<{ email: string }>({ email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const role="user";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { email?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = { email: formData.email,invited_role:role };
        const response = await ModeratorCreateUser(payload);

        if (response.status === 201 || response.status === 200) {
          toast.success(
            `✅ Email sent for verification. Please check your inbox.`,
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
          onHandleSubmit();
        }
      } catch (error) {
        console.error("SignUp failed:", error);
        toast.error("Failed to create user.");
      }
    }
  };

 

  return (
    <div className="row">
      <div className="col-12 col-sm-8 col-lg-6">
        <div className="sign_body">
          <form onSubmit={handleSubmit}>
            <div className="sign_in_form">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="font_25 font_600">Invite User</h2>
                <button
                  type="button"
                  className="btn primary_btn"
                  onClick={onClose}
                >
                  Close
                </button>
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

              <button type="submit" className="btn primary_btn w-100">
                Invite User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorCreateUsersForms;
