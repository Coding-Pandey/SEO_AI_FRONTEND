import React, { useEffect, useRef, useState } from "react";
import { AddDomainCrawlURL } from "../../SeoServices";
import { GetUserDetails } from "../../../Services/Services";
import CrawlingLoader from "../../../../Page/Loading/CrawlingLoader";

export interface Site {
  uuid: string;
  crawl_url: string;
}

interface AuditAllSiteModalProps {
  isOpen: boolean;
  onAlreadySelect: (site: Site) => void;
  onSelect: (site: Site) => void;
  AllData: any;
  AlreadySelectedCrawl: string | null;
  isLoading: boolean;
}

const AuditAllSiteModal: React.FC<AuditAllSiteModalProps> = ({
  isOpen,
  onAlreadySelect,
  onSelect,
  AllData,
  AlreadySelectedCrawl,
  isLoading,
}) => {
  const [domainInput, setDomainInput] = useState<string>("");
  const [NewLoading, setNewLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [SelectedTimezone, setSelectedTimezone] = useState<any>();
  const hasRunAlreadySelect = useRef<boolean>(false);
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
    const inProgress = localStorage.getItem("crawlInProgress");
    const taskId = localStorage.getItem("crawlId");

    if (!hasRunAlreadySelect.current) {
      if (inProgress !== "true" && !taskId) {
        if (isOpen && AlreadySelectedCrawl === "True") {
          const matched = AllData?.find(
            (site: any) => site.selected_site === "True"
          );
          if (matched) {
            const matchedSite = {
              uuid: matched.uuid,
              crawl_url: matched.crawl_url,
            };
            onAlreadySelect(matchedSite);
            hasRunAlreadySelect.current = true;
          }
        }
      }
    }
  }, [isOpen, AlreadySelectedCrawl, AllData, onAlreadySelect]);

  const sanitizeDomain = (value: string) => {
    return value.replace(/^https?:\/\//i, "").trim();
  };

  const handleSubmitDomain = async () => {
    setErrorMsg("");
    if (domainInput.trim() === "") {
      setErrorMsg("⚠️ Domain is required.");
      return;
    }

    setNewLoading(true);
    try {
      const formData = {
        domain: `https://${domainInput}`,
        timezone: SelectedTimezone,
      };
      const response = await AddDomainCrawlURL(formData);
      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === 202
      ) {
        const domainSite = response.data;
        localStorage.setItem("crawlInProgress", "true");
        localStorage.setItem("crawlId", domainSite.task_id);
        onSelect(domainSite);
      }
    } catch (error) {
      console.error("Error submitting domain:", error);
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
          <>
            {NewLoading && <CrawlingLoader />}
            <div className="crawl-container">
              <div className="crawl-input-wrapper mt-5">
                <span className="crawl-prefix">https://</span>
                <div className="tooltip-icon_wrapper">
                  <input
                    type="text"
                    placeholder="Enter your domain"
                    value={domainInput}
                    onChange={(e) =>
                      setDomainInput(sanitizeDomain(e.target.value))
                    }
                    className="crawl-input"
                  />
                  <p
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#555",
                    }}
                    className="tooltip-icon"
                  >
                    ⓘ
                    <span
                      className="tooltip-text"
                      style={{
                        visibility: "hidden",
                        width: "240px",
                        backgroundColor: "#333",
                        color: "#fff",
                        textAlign: "center",
                        borderRadius: "6px",
                        padding: "6px",
                        position: "absolute",
                        zIndex: 1,
                        bottom: "125%",
                        left: "50%",
                        marginLeft: "-120px",
                        fontSize: "12px",
                        opacity: 0,
                        transition: "opacity 0.3s",
                      }}
                    >
                      Use <b>www.example.com</b> if your site runs on "www".
                      Otherwise, enter <b>example.com</b>.
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmitDomain}
                className="crawl-btn"
                disabled={!domainInput.trim()}
              >
                Crawl
              </button>

              {errorMsg && <p className="crawl-error">{errorMsg}</p>}
            </div>
          </>
        )}
    </>
  );
};

export default AuditAllSiteModal;
