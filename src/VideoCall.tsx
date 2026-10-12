import { useState } from 'react';

export default function VideoCall() {
  const [isCalling, setIsCalling] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Call start/end toggle
  const handleToggleCall = () => {
    setIsCalling(!isCalling);
    if (isCalling) {
      // Reset controls on end call
      setIsScreenSharing(false);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      marginTop: '30px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Video Call Chamber</h3>

      {/* Video Screen Area */}
      <div style={{
        width: '100%',
        height: '250px',
        backgroundColor: isCalling ? (isVideoOn ? '#222' : '#555') : '#111',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        marginBottom: '15px'
      }}>
        {!isCalling ? (
          <p>Call is ended. Click "Start Call" to begin.</p>
        ) : isScreenSharing ? (
          <p>💻 Sharing Screen...</p>
        ) : isVideoOn ? (
          <p>📹 Video Feed Active (Mock)</p>
        ) : (
          <p>📷 Camera is Turned Off</p>
        )}
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Start / End Call Button */}
        <button
          onClick={handleToggleCall}
          style={{
            padding: '10px 15px',
            backgroundColor: isCalling ? '#dc3545' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isCalling ? 'End Call' : 'Start Call'}
        </button>

        {/* Video Toggle Button */}
        {isCalling && (
          <>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              style={{ padding: '10px 15px', cursor: 'pointer' }}
            >
              {isVideoOn ? '📹 Camera Off' : '📷 Camera On'}
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              style={{ padding: '10px 15px', cursor: 'pointer' }}
            >
              {isAudioOn ? '🎙️ Mute' : '🎙️ Unmute'}
            </button>

            {/* Screen Share Button */}
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              style={{ padding: '10px 15px', cursor: 'pointer' }}
            >
              {isScreenSharing ? '🛑 Stop Share' : '🖥️ Share Screen'}
            </button>
          </>
        )}
      </div>

      {/* Call Status Details */}
      {isCalling && (
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
          Status: Audio: {isAudioOn ? 'ON' : 'MUTED'} | Video: {isVideoOn ? 'ON' : 'OFF'}
        </p>
      )}
    </div>
  );
}