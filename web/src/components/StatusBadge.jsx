import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'approved': return { bg: '#e6f9f0', text: '#059669' };
      case 'pending': return { bg: '#fff7ed', text: '#d97706' };
      case 'completed': return { bg: '#f0fdf4', text: '#22c55e' };
      case 'cancelled':
      case 'declined': return { bg: '#fef2f2', text: '#ef4444' };
      default: return { bg: '#f1f5f9', text: '#64748b' };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <span style={{
      backgroundColor: styles.bg,
      color: styles.text,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      border: `1px solid ${styles.text}20`
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;