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

const App = () => {
  //v6 routers
  return (
    //<ThemeProvider theme={theme}>
    <Router>
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Container>
                <ProjectPage />
              </Container>
            }
          />

          <Route path="/issue/:projectId" element={<Create />} />

          <Route path="/selectProject" element={<SelectProject />} />

          <Route path="/project/:projectId" element={<ProjectPage />} />

          <Route path="/document" element={<DocumentPage />} />

          <Route path="/addWorkOrder/:projectId" element={<AddWorkOrder />} />

          <Route
            path="project/:projectId/:workOrderId"
            element={<WorkOrderPage />}
          />
        </Routes>
      </Layout>
    </Router>
    //</ThemeProvider>
  );
};

export default App;
