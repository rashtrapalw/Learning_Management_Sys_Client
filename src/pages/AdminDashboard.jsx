// import React, { useEffect, useState } from 'react';
// import api from '../api/api';

// export default function AdminDashboard() {
//   const [subjects, setSubjects] = useState([]);
//   const [name, setName] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   const [dayTitle, setDayTitle] = useState("");
//   const [dayNumber, setDayNumber] = useState("");
//   const [recordingLink, setRecordingLink] = useState("");
//   const [notesLink, setNotesLink] = useState("");






//   useEffect(() => { fetchSubjects(); }, []);

//   const fetchSubjects = async () => {
//     const res = await api.get("/subjects");
//     setSubjects(res.data);
//   };

//   const addSubject = async () => {
//     if (!name.trim()) return;
//     await api.post("/subjects", { name });
//     setName("");
//     fetchSubjects();
//   };

//   const selectSubject = async (s) => {
//     const dRes = await api.get(`/${s._id}/days`);
//     s.days = dRes.data;
//     setSelectedSubject({ ...s });
//   };

// const addDay = async () => {
//   await api.post(`/${selectedSubject._id}/days`, { 
//     title: dayTitle, 
//     dayNumber,
//     recordingLink,
//     notesLink
//   });

//   setDayTitle('');
//   setDayNumber('');
//   setRecordingLink('');
//   setNotesLink('');

//   selectSubject(selectedSubject);
// };


//   const logout = () => {
//     localStorage.removeItem("admin_token");
//     window.location.href = "/";
//   };

//   const isAddDisabled = !dayTitle || !dayNumber || !recordingLink || !notesLink;

//   return (
//     <div className="container py-4 admin-dashboard">

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="fw-bold m-0">Admin Dashboard</h3>
//         <button className="btn btn-danger px-4" onClick={logout}>Logout</button>
//       </div>

//       {/* Add Subject */}
//       <div className="card shadow-sm p-4 mb-4">
//         <h5 className="fw-semibold mb-3">Add New Subject</h5>
//         <div className="input-group">
//           <input
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter subject name"
//           />
//           <button className="btn btn-primary" onClick={addSubject}>Add</button>
//         </div>
//       </div>

//       <div className="row">
        
//         {/* Subjects Left Panel */}
//         <div className="col-md-4 mb-4">
//           <div className="card shadow-sm p-3 h-100">
//             <h5 className="fw-semibold mb-3">Subjects</h5>

//             <ul className="list-group subject-list">
//               {subjects.map(s => (
//                 <li key={s._id} className="list-group-item d-flex justify-content-between">
//                   <span
//                     onClick={() => selectSubject(s)}
//                     style={{ cursor: "pointer" }}
//                     className="subject-name"
//                   >
//                     {s.name}
//                   </span>

//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={async () => {
//                       await api.delete(`/subjects/${s._id}`);
//                       fetchSubjects();
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-md-8">
//           <div className="card shadow-sm p-4">

//             {/* If no subject selected */}
//             {!selectedSubject && (
//               <p className="text-muted">Select a subject to manage days.</p>
//             )}

//             {selectedSubject && (
//               <>
// {/* Add Day (with recording + notes) */}
// <h5 className="fw-semibold">Add Day in {selectedSubject.name}</h5>

// <div className="row mt-3 g-2">
  
//   <div className="col-md-6">
//     <input
//       className="form-control"
//       value={dayTitle}
//       onChange={(e)=>setDayTitle(e.target.value)}
//       placeholder="Day Title"
//     />
//   </div>

//   <div className="col-md-6">
//     <input
//       className="form-control"
//       value={dayNumber}
//       onChange={(e)=>setDayNumber(e.target.value)}
//       placeholder="Day Number"
//     />
//   </div>

//   <div className="col-md-6">
//     <input
//       className="form-control"
//       value={recordingLink}
//       onChange={(e)=>setRecordingLink(e.target.value)}
//       placeholder="Recording Link"
//     />
//   </div>

//   <div className="col-md-6">
//     <input
//       className="form-control"
//       value={notesLink}
//       onChange={(e)=>setNotesLink(e.target.value)}
//       placeholder="Notes Link"
//     />
//   </div>

