import React, { useState } from "react";
import {
  AddDomainCrawlURL,
  DeleteOldDomain,
} from "../User/SeoProcess/SeoServices";

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

  const isValidDomain = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSubmitDomain = async () => {
    setErrorMsg("");
    if (content.trim() === "") {
      setErrorMsg("⚠️ Domain is required.");
      return;
    }

    if (!isValidDomain(content.trim())) {
      setErrorMsg("⚠️ Domain must start with http:// or https://");
      return;
    }
    setNewLoading(true);
    try {
      const formData = {
        domain: content,
      };
      const response = await AddDomainCrawlURL(formData);
      if (response.status === 201 || response.status === 200) {
        const res = await DeleteOldDomain(AddAlreadySelectSite?.uuid);
        if (res.status === 201 || res.status === 200) {
          const domainSite = response.data;
          onSelect(domainSite);
        }
      }
    } catch (error) {
    } finally {
      setNewLoading(false);
    }
  };

  return (
    <div className="modal-overlays">
      <div className="modal-contents" style={{ position: "relative" }}>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h4>{title}</h4>

        <textarea
          className="form-control mb-3"
          placeholder="Enter domain e.g. https://example.com"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
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
          <button
            className="btn btn-success"
            style={{
              backgroundColor: "rgb(250, 122, 78)",
              color: "white",
              border: "none",
            }}
            onClick={handleSubmitDomain}
          >
            {NewLoading ? "Please Wait..." : "Submit"}
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainModal;
