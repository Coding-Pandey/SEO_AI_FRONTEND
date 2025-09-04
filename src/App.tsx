import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./Components/Page/Loading/Loading";
import PageNotFound from "./Components/Page/PageNotFound";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Logout from "./Components/Page/Logout";
const Login = lazy(() => import("./auth/Login"));
const SignUp = lazy(() => import("./auth/SignUp"));

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
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Logout" element={<Logout />} />
          {/* Protected Routes Admin*/}
          <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
            <Route path="/adminDashBoard" element={<AdminDashBoard />} />
            <Route path="/Admin-Profile" element={<AdminProfile />} />
            <Route
              path="/users-organization"
              element={<UsersAndOrganization />}
            />
            <Route path="/active-session" element={<ActiveSession />} />
            <Route path="/security_logs" element={<SecurityLogs />} />
            <Route path="/organization-management" element={<Organizations />} />
          </Route>
          {/* Protected Routes User */}
          <Route
            element={<ProtectedRoutes allowedRoles={["user", "moderator"]} />}
          >
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/seo/keywordTool" element={<KeywordTool />} />
            <Route
              path="/seo/keywordToolResult"
              element={<KeywordToolResult />}
            />
            <Route
              path="/seo/SuggestionsResultById/:id"
              element={<SuggestionsResultById />}
            />
            <Route path="/seo/Reports" element={<Reports />} />
            <Route path="/seo/SeoAudit" element={<SeoAudit />} />

            <Route path="/ppc/CreateCampaign" element={<CreateCampaign />} />
            <Route
              path="/ppc/CreateCampaignKeywordResult"
              element={<CreateCampaignKeywordResult />}
            />
            <Route
              path="/ppc/CampaignSuggestionById/:id"
              element={<CampaignSuggestionById />}
            />

            <Route path="/social/GeneratePost" element={<GeneratePost />} />
            <Route
              path="/social/GeneratedPostResult/:id"
              element={<GeneratedPostResult />}
            />
            <Route path="/social/Planner" element={<Planner />} />

            <Route
              path="/content/ContentGeneration"
              element={<ContentGeneration />}
            />
            <Route
              path="/content/ContentGenerationResult"
              element={<ContentGenerationResult />}
            />
            <Route
              path="/content/ContentSuggestionResult"
              element={<ContentSuggestionResult />}
            />
            <Route
              path="/content/ContentGeneratBySeo"
              element={<ContentGeneratBySeo />}
            />
            <Route
              path="/content/ContentPreviousList/:id"
              element={<ContentPreviousList />}
            />

            <Route path="/ProfileSetting" element={<ProfileSetting />} />
            <Route
              path="/ProfileSettingSuccess/:category"
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
