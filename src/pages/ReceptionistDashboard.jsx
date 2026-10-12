import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [successMsg, setSuccessMsg] = useState('');

  const [appointmentRequests, setAppointmentRequests] = useState([
    {
      id: 'APT-101',
      patientName: 'Ahmad Al-Mansour',
      doctorName: 'Dr. Sarah Smith',
      department: 'Internal Medicine',
      requestedSlot: '2026-10-15 (10:00 AM - 10:30 AM)',
      status: 'PENDING_CONFIRMATION'
    },
    {
      id: 'APT-102',
      patientName: 'Lina Hussam',
      doctorName: 'Dr. Specialist',
      department: 'Cardiology',
      requestedSlot: '2026-10-15 (11:30 AM - 12:00 PM)',
      status: 'PENDING_CONFIRMATION'
    }
  ]);

  const handleLogout = () => {
    navigate('/login');
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleConfirm = (id) => {
    setAppointmentRequests(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'CONFIRMED' } : item)
    );
    showNotification(`Appointment ${id} confirmed successfully! Patient and doctor notified.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans w-full selection:bg-teal-500 selection:text-white">
      
      {/* Sidebar المحدث الاحترافي */}
      <aside className="w-72 bg-gradient-to-b from-teal-950 via-slate-950 to-slate-950 border-r border-teal-800/20 p-5 flex flex-col justify-between fixed h-screen z-20 shadow-2xl backdrop-blur-xl">
        <div className="space-y-6">
          
          {/* Header & Logo */}
          <div className="flex items-center space-x-3 px-2 py-3 bg-teal-900/20 rounded-2xl border border-teal-700/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-bold text-base border border-teal-300/30">
              📋
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                ClinicCare
              </h2>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <p className="text-[9px] text-teal-300/80 font-bold tracking-widest uppercase">Reception Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {[
              { id: 'requests', label: 'Appointment Requests', icon: '📅' },
              { id: 'patients', label: 'Patient Profiles', icon: '👤' }
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

        {/* Bottom Profile & Sign Out */}
        <div className="space-y-4 pt-4 border-t border-teal-800/30">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-teal-900/10 border border-teal-700/20">
            <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-xs font-bold text-teal-200 border border-teal-600/40">
              RC
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Clinic Receptionist</p>
              <p className="text-[10px] text-teal-400/80 truncate">reception@cliniccare.sys</p>
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
              Front Desk Operations
            </span>
            <h1 className="text-3xl font-normal text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              {activeTab === 'requests' && 'Pending Appointment Requests'}
              {activeTab === 'patients' && 'Patient Profile Management'}
            </h1>
          </div>
          <div className="flex items-center space-x-3 bg-teal-950/60 px-4 py-2.5 rounded-2xl border border-teal-800/50 text-xs font-bold text-teal-200 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Receptionist Desk</span>
          </div>
        </header>

        {/* Tab 1: Appointment Requests */}
        {activeTab === 'requests' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-teal-800/50 pb-4">
              <h3 className="text-base font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Appointment Slot Approvals ({appointmentRequests.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-950/60 text-teal-300 uppercase font-bold border-b border-teal-800/50">
                  <tr>
                    <th className="p-4 rounded-l-2xl">Appt ID</th>
                    <th className="p-4">Patient Name</th>
                    <th className="p-4">Doctor & Dept</th>
                    <th className="p-4">Requested Time Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/40 text-teal-100">
                  {appointmentRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-teal-900/30 transition">
                      <td className="p-4 font-mono text-teal-400">{req.id}</td>
                      <td className="p-4 font-bold text-white">{req.patientName}</td>
                      <td className="p-4 text-teal-200/80">
                        {req.doctorName} <br />
                        <span className="text-[10px] text-teal-400">{req.department}</span>
                      </td>
                      <td className="p-4 font-mono text-teal-300">{req.requestedSlot}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] border ${
                          req.status === 'CONFIRMED'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700/50'
                            : 'bg-amber-950 text-amber-300 border-amber-700/50 animate-pulse'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        {req.status === 'PENDING_CONFIRMATION' && (
                          <button
                            onClick={() => handleConfirm(req.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold transition cursor-pointer shadow-md"
                          >
                            Confirm ✓
                          </button>
                        )}
                        <button
                          onClick={() => showNotification(`Reschedule slot modal opened for ${req.id}`)}
                          className="bg-teal-900/50 hover:bg-teal-800 text-teal-200 px-3 py-1.5 rounded-xl font-bold transition border border-teal-700/50 cursor-pointer"
                        >
                          Reschedule 🔄
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Patient Profiles */}
        {activeTab === 'patients' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Patient Administrative Profile Lookup
            </h3>
            <p className="text-xs text-teal-300/80">Search and update patient demographic and contact information.</p>
            <div className="p-8 bg-teal-950/50 rounded-2xl border border-teal-800/50 text-center text-xs text-teal-400/60">
              Patient search and profile updating tools.
            </div>
          </div>
        )}

      </main>
    </div>
  );
}