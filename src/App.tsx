import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import VideoCall from './VideoCall';
import DocumentChamber from './DocumentChamber';
import PaymentSection from './PaymentSection';
import SecuritySection from './SecuritySection';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Business Nexus - Portal</h2>
      
      {/* 1. Security & Access Control */}
      <SecuritySection />

      {/* 2. Calendar Scheduling */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', marginTop: '25px', backgroundColor: '#fff' }}>
        <h3>📅 Schedule a Meeting</h3>
        <Calendar 
          onChange={(value) => setSelectedDate(value as Date)} 
          value={selectedDate} 
        />
        <p style={{ marginTop: '15px' }}>
          <strong>Selected Date:</strong> {selectedDate.toDateString()}
        </p>
      </div>

      {/* 3. Video Call UI */}
      <VideoCall />

      {/* 4. Document Processing Chamber */}
      <DocumentChamber />

      {/* 5. Payment & Wallet Section */}
      <PaymentSection />
    </div>
  );
}

export default App;