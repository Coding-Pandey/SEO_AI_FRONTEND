import React, { useEffect, useState } from "react";
import {
  AddDomainCrawlURL,
  // DeleteOldDomain,
} from "../User/SeoProcess/SeoServices";
import { GetUserDetails } from "../User/Services/Services";
import CrawlingLoader from "./Loading/CrawlingLoader";

export interface NewSearchSite {
  uuid: string;
  crawl_url: string;
}

interface DomainModalProps {
  title: string;
  content: string;
  setContent: (value: string) => void;
  handleClose: () => void;
  onSelect: (site: NewSearchSite) => void;
  AddAlreadySelectSite: any;
}

const DomainModal: React.FC<DomainModalProps> = ({
  title,
  content,
  setContent,
  handleClose,
  onSelect,
  AddAlreadySelectSite,
}) => {
  const [NewLoading, setNewLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  console.log(AddAlreadySelectSite);
  const [SelectedTimezone, setSelectedTimezone] = useState<any>();

  useEffect(() => {
    GetTimeZone();
  }, []);

  const GetTimeZone = async () => {
    try {
      const responseData = await GetUserDetails();
      if (responseData?.status === 200 || responseData?.status === 201) {
        if (responseData.data.timezone !== null) {
          setSelectedTimezone(responseData?.data?.timezone);
        }
      }
    } catch (error: any) {
      console.error("Error GetTimeZone:", error);
    }
  };

  const sanitizeDomain = (value: string) => {
    return value.replace(/^https?:\/\//i, "").trim();
  };

  const handleSubmitDomain = async () => {
    setErrorMsg("");

    const trimmedInput = content.trim();

    if (trimmedInput.trim() === "") {
      setErrorMsg("⚠️ Domain is required.");
      return;
    }

    setNewLoading(true);

    try {
      const formData = {
        domain: `https://${trimmedInput}`,
        timezone: SelectedTimezone,
      };

      const response = await AddDomainCrawlURL(formData);

      if (response.status === 200 || response.status === 201) {
        onSelect(response.data);
      }
    } catch (error) {
      console.error("Error submitting domain:", error);
      setErrorMsg("⚠️ Failed to submit domain.");
    } finally {
      setNewLoading(false);
    }
  };

  return (
    <>
      {NewLoading && <CrawlingLoader />}
      <div className="crawl-container">
        <div className="modal-contents" style={{ position: "relative" }}>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>

          <h4>{title}</h4>

          <div className="crawl-input-wrapper mt-5">
            <span className="crawl-prefix">https://</span>
            <input
              type="text"
              placeholder="Enter your domain"
              value={content}
              onChange={(e) => setContent(sanitizeDomain(e.target.value))}
              className="crawl-input"
            />
          </div>
          {errorMsg && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
          )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button className="crawl-btn" onClick={handleSubmitDomain}>
              Crawl
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DomainModal;
