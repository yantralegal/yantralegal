'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  matterType: string;
  method?: string;
  date: string;
  time: string;
  duration: number;
  status: 'PENDING_APPROVAL' | 'CONFIRMED' | 'REJECTED';
  googleEventId?: string;
  description?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'CONFIRMED' | 'REJECTED'>('PENDING');

  const fetchBookings = useCallback(async (authPass: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/bookings', {
        headers: {
          'Authorization': authPass,
        },
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_pass');
        setLoginError('Invalid password or session expired.');
      } else if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
        setIsAuthenticated(true);
        localStorage.setItem('admin_pass', authPass);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to fetch bookings.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching bookings from server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check saved password on load
  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      setPassword(savedPass);
      fetchBookings(savedPass);
    }
  }, [fetchBookings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!password) return;
    fetchBookings(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_pass');
    setIsAuthenticated(false);
    setPassword('');
    setBookings([]);
  };

  const handleApprove = async (bookingId: string) => {
    if (!confirm('Are you sure you want to approve this booking and schedule the Google Calendar event?')) return;
    setActioningId(bookingId);
    try {
      const res = await fetch('/api/admin/confirm-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Booking successfully confirmed!');
        fetchBookings(password);
      } else {
        alert(data.error || 'Failed to confirm booking.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during approval.');
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    if (!confirm('Are you sure you want to reject this booking request?')) return;
    setActioningId(bookingId);
    try {
      const res = await fetch('/api/admin/reject-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Booking successfully rejected.');
        fetchBookings(password);
      } else {
        alert(data.error || 'Failed to reject booking.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during rejection.');
    } finally {
      setActioningId(null);
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'PENDING') return b.status === 'PENDING_APPROVAL';
    if (activeTab === 'CONFIRMED') return b.status === 'CONFIRMED';
    return b.status === 'REJECTED';
  });

  // Login View
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111111', color: '#ffffff', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '30px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#161616', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>Yantra Legal</h2>
          <p style={{ fontSize: '0.88rem', color: '#888', marginBottom: '24px' }}>Admin Booking Dashboard Access</p>
          
          {loginError && (
            <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '20px', borderLeft: '3px solid #ff6b6b' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#222222', color: '#fff', fontSize: '1rem', outline: 'none', marginBottom: '20px', textAlign: 'center' }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '6px', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090909', color: '#ffffff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, margin: 0 }}>Booking Management</h1>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>Approve, reject, and review consultation requests</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #333', color: '#888', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Log Out
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {(['PENDING', 'CONFIRMED', 'REJECTED'] as const).map((tab) => {
            const count = bookings.filter((b) => {
              if (tab === 'PENDING') return b.status === 'PENDING_APPROVAL';
              if (tab === 'CONFIRMED') return b.status === 'CONFIRMED';
              return b.status === 'REJECTED';
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  background: activeTab === tab ? '#ffffff' : '#141414',
                  color: activeTab === tab ? '#000000' : '#888888',
                  border: activeTab === tab ? '1px solid #ffffff' : '1px solid #222222',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.88rem',
                }}
              >
                {tab === 'PENDING' ? 'Pending Approval' : tab === 'CONFIRMED' ? 'Confirmed' : 'Rejected'} ({count})
              </button>
            );
          })}
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666', border: '1px dashed #222', borderRadius: '8px', backgroundColor: '#111' }}>
            No bookings found in this category.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid #222',
                  backgroundColor: '#111',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '20px',
                }}
              >
                <div style={{ flex: '1', minWidth: '280px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 600 }}>{booking.name}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: booking.status === 'CONFIRMED' ? 'rgba(74, 222, 128, 0.1)' : booking.status === 'REJECTED' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(250, 204, 21, 0.1)', color: booking.status === 'CONFIRMED' ? '#4ade80' : booking.status === 'REJECTED' ? '#f87171' : '#facc15' }}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span>Email: {booking.email} | Phone: {booking.phone}</span>
                    <span>Matter: {booking.matterType} | Format: {booking.method || 'Not specified'}</span>
                    <span>Duration: {booking.duration} minutes</span>
                  </div>

                  {/* Scheduled Slot Details */}
                  <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #222', paddingTop: '12px', marginTop: '12px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Date</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{booking.date}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Time</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{booking.time}</span>
                    </div>
                    {booking.googleEventId && (
                      <div style={{ marginLeft: 'auto' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Google Event ID</span>
                        <span style={{ fontSize: '0.85rem', color: '#888', fontFamily: 'monospace' }}>{booking.googleEventId}</span>
                      </div>
                    )}
                  </div>

                  {booking.description && (
                    <div style={{ marginTop: '14px', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontSize: '0.88rem', borderLeft: '2px solid #555' }}>
                      <strong>Description:</strong> {booking.description}
                    </div>
                  )}
                </div>

                {/* Actions */}
                {booking.status === 'PENDING_APPROVAL' && (
                  <div style={{ display: 'flex', gap: '8px', alignSelf: 'center' }}>
                    <button
                      onClick={() => handleReject(booking._id)}
                      disabled={actioningId === booking._id}
                      style={{ padding: '10px 16px', border: '1px solid #f87171', background: 'transparent', color: '#f87171', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 'bold' }}
                    >
                      {actioningId === booking._id ? 'Please wait...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleApprove(booking._id)}
                      disabled={actioningId === booking._id}
                      style={{ padding: '10px 16px', border: 'none', background: '#ffffff', color: '#000000', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 'bold' }}
                    >
                      {actioningId === booking._id ? 'Please wait...' : 'Approve'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
