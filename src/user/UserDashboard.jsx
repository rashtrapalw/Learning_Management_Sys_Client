
import { useState, useEffect, useContext } from "react";
import API from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const { user, logoutUser } = useContext(AuthContext);

  const [videos, setVideos] = useState([]);
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Load videos uploaded by logged-in user
  const loadVideos = async () => {
    try {
      const res = await API.get("/api/video/all");

      // show only videos uploaded by this user
      const filtered = res.data.filter(
        (v) => v.uploadedBy?.name === user
      );

      setVideos(filtered);
    } catch (error) {
      console.error("Failed to load videos", error);
    }
  };

  

  // load videos when dashboard opens
  useEffect(() => {
    if (user) {
      loadVideos();
    }
  }, [user]);

  // Add new video
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/video/add", {
        topic,
        subject,
        videoLink,
      });

      // clear form after adding
      setTopic("");
      setSubject("");
      setVideoLink("");

      loadVideos();
    } catch (error) {
      alert("Failed to add video");
      console.error(error);
    }
  };

  // Delete video
  const deleteVideo = async (id) => {
    try {
      await API.delete(`/api/video/${id}`);
      loadVideos();
    } catch (error) {
      alert("Failed to delete video");
      console.error(error);
    }
  };

//   return (
//     <div className="dashboard">
//       <h2>Welcome, {user}</h2>

//       <button onClick={logoutUser}>Logout</button>

//       <h3>Add New Video</h3>
//       <form onSubmit={handleAdd}>
//         <input
//           placeholder="Video Topic"
//           value={topic}              // controlled input
//           onChange={(e) => setTopic(e.target.value)}
//           required
//         />

//         <input
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           required
//         />

//         <input
//           placeholder="Video Link"
//           value={videoLink}
//           onChange={(e) => setVideoLink(e.target.value)}
//           required
//         />

//         <button type="submit">Add Video..</button>
//       </form>

//       <h3>Your Videos</h3>
//       <ul>
//         {videos.map((v) => (
//           <li key={v._id}>
//             <strong>{v.topic}</strong> — {v.subject}
//             <br />

//             <a href={v.videoLink} target="_blank" rel="noreferrer">
//               Watch Video
//             </a>

//             <br />
//             <button onClick={() => deleteVideo(v._id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );


return (
  <div className="user-dashboard-page">
    <div className="dashboard-card">

      <div className="dashboard-header">
        <h2>Welcome, {user}</h2>
        <button className="logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>

      <h3 className="section-title">Add New Video</h3>

      <form className="add-video-form" onSubmit={handleAdd}>
        <input
          placeholder="Video Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <input
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />

        <button type="submit">Add Video</button>
      </form>

      <h3 className="section-title">Your Videos</h3>

      <ul className="video-list">
        {videos.map((v) => (
          <li key={v._id} className="video-item">
            <div>
              <strong>{v.topic}</strong>
              <span>{v.subject}</span>
            </div>

            <div className="video-actions">
              <a href={v.videoLink} target="_blank" rel="noreferrer">
                Watch
              </a>

              <button onClick={() => deleteVideo(v._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  </div>
);

}

