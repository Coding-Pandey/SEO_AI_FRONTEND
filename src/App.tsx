import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./Components/Page/Loading/Loading";
import PageNotFound from "./Components/Page/PageNotFound";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Logout from "./Components/Page/Logout";
const Login = lazy(() => import("./auth/Login"));
const SignUp = lazy(() => import("./auth/SignUp"));
const EmailVerification = lazy(() => import("./auth/EmailVerification"));
//Admin
const AdminDashBoard = lazy(
  () => import("./Components/Admin/AdminDashboard/AdminDashBoard")
);
const UsersAndOrganization = lazy(
  () => import("./Components/Admin/UsersAndOrganization/UsersAndOrganization")
);

const ActiveSession = lazy(
  () => import("./Components/Admin/ActiveSession/ActiveSession")
);

const AdminProfile = lazy(
  () => import("./Components/Admin/AdminComponent/AdminProfile/AdminProfile")
);

const SecurityLogs = lazy(
  () => import("./Components/Admin/SecurityLogs/SecurityLogs")
);

const Organizations = lazy(
  () => import("./Components/Admin/Organizations/Organizations")
);
//User
const DashBoard = lazy(() => import("./Components/User/DashBoard/DashBoard"));

const KeywordTool = lazy(
  () => import("./Components/User/SeoProcess/SEOKeywordTool/KeywordTool")
);
const SeoAudit = lazy(
  () => import("./Components/User/SeoProcess/SEOAudit/SeoAudit")
);
const KeywordToolResult = lazy(
  () => import("./Components/User/SeoProcess/SEOKeywordTool/KeywordToolResult")
);
const SuggestionsResultById = lazy(
  () =>
    import("./Components/User/SeoProcess/SEOKeywordTool/SuggestionsResultById")
);
const Reports = lazy(
  () => import("./Components/User/SeoProcess/SEOReport/Reports")
);

const GeneratePost = lazy(
  () =>
    import("./Components/User/SocialMedia/GeneratePostSocialMedia/GeneratePost")
);
const Planner = lazy(
  () => import("./Components/User/SocialMedia/PlannerSocialMedia/Planner")
);
const GeneratedPostResult = lazy(
  () =>
    import(
      "./Components/User/SocialMedia/GeneratePostSocialMedia/GeneratedPostResult"
    )
);

const CreateCampaign = lazy(
  () => import("./Components/User/PPC/CreateCampaign")
);
const CreateCampaignKeywordResult = lazy(
  () => import("./Components/User/PPC/CreateCampaignKeywordResult")
);
const CampaignSuggestionById = lazy(
  () => import("./Components/User/PPC/CampaignSuggestionById")
);
const ContentGenerationResult = lazy(
  () => import("./Components/User/Content/ContentGenerationResult")
);
const ContentSuggestionResult = lazy(
  () => import("./Components/User/Content/ContentSuggestionResult")
);
const ContentGeneratBySeo = lazy(
  () => import("./Components/User/Content/ContentGeneratBySeo")
);
const ContentPreviousList = lazy(
  () => import("./Components/User/Content/ContentPreviousList")
);
const ContentGeneration = lazy(
  () => import("./Components/User/Content/ContentGeneration")
);

const ProfileSetting = lazy(
  () => import("./Components/User/Setting/ProfileSetting")
);
const ProfileSettingSuccess = lazy(
  () => import("./Components/User/Setting/ProfileSettingSuccess")
);

function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          <Route
            path="/email-verify/register"
            element={<EmailVerification />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Logout" element={<Logout />} />
          {/* Protected Routes Admin*/}
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashBoard />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route
              path="/users-organization"
              element={<UsersAndOrganization />}
            />
            <Route path="/active-session" element={<ActiveSession />} />
            <Route path="/security_logs" element={<SecurityLogs />} />
            <Route
              path="/organization-management"
              element={<Organizations />}
            />
          </Route>
          {/* Protected Routes User */}
          <Route
            element={<ProtectedRoutes allowedRoles={["user", "moderator"]} />}
          >
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/seo/keyword-tool" element={<KeywordTool />} />
            <Route
              path="/seo/keyword-tool-result"
              element={<KeywordToolResult />}
            />
            <Route
              path="/seo/suggestions-result-by-id/:id"
              element={<SuggestionsResultById />}
            />
            <Route path="/seo/reports" element={<Reports />} />
            <Route path="/seo/seo-audit" element={<SeoAudit />} />

            <Route path="/ppc/create-campaign" element={<CreateCampaign />} />
            <Route
              path="/ppc/create-campaign-keyword-result"
              element={<CreateCampaignKeywordResult />}
            />
            <Route
              path="/ppc/campaign-suggestion-by-id/:id"
              element={<CampaignSuggestionById />}
            />

            <Route path="/social/generate-post" element={<GeneratePost />} />
            <Route
              path="/social/generated-post-result/:id"
              element={<GeneratedPostResult />}
            />
            <Route path="/social/planner" element={<Planner />} />

            <Route
              path="/content/content-generation"
              element={<ContentGeneration />}
            />
            <Route
              path="/content/content-generation-result"
              element={<ContentGenerationResult />}
            />
            <Route
              path="/content/content-suggestion-result"
              element={<ContentSuggestionResult />}
            />
            <Route
              path="/content/content-generate-by-seo"
              element={<ContentGeneratBySeo />}
            />
            <Route
              path="/content/content-previous-list/:id"
              element={<ContentPreviousList />}
            />

            <Route path="/profile-setting" element={<ProfileSetting />} />
            <Route
              path="/profile-setting-success/:category"
              element={<ProfileSettingSuccess />}
            />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
