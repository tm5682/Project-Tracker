import Create from "./components/Create";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  //v6 routers
  return (
    <>
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route path="/registration" element={<RegistrationPage />} />

              

<         Route exact path='/' element={<PrivateRoute/>}>
             
            <Route path="profile" element={<UpdateProfile />} />

            <Route path=":userID/selectProject" element={<SelectProject />} />

            <Route path=":userID/project/:projectId" element={<ProjectPage />} />

            <Route
              path="/:projectId/addWorkOrder/"
              element={<AddWorkOrder />}
            />  

            <Route
              path="/project/:projectId/:workOrderId"
              element={<WorkOrderPage />}
            />

            <Route path="/userManagement/" element={<UserManagementPage />} />

             
             
            <Route
              exact
              path="/"
              element={
                <Container>
                  <MainHomeView />
                </Container>
              }
            />



        </Route>



            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
