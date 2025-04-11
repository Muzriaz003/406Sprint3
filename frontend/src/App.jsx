import React, { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (loggedIn && window.google) {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.65107, lng: -79.347015 },
        zoom: 12,
      });

      mapInstance.addListener('click', (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        if (marker) marker.setMap(null);
        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
        });
        setMarker(newMarker);
        fetch('http://127.0.0.1:5000/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lng })
        });
      });
      setMap(mapInstance);
    }
  }, [loggedIn]);

  const handleLogin = () => {
    if (username && password) setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>Pothole Reporter Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="map-container">
      <h2>Click on the map to report a pothole</h2>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default App;
