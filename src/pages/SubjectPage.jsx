import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link, useParams } from 'react-router-dom';

export default function SubjectPage(){
  const { id } = useParams();
  const [days, setDays] = useState([]);
  const [subject, setSubject] = useState(null);

  useEffect(()=>{ fetch(); }, [id]);

  const fetch = async () => {
    const sRes = await api.get(`/subjects`);
    setSubject(sRes.data.find(x=>x._id===id));
    const res = await api.get(`/${id}/days`);
    setDays(res.data);
  };

  return (
    <div>
      <h3>{subject ? subject.name : 'Subject'}</h3>
      <div className="list-group">
        {days.map(d => (
          <Link key={d._id} className="list-group-item list-group-item-action" to={`/day/${d._id}`}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{d.title}</h5>
              <small>Day {d.dayNumber || '-'}</small>
            </div>
          </Link>
        ))}
        {days.length === 0 && <p>No days yet.</p>}
      </div>
    </div>
  );
}
