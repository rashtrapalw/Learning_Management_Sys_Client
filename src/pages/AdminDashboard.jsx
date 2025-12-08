import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [dayTitle, setDayTitle] = useState("");
  const [dayNumber, setDayNumber] = useState("");
  const [recordingLink, setRecordingLink] = useState("");
  const [notesLink, setNotesLink] = useState("");






  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  const addSubject = async () => {
    if (!name.trim()) return;
    await api.post("/subjects", { name });
    setName("");
    fetchSubjects();
  };

  const selectSubject = async (s) => {
    const dRes = await api.get(`/${s._id}/days`);
    s.days = dRes.data;
    setSelectedSubject({ ...s });
  };

const addDay = async () => {
  await api.post(`/${selectedSubject._id}/days`, { 
    title: dayTitle, 
    dayNumber,
    recordingLink,
    notesLink
  });

  setDayTitle('');
  setDayNumber('');
  setRecordingLink('');
  setNotesLink('');

  selectSubject(selectedSubject);
};


  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  const isAddDisabled = !dayTitle || !dayNumber || !recordingLink || !notesLink;

  return (
    <div className="container py-4 admin-dashboard">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">Admin Dashboard</h3>
        <button className="btn btn-danger px-4" onClick={logout}>Logout</button>
      </div>

      {/* Add Subject */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-semibold mb-3">Add New Subject</h5>
        <div className="input-group">
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subject name"
          />
          <button className="btn btn-primary" onClick={addSubject}>Add</button>
        </div>
      </div>

      <div className="row">
        
        {/* Subjects Left Panel */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="fw-semibold mb-3">Subjects</h5>

            <ul className="list-group subject-list">
              {subjects.map(s => (
                <li key={s._id} className="list-group-item d-flex justify-content-between">
                  <span
                    onClick={() => selectSubject(s)}
                    style={{ cursor: "pointer" }}
                    className="subject-name"
                  >
                    {s.name}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={async () => {
                      await api.delete(`/subjects/${s._id}`);
                      fetchSubjects();
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4">

            {/* If no subject selected */}
            {!selectedSubject && (
              <p className="text-muted">Select a subject to manage days.</p>
            )}

            {selectedSubject && (
              <>
{/* Add Day (with recording + notes) */}
<h5 className="fw-semibold">Add Day in {selectedSubject.name}</h5>

<div className="row mt-3 g-2">
  
  <div className="col-md-6">
    <input
      className="form-control"
      value={dayTitle}
      onChange={(e)=>setDayTitle(e.target.value)}
      placeholder="Day Title"
    />
  </div>

  <div className="col-md-6">
    <input
      className="form-control"
      value={dayNumber}
      onChange={(e)=>setDayNumber(e.target.value)}
      placeholder="Day Number"
    />
  </div>

  <div className="col-md-6">
    <input
      className="form-control"
      value={recordingLink}
      onChange={(e)=>setRecordingLink(e.target.value)}
      placeholder="Recording Link"
    />
  </div>

  <div className="col-md-6">
    <input
      className="form-control"
      value={notesLink}
      onChange={(e)=>setNotesLink(e.target.value)}
      placeholder="Notes Link"
    />
  </div>

  <div className="col-12">
    <button
      className="btn btn-success w-100"
      disabled={
        !dayTitle.trim() ||
        !dayNumber.trim() ||
        !recordingLink.trim() ||
        !notesLink.trim()
      }
      onClick={addDay}
    >
      Add Day
    </button>
  </div>
</div>


                {/* Day List */}
                <div className="mt-4">
                  <h5 className="fw-semibold">Days</h5>

                  {selectedSubject.days?.map(d => (
                    <div key={d._id} className="card shadow-sm mb-2">
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <h6 className="fw-bold m-0">{d.title}</h6>
                          <small className="text-muted">Day {d.dayNumber}</small>
                          <div>
                            <a href={d.recordingLink} target="_blank">Recording</a> |
                            <a href={d.notesLink} className="ms-2" target="_blank">Notes</a>
                          </div>
                        </div>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={async () => {
                            await api.delete(`/days/${d._id}`);
                            selectSubject(selectedSubject);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}




