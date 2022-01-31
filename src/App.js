import { useEffect, useState } from "react";

import Create from "./components/Create";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container, createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import Layout from "./components/Layout";

import SelectProject from "./components/projectComponents/SelectProject";
import DocumentPage from "./components/documentControl/DocumentPage";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import cuid from "cuid";

import AddWorkOrder from "./components/workOrderForms/AddWorkOrder";

import ProjectPage from "./components/projectComponents/ProjectPage";

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
                <div></div>
              </Container>
            }
          />

          <Route path="/issue/:projectId" element={<Create />} />

          <Route path="/selectProject" element={<SelectProject />} />

          <Route path="/project/:projectId" element={<ProjectPage />} />

          <Route path="/document" element={<DocumentPage />} />

          <Route path="/addWorkOrder/:projectId" element={<AddWorkOrder />} />
        </Routes>
      </Layout>
    </Router>
    //</ThemeProvider>
  );
};

export default App;
