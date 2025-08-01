import React, { useEffect, useState } from "react";
import Select from "react-select";
import { GetFacebookPages, UpdatePlateFormList } from "./SocialMediaServices";

interface DynamicModalProps {
  isOpen: boolean;
  selectedFacebookList: any;
  setSelectedFacebookList: any;
  onClose: () => void;
  handleCancel: () => void;
}

const FaceBookListModal: React.FC<DynamicModalProps> = ({
  isOpen,
  selectedFacebookList,
  setSelectedFacebookList,
  onClose,
  handleCancel,
}) => {
  const [facebookList, setFacebookList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);

      const resFacebook = await GetFacebookPages();

      if (resFacebook.status === 200 || resFacebook.status === 201) {
        setFacebookList(resFacebook.data.pages);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshList = async () => {
    try {
      setSelectedFacebookList([]);
      setIsLoading(true);
      const response = await UpdatePlateFormList();
      if (response.status === 200 || response.status === 201) {
        const resFacebook = await GetFacebookPages();
        if (response.status === 200 || response.status === 201) {
          setFacebookList(resFacebook.data.pages);
        }
      }
    } catch (error: any) {
      console.error("Error handleRefreshList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const facebookOptions = facebookList.map((page: any) => ({
    value: page.page_id,
    label: page.name,
  }));

  const handleSubmit = () => {
    if (selectedFacebookList.length === 0) {
      setError("Facebook Pages is required");
      return;
    }
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="schedule_box">
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <label style={{ margin: 0 }}>Select Facebook Pages:</label>
              <span
                style={{ cursor: "pointer", fontSize: 16 }}
                onClick={handleRefreshList}
              >
                🔄
              </span>
            </div>
            <Select
              isMulti
              options={facebookOptions}
              value={selectedFacebookList}
              onChange={(selected) => {
                setSelectedFacebookList(selected as any[]);
                if ((selected as any[])?.length > 0) {
                  setError("");
                }
              }}
              placeholder="Select one or more pages"
            />
            {error && (
              <div style={{ color: "red", marginTop: 5, fontSize: 14 }}>
                {error}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button className="btn primary_btn" onClick={handleSubmit}>
              {isLoading ? "Please Wait.." : "Submit"}
            </button>
            <button className="btn secondary_btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceBookListModal;
