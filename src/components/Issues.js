import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";

import CardNote from "./CardNote";

function Issues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/issues/" + id, {
      method: "DELETE",
    });

    const newIssues = issues.filter((issue) => issue.id != id);
    setIssues(newIssues);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {issues.map((issue) => (
          <Grid item key={issue.id} xs={12} md={6} lg={4}>
            <CardNote issue={issue} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Issues;
