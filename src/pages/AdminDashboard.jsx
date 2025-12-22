
// import React, { useEffect, useState } from "react";
// import api from "../api/api";

// export default function AdminDashboard() {
//   /* ================= EXISTING STATES ================= */
//   const [subjects, setSubjects] = useState([]);
//   const [name, setName] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   const [dayTitle, setDayTitle] = useState("");
//   const [dayNumber, setDayNumber] = useState("");
//   const [recordingLink, setRecordingLink] = useState("");
//   const [notesLink, setNotesLink] = useState("");

//   /* ================= NEW STATES (ADMIN FEATURE) ================= */
//   const [stats, setStats] = useState({ totalUsers: 0, totalVideos: 0 });
//   const [users, setUsers] = useState([]);

//   /* ================= LOAD DATA ON PAGE LOAD ================= */
//   useEffect(() => {
//     fetchSubjects();
//     fetchStats();
//     fetchUsers();
//     fetchUsersvideo();
//   }, []);

//   /* ================= SUBJECT APIs ================= */
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

//   const addDay = async () => {
//     await api.post(`/${selectedSubject._id}/days`, {
//       title: dayTitle,
//       dayNumber,
//       recordingLink,
//       notesLink,
//     });

//     setDayTitle("");
//     setDayNumber("");
//     setRecordingLink("");
//     setNotesLink("");

//     selectSubject(selectedSubject);
//   };

//   /* ================= NEW ADMIN APIs ================= */

//   // Load total users & videos
//   const fetchStats = async () => {
//     const res = await api.get("/admin/stats");
//     setStats(res.data);
//   };

//   // Load all users
//   const fetchUsers = async () => {
//     const res = await api.get("/admin/users");
//     setUsers(res.data);
//   };
//   const fetchUsersvideo = async () => {
//   const res = await api.get("/admin/usersvideo");
//   setUsers(res.data);
// };


//   // Delete user
//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure to delete this user?")) return;
//     await api.delete(`/admin/user/${id}`);
//     fetchUsers();
//     fetchStats(); // update count
//   };

//   /* ================= LOGOUT ================= */
//   const logout = () => {
//     localStorage.removeItem("admin_token");
//     window.location.href = "/";
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container py-4 admin-dashboard">

//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="fw-bold m-0">Admin Dashboard</h3>
//         <button className="btn btn-danger px-4" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* ================= ADMIN STATS ================= */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="card shadow-sm text-center p-3">
//             <h5>Total Users</h5>
//             <h2 className="text-primary">{stats.totalUsers}</h2>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="card shadow-sm text-center p-3">
//             <h5>Total Videos</h5>
//             <h2 className="text-success">{stats.totalVideos}</h2>
//           </div>
//         </div>
//       </div>

//      {/* ================= USERS MANAGEMENT ================= */}
//         <div className="card shadow-sm p-4 mb-4">
//           <h5 className="fw-semibold mb-3">Registered Users</h5>

//           {/* Responsive wrapper */}
//           <div className="table-responsive">
//             <table className="table table-bordered align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Total Videos</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u._id}>
//                     <td>{u.name}</td>
//                     <td className="text-break">{u.email}</td>

//                     <td>
//                       <span className="fw-bold text-success">
//                         {u.totalVideos}
//                       </span>
//                     </td>

//                     <td>
//                       <button
//                         className="btn btn-sm btn-danger w-100 w-md-auto"
//                         onClick={() => deleteUser(u._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>


//       {/* ================= EXISTING SUBJECT & DAY UI ================= */}
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
//           <button className="btn btn-primary" onClick={addSubject}>
//             Add
//           </button>
//         </div>
//       </div>

//       <div className="row">
//         {/* SUBJECT LIST */}
//         <div className="col-md-4 mb-4">
//           <div className="card shadow-sm p-3 h-100">
//             <h5 className="fw-semibold mb-3">Subjects</h5>

