import React from 'react';

export default function OverviewTab({ setActiveTab, departments = [], doctors = [], ticketsCount = 0 }) {
  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl border border-teal-500/30 shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80" 
            alt="Clinic Interior" 
            className="w-full h-full object-cover opacity-20 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-teal-950/80"></div>
        </div>

        <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-500/20 px-4 py-1.5 rounded-full border border-teal-500/30 inline-block mb-4 shadow-lg">
            Advanced Medical Center & Triage Portal
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Your Health, Our Top Priority
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
            Welcome to ClinicCare. Submit your symptoms, track your medical tickets, and get seamlessly routed to specialized departments for professional physician care.
          </p>
          <button
            onClick={() => setActiveTab('tickets')}
            className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 px-7 py-3.5 rounded-2xl font-extrabold text-xs transition shadow-xl shadow-teal-500/25 flex items-center space-x-2.5 space-x-reverse cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Create New Medical Ticket</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-teal-500/40 transition">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Tickets</p>
          <h3 className="text-4xl font-extrabold text-teal-400 mt-2">{ticketsCount}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Submitted medical inquiries</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Medical Departments</p>
          <h3 className="text-4xl font-extrabold text-cyan-400 mt-2">{departments.length}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Specialized clinical units</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">System Status</p>
          <h3 className="text-lg font-bold text-emerald-400 mt-3">🟢 AI Triage Operational</h3>
          <p className="text-[11px] text-slate-500 mt-1">24/7 automated routing active</p>
        </div>
      </div>

      {/* Medical Departments Section */}
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Specialized Medical Departments
          </h3>
          <p className="text-xs text-slate-400 mt-1">Explore our fully-equipped medical departments handled by expert physicians:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <div 
              key={index}
              className="bg-slate-900/80 hover:bg-slate-900 transition-all duration-300 border border-white/10 hover:border-teal-500/50 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-2xl bg-gradient-to-r ${dept.color} flex items-center justify-center text-lg shadow-lg`}>
                  {dept.icon}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-teal-300 transition">{dept.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{dept.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-teal-400 font-bold">
                  <span>Clinic Department</span>
                  <span className="bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Operational</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elite Medical Team */}
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Our Elite Medical Team
          </h3>
          <p className="text-xs text-slate-400 mt-1">Meet our certified specialists dedicated to your well-being:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {doctors.map((doc, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl flex items-center space-x-4 space-x-reverse shadow-xl hover:border-teal-500/40 transition">
              <img 
                src={doc.image} 
                alt={doc.name} 
                className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-teal-500/30 shadow-md" 
              />
              <div>
                <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                <p className="text-[11px] text-teal-300 font-medium mt-0.5">{doc.spec}</p>
                <span className="inline-block mt-2 text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">Available Today</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours & Emergency Hotlines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
          <div className="flex items-center space-x-3 space-x-reverse mb-3">
            <span className="text-xl">🕒</span>
            <h4 className="text-sm font-bold text-white">Clinic Working Hours</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">Saturday – Thursday: 8:00 AM – 10:00 PM</p>
          <p className="text-xs text-slate-400 leading-relaxed">Friday: Emergency & Triage Only (24/7 Portal)</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
          <div className="flex items-center space-x-3 space-x-reverse mb-3">
            <span className="text-xl">📞</span>
            <h4 className="text-sm font-bold text-white">Emergency Hotline</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">Need immediate assistance? Call our 24/7 desk:</p>
          <p className="text-xs font-bold text-teal-400">+1 (800) CLINIC-CARE / Ext. 911</p>
        </div>
      </div>

    </div>
  );
}