import { useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

import cuid from "cuid";

function AddProject({ onAdd }) {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [actionList, setActionList] = useState(false);

  const [status, setStatus] = useState("Ongoing");

  //today's date - we use it as default for project start date if no date is passed
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const [startDate, setStartDate] = useState(today.toLocaleDateString());

  const [estimatedEndDate, setEstimatedEndDate] = useState("");

  const [estimatedBudget, setEstimatedBudget] = useState("");

  const [currentTotalCost, setCurrentTotalCost] = useState("");

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    //validation
    if (!name) {
      alert("Please add a Project Name");
      return;
    }

    //temp values
    let finalBudget = null;
    let actualEndDate = null;

    addProject({
      name,
      clientName,
      actionList,
      status,
      startDate,
      estimatedEndDate,
      estimatedBudget,
      currentTotalCost,
      finalBudget,
      actualEndDate,
    });

    setName("");
    setClientName("");
    setActionList(false);
    setStatus("");
    setStartDate(today.toLocaleDateString());
    setEstimatedEndDate("");
    setEstimatedBudget("");
    setCurrentTotalCost("");
  };

  //add project with firebase installed and setup
  //we destructure the prop before adding
  const addProject = async ({
    name,
    clientName,
    actionList,
    status,
    startDate,
    estimatedEndDate,
    estimatedBudget,
    currentTotalCost,
    finalBudget,
    actualEndDate,
  }) => {
    //unique id for the project
    const newProjectId = cuid();

    //mapping new project data to be added
    const newProjectData = {
      id: newProjectId,
      name: name,
      clientName: clientName,
      actionList: actionList,
      status: status,
      startDate: startDate,
      estimatedEndDate: estimatedEndDate,
      actualEndDate: actualEndDate || null,
      estimatedBudget: estimatedBudget,
      finalBudget: finalBudget || null,
      currentTotalCost: currentTotalCost,
    };

    await setDoc(doc(db, "projectList", newProjectId), newProjectData);

    //we are updating the state with the newly added project values
    //setProjects([...projectList, newProjectData]);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Project Name</label>
        <input
          type="text"
          placeholder="Add Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Client Name</label>
        <input
          type="text"
          placeholder="Add Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Project Status</label>
        <input
          type="text"
          placeholder="Ongoing, On Hold, Completed"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Project Start Date </label>
        <input
          type="date"
          placeholder="Project Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Estimated Project Completion Date </label>
        <input
          type="date"
          placeholder="Project End Date"
          value={estimatedEndDate}
          onChange={(e) => setEstimatedEndDate(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Estimated Project Budget</label>${" "}
        <input
          type="number"
          placeholder="Estimated initial project budget"
          value={estimatedBudget}
          onChange={(e) => setEstimatedBudget(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Expenses incurred so far</label>
        $
        <input
          type="number"
          placeholder="Costs alredy spent on project"
          value={currentTotalCost}
          onChange={(e) => setCurrentTotalCost(e.target.value)}
        />
      </div>

      <input type="submit" value="Save Project" className="btn btn-block" />
    </form>
  );
}

export default AddProject;