//             <ul className="list-group">
//               {subjects.map((s) => (
//                 <li
//                   key={s._id}
//                   className="list-group-item d-flex justify-content-between"
//                 >
//                   <span
//                     style={{ cursor: "pointer" }}
//                     onClick={() => selectSubject(s)}
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

//         {/* DAY MANAGEMENT */}
//         <div className="col-md-8">
//           <div className="card shadow-sm p-4">
//             {!selectedSubject && (
//               <p className="text-muted">
//                 Select a subject to manage days.
//               </p>
//             )}

//             {selectedSubject && (
//               <>
//                 <h5>Add Day in {selectedSubject.name}</h5>

//                 <div className="row mt-3 g-2">
//                   <div className="col-md-6">
//                     <input
//                       className="form-control"
//                       placeholder="Day Title"
//                       value={dayTitle}
//                       onChange={(e) => setDayTitle(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <input
//                       className="form-control"
//                       placeholder="Day Number"
//                       value={dayNumber}
//                       onChange={(e) => setDayNumber(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <input
//                       className="form-control"
//                       placeholder="Recording Link"
//                       value={recordingLink}
//                       onChange={(e) => setRecordingLink(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <input
//                       className="form-control"
//                       placeholder="Notes Link"
//                       value={notesLink}
//                       onChange={(e) => setNotesLink(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-12">
//                     <button
//                       className="btn btn-success w-100"
//                       disabled={
//                         !dayTitle ||
//                         !dayNumber ||
//                         !recordingLink ||
//                         !notesLink
//                       }
//                       onClick={addDay}
//                     >
//                       Add Day
//                     </button>
//                   </div>
//                 </div>


// {/* ================= DAYS LIST ================= */}
// {selectedSubject && (
//   <div className="mt-4">
//     <h5 className="fw-semibold">
//       Days for: <span className="text-primary">{selectedSubject.name}</span>
//     </h5>

//     {selectedSubject.days?.length === 0 && (
//       <p className="text-muted">No days added yet</p>
//     )}

//     {selectedSubject.days?.map((d) => (
//       <div key={d._id} className="card shadow-sm mb-2">
//         <div className="card-body d-flex justify-content-between align-items-start flex-wrap">

//           {/* Day Info */}
//           <div>
//             <h6 className="fw-bold mb-1">{d.title}</h6>
//             <small className="text-muted">Day {d.dayNumber}</small>

//             <div className="mt-2">
//               <a
//                 href={d.recordingLink}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="me-2"
//               >
//                 Recording
//               </a>

//               <a
//                 href={d.notesLink}
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Notes
//               </a>
//             </div>
//           </div>

