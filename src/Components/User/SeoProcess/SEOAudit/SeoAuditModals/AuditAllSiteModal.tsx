import React, { useEffect, useState } from "react";
import { AddDomainCrawlURL } from "../../SeoServices";
import { GetUserDetails } from "../../../Services/Services";

export interface Site {
  uuid: string;
  crawl_url: string;
}

interface AuditAllSiteModalProps {
  isOpen: boolean;
  onSelect: (site: Site) => void;
  AllData: any;
  AlreadySelectedCrawl: string | null;
  isLoading: boolean;
}

const AuditAllSiteModal: React.FC<AuditAllSiteModalProps> = ({
  isOpen,
  onSelect,
  AllData,
  AlreadySelectedCrawl,
  isLoading,
}) => {
  const [domainInput, setDomainInput] = useState<string>("");
  const [NewLoading, setNewLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
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

  useEffect(() => {
    if (isOpen && AlreadySelectedCrawl === "True") {
      const matched = AllData?.find(
        (site: any) => site.selected_site === "True"
      );
      if (matched) {
        const matchedSite = {
          uuid: matched.uuid,
          crawl_url: matched.crawl_url,
        };
        onSelect(matchedSite);
      }
    }
  }, [isOpen, onSelect, AlreadySelectedCrawl]);

  const isValidDomain = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSubmitDomain = async () => {
    setErrorMsg("");
    if (domainInput.trim() === "") {
      setErrorMsg("⚠️ Domain is required.");
      return;
    }

    if (!isValidDomain(domainInput.trim())) {
      setErrorMsg("⚠️ Domain must start with http:// or https://");
      return;
    }
    setNewLoading(true);
    try {
      const formData = {
        domain: domainInput,
        timezone: SelectedTimezone,
      };
      const response = await AddDomainCrawlURL(formData);
      if (response.status === 201) {
        const domainSite = response.data;
        onSelect(domainSite);
      }
    } catch (error) {
    } finally {
      setNewLoading(false);
    }
  };

  return (
    <>
      {(AlreadySelectedCrawl === "false" ||
        AlreadySelectedCrawl === null ||
        AlreadySelectedCrawl === undefined) &&
        !isLoading && (
          <div className="modal-container">
            <h2 className="font_25 font_600 mb-3">
              🔗 Manage Your Crawl Sites
            </h2>
            <div className="form-container">
              <h3 className="font_18 mb-2">🔍 Enter a New Domain</h3>
              <div className="domain-input-container responsive-form">
                <input
                  type="text"
                  placeholder="Enter domain e.g. https://example.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  className="form-control mb-2"
                />
                <button
                  type="submit"
                  onClick={handleSubmitDomain}
                  className="primary_btn"
                >
                  {NewLoading ? "Please Wait..." : "Search & Crawl"}
                </button>
              </div>

              {errorMsg && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
              )}
            </div>
          </div>
        )}
    </>
  );
};

export default AuditAllSiteModal;
