import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [subjects, setSubjects] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=>{ fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    const res = await api.get('/subjects');
    setSubjects(res.data);
  };

  const filtered = subjects.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h3>Subjects</h3>
      <div className="mb-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search subject" className="form-control"/>
      </div>
      <div className="row">
        {filtered.map(s => (
          <div className="col-md-4 mb-3" key={s._id}>
            <div className="card">
              <div className="card-body">
                <h5>{s.name}</h5>
                <Link className="btn btn-primary" to={`/subject/${s._id}`}>Open</Link>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No subjects found.</p>}
      </div>
    </div>
  );
}
