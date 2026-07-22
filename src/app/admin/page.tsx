'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPage {
  pageNum: number;
  title: string;
  url: string;
  sections: LegalSection[];
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  thumbnail: string;
  content: string[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'blogs' | 'settings' | 'about' | 'faqs' | 'marquee'>('dashboard');

  // Dashboard state
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  // About state
  const [about, setAbout] = useState<any>(null);
  const [isSavingAbout, setIsSavingAbout] = useState(false);

  // FAQs state
  const [faqs, setFaqs] = useState<any[]>([]);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [isCreatingFaq, setIsCreatingFaq] = useState(false);
  const [isSavingFaqs, setIsSavingFaqs] = useState(false);

  // Legal Services state
  const [services, setServices] = useState<LegalPage[]>([]);
  const [editingService, setEditingService] = useState<LegalPage | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);

  // Blogs state
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<any[]>([]);
  const [editingSetting, setEditingSetting] = useState<any | null>(null);
  const [isCreatingSetting, setIsCreatingSetting] = useState(false);

  // Change Password state
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Marquee updates state
  const [marqueeUpdates, setMarqueeUpdates] = useState<any[]>([]);
  const [editingMarqueeUpdate, setEditingMarqueeUpdate] = useState<any | null>(null);
  const [isCreatingMarqueeUpdate, setIsCreatingMarqueeUpdate] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    // Auto-remove after 4 seconds
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Dynamically load Inter font
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Fetch Legal Services
  const fetchServices = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/services', {
        headers: { 'Authorization': authPass },
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_pass');
        setLoginError('Invalid password or session expired.');
      } else if (res.ok) {
        const data = await res.json();
        setServices(data.pages || []);
        setIsAuthenticated(true);
        localStorage.setItem('admin_pass', authPass);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Fetch Blogs
  const fetchBlogs = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/blogs', {
        headers: { 'Authorization': authPass },
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.posts || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Fetch Settings
  const fetchSettings = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { 'Authorization': authPass },
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Fetch About Page Content
  const fetchAbout = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/about', {
        headers: { 'Authorization': authPass },
      });
      if (res.ok) {
        const data = await res.json();
        setAbout(data.about || null);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    setIsSavingAbout(true);

    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify(about),
      });
      if (res.ok) {
        showToast('About page content saved successfully!', 'success');
        fetchAbout(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save about page.', 'error');
      }
    } catch (err: any) {
      console.error(err);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setIsSavingAbout(false);
    }
  };

  // Fetch FAQs
  const fetchFaqs = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/faqs', {
        headers: { 'Authorization': authPass },
      });
      if (res.ok) {
        const data = await res.json();
        setFaqs(data.faqs || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSaveFaqs = async (e?: React.FormEvent, updatedFaqsList?: any[]) => {
    if (e) e.preventDefault();
    const faqsToSend = updatedFaqsList || faqs;
    setIsSavingFaqs(true);

    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify(faqsToSend),
      });
      if (res.ok) {
        showToast('FAQs saved successfully!', 'success');
        fetchFaqs(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save FAQs.', 'error');
      }
    } catch (err: any) {
      console.error(err);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setIsSavingFaqs(false);
    }
  };

  const fetchMarqueeUpdates = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/marquee', {
        headers: { 'Authorization': authPass },
      });
      if (res.ok) {
        const data = await res.json();
        setMarqueeUpdates(data.updates || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSaveMarqueeUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarqueeUpdate?.heading || !editingMarqueeUpdate?.content) {
      showToast('Heading and content are required', 'error');
      return;
    }
    try {
      const res = await fetch('/api/admin/marquee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify({
          id: editingMarqueeUpdate._id,
          heading: editingMarqueeUpdate.heading,
          content: editingMarqueeUpdate.content,
          imageUrl: editingMarqueeUpdate.imageUrl,
          isActive: editingMarqueeUpdate.isActive !== false,
        }),
      });
      if (res.ok) {
        showToast('Marquee update saved successfully!', 'success');
        setEditingMarqueeUpdate(null);
        setIsCreatingMarqueeUpdate(false);
        fetchMarqueeUpdates(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save marquee update.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An unexpected error occurred.', 'error');
    }
  };

  const handleDeleteMarqueeUpdate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update permanently?')) return;
    try {
      const res = await fetch(`/api/admin/marquee?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Authorization': password },
      });
      if (res.ok) {
        showToast('Update deleted successfully!', 'success');
        fetchMarqueeUpdates(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete update.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An unexpected error occurred.', 'error');
    }
  };

  // Fetch Dashboard Stats
  const fetchDashboardStats = useCallback(async (authPass: string) => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': authPass },
      });
      if (res.ok) {
        const data = await res.json();
        setDashboardStats(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadAllData = useCallback(async (authPass: string) => {
    setIsLoading(true);
    await fetchServices(authPass);
    await fetchBlogs(authPass);
    await fetchSettings(authPass);
    await fetchAbout(authPass);
    await fetchFaqs(authPass);
    await fetchDashboardStats(authPass);
    await fetchMarqueeUpdates(authPass);
    setIsLoading(false);
  }, [fetchServices, fetchBlogs, fetchSettings, fetchAbout, fetchFaqs, fetchDashboardStats, fetchMarqueeUpdates]);

  // Check saved password on load
  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      setPassword(savedPass);
      loadAllData(savedPass);
    }
  }, [loadAllData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!password) return;
    loadAllData(password);

    // Log login event in the database
    try {
      await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Authorization': password }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    setIsChangingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password
        },
        body: JSON.stringify({ newPassword }),
      });
      if (res.ok) {
        showToast('Password changed successfully! Logging out...', 'success');
        setNewPassword('');
        setTimeout(() => {
          handleLogout();
        }, 1500);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to change password.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_pass');
    setIsAuthenticated(false);
    setPassword('');
    setServices([]);
    setBlogs([]);
    setSettings([]);
    setAbout(null);
    setFaqs([]);
    setEditingFaq(null);
    setDashboardStats(null);
    setMarqueeUpdates([]);
    setEditingMarqueeUpdate(null);
    setIsCreatingMarqueeUpdate(false);
  };

  // Setting Save/Delete Actions
  const handleSaveSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSetting) return;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify(editingSetting),
      });
      if (res.ok) {
        showToast('Setting saved successfully!', 'success');
        setEditingSetting(null);
        setIsCreatingSetting(false);
        fetchSettings(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save setting.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while saving the setting.', 'error');
    }
  };

  const handleDeleteSetting = async (key: string) => {
    if (!confirm('Are you sure you want to delete this setting key permanently?')) return;
    try {
      const res = await fetch(`/api/admin/settings?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: { 'Authorization': password },
      });
      if (res.ok) {
        showToast('Setting deleted successfully!', 'success');
        fetchSettings(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete setting.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while deleting the setting.', 'error');
    }
  };

  // Service Save/Delete Actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify(editingService),
      });
      if (res.ok) {
        showToast('Service page saved successfully!', 'success');
        setEditingService(null);
        setIsCreatingService(false);
        fetchServices(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save service.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while saving the service.', 'error');
    }
  };

  const handleDeleteService = async (url: string) => {
    if (!confirm('Are you sure you want to delete this service page permanently?')) return;
    try {
      const res = await fetch(`/api/admin/services?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
        headers: { 'Authorization': password },
      });
      if (res.ok) {
        showToast('Service page deleted successfully!', 'success');
        fetchServices(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete service page.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while deleting the service.', 'error');
    }
  };

  // Blog Save/Delete Actions
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password,
        },
        body: JSON.stringify(editingBlog),
      });
      if (res.ok) {
        showToast('Blog article saved successfully!', 'success');
        setEditingBlog(null);
        setIsCreatingBlog(false);
        fetchBlogs(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save blog post.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while saving the blog.', 'error');
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post permanently?')) return;
    try {
      const res = await fetch(`/api/admin/blogs?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
        headers: { 'Authorization': password },
      });
      if (res.ok) {
        showToast('Blog article deleted successfully!', 'success');
        fetchBlogs(password);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete blog post.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while deleting the blog.', 'error');
    }
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif', padding: '20px' }}>
        <style>{`
          .login-btn {
            background-color: #061912;
            color: #ffffff;
            transition: all 0.25s ease;
          }
          .login-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(6, 25, 18, 0.2);
            opacity: 0.95;
          }
          .login-card {
            box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(16px);
          }
        `}</style>

        <div className="login-card" style={{ width: '100%', maxWidth: '440px', padding: '48px 36px', borderRadius: '24px', backgroundColor: 'rgba(255, 255, 255, 0.85)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.03em', color: '#061912' }}>Yantra Legal</h2>
          <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '36px', fontWeight: 500 }}></p>

          {loginError && (
            <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#fef2f2', color: '#ef4444', fontSize: '0.85rem', marginBottom: '24px', borderLeft: '4px solid #ef4444', textAlign: 'left', fontWeight: 500 }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '4px 16px', marginBottom: '24px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)' }}>
              <Icon icon="material-symbols:lock" width="22" style={{ color: '#94a3b8', marginRight: '12px' }} />
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ flex: 1, padding: '14px 0', border: 'none', background: 'transparent', color: '#0f172a', fontSize: '0.95rem', outline: 'none', fontWeight: 500 }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="login-btn"
              style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '0.98rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              <Icon icon="material-symbols:arrow-forward" width="18" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Dynamic Styling Overrides for Animations and Interactive elements */}
      <style>{`
        .sidebar-nav-item {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sidebar-nav-item:hover {
          background-color: #f1f5f9;
          transform: translateX(2px);
        }
        .dashboard-card {
          transition: all 0.25s ease;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.01);
        }
        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.04), 0 4px 6px -2px rgba(15, 23, 42, 0.02);
        }
        .btn-modern {
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }
        .btn-modern-primary {
          background-color: #061912;
          color: #ffffff;
        }
        .btn-modern-primary:hover {
          opacity: 0.95;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(6, 25, 18, 0.15);
        }
        .btn-modern-secondary {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
        }
        .btn-modern-secondary:hover {
          background-color: #f8fafc;
          border-color: #94a3b8;
        }
        .btn-modern-danger {
          background-color: #fff1f1;
          border: 1px solid #fecaca;
          color: #ef4444;
        }
        .btn-modern-danger:hover {
          background-color: #fee2e2;
          border-color: #fca5a5;
        }
        .input-modern {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #0f172a;
          font-size: 0.92rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-modern:focus {
          border-color: #061912;
          box-shadow: 0 0 0 3px rgba(6, 25, 18, 0.08);
        }
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-toast {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '280px', height: '100vh', position: 'sticky', top: 0, backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

        {/* Brand Header with Clean Light Background and Filtered Logo */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '220px', height: '65px', position: 'relative' }}>
            <Image
              src="/Yantralegalnewlogo.png"
              alt="Yantra Legal Logo"
              fill
              priority
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                filter: 'brightness(0) saturate(100%) invert(6%) sepia(35%) saturate(3031%) hue-rotate(130deg) brightness(95%) contrast(98%)'
              }}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => { setActiveTab('dashboard'); setEditingService(null); setEditingBlog(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'dashboard' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'dashboard' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'dashboard' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:dashboard" width="22" style={{ color: activeTab === 'dashboard' ? '#061912' : '#64748b' }} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab('services'); setEditingService(null); setEditingBlog(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'services' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'services' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'services' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:gavel" width="22" style={{ color: activeTab === 'services' ? '#061912' : '#64748b' }} />
            <span>Legal Pages</span>
          </button>

          <button
            onClick={() => { setActiveTab('blogs'); setEditingService(null); setEditingBlog(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'blogs' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'blogs' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'blogs' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:book" width="22" style={{ color: activeTab === 'blogs' ? '#061912' : '#64748b' }} />
            <span>Blogs</span>
          </button>

          <button
            onClick={() => { setActiveTab('about'); setEditingService(null); setEditingBlog(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'about' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'about' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'about' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:person" width="22" style={{ color: activeTab === 'about' ? '#061912' : '#64748b' }} />
            <span>About Page</span>
          </button>

          <button
            onClick={() => { setActiveTab('faqs'); setEditingService(null); setEditingBlog(null); setEditingFaq(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'faqs' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'faqs' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'faqs' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:quiz" width="22" style={{ color: activeTab === 'faqs' ? '#061912' : '#64748b' }} />
            <span>FAQs Manager</span>
          </button>

          <button
            onClick={() => { setActiveTab('marquee'); setEditingService(null); setEditingBlog(null); setEditingMarqueeUpdate(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'marquee' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'marquee' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'marquee' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:campaign" width="22" style={{ color: activeTab === 'marquee' ? '#061912' : '#64748b' }} />
            <span>Marquee Updates</span>
          </button>
        </nav>

        {/* Sidebar Footer Site Settings & Log out */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid #e2e8f0', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => { setActiveTab('settings'); setEditingService(null); setEditingBlog(null); }}
            className="sidebar-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: activeTab === 'settings' ? 'rgba(6, 25, 18, 0.06)' : 'transparent',
              color: activeTab === 'settings' ? '#061912' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: activeTab === 'settings' ? 700 : 500,
              fontSize: '0.94rem',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Icon icon="material-symbols:settings" width="22" style={{ color: activeTab === 'settings' ? '#061912' : '#64748b' }} />
            <span>Site Settings</span>
          </button>

          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', width: '100%', background: 'transparent', border: 'none', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', fontSize: '0.94rem', fontWeight: 600, textAlign: 'left' }}
          >
            <Icon icon="material-symbols:logout" width="22" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT REGION */}
      <main style={{ flex: 1, padding: '48px 56px', overflowY: 'auto', background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>

        {/* Content Section Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.03em' }}>
              {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab === 'services' ? 'Legal Page Manager' : activeTab === 'blogs' ? 'Blog Insights Manager' : activeTab === 'about' ? 'About Page Manager' : activeTab === 'faqs' ? 'FAQs Manager' : activeTab === 'marquee' ? 'Marquee Updates Manager' : 'Global Settings Manager'}
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#475569', marginTop: '6px', fontWeight: 500 }}>
              {activeTab === 'dashboard' ? 'Track real-time site activity metrics, consultation click rates and contact submissions' : activeTab === 'services' ? 'Create, update and structure dynamic service subsections' : activeTab === 'blogs' ? 'Draft, edit and publish legal articles' : activeTab === 'about' ? 'Update headlines, our story narrative, and solicitor biography' : activeTab === 'faqs' ? 'Manage frequently asked questions categorized by legal service streams' : activeTab === 'marquee' ? 'Manage information marquee updates, news, and links' : 'Manage office contact info, social links, and consultation variables'}
            </p>
          </div>
        </div>

        {/* Global Loading overlay */}
        {isLoading && (
          <div style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Synchronizing data streams...</span>
          </div>
        )}

        {/* ==================== SECTION: SERVICES CONTENT BUILDER ==================== */}
        {!isLoading && activeTab === 'services' && (
          <div>
            {!editingService && !isCreatingService ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Website Content</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>Active Service Pages</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingService(true);
                      setEditingService({
                        pageNum: services.length + 1,
                        title: '',
                        url: '',
                        sections: [{ heading: '', paragraphs: [''] }]
                      });
                    }}
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                  >
                    <Icon icon="material-symbols:add-circle" width="18" />
                    <span>Create New Page</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {services.map((service) => (
                    <div
                      key={service.url}
                      className="dashboard-card"
                      style={{ padding: '20px 28px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{service.title}</span>
                        <span style={{ fontSize: '0.82rem', color: '#475569', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', marginLeft: '16px', fontFamily: 'monospace', fontWeight: 600 }}>{service.url}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => setEditingService(JSON.parse(JSON.stringify(service)))}
                          className="btn-modern btn-modern-secondary"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          <Icon icon="material-symbols:edit" width="16" />
                          <span>Edit Page</span>
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.url)}
                          className="btn-modern btn-modern-danger"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          <Icon icon="material-symbols:delete" width="16" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Create or Edit Service Page Form */
              <form onSubmit={handleSaveService} style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Services Builder</span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#061912', margin: '4px 0 0 0' }}>
                    {isCreatingService ? 'Create Service Page' : `Edit Content: ${editingService?.title}`}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Page Title</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingService?.title || ''}
                      onChange={(e) => setEditingService({ ...editingService!, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Page URL path (starts with /)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingService?.url || ''}
                      onChange={(e) => setEditingService({ ...editingService!, url: e.target.value })}
                      required
                      placeholder="/migration-law/partner-visas"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Page Content Subsections</h4>

                  {editingService?.sections.map((section, sIdx) => (
                    <div key={sIdx} style={{ padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#061912' }}>Subsection Block {sIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSections = [...editingService.sections];
                            newSections.splice(sIdx, 1);
                            setEditingService({ ...editingService, sections: newSections });
                          }}
                          className="btn-modern btn-modern-danger"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          Remove Block
                        </button>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Heading Title</label>
                        <input
                          type="text"
                          className="input-modern"
                          value={section.heading}
                          onChange={(e) => {
                            const newSections = [...editingService.sections];
                            newSections[sIdx].heading = e.target.value;
                            setEditingService({ ...editingService, sections: newSections });
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '10px' }}>Paragraphs Content</label>
                        {section.paragraphs.map((para, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                            <textarea
                              className="input-modern"
                              value={para}
                              onChange={(e) => {
                                const newSections = [...editingService.sections];
                                newSections[sIdx].paragraphs[pIdx] = e.target.value;
                                setEditingService({ ...editingService, sections: newSections });
                              }}
                              required
                              rows={3}
                              style={{ resize: 'vertical' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSections = [...editingService.sections];
                                newSections[sIdx].paragraphs.splice(pIdx, 1);
                                setEditingService({ ...editingService, sections: newSections });
                              }}
                              className="btn-modern btn-modern-danger"
                              style={{ padding: '12px 14px' }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newSections = [...editingService.sections];
                            newSections[sIdx].paragraphs.push('');
                            setEditingService({ ...editingService, sections: newSections });
                          }}
                          className="btn-modern btn-modern-secondary"
                          style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                        >
                          + Add Paragraph Box
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setEditingService({
                        ...editingService!,
                        sections: [...editingService!.sections, { heading: '', paragraphs: [''] }]
                      });
                    }}
                    className="btn-modern btn-modern-secondary"
                    style={{ width: '100%', padding: '16px', border: '2px dashed #cbd5e1', color: '#475569', borderRadius: '14px' }}
                  >
                    + Add New Subsection Block
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => { setEditingService(null); setIsCreatingService(false); }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                  >
                    Save & Update Site
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ==================== SECTION: BLOGS CONTENT MANAGER ==================== */}
        {!isLoading && activeTab === 'blogs' && (
          <div>
            {!editingBlog && !isCreatingBlog ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Journal Content</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>Active Articles</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingBlog(true);
                      setEditingBlog({
                        title: '',
                        slug: '',
                        excerpt: '',
                        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
                        category: 'Migration Law',
                        readTime: '3 min read',
                        thumbnail: '/partner_visa_refusal_thumbnail.png',
                        content: ['']
                      });
                    }}
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                  >
                    <Icon icon="material-symbols:add-circle" width="18" />
                    <span>Create New Article</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {blogs.map((post) => (
                    <div
                      key={post.slug}
                      className="dashboard-card"
                      style={{ padding: '20px 28px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{post.title}</span>
                        <span style={{ fontSize: '0.82rem', color: '#475569', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', marginLeft: '16px', fontFamily: 'monospace', fontWeight: 600 }}>{post.slug}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => setEditingBlog(JSON.parse(JSON.stringify(post)))}
                          className="btn-modern btn-modern-secondary"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          <Icon icon="material-symbols:edit" width="16" />
                          <span>Edit Article</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.slug)}
                          className="btn-modern btn-modern-danger"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          <Icon icon="material-symbols:delete" width="16" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Create or Edit Blog Post Form */
              <form onSubmit={handleSaveBlog} style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Article Editor</span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#061912', margin: '4px 0 0 0' }}>
                    {isCreatingBlog ? 'Create New Article' : `Edit Article: ${editingBlog?.title}`}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Article Title</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingBlog?.title || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog!, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>URL Slug (dashed format)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingBlog?.slug || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog!, slug: e.target.value })}
                      required
                      placeholder="spouse-visa-refusal-appeals"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Category</label>
                    <select
                      className="input-modern"
                      value={editingBlog?.category || 'Migration Law'}
                      onChange={(e) => setEditingBlog({ ...editingBlog!, category: e.target.value })}
                      required
                    >
                      <option value="Migration Law">Migration Law</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Appeals & Reviews">Appeals & Reviews</option>
                      <option value="General Insights">General Insights</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Read Time</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingBlog?.readTime || '4 min read'}
                      onChange={(e) => setEditingBlog({ ...editingBlog!, readTime: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Publish Date</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingBlog?.date || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog!, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Excerpt (Brief Meta Summary)</label>
                  <textarea
                    className="input-modern"
                    value={editingBlog?.excerpt || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog!, excerpt: e.target.value })}
                    required
                    rows={3}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Thumbnail Image URL</label>
                  <input
                    type="text"
                    className="input-modern"
                    value={editingBlog?.thumbnail || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog!, thumbnail: e.target.value })}
                    required
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Article Content Paragraphs</h4>

                  {editingBlog?.content.map((para, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <textarea
                        className="input-modern"
                        value={para}
                        onChange={(e) => {
                          const newContent = [...editingBlog.content];
                          newContent[cIdx] = e.target.value;
                          setEditingBlog({ ...editingBlog, content: newContent });
                        }}
                        required
                        rows={4}
                        placeholder="Write article paragraph. Prefix with • or - to make this paragraph render as a bulleted list item."
                        style={{ resize: 'vertical' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newContent = [...editingBlog.content];
                          newContent.splice(cIdx, 1);
                          setEditingBlog({ ...editingBlog, content: newContent });
                        }}
                        className="btn-modern btn-modern-danger"
                        style={{ padding: '14px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog({
                        ...editingBlog!,
                        content: [...editingBlog!.content, '']
                      });
                    }}
                    className="btn-modern btn-modern-secondary"
                    style={{ width: '100%', padding: '16px', border: '2px dashed #cbd5e1', color: '#475569', borderRadius: '14px' }}
                  >
                    + Add Content Paragraph
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => { setEditingBlog(null); setIsCreatingBlog(false); }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                  >
                    Save & Publish Article
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ==================== SECTION: SITE SETTINGS MANAGER ==================== */}
        {!isLoading && activeTab === 'settings' && (
          <div>
            {!editingSetting && !isCreatingSetting ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Configuration</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>Global Site Settings</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingSetting(true);
                      setEditingSetting({
                        key: '',
                        label: '',
                        value: '',
                        category: 'General'
                      });
                    }}
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                  >
                    <Icon icon="material-symbols:add-circle" width="18" />
                    <span>Add Custom Setting</span>
                  </button>
                </div>

                <div className="dashboard-card" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '16px 24px' }}>Setting Key / Label</th>
                        <th style={{ padding: '16px 24px' }}>Category</th>
                        <th style={{ padding: '16px 24px' }}>Current Value</th>
                        <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.map((setting) => (
                        <tr key={setting.key} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{setting.label}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>{setting.key}</div>
                          </td>
                          <td style={{ padding: '16px 24px' }}>
                            <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>{setting.category || 'General'}</span>
                          </td>
                          <td style={{ padding: '16px 24px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                            {setting.value}
                          </td>
                          <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setEditingSetting(JSON.parse(JSON.stringify(setting)))}
                                className="btn-modern btn-modern-secondary"
                                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              >
                                <Icon icon="material-symbols:edit" width="16" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteSetting(setting.key)}
                                className="btn-modern btn-modern-danger"
                                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              >
                                <Icon icon="material-symbols:delete" width="16" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Change Password Sub-card */}
                <div style={{ marginTop: '40px', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Security Setting</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>Change Admin Password</h3>
                  </div>
                  <form onSubmit={handleChangePassword} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', maxWidth: '600px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>New Password</label>
                      <input
                        type="password"
                        className="input-modern"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter new admin password"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="btn-modern btn-modern-primary"
                      style={{ padding: '14px 24px', fontSize: '0.92rem' }}
                    >
                      {isChangingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Create or Edit Setting Form */
              <form onSubmit={handleSaveSetting} style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Settings Editor</span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#061912', margin: '4px 0 0 0' }}>
                    {isCreatingSetting ? 'Create Custom Setting' : `Edit Config: ${editingSetting?.label}`}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Setting Key (Internal, lowercase)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingSetting?.key || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting!, key: e.target.value })}
                      required
                      disabled={!isCreatingSetting}
                      placeholder="e.g. contactPhone"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Friendly Label</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingSetting?.label || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting!, label: e.target.value })}
                      required
                      placeholder="e.g. Firm Support Number"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Category</label>
                    <select
                      className="input-modern"
                      value={editingSetting?.category || 'General'}
                      onChange={(e) => setEditingSetting({ ...editingSetting!, category: e.target.value })}
                      required
                    >
                      <option value="General">General</option>
                      <option value="Contact">Contact</option>
                      <option value="Social">Social Links</option>
                      <option value="SEO">SEO & Metadata</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Setting Value</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingSetting?.value || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting!, value: e.target.value })}
                      required
                      placeholder="e.g. +61 402 402 120"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => { setEditingSetting(null); setIsCreatingSetting(false); }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                  >
                    Save Configuration
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ==================== SECTION: ABOUT PAGE CONTENT MANAGER ==================== */}
        {!isLoading && activeTab === 'about' && about && (
          <div>
            <form onSubmit={handleSaveAbout} style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>About Editor</span>
                <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#061912', margin: '4px 0 0 0' }}>
                  Manage About Page Layout
                </h3>
              </div>

              {/* 1. HERO TAB / HERO FIELDS */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Hero Section</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Hero Eyebrow (Pill)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={about.heroPill || ''}
                      onChange={(e) => setAbout({ ...about, heroPill: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Hero Title</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={about.heroTitle || ''}
                      onChange={(e) => setAbout({ ...about, heroTitle: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Hero Subtitle</label>
                    <textarea
                      className="input-modern"
                      rows={3}
                      value={about.heroSubtitle || ''}
                      onChange={(e) => setAbout({ ...about, heroSubtitle: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. OUR STORY FIELDS */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Our Story</h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Story Eyebrow (Pill)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={about.storyPill || ''}
                      onChange={(e) => setAbout({ ...about, storyPill: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Story Title</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={about.storyTitle || ''}
                      onChange={(e) => setAbout({ ...about, storyTitle: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Story Paragraphs</label>
                  {about.storyParagraphs?.map((para: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <textarea
                        className="input-modern"
                        value={para}
                        onChange={(e) => {
                          const newParas = [...about.storyParagraphs];
                          newParas[idx] = e.target.value;
                          setAbout({ ...about, storyParagraphs: newParas });
                        }}
                        required
                        rows={3}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newParas = [...about.storyParagraphs];
                          newParas.splice(idx, 1);
                          setAbout({ ...about, storyParagraphs: newParas });
                        }}
                        className="btn-modern btn-modern-danger"
                        style={{ padding: '12px 14px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newParas = [...(about.storyParagraphs || [])];
                      newParas.push('');
                      setAbout({ ...about, storyParagraphs: newParas });
                    }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                  >
                    + Add Paragraph
                  </button>
                </div>
              </div>

              {/* 3. INTRODUCTION / KRISHNA GIRI */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Solicitor Biography</h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Pill Label</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={about.introTitle || ''}
                      onChange={(e) => setAbout({ ...about, introTitle: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Role / Subtitle</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={about.introSubtitle || ''}
                      onChange={(e) => setAbout({ ...about, introSubtitle: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Highlight Tagline</label>
                  <textarea
                    className="input-modern"
                    rows={2}
                    value={about.introTagline || ''}
                    onChange={(e) => setAbout({ ...about, introTagline: e.target.value })}
                    required
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Introduction paragraphs</label>
                  {about.introParagraphs?.map((para: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <textarea
                        className="input-modern"
                        value={para}
                        onChange={(e) => {
                          const newParas = [...about.introParagraphs];
                          newParas[idx] = e.target.value;
                          setAbout({ ...about, introParagraphs: newParas });
                        }}
                        required
                        rows={3}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newParas = [...about.introParagraphs];
                          newParas.splice(idx, 1);
                          setAbout({ ...about, introParagraphs: newParas });
                        }}
                        className="btn-modern btn-modern-danger"
                        style={{ padding: '12px 14px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newParas = [...(about.introParagraphs || [])];
                      newParas.push('');
                      setAbout({ ...about, introParagraphs: newParas });
                    }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                  >
                    + Add Paragraph
                  </button>
                </div>
              </div>

              {/* 4. FEATURED QUOTE */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Featured Quote</h4>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Quote Text</label>
                  <textarea
                    className="input-modern"
                    rows={3}
                    value={about.quoteText || ''}
                    onChange={(e) => setAbout({ ...about, quoteText: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Quote Author / Source</label>
                  <input
                    type="text"
                    className="input-modern"
                    value={about.quoteAuthor || ''}
                    onChange={(e) => setAbout({ ...about, quoteAuthor: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <button
                  type="submit"
                  disabled={isSavingAbout}
                  className="btn-modern btn-modern-primary"
                  style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                >
                  {isSavingAbout ? 'Saving Changes...' : 'Save About Page Content'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== SECTION: FAQS MANAGER ==================== */}
        {!isLoading && activeTab === 'faqs' && (
          <div>
            {!editingFaq ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>FAQs Manager</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>FAQ Categories</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingFaq(true);
                      setEditingFaq({
                        id: '',
                        category: '',
                        shortName: '',
                        items: []
                      });
                    }}
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                  >
                    <Icon icon="material-symbols:add-circle" width="18" />
                    <span>Create Category</span>
                  </button>
                </div>

                <div className="dashboard-card" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '16px 24px' }}>Category Name</th>
                        <th style={{ padding: '16px 24px' }}>Short Name / ID</th>
                        <th style={{ padding: '16px 24px' }}>Questions Count</th>
                        <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqs.map((faqCat, idx) => (
                        <tr key={faqCat.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{faqCat.category}</div>
                          </td>
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ fontWeight: 600 }}>{faqCat.shortName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>{faqCat.id}</div>
                          </td>
                          <td style={{ padding: '16px 24px', fontWeight: 500 }}>
                            {faqCat.items?.length || 0} FAQs
                          </td>
                          <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => {
                                  setIsCreatingFaq(false);
                                  setEditingFaq(JSON.parse(JSON.stringify(faqCat)));
                                }}
                                className="btn-modern btn-modern-secondary"
                                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              >
                                <Icon icon="material-symbols:edit" width="16" />
                                <span>Edit Items</span>
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete the FAQ category "${faqCat.shortName}"?`)) {
                                    const updated = faqs.filter((_, fIdx) => fIdx !== idx);
                                    setFaqs(updated);
                                    await handleSaveFaqs(undefined, updated);
                                  }
                                }}
                                className="btn-modern btn-modern-danger"
                                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              >
                                <Icon icon="material-symbols:delete" width="16" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Create or Edit FAQ Category Form */
              <form onSubmit={async (e) => {
                e.preventDefault();
                let updatedList;
                if (isCreatingFaq) {
                  updatedList = [...faqs, editingFaq];
                } else {
                  updatedList = faqs.map(item => item.id === editingFaq.id ? editingFaq : item);
                }
                setFaqs(updatedList);
                await handleSaveFaqs(undefined, updatedList);
                setEditingFaq(null);
                setIsCreatingFaq(false);
              }} style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>FAQ Category Editor</span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#061912', margin: '4px 0 0 0' }}>
                    {isCreatingFaq ? 'Create FAQ Category' : `Edit Category: ${editingFaq?.shortName}`}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Category ID (lowercase, no spaces)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingFaq.id || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, id: e.target.value })}
                      required
                      disabled={!isCreatingFaq}
                      placeholder="e.g. migration-general"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Short Display Name (Sidebar)</label>
                    <input
                      type="text"
                      className="input-modern"
                      value={editingFaq.shortName || ''}
                      onChange={(e) => setEditingFaq({ ...editingFaq, shortName: e.target.value })}
                      required
                      placeholder="e.g. Partner Visas"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Full Header Name</label>
                  <input
                    type="text"
                    className="input-modern"
                    value={editingFaq.category || ''}
                    onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                    required
                    placeholder="e.g. CATEGORY 2 — PARTNER VISAS"
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Questions & Answers</h4>

                  {editingFaq.items?.map((item: any, idx: number) => (
                    <div key={idx} style={{ padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#061912' }}>FAQ Item {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [...editingFaq.items];
                            newItems.splice(idx, 1);
                            setEditingFaq({ ...editingFaq, items: newItems });
                          }}
                          className="btn-modern btn-modern-danger"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          Remove Item
                        </button>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Question Text</label>
                        <input
                          type="text"
                          className="input-modern"
                          value={item.q}
                          onChange={(e) => {
                            const newItems = [...editingFaq.items];
                            newItems[idx].q = e.target.value;
                            setEditingFaq({ ...editingFaq, items: newItems });
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Answer Text (Use Markdown links [label](url) if needed. Use double enters to split paragraphs. Start paragraph with **Notice:** or **Note:** to wrap in callout boxes.)</label>
                        <textarea
                          className="input-modern"
                          value={item.a}
                          onChange={(e) => {
                            const newItems = [...editingFaq.items];
                            newItems[idx].a = e.target.value;
                            setEditingFaq({ ...editingFaq, items: newItems });
                          }}
                          required
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...(editingFaq.items || [])];
                      newItems.push({ q: '', a: '' });
                      setEditingFaq({ ...editingFaq, items: newItems });
                    }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                  >
                    + Add Question
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => { setEditingFaq(null); setIsCreatingFaq(false); }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingFaqs}
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                  >
                    {isSavingFaqs ? 'Saving Category...' : 'Save Category & Items'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        {/* ==================== SECTION: DASHBOARD OVERVIEW ==================== */}
        {!isLoading && activeTab === 'dashboard' && dashboardStats && (
          <div>
            {/* Metric Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>

              {/* Card 1: Total Views */}
              <div className="dashboard-card" style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Views</span>
                  <Icon icon="material-symbols:trending-up" width="24" style={{ color: '#0ea5e9' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{dashboardStats.totalViews?.toLocaleString()}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>Static placeholder data (API pending)</div>
              </div>

              {/* Card 2: Login Stats */}
              <div className="dashboard-card" style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Session Logs</span>
                  <Icon icon="material-symbols:security" width="24" style={{ color: '#10b981' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{dashboardStats.loginCount} Logins</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                  Last: {dashboardStats.lastLoginDate ? new Date(dashboardStats.lastLoginDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never'}
                </div>
              </div>

              {/* Card 3: Content Change Rate */}
              <div className="dashboard-card" style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Content Change Rate</span>
                  <Icon icon="material-symbols:edit-document" width="24" style={{ color: '#f59e0b' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{dashboardStats.contentChangeRate}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>Active dynamic DB content objects</div>
              </div>

              {/* Card 4: Unique IP Click Tracking */}
              <div className="dashboard-card" style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unique IP Click Events</span>
                  <Icon icon="material-symbols:ads-click" width="24" style={{ color: '#8b5cf6' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
                    <span style={{ color: '#475569' }}>Contact Page:</span>
                    <span style={{ color: '#0f172a' }}>{dashboardStats.contactClicksCount} visitors</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
                    <span style={{ color: '#475569' }}>Book Consultation:</span>
                    <span style={{ color: '#0f172a' }}>{dashboardStats.bookConsultationClicksCount} clicks</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Submissions Table */}
            <div style={{ marginBottom: '28px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Customer Inquiries</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>Contact Form Submissions</h3>
            </div>

            <div className="dashboard-card" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
              {dashboardStats.submissions && dashboardStats.submissions.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '16px 24px' }}>Client Info</th>
                        <th style={{ padding: '16px 24px' }}>Preferred Format</th>
                        <th style={{ padding: '16px 24px' }}>Matter Type</th>
                        <th style={{ padding: '16px 24px' }}>Description / Message</th>
                        <th style={{ padding: '16px 24px' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardStats.submissions.map((sub: any, idx: number) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' }}>
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{sub.name}</div>
                            <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>{sub.email}</div>
                            {sub.phone && <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{sub.phone}</div>}
                          </td>
                          <td style={{ padding: '16px 24px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, background: '#f0fdf4', color: '#166534', textTransform: 'capitalize' }}>
                              {sub.preferredFormat || 'N/A'}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px', fontWeight: 600, color: '#334155' }}>
                            {sub.matterType || 'N/A'}
                          </td>
                          <td style={{ padding: '16px 24px', maxWidth: '360px', color: '#475569', fontSize: '0.85rem', lineHeight: '1.5' }}>
                            {sub.description}
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '0.82rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                            {new Date(sub.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>
                              {new Date(sub.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
                  <Icon icon="material-symbols:inbox" width="36" style={{ marginBottom: '8px', color: '#94a3b8' }} />
                  <p style={{ margin: 0 }}>No contact form submissions recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== SECTION: MARQUEE UPDATES MANAGER ==================== */}
        {!isLoading && activeTab === 'marquee' && (
          <div>
            {!editingMarqueeUpdate && !isCreatingMarqueeUpdate ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Information stream</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#0f172a' }}>News & Marquee Updates</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingMarqueeUpdate(true);
                      setEditingMarqueeUpdate({
                        heading: '',
                        content: '',
                        imageUrl: '',
                        isActive: true
                      });
                    }}
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                  >
                    + Add New Update
                  </button>
                </div>

                <div className="dashboard-card" style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
                  {marqueeUpdates.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                            <th style={{ padding: '16px 24px' }}>Info / Update</th>
                            <th style={{ padding: '16px 24px' }}>Status</th>
                            <th style={{ padding: '16px 24px' }}>Created Date</th>
                            <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marqueeUpdates.map((update: any) => (
                            <tr key={update._id} style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                              <td style={{ padding: '16px 24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  {update.imageUrl && (
                                    <img
                                      src={update.imageUrl}
                                      alt=""
                                      style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                                    />
                                  )}
                                  <div>
                                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{update.heading}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {update.content}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '16px 24px' }}>
                                <span style={{
                                  display: 'inline-block',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  background: update.isActive !== false ? '#f0fdf4' : '#f8fafc',
                                  color: update.isActive !== false ? '#166534' : '#64748b',
                                  border: `1px solid ${update.isActive !== false ? '#bbf7d0' : '#e2e8f0'}`
                                }}>
                                  {update.isActive !== false ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td style={{ padding: '16px 24px', color: '#64748b', fontSize: '0.85rem' }}>
                                {new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </td>
                              <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                  <button
                                    onClick={() => setEditingMarqueeUpdate(JSON.parse(JSON.stringify(update)))}
                                    className="btn-modern btn-modern-secondary"
                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    <Icon icon="material-symbols:edit" width="16" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMarqueeUpdate(update._id)}
                                    className="btn-modern btn-modern-danger"
                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                  >
                                    <Icon icon="material-symbols:delete" width="16" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
                      <Icon icon="material-symbols:campaign" width="36" style={{ marginBottom: '8px', color: '#94a3b8' }} />
                      <p style={{ margin: 0 }}>No updates created yet. Click "+ Add New Update" to create one.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Create or Edit Update Form */
              <form onSubmit={handleSaveMarqueeUpdate} style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>Update Editor</span>
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#061912', margin: '4px 0 0 0' }}>
                    {isCreatingMarqueeUpdate ? 'Publish New Info Update' : `Edit Update: ${editingMarqueeUpdate?.heading}`}
                  </h3>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Marquee Heading (Short title shown scrolling)</label>
                  <input
                    type="text"
                    className="input-modern"
                    value={editingMarqueeUpdate?.heading || ''}
                    onChange={(e) => setEditingMarqueeUpdate({ ...editingMarqueeUpdate, heading: e.target.value })}
                    required
                    placeholder="e.g. Offices Closed on public holidays..."
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Upload Image (Optional)</label>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        setIsUploading(true);
                        try {
                          const res = await fetch('/api/admin/upload', {
                            method: 'POST',
                            headers: {
                              'Authorization': password
                            },
                            body: formData
                          });
                          const data = await res.json();
                          if (res.ok && data.success) {
                            setEditingMarqueeUpdate({
                              ...editingMarqueeUpdate,
                              imageUrl: data.url
                            });
                            showToast('Image uploaded successfully!', 'success');
                          } else {
                            showToast(data.error || 'Upload failed', 'error');
                          }
                        } catch (err) {
                          console.error(err);
                          showToast('Upload error', 'error');
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                      className="input-modern"
                      style={{ padding: '8px', maxWidth: '300px' }}
                    />
                    {isUploading && <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Uploading file...</span>}
                  </div>
                  {editingMarqueeUpdate?.imageUrl && (
                    <div style={{ marginTop: '12px' }}>
                      <img
                        src={editingMarqueeUpdate.imageUrl}
                        alt="Preview"
                        style={{ height: '80px', borderRadius: '8px', border: '1px solid #cbd5e1', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>Detailed Content</label>
                  <textarea
                    rows={8}
                    className="input-modern"
                    value={editingMarqueeUpdate?.content || ''}
                    onChange={(e) => setEditingMarqueeUpdate({ ...editingMarqueeUpdate, content: e.target.value })}
                    required
                    placeholder="Enter the full update content. This will be shown when the user clicks the marquee update link."
                    style={{ fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={editingMarqueeUpdate?.isActive !== false}
                      onChange={(e) => setEditingMarqueeUpdate({ ...editingMarqueeUpdate, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span>Active & Visible in Marquee</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => { setEditingMarqueeUpdate(null); setIsCreatingMarqueeUpdate(false); }}
                    className="btn-modern btn-modern-secondary"
                    style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modern btn-modern-primary"
                    style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                  >
                    Save Marquee Update
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </main>

      {/* Dynamic Toast Popup Notification Box */}
      {toast && (
        <div
          className="animate-toast"
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '14px 20px',
            borderRadius: '10px',
            backgroundColor: toast.type === 'success' ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${toast.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            color: toast.type === 'success' ? '#065f46' : '#991b1b',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 600,
            fontSize: '0.88rem'
          }}
        >
          <Icon icon={toast.type === 'success' ? 'material-symbols:check-circle' : 'material-symbols:error'} width="20" style={{ color: toast.type === 'success' ? '#059669' : '#dc2626' }} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