//           {/* Delete Button */}
//           <button
//             className="btn btn-sm btn-danger mt-2"
//             onClick={async () => {
//               await api.delete(`/days/${d._id}`);
//               selectSubject(selectedSubject); // refresh days
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// )}









                
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
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  /* ================= STATES ================= */

  // SUBJECT MANAGEMENT
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [name, setName] = useState("");

  // DAY MANAGEMENT
  const [dayTitle, setDayTitle] = useState("");
  const [dayNumber, setDayNumber] = useState("");
  const [recordingLink, setRecordingLink] = useState("");
  const [notesLink, setNotesLink] = useState("");

  // ADMIN DATA
  const [stats, setStats] = useState({ totalUsers: 0, totalVideos: 0 });
  const [users, setUsers] = useState([]);

  // TAB CONTROL
  const [activeTab, setActiveTab] = useState("subjects"); // subjects | users

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetchSubjects();
    fetchStats();
    fetchUsersWithVideos();
  }, []);

  /* ================= SUBJECT APIs ================= */

  // Load all subjects
  const fetchSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  // Add new subject
  const addSubject = async () => {
    if (!name.trim()) return;
    await api.post("/subjects", { name });
    setName("");
    fetchSubjects();
  };

  // Select subject & load days
  const selectSubject = async (subject) => {
    const res = await api.get(`/${subject._id}/days`);
    setSelectedSubject({ ...subject, days: res.data });
  };

  // Add day to subject
  const addDay = async () => {
    await api.post(`/${selectedSubject._id}/days`, {
      title: dayTitle,
      dayNumber,
      recordingLink,
      notesLink,
    });

    // clear inputs
    setDayTitle("");
    setDayNumber("");
    setRecordingLink("");
    setNotesLink("");

    selectSubject(selectedSubject); // refresh days
    fetchStats(); // refresh total videos
  };

  /* ================= ADMIN APIs ================= */

  // Load dashboard stats
  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  // Load users with total videos
  const fetchUsersWithVideos = async () => {
    const res = await api.get("/admin/usersvideo");
    setUsers(res.data);
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/admin/user/${id}`);
    fetchUsersWithVideos();
    fetchStats();
  };

  // Logout admin
  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  /* ================= UI ================= */
  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Admin Dashboard</h3>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      {/* TAB BUTTONS */}
      <div className="mb-4 d-flex gap-2">
        <button
          className={`btn ${activeTab === "subjects" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("subjects")}
        >
          Manage Subjects
        </button>

        <button
          className={`btn ${activeTab === "users" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("users")}
        >
          Manage Users
        </button>
      </div>

      {/* ================= USERS TAB ================= */}
      {activeTab === "users" && (
        <div className="card shadow-sm p-4">

          <h5 className="mb-3">Registered Users</h5>

          {/* USER STATS */}
          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <div className="card shadow-sm text-center p-3">
                <h6>Total Users</h6>
                <h3 className="text-primary">{stats.totalUsers}</h3>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="card shadow-sm text-center p-3">
                <h6>Total Videos</h6>
                <h3 className="text-success">{stats.totalVideos}</h3>
              </div>
            </div>
          </div>

          {/* USER TABLE */}
          <div className="table-responsive admin-table">
            <table className="table table-bordered align-middle admin-users-table">

              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-center small-col">Videos</th>
                  <th className="text-center action-col">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="text-nowrap">{u.name}</td>

                    {/* 
                      IMPORTANT:
                      - No title attribute
                      - Email wraps to next line on mobile
                    */}
                    <td className="email-cell">
                      {u.email}
                    </td>

                    <td className="text-center fw-bold text-success small-col">
                      {u.totalVideos}
                    </td>

                    <td className="text-center action-col">
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
        </div>
      )}

      {/* ================= SUBJECTS TAB ================= */}
      {activeTab === "subjects" && (
        <>
          {/* ADD SUBJECT */}
          <div className="card shadow-sm p-4 mb-4">
            <h5>Add New Subject</h5>
            <div className="input-group">
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Subject name"
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
                <h5>Subjects</h5>
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
                          setSelectedSubject(null);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DAYS SECTION */}
            <div className="col-md-8">
              <div className="card shadow-sm p-4">

                {!selectedSubject && (
                  <p className="text-muted">Select a subject to manage days</p>
                )}

                {selectedSubject && (
                  <>
                    <h5>Add Day in {selectedSubject.name}</h5>

                    <div className="row g-2 mt-3">
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
                          onClick={addDay}
                        >
                          Add Day
                        </button>
                      </div>
                    </div>

                    {/* DAY LIST */}
                    <div className="mt-4">
                      <h6>Days</h6>

                      {selectedSubject.days?.map((d) => (
                        <div key={d._id} className="card shadow-sm mb-2">
                          <div className="card-body d-flex justify-content-between flex-wrap">
                            <div>
                              <strong>{d.title}</strong>
                              <div className="text-muted">Day {d.dayNumber}</div>
                              <a href={d.recordingLink} target="_blank" rel="noreferrer">Recording</a>
                              {" | "}
                              <a href={d.notesLink} target="_blank" rel="noreferrer">Notes</a>
                            </div>

                            <button
                              className="btn btn-sm btn-danger mt-2"
                              onClick={async () => {
                                await api.delete(`/days/${d._id}`);
                                selectSubject(selectedSubject);
                                fetchStats();
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
        </>
      )}
    </div>
  );
}
