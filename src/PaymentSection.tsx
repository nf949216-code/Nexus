import { useState } from 'react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  sender: string;
  receiver: string;
  status: string;
  date: string;
}

export default function PaymentSection() {
  const [balance, setBalance] = useState<number>(10000); // Initial Wallet Balance
  const [amountInput, setAmountInput] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'Funding Deal', amount: 5000, sender: 'Investor Alex', receiver: 'Entrepreneur Noor', status: 'Completed', date: '2026-06-01' },
    { id: 2, type: 'Deposit', amount: 2000, sender: 'Bank Account', receiver: 'Wallet', status: 'Completed', date: '2026-06-02' },
  ]);

  // Handle Deposit
  const handleDeposit = () => {
    const val = parseFloat(amountInput);
    if (!val || val <= 0) return alert('Enter a valid amount');
    
    setBalance(prev => prev + val);
    addTransaction('Deposit', val, 'Bank Account', 'Wallet');
    setAmountInput('');
  };

  // Handle Withdraw
  const handleWithdraw = () => {
    const val = parseFloat(amountInput);
    if (!val || val <= 0) return alert('Enter a valid amount');
    if (val > balance) return alert('Insufficient balance!');

    setBalance(prev => prev - val);
    addTransaction('Withdraw', val, 'Wallet', 'Bank Account');
    setAmountInput('');
  };

  // Handle Transfer / Funding Deal
  const handleTransfer = () => {
    const val = parseFloat(amountInput);
    if (!val || val <= 0) return alert('Enter a valid amount');
    if (!recipient) return alert('Enter recipient name');
    if (val > balance) return alert('Insufficient balance!');

    setBalance(prev => prev - val);
    addTransaction('Funding Transfer', val, 'Wallet (Investor)', recipient);
    setAmountInput('');
    setRecipient('');
  };

  const addTransaction = (type: string, amount: number, sender: string, receiver: string) => {
    const newTx: Transaction = {
      id: Date.now(),
      type,
      amount,
      sender,
      receiver,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions([newTx, ...transactions]);
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
      <h3 style={{ margin: '0 0 15px 0', color: '#111827' }}>💳 Payment & Wallet Chamber</h3>

      {/* Wallet Balance Card */}
      <div style={{
        backgroundColor: '#1e293b',
        color: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' }}>Current Wallet Balance</span>
          <h2 style={{ margin: '5px 0 0 0', fontSize: '28px' }}>${balance.toLocaleString()}</h2>
        </div>
        <span style={{ backgroundColor: '#22c55e', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
          Active
        </span>
      </div>

      {/* Mock Payment Form */}
      <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#334155' }}>Simulate Transaction / Funding Flow</h4>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Amount ($)"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '5px', flex: '1', minWidth: '120px' }}
          />
          <input
            type="text"
            placeholder="Recipient / Startup (for Transfer)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '5px', flex: '1', minWidth: '160px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={handleDeposit} style={{ padding: '8px 14px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            📥 Deposit
          </button>
          <button onClick={handleWithdraw} style={{ padding: '8px 14px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            📤 Withdraw
          </button>
          <button onClick={handleTransfer} style={{ padding: '8px 14px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            🚀 Transfer / Fund Deal
          </button>
        </div>
      </div>

      {/* Transaction History Table */}
      <h4 style={{ margin: '15px 0 10px 0', color: '#334155' }}>Recent Transactions</h4>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Type</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Amount</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Sender</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Receiver</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px' }}>{tx.type}</td>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>${tx.amount.toLocaleString()}</td>
                <td style={{ padding: '8px', color: '#64748b' }}>{tx.sender}</td>
                <td style={{ padding: '8px', color: '#64748b' }}>{tx.receiver}</td>
                <td style={{ padding: '8px', color: '#16a34a', fontWeight: '500' }}>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}