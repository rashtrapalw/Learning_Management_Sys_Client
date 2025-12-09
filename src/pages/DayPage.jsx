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
      
      <h4>{day ? day.title : "Day"}</h4>

<div className="card p-3 mb-3">
  <h6>Recording</h6>
  <a href={day?.recordingLink} target="_blank">{day?.recordingLink}</a>

  <h6 className="mt-3">Notes/Code</h6>
  <a href={day?.notesLink} target="_blank">{day?.notesLink}</a>
</div>

    </div>

    
  );
}
