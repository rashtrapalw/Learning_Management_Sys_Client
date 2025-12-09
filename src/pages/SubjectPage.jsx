// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import { Link, useParams } from 'react-router-dom';

// export default function SubjectPage(){
//   const { id } = useParams();
//   const [days, setDays] = useState([]);
//   const [subject, setSubject] = useState(null);

//   useEffect(()=>{ fetch(); }, [id]);

//   const fetch = async () => {
//     const sRes = await api.get(`/subjects`);
//     setSubject(sRes.data.find(x=>x._id===id));
//     const res = await api.get(`/${id}/days`);
//     setDays(res.data);
//   };

//   return (
//     <div>
//       <h3>{subject ? subject.name : 'Subject'}</h3>
//       <div className="list-group">
//         {days.map(d => (
//           <Link key={d._id} className="list-group-item list-group-item-action" to={`/day/${d._id}`}>
//             <div className="d-flex w-100 justify-content-between">
//               <h5 className="mb-1">{d.title}</h5>
//               <small>Day {d.dayNumber || '-'}</small>
//             </div>
//           </Link>
//         ))}
//         {days.length === 0 && <p>No days yet.</p>}
//       </div>
//     </div>
//   );
// }


// ***************************************************************


// import React, { useEffect, useState } from 'react';
// import api from '../api/api';
// import { Link, useParams } from 'react-router-dom';
// import '../styles/subjectPageModern.css'; // create this CSS

// export default function SubjectPage() {
//   const { id } = useParams();
//   const [days, setDays] = useState([]);
//   const [subject, setSubject] = useState(null);

//   useEffect(() => { fetchData(); }, [id]);

//   const fetchData = async () => {
//     const sRes = await api.get(`/subjects`);
//     setSubject(sRes.data.find(x => x._id === id));
//     const res = await api.get(`/${id}/days`);
//     setDays(res.data);
//   };

//   return (
//     <div className="subject-container">
//       <h2 className="subject-title">{subject ? subject.name : 'Subject'}</h2>
//       <div className="days-grid">
//         {days.length > 0 ? days.map(d => (
//           <Link key={d._id} to={`/day/${d._id}`} className="day-card">
//             <div className="day-card-content">
//               <h4>{d.title}</h4>
//               <span>Day {d.dayNumber || '-'}</span>
//             </div>
//           </Link>
//         )) : <p className="no-days">No days yet.</p>}
//       </div>
      
//     </div>
//   );
// }


// ********************************************************************************************

import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import "../styles/subjectPageModern.css"; // create this CSS

export default function SubjectPage() {
  const { id } = useParams();
  const [days, setDays] = useState([]);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    // fetch subject
    const sRes = await api.get(`/subjects`);
    setSubject(sRes.data.find((x) => x._id === id));

    // fetch all days under subject
    const res = await api.get(`/${id}/days`);
    setDays(res.data);
  };

  return (
    <div className="subject-container">
      <h2 className="subject-title">
        {subject ? subject.name : "Subject"}
      </h2>

      <div className="days-grid">
        {days.length > 0 ? (
          days.map((d) => (
            <div key={d._id} className="day-card">
              <div className="day-card-content">
                <h4>{d.title}</h4>
                <span className="day-number">Day {d.dayNumber || "-"}</span>

                {/* === NEW BUTTONS ADDED HERE === */}
                <div className="day-actions">
                  <a
                    href={d.recordingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="day-btn recording-btn"
                  >
                    Recording
                  </a>

                  <a
                    href={d.notesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="day-btn notes-btn"
                  >
                    Notes
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          // <p className="no-days">No days yet.</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>


        )}
      </div>
    </div>
  );
}
