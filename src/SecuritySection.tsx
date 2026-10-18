import { useState } from 'react';

export default function SecuritySection() {
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Entrepreneur' | 'Investor'>('Entrepreneur');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Password strength check
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: '#ddd' };
    if (password.length < 6) return { label: 'Weak', color: '#dc2626' };
    if (password.length < 10) return { label: 'Medium', color: '#f59e0b' };
    return { label: 'Strong', color: '#16a34a' };
  };

  const strength = getPasswordStrength();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      alert('Mock 2FA OTP sent to your registered device (Use any code like 1234)');
    } else {
      if (otp.length > 0) {
        setIsLoggedIn(true);
        alert('Successfully logged in with 2FA!');
      } else {
        alert('Please enter valid OTP');
      }
    }
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '25px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      textAlign: 'left'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#111827' }}>🔒 Security & Access Control</h3>

      {!isLoggedIn ? (
        <form onSubmit={handleLoginSubmit} style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#334155' }}>Multi-Step Login with 2FA</h4>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Select Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as 'Entrepreneur' | 'Investor')}
              style={{ padding: '8px', width: '100%', borderRadius: '5px', border: '1px solid #cbd5e1' }}
            >
              <option value="Entrepreneur">Entrepreneur Dashboard</option>
              <option value="Investor">Investor Dashboard</option>
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Password (with Strength Meter)</label>
            <input 
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '8px 12px', width: '100%', borderRadius: '5px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
            {password && (
              <div style={{ marginTop: '5px', fontSize: '12px', color: strength.color, fontWeight: 'bold' }}>
                Strength: {strength.label}
              </div>
            )}
          </div>

          {otpSent && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Enter 2FA OTP Code</label>
              <input 
                type="text"
                placeholder="e.g. 1234"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ padding: '8px 12px', width: '100%', borderRadius: '5px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: '500' }}>
            {!otpSent ? 'Proceed to 2FA Verification' : 'Verify & Login'}
          </button>
        </form>
      ) : (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#166534' }}>🎉 Logged in as: {role} View</h4>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#15803d' }}>
            {role === 'Entrepreneur' ? 'Accessing Startup Pitch decks, Document Chamber, and Funding pipelines.' : 'Accessing High-Yield Portfolios, Due Diligence Files, and Direct Transactions.'}
          </p>
          <button 
            onClick={() => { setIsLoggedIn(false); setOtpSent(false); setOtp(''); setPassword(''); }}
            style={{ padding: '6px 12px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            Logout / Switch Role
          </button>
        </div>
      )}
    </div>
  );
}