//   <div className="col-12">
//     <button
//       className="btn btn-success w-100"
//       disabled={
//         !dayTitle.trim() ||
//         !dayNumber.trim() ||
//         !recordingLink.trim() ||
//         !notesLink.trim()
//       }
//       onClick={addDay}
//     >
//       Add Day
//     </button>
//   </div>
// </div>


//                 {/* Day List */}
//                 <div className="mt-4">
//                   <h5 className="fw-semibold">Days</h5>

//                   {selectedSubject.days?.map(d => (
//                     <div key={d._id} className="card shadow-sm mb-2">
//                       <div className="card-body d-flex justify-content-between">
//                         <div>
//                           <h6 className="fw-bold m-0">{d.title}</h6>
//                           <small className="text-muted">Day {d.dayNumber}</small>
//                           <div>
//                             <a href={d.recordingLink} target="_blank">Recording</a> |
//                             <a href={d.notesLink} className="ms-2" target="_blank">Notes</a>
//                           </div>
//                         </div>

//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={async () => {
//                             await api.delete(`/days/${d._id}`);
//                             selectSubject(selectedSubject);
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                 </div>
//               </>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  /* ================= EXISTING STATES ================= */
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [dayTitle, setDayTitle] = useState("");
  const [dayNumber, setDayNumber] = useState("");
  const [recordingLink, setRecordingLink] = useState("");
  const [notesLink, setNotesLink] = useState("");

  /* ================= NEW STATES (ADMIN FEATURE) ================= */
  const [stats, setStats] = useState({ totalUsers: 0, totalVideos: 0 });
  const [users, setUsers] = useState([]);

  /* ================= LOAD DATA ON PAGE LOAD ================= */
  useEffect(() => {
    fetchSubjects();
    fetchStats();
    fetchUsers();
    fetchUsersvideo();
  }, []);

  /* ================= SUBJECT APIs ================= */
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
      notesLink,
    });

    setDayTitle("");
    setDayNumber("");
    setRecordingLink("");
    setNotesLink("");

    selectSubject(selectedSubject);
  };

  /* ================= NEW ADMIN APIs ================= */

  // Load total users & videos
  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  // Load all users
  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };
  const fetchUsersvideo = async () => {
  const res = await api.get("/admin/usersvideo");
  setUsers(res.data);
};


  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    await api.delete(`/admin/user/${id}`);
    fetchUsers();
    fetchStats(); // update count
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  /* ================= UI ================= */
  return (
    <div className="container py-4 admin-dashboard">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">Admin Dashboard</h3>
        <button className="btn btn-danger px-4" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ================= ADMIN STATS ================= */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Users</h5>
            <h2 className="text-primary">{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Videos</h5>
            <h2 className="text-success">{stats.totalVideos}</h2>
          </div>
        </div>
      </div>

      {/* ================= USERS MANAGEMENT ================= */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-semibold mb-3">Registered Users</h5>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Videos</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <div className="fw-bold text-success">
                    {u.totalVideos} 
                  </div>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EXISTING SUBJECT & DAY UI ================= */}
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
          <button className="btn btn-primary" onClick={addSubject}>
            Add
          </button>
        </div>
      </div>

      <div className="row">
        {/* SUBJECT LIST */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="fw-semibold mb-3">Subjects</h5>

            <ul className="list-group">
              {subjects.map((s) => (
                <li
                  key={s._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => selectSubject(s)}
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

        {/* DAY MANAGEMENT */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            {!selectedSubject && (
              <p className="text-muted">
                Select a subject to manage days.
              </p>
            )}

            {selectedSubject && (
              <>
                <h5>Add Day in {selectedSubject.name}</h5>

                <div className="row mt-3 g-2">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="Day Title"
                      value={dayTitle}
                      onChange={(e) => setDayTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="Day Number"
                      value={dayNumber}
                      onChange={(e) => setDayNumber(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="Recording Link"
                      value={recordingLink}
                      onChange={(e) => setRecordingLink(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="Notes Link"
                      value={notesLink}
                      onChange={(e) => setNotesLink(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-success w-100"
                      disabled={
                        !dayTitle ||
                        !dayNumber ||
                        !recordingLink ||
                        !notesLink
                      }
                      onClick={addDay}
                    >
                      Add Day
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
