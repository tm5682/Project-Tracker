import { useState } from "react";

function AddProject({ onAdd }) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [actionList, setActionList] = useState(false);

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    //validation
    if (!name) {
      alert("Please add a Project Name");
      return;
    }

    onAdd({ name, client, actionList });

    setName("");
    setClient("");
    setActionList(false);
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
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Set as Favorite</label>
        <input
          type="checkbox"
          value={actionList}
          onChange={(e) => setActionList(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Project" className="btn btn-block" />
    </form>
  );
}

export default AddProject;
