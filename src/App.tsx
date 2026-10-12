import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Schedule a Meeting</h2>
      
      <Calendar 
        onChange={(value) => setSelectedDate(value as Date)} 
        value={selectedDate} 
      />

      <p style={{ marginTop: '15px' }}>
        <strong>Selected Date:</strong> {selectedDate.toDateString()}
      </p>
    </div>
  );
}

export default App;