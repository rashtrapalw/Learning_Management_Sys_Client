// import React, { useState } from "react";
// import axios from "axios";
// import api from "../api/api";

// export default function AddVideo() {
//   const [topic, setTopic] = useState("");
//   const [subject, setSubject] = useState("");
//   const [videoLink, setVideoLink] = useState("");

//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "http://localhost:5000/api/videos/add",
//         { topic, subject, videoLink },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

    

//       setMessage("Video added successfully!");
//       setTopic("");
//       setSubject("");
//       setVideoLink("");
//     } catch (err) {
//       setMessage("Error adding video");
//       console.log(err);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "450px", margin: "40px auto" }}>
//       <h2>Add New Video..</h2>

//       {message && (
//         <p style={{ background: "#eee", padding: "10px", borderRadius: "5px" }}>
//           {message}
//         </p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Video Topic</label>
//           <input
//             type="text"
//             className="form-control"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group mt-2">
//           <label>Subject</label>
//           <input
//             type="text"
//             className="form-control"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group mt-2">
//           <label>Video Link</label>
//           <input
//             type="text"
//             className="form-control"
//             value={videoLink}
//             onChange={(e) => setVideoLink(e.target.value)}
//             required
//           />
//         </div>

//         <button className="btn btn-primary mt-3" type="submit">
//           Add Video 
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
// ❌ axios not needed now
// import axios from "axios";

// ✅ our custom axios instance
import api from "../api/api";

export default function AddVideo() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [message, setMessage] = useState("");

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*
        We are using api.post instead of axios.post
        - baseURL comes from VITE_API_URL (.env)
        - token is automatically added in api.js (interceptor)
        - no need to write headers here
      */
      const res = await api.post("/videos/add", {
        topic,
        subject,
        videoLink,
      });

      setMessage("Video added successfully!");
      setTopic("");
      setSubject("");
      setVideoLink("");
    } catch (err) {
      setMessage("Error adding video");
      console.log(err);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto" }}>
      <h2>Add New Video</h2>

      {message && (
        <p style={{ background: "#eee", padding: "10px", borderRadius: "5px" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Video Topic</label>
          <input
            type="text"
            className="form-control"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>Video Link</label>
          <input
            type="text"
            className="form-control"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Add Video
        </button>
      </form>
    </div>
  );
}

