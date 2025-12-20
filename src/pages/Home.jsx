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





// ************************************************************

import React, { useEffect, useState } from "react";
import api from "../api/api"; // existing API for subjects
import userApi from "../api/userApi"; // new API for user videos
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";
import Chatbot from "../chatbot/Chatbot";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [videos, setVideos] = useState([]); // state for user uploaded videos
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  // ---------------- FETCH SUBJECTS ----------------
  useEffect(() => {
    fetchSubjects();
    fetchVideos(); // fetch user uploaded videos on mount
  }, []);

  const fetchSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
  };

  // ---------------- FETCH USER VIDEOS ----------------
  const fetchVideos = async () => {
    try {
      const res = await userApi.get("api/video/all"); // get all videos
      setVideos(res.data);
    } catch (error) {
      console.error("Failed to load videos", error);
    }
  };

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-content">
          <h1>Wait. Few. Seconds.</h1>
          <p>Wait few seconds for the content to load.</p>
          <button className="hero-btn" href="#subjects">
            Scroll Down to Explore Subjects
          </button>
          <Chatbot />
        </div>
      </section>

      {/* ---------------- SUBJECT GRID ---------------- */}
      <section className="subjects" id="subjects">
        <h2 className="section-title">Explore Subjects</h2>

        <div className="subject-grid">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((s, index) => (
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

      {/* ---------------- COMMUNITY VIDEOS ---------------- */}
      <section className="community-videos">
        <h2 className="section-title">Community Videos</h2>
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          <ul className="video-grid">
            {videos.map((v) => (
              <li key={v._id} className="video-card">
                <strong>Topic:</strong> {v.topic} <br />
                <strong>Subject:</strong> {v.subject} <br />
                <strong>Uploaded by:</strong> {v.uploadedBy?.name || "Unknown"} <br />
                <a href={v.videoLink} target="_blank" rel="noreferrer">
                  Watch Video
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}
