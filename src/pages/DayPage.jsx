import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams, Link } from 'react-router-dom';

export default function DayPage(){
  const { id } = useParams();
  const [links, setLinks] = useState([]);
  const [day, setDay] = useState(null);

  useEffect(()=>{ fetch(); }, [id]);

  const fetch = async () => {
    const dRes = await api.get(`/days/${id}`) // not yet defined in backend; simple fix: reuse Day get
      .catch(()=>({ data: null }));
    if (dRes.data) setDay(dRes.data);
    const res = await api.get(`/days/${id}/links`);
    setLinks(res.data);
  };

  return (
    <div>
      <h4>{day ? day.title : 'Day'}</h4>
      <div>
        {links.map(l => (
          <div key={l._id} className="card mb-2">
            <div className="card-body">
              <h6>{l.title || l.type}</h6>
              <p className="mb-1"><a href={l.url} target="_blank" rel="noreferrer">{l.url}</a></p>
              <small className="text-muted">{new Date(l.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))}
        {links.length === 0 && <p>No links yet.</p>}
      </div>
      <Link className="btn btn-secondary mt-3" to="/">Back</Link>
    </div>
  );
}
