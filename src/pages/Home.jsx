// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import { Link } from 'react-router-dom';

// export default function Home(){
//   const [subjects, setSubjects] = useState([]);
//   const [q, setQ] = useState('');

//   useEffect(()=>{ fetchSubjects(); }, []);

//   const fetchSubjects = async () => {
//     const res = await api.get('/subjects');
//     setSubjects(res.data);
//   };

//   const filtered = subjects.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));

//   return (
//     <div>
//       <h3>Subjects</h3>
//       <div className="mb-3">
//         <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search subject" className="form-control"/>
//       </div>
//       <div className="row">
//         {filtered.map(s => (
//           <div className="col-md-4 mb-3" key={s._id}>
//             <div className="card">
//               <div className="card-body">
//                 <h5>{s.name}</h5>
//                 <Link className="btn btn-primary" to={`/subject/${s._id}`}>Open</Link>
//               </div>
//             </div>
//           </div>
//         ))}
//         {filtered.length === 0 && <p>No subjects found.</p>}
//       </div>
//     </div>
//   );
// }

// ************************************************************


// import React, { useEffect, useState } from "react";
// import api from "../api/api";
// import { Link } from "react-router-dom";
// import "../styles/Home.css";

// export default function Home() {
//   const [subjects, setSubjects] = useState([]);
//   const [q, setQ] = useState("");

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   const fetchSubjects = async () => {
//     const res = await api.get("/subjects");
//     setSubjects(res.data);
//   };

//   const filtered = subjects.filter((s) =>
//     s.name.toLowerCase().includes(q.toLowerCase())
//   );

//   return (
//     <div className="home-page">

//       {/* ---------- HERO SECTION ---------- */}
//       <section className="hero-section text-center py-5">
//         <h2 className="fw-bold hero-title">Welcome to My LMS</h2>
        

//         {/* Search */}
//         <div className="container mt-4">
//           <div className="row justify-content-center">
//             <div className="col-md-6 col-sm-10">
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 className="form-control form-control-lg hero-search shadow-sm"
//                 placeholder="Search subject..."
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ---------- SUBJECT GRID ---------- */}
//       <section className="container py-5">
//         <h3 className="fw-bold mb-4 text-center">Available Subjects</h3>

//         <div className="row g-4">
//           {filtered.map((s) => (
//             <div className="col-lg-3 col-md-4 col-sm-6" key={s._id}>
//               <div className="subject-card shadow-sm text-center p-4">

//                 {/* Icon */}
//                 <div className="subject-icon mb-3">
//                   📘
//                 </div>

//                 <h5 className="fw-semibold">{s.name}</h5>

//                 <Link to={`/subject/${s._id}`} className="btn btn-primary mt-3">
//                   Open
//                 </Link>
//               </div>
//             </div>
//           ))}

//           {filtered.length === 0 && (
//             <p className="text-center text-muted">No subjects found.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-content">
          <h1>Wait. Few. Seconds.</h1>
          <p>Wait few seconds for the content to load.</p>
          {/* <button className="hero-btn" onClick={() => navigate("/subjects")}> */}
          <button className="hero-btn" href="#subjects">  

            Scroll Down to Explore Subjects
          </button>
        </div>
      </section>

      {/* ---------------- SUBJECT GRID ---------------- */}
      <section className="subjects">
        <h2 className="section-title">Explore Subjects</h2>

        <div className="subject-grid">
          {filtered.length > 0 ? (
            filtered.map((s, index) => (
              <div
                className="subject-card"
                key={s._id}
                style={{ animationDelay: `${0.15 + index * 0.1}s` }}
                onClick={() => navigate(`/subject/${s._id}`)}
              >
                <h3>{s.name}</h3>
                <p>Click to explore lessons & resources</p>
                <span className="view-btn">View Subject →</span>
              </div>
            ))
          ) : (
            // <p className="no-data">Recording is Loading ...</p>
            //  <div className="loading-dots">
            //   <span></span>
            //   <span></span>
            //   <span></span>
            // </div>

            <div className="skeleton-wrapper">
              {[1, 2, 3, 4].map((n) => (
                <div className="skeleton-card" key={n}>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-btn"></div>
                </div>
              ))}
            </div>


          )}
        </div>
      </section>
    </div>
  );
}
