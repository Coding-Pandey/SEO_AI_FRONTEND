import React from "react";
import { capitalizeFirstLetter } from "../User/SeoProcess/Reports";

interface PostItem {
  uuid: string;
  file_name: string;
  last_reset: string;
}

interface Props {
  posts: PostItem[];
  onDelete: (uuid: string) => void;
  onNavigate:(uuid: string) => void;
}

const PreviouslyCreatedPosts: React.FC<Props> = ({ posts, onDelete,onNavigate }) => {
 

  return (
    <div className="col-12 col-xl-5">
      <div className="previously_created_warpper">
        <h2 className="font_25 font_500 mb-4">
          Previously Created ({posts.length}/10)
        </h2>
          {posts.length === 0 ? (
        <p className="text-muted">No previously created files available at the moment.</p>
      ) : (
        <ul className="previous_post p-0">
          {posts.map((item) => {
            const expirationDate = new Date(item.last_reset);
            const currentDate = new Date();

            const expDate = new Date(
              expirationDate.getFullYear(),
              expirationDate.getMonth(),
              expirationDate.getDate()
            );
            const currDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            );

            const remainingDays = Math.ceil(
              (expDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            const isExpired = remainingDays < 0;
            const isExpiringToday = remainingDays === 0;

            return (
              <li className="previous_item row" key={item.uuid}>
                <div className="col-7">
                  <h3 className="font_16 font_600">{capitalizeFirstLetter(item.file_name.trim())}</h3>
                  <p className="font_16 mb-0">
                    {isExpired
                      ? "File Expired"
                      : isExpiringToday
                      ? "Expires today"
                      : `Expires in ${remainingDays} day${
                          remainingDays > 1 ? "s" : ""
                        }`}
                  </p>
                </div>
                <div className="col-5 text-end">
                  <button
                    className="btn primary_btn"
                    disabled={isExpired}
                    onClick={() => onNavigate(item.uuid)}
                    style={{
                      opacity: isExpired ? 0.5 : 1,
                      cursor: isExpired ? "not-allowed" : "pointer",
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn pe-0 text_orange font_20"
                    onClick={() => onDelete(item.uuid)}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        )}
      </div>
    </div>
  );
};

export default PreviouslyCreatedPosts;
