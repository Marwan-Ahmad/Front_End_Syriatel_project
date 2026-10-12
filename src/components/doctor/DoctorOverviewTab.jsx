import React from 'react';

export default function DoctorOverviewTab({ tickets = [], appointments = [] }) {
  const safeTickets = Array.isArray(tickets) ? tickets : [];
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  
  const highRiskCount = safeTickets.filter(t => t.riskLevel === 'High').length;

  return (
    <div className="space-y-8">
      {/* Main Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
            Welcome Back
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Dr. Specialist
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm mt-1">
            You have {safeAppointments.length} scheduled appointments and {safeTickets.length} new tickets awaiting review today.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center">
          <span className="block text-2xl font-extrabold">{safeTickets.length + safeAppointments.length}</span>
          <span className="text-[10px] uppercase tracking-wider text-teal-100 font-bold">Total Tasks Today</span>
        </div>
      </div>

      {/* Quick Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Tickets</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{safeTickets.length}</h3>
            <span className="text-[10px] text-teal-600 font-bold mt-1 inline-block">In Queue</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold border border-teal-100">
            📥
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Cases</p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">{highRiskCount}</h3>
            <span className="text-[10px] text-rose-500 font-bold mt-1 inline-block">Requires Immediate Action</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold border border-rose-100">
            🚨
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Appointments</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{safeAppointments.length}</h3>
            <span className="text-[10px] text-cyan-600 font-bold mt-1 inline-block">Scheduled Today</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl font-bold border border-cyan-100">
            📅
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Cases</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">12</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">Diagnosed & Discharged</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold border border-emerald-100">
            ✅
          </div>
        </div>
      </div>

      {/* Detailed Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Recent Incoming Tickets</h3>
          {safeTickets.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No recent tickets recorded.</p>
          ) : (
            <div className="space-y-3">
              {safeTickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-teal-700">{ticket.id}</span>
                    <p className="text-[11px] text-slate-600 truncate max-w-[200px]">{ticket.symptoms}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    ticket.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {ticket.riskLevel || 'Normal'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">System Guidelines</h3>
          <ul className="text-xs text-slate-600 space-y-3">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
              <span>Always verify the patient's vital signs before submitting clinical evaluations.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0"></span>
              <span>High-risk cases are highlighted with priority badges in the triage queue.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>You can manage consultation schedules and statuses from the Appointments tab.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}