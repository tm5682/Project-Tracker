import Create from "./components/Create";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import Layout from "./components/Layout";

import SelectProject from "./components/projectComponents/SelectProject";
import DocumentPage from "./components/documentControl/DocumentPage";

import AddWorkOrder from "./components/workOrderForms/AddWorkOrder";

import ProjectPage from "./components/projectComponents/ProjectPage";

import ProjectPageWorkOrderTable from "./components/projectComponents/ProjectPageWorkOrderTable";

import WorkOrderPage from "./components/workOrderPage.js/WorkOrderPage";

import EditUserProfile from "./components/userManagement.js/EditUserProfile";

import MainHomeView from "./components/homeView/MainHomeView";

import UserManagementPage from "./components/userManagement.js/UserManagementPage";

import LoginPage from "./components/authentication/LoginPage";

import RegistrationPage from "./components/authentication/RegistrationPage";

import { AuthProvider } from "./components/contexts/AuthContext";

import UpdateProfile from "./components/authentication/UpdateProfile";

const App = () => {
  //v6 routers
  return (
    //<ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="profile" element={<UpdateProfile />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/registration" element={<RegistrationPage />} />

            <Route path="/issue/:projectId" element={<Create />} />

            <Route path="/selectProject" element={<SelectProject />} />

            <Route path="/project/:projectId" element={<ProjectPage />} />

            <Route path="/document" element={<DocumentPage />} />

            <Route path="/addWorkOrder/:projectId" element={<AddWorkOrder />} />

            <Route
              path="/project/:projectId/:workOrderId"
              element={<WorkOrderPage />}
            />

            <Route
              path="/userManagement/:projectId/:userId"
              element={<EditUserProfile />}
            />

            <Route
              path="/userManagement/:projectId"
              element={<UserManagementPage />}
            />

            <Route
              exact
              path="/"
              element={
                <Container>
                  <MainHomeView />
                </Container>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
    //</ThemeProvider>
  );
};

export default App;
