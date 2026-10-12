import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// استيراد المكونات الموديلية المنفصلة
import TicketsTab from '../components/patient/TicketsTab';
import AppointmentsTab from '../components/patient/AppointmentsTab';
import ProfileTab from '../components/patient/ProfileTab';
import OverviewTab from '../components/patient/OverviewTab';


export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // مخفي افتراضياً
  const mainContainerRef = useRef(null);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo(0, 0);
  }, [activeTab]);

  const departments = [
    { 
      name: "Cardiology", 
      desc: "Advanced heart care, ECG diagnostics, and cardiovascular wellness.", 
      icon: "🫀", 
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
      color: "from-rose-500 to-red-600" 
    },
    { 
      name: "Dermatology", 
      desc: "Comprehensive skin health, dermatological assessments, and treatments.", 
      icon: "🧬", 
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      color: "from-amber-500 to-orange-600" 
    },
    { 
      name: "Neurology", 
      desc: "Specialized evaluations for brain, spine, and nervous system conditions.", 
      icon: "🧠", 
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
      color: "from-purple-500 to-indigo-600" 
    },
    { 
      name: "Pulmonology", 
      desc: "Respiratory health, lung function diagnostics, and airway care.", 
      icon: "🫁", 
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      color: "from-teal-500 to-emerald-600" 
    },
    { 
      name: "Orthopedics", 
      desc: "Bone, joint, ligament, and musculoskeletal system treatments.", 
      icon: "🦴", 
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      color: "from-cyan-500 to-blue-600" 
    },
    { 
      name: "Gastroenterology", 
      desc: "Digestive system care, stomach, intestinal, and liver health.", 
      icon: "🩺", 
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
      color: "from-pink-500 to-rose-600" 
    },
  ];

  const doctors = [
    { 
      name: "Dr. Sarah Jenkins", 
      spec: "Chief Cardiologist", 
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80" 
    },
    { 
      name: "Dr. Michael Chen", 
      spec: "Neurology Specialist", 
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80" 
    },
    { 
      name: "Dr. Elena Rostova", 
      spec: "Pulmonology & Internal Specialist", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" 
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 flex font-sans text-slate-100 overflow-x-hidden">
      
      <aside 
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
        className={`bg-slate-900/95 backdrop-blur-2xl border-r border-teal-500/10 flex flex-col justify-between p-6 shrink-0 sticky top-0 h-screen shadow-2xl transition-all duration-300 overflow-hidden ${
          isSidebarOpen ? 'w-72 opacity-100' : 'w-0 p-0 opacity-0 border-none'
        }`}
      >
        <div className="w-72 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center space-x-3 space-x-reverse mb-10 pb-6 border-b border-white/15">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-xl shadow-teal-500/20 shrink-0">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z"></path>
                  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1 3.5h3.78"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-white via-teal-100 to-teal-300 bg-clip-text text-transparent">
                  ClinicCare
                </h2>
                <span className="text-[11px] text-teal-400 font-semibold tracking-widest uppercase">Medical Center</span>
              </div>
            </div>

            <nav className="space-y-2.5">
              <button
                onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3.5 space-x-reverse px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base">📊</span>
                <span>Overview & Clinic</span>
              </button>

              <button
                onClick={() => { setActiveTab('tickets'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3.5 space-x-reverse px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'tickets' 
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base">🎫</span>
                <span>My Tickets</span>
              </button>

              <button
                onClick={() => { setActiveTab('appointments'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3.5 space-x-reverse px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'appointments' 
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base">📅</span>
                <span>Appointments</span>
              </button>

              <button
                onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3.5 space-x-reverse px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'profile' 
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 shadow-lg shadow-teal-500/30 scale-[1.02]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base">👤</span>
                <span>My Profile</span>
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-white/15">
            <Link
              to="/login"
              className="w-full flex items-center space-x-3.5 space-x-reverse px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition"
            >
              <span className="text-base">🚪</span>
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main ref={mainContainerRef} className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Header */}
        <header className="bg-slate-900/60 backdrop-blur-md border-b border-white/10 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-300 hover:bg-white/10 transition cursor-pointer shadow-md"
              title="Toggle Sidebar"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white tracking-wide">
              {activeTab === 'overview' && 'Clinic Overview & Services'}
              {activeTab === 'tickets' && 'My Medical Tickets'}
              {activeTab === 'appointments' && 'Manage Appointments'}
              {activeTab === 'profile' && 'Administrative Profile'}
            </h1>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-xs bg-teal-500/15 text-teal-300 border border-teal-500/30 px-3.5 py-1.5 rounded-full font-semibold shadow-inner">
              🟢 Live Clinic System
            </span>
          </div>
        </header>

        {/* Dynamic Tab Rendering */}
        <div className="p-8 flex-1">
          {activeTab === 'overview' && (
            <OverviewTab 
              setActiveTab={setActiveTab} 
              departments={departments} 
              doctors={doctors} 
              ticketsCount={tickets.length} 
            />
          )}

          {activeTab === 'tickets' && (
            <TicketsTab 
              tickets={tickets} 
              setTickets={setTickets} 
              departments={departments} 
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsTab />
          )}

          {activeTab === 'profile' && (
            <ProfileTab />
          )}
        </div>
      </main>

    </div>
  );
}