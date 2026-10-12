import { useState, ChangeEvent } from 'react';

export default function DocumentChamber() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState<boolean>(false);

  // File upload handler
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsSigned(false); // Reset signature for new file
    }
  };

  // E-Signature handler
  const handleSignDocument = () => {
    setIsSigned(true);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      marginTop: '30px',
      backgroundColor: '#f4f6f8'
    }}>
      <h3>📄 Document Processing Chamber</h3>

      {/* File Upload Input */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="doc-upload-input"
        />
        <label 
          htmlFor="doc-upload-input"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'inline-block'
          }}
        >
          📁 Upload Contract / Document
        </label>
      </div>

      {/* Display Uploaded File Info */}
      {fileName ? (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ddd' }}>
          <p style={{ margin: '5px 0' }}><strong>Uploaded File:</strong> {fileName}</p>
          <p style={{ margin: '5px 0', color: isSigned ? 'green' : 'orange' }}>
            <strong>Status:</strong> {isSigned ? '✅ Signed & Approved' : '⏳ Pending E-Signature'}
          </p>

          {/* E-Sign Button */}
          {!isSigned && (
            <button
              onClick={handleSignDocument}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ✍️ Sign Document (E-Signature)
            </button>
          )}
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: '#666' }}>No document uploaded yet. Please select a file.</p>
      )}
    </div>
  );
}