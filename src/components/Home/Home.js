import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
          <button className="btn btn-success my-3" type="submit" onClick={() => navigate('/upload')}>
            Upload an event
          </button><br />
          <button className="btn btn-success " type="submit" onClick={() => navigate('/fetch')}>
            See all events
          </button>
    </div>
  )
}
