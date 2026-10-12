import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [successMsg, setSuccessMsg] = useState('');

  // حالات نافذة التفاعل والإجراءات
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [actionType, setActionType] = useState(null); // 'MORE_INFO' | 'APPOINTMENT' | 'DIAGNOSIS'
  const [inputNote, setInputNote] = useState('');

  const [tickets, setTickets] = useState([
    {
      id: 'TCK-101',
      patientName: 'Ahmad Al-Mansour',
      department: 'Internal Medicine',
      symptoms: 'Persistent fever, chest tightness, and fatigue for 3 days.',
      aiTriage: 'Medium Urgency - Internal Medicine Review Recommended',
      status: 'UNDER_REVIEW',
      doctorNotes: ''
    },
    {
      id: 'TCK-102',
      patientName: 'Lina Hussam',
      department: 'Cardiology',
      symptoms: 'Mild arrhythmia and shortness of breath during light exertion.',
      aiTriage: 'High Urgency - Cardiology Consultation Suggested',
      status: 'UNDER_REVIEW',
      doctorNotes: ''
    }
  ]);

  const handleLogout = () => {
    navigate('/login');
  };

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleExecuteAction = (e) => {
    e.preventDefault();
    if (!selectedTicket || !actionType) return;

    if (actionType === 'MORE_INFO') {
      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? {
        ...t,
        status: 'NEED_MORE_INFO',
        doctorNotes: inputNote || 'Additional medical info requested.'
      } : t));
      showNotification(`Requested additional info for Ticket #${selectedTicket.id}. Patient notified!`);
    } else if (actionType === 'APPOINTMENT') {
      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? {
        ...t,
        status: 'SCHEDULED',
        doctorNotes: inputNote || 'Appointment request forwarded to Reception desk.'
      } : t));
      showNotification(`Appointment request for #${selectedTicket.id} sent to Receptionist for confirmation.`);
    } else if (actionType === 'DIAGNOSIS') {
      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? {
        ...t,
        status: 'RESOLVED',
        doctorNotes: inputNote || 'Clinical review completed & diagnosis provided.'
      } : t));
      showNotification(`Ticket #${selectedTicket.id} status updated to RESOLVED.`);
    }

    // إعادة تعيين النموذج الشكلي
    setSelectedTicket(null);
    setActionType(null);
    setInputNote('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans w-full selection:bg-teal-500 selection:text-white">
      
      {/* Sidebar الموحد */}
      <aside className="w-72 bg-gradient-to-b from-teal-950 via-slate-950 to-slate-950 border-r border-teal-800/20 p-5 flex flex-col justify-between fixed h-screen z-20 shadow-2xl backdrop-blur-xl">
        <div className="space-y-6">
          
          <div className="flex items-center space-x-3 px-2 py-3 bg-teal-900/20 rounded-2xl border border-teal-700/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-bold text-base border border-teal-300/30">
              🩺
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                ClinicCare
              </h2>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[9px] text-teal-300/80 font-bold tracking-widest uppercase">Doctor Panel</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'tickets', label: 'Assigned Tickets', icon: '🩺' },
              { id: 'schedule', label: 'My Schedule', icon: '📅' },
              { id: 'patients', label: 'Patient Medical Records', icon: '📁' }
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
              DR
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Dr. Sarah Smith</p>
              <p className="text-[10px] text-teal-400/80 truncate">dr.sarah@cliniccare.sys</p>
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
              Clinical Workspace
            </span>
            <h1 className="text-3xl font-normal text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              {activeTab === 'tickets' && 'Assigned Clinical Tickets '}
              {activeTab === 'schedule' && 'Working Hours & Consultation Slots'}
              {activeTab === 'patients' && 'Patient Medical History Search'}
            </h1>
          </div>
          <div className="flex items-center space-x-3 bg-teal-950/60 px-4 py-2.5 rounded-2xl border border-teal-800/50 text-xs font-bold text-teal-200 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Attending Physician</span>
          </div>
        </header>

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-teal-800/50 pb-3 mb-4">
                      <span className="font-mono text-xs font-bold text-teal-400">{ticket.id}</span>
                      <div className="flex items-center space-x-2">
                        <span className="bg-teal-950 text-cyan-300 border border-teal-700/50 px-3 py-1 rounded-full font-bold text-[10px]">
                          {ticket.department}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                          ticket.status === 'RESOLVED' ? 'bg-emerald-950 text-emerald-300 border-emerald-700/50' :
                          ticket.status === 'NEED_MORE_INFO' ? 'bg-amber-950 text-amber-300 border-amber-700/50' :
                          ticket.status === 'SCHEDULED' ? 'bg-cyan-950 text-cyan-300 border-cyan-700/50' :
                          'bg-teal-950 text-teal-300 border-teal-700/50'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      Patient: {ticket.patientName}
                    </h3>

                    <div className="space-y-2 text-xs">
                      <p className="text-teal-200/90">
                        <strong className="text-teal-400">Symptoms Reported:</strong> {ticket.symptoms}
                      </p>
                      <div className="p-3 bg-teal-950/70 rounded-2xl border border-teal-800/50 text-teal-300/90 italic">
                        🤖 <strong>AI Triage Note:</strong> {ticket.aiTriage}
                      </div>

                      {ticket.doctorNotes && (
                        <div className="p-3 bg-cyan-950/40 rounded-2xl border border-cyan-800/50 text-cyan-200 text-xs mt-2">
                          📋 <strong>Doctor Notes / Instructions:</strong> {ticket.doctorNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-teal-800/40 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button 
                      onClick={() => { setSelectedTicket(ticket); setActionType('MORE_INFO'); }}
                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <span>❓ Request Info</span>
                    </button>

                    <button 
                      onClick={() => { setSelectedTicket(ticket); setActionType('APPOINTMENT'); }}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <span>📅 Request Appt</span>
                    </button>

                    <button 
                      onClick={() => { setSelectedTicket(ticket); setActionType('DIAGNOSIS'); }}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <span>✅ Diagnosis / Close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedTicket && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                <div className="bg-slate-900 border border-teal-700/50 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-teal-800/50 pb-3">
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                      {actionType === 'MORE_INFO' && `Request Additional Info - #${selectedTicket.id}`}
                      {actionType === 'APPOINTMENT' && `Schedule Consultation - #${selectedTicket.id}`}
                      {actionType === 'DIAGNOSIS' && `Provide Diagnosis & Resolution - #${selectedTicket.id}`}
                    </h3>
                    <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
                  </div>

                  <form onSubmit={handleExecuteAction} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-teal-300 mb-1">
                        {actionType === 'MORE_INFO' && 'Specify what additional details or tests are needed:'}
                        {actionType === 'APPOINTMENT' && 'Notes for Receptionist regarding preferred slot/urgency:'}
                        {actionType === 'DIAGNOSIS' && 'Enter clinical findings and medical recommendations:'}
                      </label>
                      <textarea
                        required
                        rows="3"
                        value={inputNote}
                        onChange={(e) => setInputNote(e.target.value)}
                        placeholder="Write details here..."
                        className="w-full bg-slate-950 border border-teal-800/60 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTicket(null)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg cursor-pointer"
                      >
                        Confirm Action
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Schedule */}
        {activeTab === 'schedule' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Doctor Availability & Slots
            </h3>
            <p className="text-xs text-teal-300/80">View generated slots and daily consultation hours.</p>
            <div className="p-8 bg-teal-950/50 rounded-2xl border border-teal-800/50 text-center text-xs text-teal-400/60">
              Doctor schedule view and slot status.
            </div>
          </div>
        )}

        {/* Tab 3: Medical Records */}
        {activeTab === 'patients' && (
          <div className="bg-teal-900/20 backdrop-blur-md border border-teal-700/30 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Patient Medical History & Encounters
            </h3>
            <p className="text-xs text-teal-300/80">Access previous diagnoses, tickets, and clinical notes.</p>
            <div className="p-8 bg-teal-950/50 rounded-2xl border border-teal-800/50 text-center text-xs text-teal-400/60">
              Medical history lookup and clinical notes editor.
            </div>
          </div>
        )}

      </main>
    </div>
  );
}