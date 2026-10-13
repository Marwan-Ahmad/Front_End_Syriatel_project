import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [successMsg, setSuccessMsg] = useState('');

  // حالات نافذة إعادة الجدولة (Reschedule Modal State)
  const [rescheduleModal, setRescheduleModal] = useState({ isOpen: false, appt: null });
  const [newSlot, setNewSlot] = useState('2026-10-16 (09:00 AM - 09:30 AM)');

  // حالات نافذة تسجيل وتعديل ملفات المرضى (Patient Profile Modals State)
  const [patientModal, setPatientModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [patientForm, setPatientForm] = useState({ name: '', dob: '', gender: 'Male', phone: '', address: '' });

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

  // قائمة المرضى (Patient Profiles List)
  const [patients, setPatients] = useState([
    { id: 1, name: 'Ahmad Al-Mansour', dob: '1992-05-14', gender: 'Male', phone: '+963 933 123 456', address: 'Damascus, Syria' },
    { id: 2, name: 'Lina Hussam', dob: '1998-11-22', gender: 'Female', phone: '+963 944 987 654', address: 'Aleppo, Syria' }
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

  // فتح نافذة إعادة الجدولة
  const handleOpenReschedule = (appt) => {
    setRescheduleModal({ isOpen: true, appt });
    setNewSlot('2026-10-16 (09:00 AM - 09:30 AM)');
  };

  const handleSaveReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleModal.appt) return;
    const id = rescheduleModal.appt.id;

    setAppointmentRequests(prev =>
      prev.map(item => item.id === id ? { ...item, requestedSlot: newSlot, status: 'RESCHEDULED' } : item)
    );

    showNotification(`Appointment ${id} rescheduled successfully to ${newSlot}!`);
    setRescheduleModal({ isOpen: false, appt: null });
  };

  // --- دوال إدارة ملفات المرضى (Patient Profile Modals) ---
  const openAddPatientModal = () => {
    setPatientForm({ name: '', dob: '', gender: 'Male', phone: '', address: '' });
    setPatientModal({ isOpen: true, mode: 'add', data: null });
  };

  const openEditPatientModal = (pat) => {
    setPatientForm({ name: pat.name, dob: pat.dob, gender: pat.gender, phone: pat.phone, address: pat.address });
    setPatientModal({ isOpen: true, mode: 'edit', data: pat });
  };

  const handleSavePatient = (e) => {
    e.preventDefault();
    if (patientModal.mode === 'add') {
      const newPat = { id: Date.now(), ...patientForm };
      setPatients([...patients, newPat]);
      showNotification(`Patient profile for "${patientForm.name}" created successfully!`);
    } else {
      setPatients(patients.map(p => p.id === patientModal.data.id ? { ...p, ...patientForm } : p));
      showNotification(`Patient profile for "${patientForm.name}" updated successfully!`);
    }
    setPatientModal({ isOpen: false, mode: 'add', data: null });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans w-full selection:bg-teal-500 selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-teal-950 via-slate-950 to-slate-950 border-r border-teal-800/20 p-5 flex flex-col justify-between fixed h-screen z-20 shadow-2xl backdrop-blur-xl">
        <div className="space-y-6">
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
                            : req.status === 'RESCHEDULED'
                            ? 'bg-sky-950 text-sky-300 border-sky-700/50'
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
                          onClick={() => handleOpenReschedule(req)}
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
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-teal-800/50 pb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Patient Administrative Profile Lookup
                </h3>
                <p className="text-xs text-teal-300/70 mt-0.5">Search and update patient demographic and contact information.</p>
              </div>
              <button 
                onClick={openAddPatientModal}
                className="bg-teal-700 hover:bg-teal-600 text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition cursor-pointer flex items-center space-x-2"
              >
                <span>👤+</span>
                <span>Register Patient Profile</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-950/60 text-teal-300 uppercase font-bold border-b border-teal-800/50">
                  <tr>
                    <th className="p-4 rounded-l-2xl">Patient Name</th>
                    <th className="p-4">Date of Birth</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4 text-center rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/40 text-teal-100">
                  {patients.map((pat) => (
                    <tr key={pat.id} className="hover:bg-teal-900/30 transition">
                      <td className="p-4 font-bold text-white">{pat.name}</td>
                      <td className="p-4 font-mono text-teal-300">{pat.dob}</td>
                      <td className="p-4 text-teal-200/80">{pat.gender}</td>
                      <td className="p-4 font-mono text-teal-300">{pat.phone}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => openEditPatientModal(pat)}
                          className="bg-teal-900/50 hover:bg-teal-800 text-teal-200 px-3.5 py-1.5 rounded-xl font-bold transition border border-teal-700/50 cursor-pointer"
                        >
                          Edit Profile ⚙️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* 1. Reschedule Modal */}
      {rescheduleModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">RECEPTION DESK</span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Reschedule Appointment {rescheduleModal.appt?.id}
                </h3>
              </div>
              <button 
                onClick={() => setRescheduleModal({ isOpen: false, appt: null })}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReschedule} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient</label>
                <input 
                  type="text" 
                  disabled
                  value={rescheduleModal.appt?.patientName || ''}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select New Available Slot</label>
                <select 
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full border border-teal-600 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none bg-white font-semibold cursor-pointer"
                >
                  <option value="2026-10-16 (09:00 AM - 09:30 AM)">2026-10-16 (09:00 AM - 09:30 AM)</option>
                  <option value="2026-10-16 (10:00 AM - 10:30 AM)">2026-10-16 (10:00 AM - 10:30 AM)</option>
                  <option value="2026-10-17 (02:00 PM - 02:30 PM)">2026-10-17 (02:00 PM - 02:30 PM)</option>
                  <option value="2026-10-18 (11:00 AM - 11:30 AM)">2026-10-18 (11:00 AM - 11:30 AM)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setRescheduleModal({ isOpen: false, appt: null })}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  Confirm New Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Register / Edit Patient Profile Modal */}
      {patientModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">RECEPTION DESK</span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {patientModal.mode === 'add' ? 'Register Patient Profile' : 'Edit Patient Profile'}
                </h3>
              </div>
              <button 
                onClick={() => setPatientModal({ isOpen: false, mode: 'add', data: null })}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePatient} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={patientForm.name}
                  onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                  placeholder="e.g. Ahmad Al-Mansour"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    required
                    value={patientForm.dob}
                    onChange={(e) => setPatientForm({ ...patientForm, dob: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select 
                    value={patientForm.gender}
                    onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  required
                  value={patientForm.phone}
                  onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                  placeholder="+963 933 123 456"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address</label>
                <textarea 
                  rows="2"
                  value={patientForm.address}
                  onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
                  placeholder="Enter residential address..."
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setPatientModal({ isOpen: false, mode: 'add', data: null })}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}