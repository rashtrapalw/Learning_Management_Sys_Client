import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminDashboard(){
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dayTitle, setDayTitle] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [links, setLinks] = useState([]);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkType, setLinkType] = useState('recording');

  useEffect(()=>{ fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    const res = await api.get('/subjects');
    setSubjects(res.data);
  };

  const addSubject = async () => {
    await api.post('/subjects', { name });
    setName(''); fetchSubjects();
  };

  const selectSubject = async (s) => {
    setSelectedSubject(s);
    // fetch days
    const dRes = await api.get(`/${s._id}/days`);
    s.days = dRes.data;
    setSelectedSubject({ ...s });
  };

  const addDay = async () => {
    await api.post(`/${selectedSubject._id}/days`, { title: dayTitle, dayNumber });
    setDayTitle(''); setDayNumber('');
    selectSubject(selectedSubject);
  };

  const selectDay = async (day) => {
    const lRes = await api.get(`/days/${day._id}/links`);
    setLinks(lRes.data);
  };

  const addLink = async (dayId) => {
    await api.post(`/days/${dayId}/links`, { type: linkType, title: linkTitle, url: linkUrl });
    setLinkTitle(''); setLinkUrl('');
    selectSubject(selectedSubject);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Admin Dashboard</h4>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <div className="card mb-3 p-3">
        <h6>Add Subject</h6>
        <div className="input-group">
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Subject name"/>
          <button className="btn btn-primary" onClick={addSubject}>Add</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <h6>Subjects</h6>
          <ul className="list-group">
            {subjects.map(s => (
              <li key={s._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span onClick={()=>selectSubject(s)} style={{cursor: 'pointer'}}>{s.name}</span>
                <button className="btn btn-sm btn-danger" onClick={async ()=>{ await api.delete(`/subjects/${s._id}`); fetchSubjects(); }}>Del</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-8">
          {selectedSubject ? (
            <>
              <h6>Days in {selectedSubject.name}</h6>
              <div className="mb-3">
                <input className="form-control mb-2" value={dayTitle} onChange={e=>setDayTitle(e.target.value)} placeholder="Day title"/>
                <input className="form-control mb-2" value={dayNumber} onChange={e=>setDayNumber(e.target.value)} placeholder="Day number"/>
                <button className="btn btn-success" onClick={addDay}>Add Day</button>
              </div>

              <div>
                {selectedSubject.days && selectedSubject.days.map(d => (
                  <div key={d._id} className="card mb-2">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6>{d.title}</h6>
                          <small>Day {d.dayNumber}</small>
                        </div>
                        <div>
                          <button className="btn btn-sm btn-primary me-2" onClick={()=>selectDay(d)}>Links</button>
                          <button className="btn btn-sm btn-danger" onClick={async ()=>{ await api.delete(`/days/${d._id}`); selectSubject(selectedSubject); }}>Del</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <h6>Links</h6>
                <div className="mb-2">
                  <select className="form-select mb-2" value={linkType} onChange={e=>setLinkType(e.target.value)}>
                    <option value="recording">Recording</option>
                    <option value="notes">Notes</option>
                  </select>
                  <input className="form-control mb-2" value={linkTitle} onChange={e=>setLinkTitle(e.target.value)} placeholder="Link title"/>
                  <input className="form-control mb-2" value={linkUrl} onChange={e=>setLinkUrl(e.target.value)} placeholder="https://"/>
                  <button className="btn btn-success" onClick={async ()=>{ 
                    // for demo, choose first selected day from selectedSubject.days
                    if (!selectedSubject.days || selectedSubject.days.length===0) return alert('Add day first');
                    await addLink(selectedSubject.days[0]._id);
                  }}>Add Link to first day</button>
                </div>

                <div>
                  {links.map(l => (
                    <div key={l._id} className="card mb-1">
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <b>{l.title || l.type}</b>
                          <div><a href={l.url} target="_blank" rel="noreferrer">{l.url}</a></div>
                        </div>
                        <div>
                          <button className="btn btn-sm btn-danger" onClick={async ()=>{ await api.delete(`/links/${l._id}`); selectSubject(selectedSubject); }}>Del</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </>
          ) : <p>Select a subject to manage days and links.</p>}
        </div>
      </div>
    </div>
  );
}
