import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [successMsg, setSuccessMsg] = useState('');

  const [stats, setStats] = useState({
    activeDoctors: 12,
    totalPatients: 100,
    departmentsCount: 6,
    totalTickets: 89,
    pendingAppointments: 5
  });

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', doctor: 'Dr. Specialist', status: 'Active' },
    { id: 2, name: 'Emergency Care', doctor: 'Dr. John Doe', status: 'Active' },
    { id: 3, name: 'Internal Medicine', doctor: 'Dr. Sarah Smith', status: 'Active' },
    { id: 4, name: 'Pulmonology', doctor: 'Dr. Michael Brown', status: 'Active' },
    { id: 5, name: 'Pediatrics', doctor: 'Dr. Emily Davis', status: 'Active' },
    { id: 6, name: 'Dermatology', doctor: 'Dr. Robert Wilson', status: 'Active' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'admin_master', role: 'Admin', action: 'System Login Successful', timestamp: '2026-10-12 10:15:22' },
    { id: 2, user: 'dr_sarah', role: 'Doctor', action: 'User Login Successful', timestamp: '2026-10-12 10:20:05' },
    { id: 3, user: 'patient_ahmad', role: 'Patient', action: 'Created Medical Ticket #104', timestamp: '2026-10-12 10:25:40' },
    { id: 4, user: 'reception_mira', role: 'Receptionist', action: 'Confirmed Appointment #202', timestamp: '2026-10-12 10:30:12' }
  ]);

  const handleLogout = () => {
    navigate('/login');
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans w-full selection:bg-teal-500 selection:text-white">
      
      <aside className="w-72 bg-gradient-to-b from-teal-950 via-slate-950 to-slate-950 border-r border-teal-800/20 p-5 flex flex-col justify-between fixed h-screen z-20 shadow-2xl backdrop-blur-xl">
        
        <div className="space-y-6">
          <div className="flex items-center space-x-3 px-2 py-3 bg-teal-900/20 rounded-2xl border border-teal-700/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-bold text-base border border-teal-300/30">
              🛡️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                ClinicCare
              </h2>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[9px] text-teal-300/80 font-bold tracking-widest uppercase">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Dashboard & Metrics', icon: '📊' },
              { id: 'departments', label: 'Manage Departments', icon: '🏥' },
              { id: 'users', label: 'Users & Roles', icon: '👥' },
              { id: 'schedules', label: 'Doctor Schedules', icon: '⏰' },
              { id: 'audit', label: 'Audit Logs', icon: '📜' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-white border border-teal-500/40 shadow-lg shadow-teal-950'
                    : 'text-teal-200/60 hover:text-white hover:bg-teal-900/30 border border-transparent'
                }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full shadow-glow"></div>
                )}
                <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                <span style={{ fontFamily: "'Times New Roman', Times, serif" }} className="text-sm tracking-wide">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-teal-800/30">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-teal-900/10 border border-teal-700/20">
            <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-xs font-bold text-teal-200 border border-teal-600/40">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">System Admin</p>
              <p className="text-[10px] text-teal-400/80 truncate">admin@cliniccare.sys</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow-sm text-sm hover:border-rose-500/40"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-8 space-y-8 max-w-[1500px]">
        
        {successMsg && (
          <div className="bg-teal-900/80 border border-teal-500/40 text-teal-200 p-4 rounded-2xl text-xs font-bold shadow-lg animate-fadeIn flex items-center justify-between">
            <span>✅ {successMsg}</span>
          </div>
        )}

        {/* Top Header */}
        <header className="bg-teal-900/30 backdrop-blur-xl border border-teal-700/30 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-300 bg-teal-950/80 px-3.5 py-1 rounded-full border border-teal-700/50 inline-block mb-2">
              System Administration
            </span>
            <h1 className="text-3xl font-normal text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              {activeTab === 'overview' && 'System Analytics'}
              {activeTab === 'departments' && 'Medical Departments Management'}
              {activeTab === 'users' && 'Internal Users & Role Control'}
              {activeTab === 'schedules' && 'Doctor Working Schedules Configuration'}
              {activeTab === 'audit' && 'System Audit Logs & Monitoring'}
            </h1>
          </div>
          <div className="flex items-center space-x-3 bg-teal-950/60 px-4 py-2.5 rounded-2xl border border-teal-800/50 text-xs font-bold text-teal-200 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span>System Administrator</span>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* البطاقة الرئيسية الكبيرة (Hero Highlight Metric) */}
            <div className="lg:col-span-1 bg-gradient-to-br from-teal-900/50 via-teal-950 to-slate-950 border border-teal-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-700/50 inline-block mb-3">
                  Overall System Health
                </span>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Clinical Operations
                </h2>
                <p className="text-xs text-teal-200/70">Real-time database sync across 6 specialized departments.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-teal-800/50 flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-bold text-teal-300 uppercase">Processed Triage</p>
                  <h3 className="text-5xl font-extrabold text-white mt-1" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {stats.totalTickets}
                  </h3>
                </div>
                <span className="text-2xl">⚡</span>
              </div>
            </div>

            {/* باقي الإحصائيات في شبكة مدمجة */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-lg">
                <p className="text-xs font-bold text-teal-300 uppercase">Active Doctors</p>
                <h3 className="text-3xl font-bold text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {stats.activeDoctors}
                </h3>
                <span className="text-[10px] text-teal-400 mt-1 block">Staffed in 6 Units</span>
              </div>

              <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-lg">
                <p className="text-xs font-bold text-teal-300 uppercase">Total Patients</p>
                <h3 className="text-3xl font-bold text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {stats.totalPatients}
                </h3>
                <span className="text-[10px] text-cyan-400 mt-1 block">Registered Users</span>
              </div>

              <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-lg">
                <p className="text-xs font-bold text-teal-300 uppercase">Departments</p>
                <h3 className="text-3xl font-bold text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {stats.departmentsCount}
                </h3>
                <span className="text-[10px] text-teal-300 mt-1 block">Active Clinics</span>
              </div>

              <div className="bg-amber-950/20 backdrop-blur-md border border-amber-700/30 rounded-3xl p-6 shadow-lg">
                <p className="text-xs font-bold text-amber-300 uppercase">Pending Review</p>
                <h3 className="text-3xl font-bold text-amber-400 mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {stats.pendingAppointments}
                </h3>
                <span className="text-[10px] text-amber-300 mt-1 block">Action Required</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Departments Management */}
        {activeTab === 'departments' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-teal-800/50 pb-4">
              <h3 className="text-base font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Registered Departments & Assigned Doctors ({departments.length})
              </h3>
              <button 
                onClick={() => showNotification('New department modal opened!')}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg shadow-teal-500/25 transition cursor-pointer"
              >
                + Add Department
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-950/60 text-teal-300 uppercase font-bold border-b border-teal-800/50">
                  <tr>
                    <th className="p-4 rounded-l-2xl">Department Name</th>
                    <th className="p-4">Assigned Doctor</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/40 text-teal-100">
                  {departments.map((dept) => (
                    <tr key={dept.id} className="hover:bg-teal-900/30 transition">
                      <td className="p-4 font-bold text-white text-sm">{dept.name}</td>
                      <td className="p-4 text-teal-200/80">{dept.doctor}</td>
                      <td className="p-4">
                        <span className="bg-teal-950 text-teal-300 border border-teal-700/50 px-3 py-1 rounded-full font-bold text-[10px]">
                          {dept.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => showNotification(`Updated settings for ${dept.name}`)}
                          className="bg-teal-900/50 hover:bg-teal-800 text-teal-200 px-3.5 py-2 rounded-xl font-bold transition border border-teal-700/50 cursor-pointer"
                        >
                          Configure ⚙️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users & Roles */}
        {activeTab === 'users' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              User Accounts & Role-Based Access Control (RBAC)
            </h3>
            <p className="text-xs text-teal-300/80">Manage internal accounts for Patients, Doctors, Receptionists, and Admins.</p>
            <div className="p-8 bg-teal-950/50 rounded-2xl border border-teal-800/50 text-center text-xs text-teal-400/60">
              User management table will list system accounts with role toggles and status controls.
            </div>
          </div>
        )}

        {/* Tab 4: Doctor Schedules */}
        {activeTab === 'schedules' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Doctor Working Hours & Slot Duration
            </h3>
            <p className="text-xs text-teal-300/80">Define working days, start time, end time, and appointment slot duration.</p>
            <div className="p-8 bg-teal-950/50 rounded-2xl border border-teal-800/50 text-center text-xs text-teal-400/60">
              Schedule configuration interface for defining doctor availability slots.
            </div>
          </div>
        )}

        {/* Tab 5: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-teal-800/50 pb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  System Audit Logs & User Activity Tracking
                </h3>
                <p className="text-xs text-teal-300/80 mt-1">Tracks successful user logins, role activities, and operational events.</p>
              </div>
              <button 
                onClick={() => showNotification('Audit logs exported successfully!')}
                className="bg-teal-950 hover:bg-teal-900 text-teal-200 border border-teal-700/50 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer"
              >
                Export Logs 📥
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-950/60 text-teal-300 uppercase font-bold border-b border-teal-800/50">
                  <tr>
                    <th className="p-4 rounded-l-2xl">Log ID</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">User Role</th>
                    <th className="p-4">Action / Event</th>
                    <th className="p-4 rounded-r-2xl">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/40 text-teal-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-teal-900/30 transition">
                      <td className="p-4 font-mono text-teal-400">#{log.id}</td>
                      <td className="p-4 font-bold text-white">{log.user}</td>
                      <td className="p-4">
                        <span className="bg-teal-950 text-cyan-300 border border-teal-700/50 px-3 py-1 rounded-full font-bold text-[10px]">
                          {log.role}
                        </span>
                      </td>
                      <td className="p-4 text-teal-200">{log.action}</td>
                      <td className="p-4 font-mono text-teal-300/80">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}