import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description: "Personal account",
      color: "from-teal-500 to-emerald-600",
      lightBg: "bg-teal-50/80 border-teal-200 text-teal-900",
      icon: (
        <svg width="22" height="22" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "Medical professional",
      color: "from-cyan-500 to-blue-600",
      lightBg: "bg-cyan-50/80 border-cyan-200 text-cyan-900",
      icon: (
        <svg width="22" height="22" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.8 2.3A.3.3 0 0 1 5 2h14a.3.3 0 0 1 .2.3v3.4a7 7 0 0 1-14 0V2.3z"></path>
          <path d="M12 12v3a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-2"></path>
        </svg>
      )
    },
    {
      id: "receptionist",
      title: "Receptionist",
      description: "Clinic staff",
      color: "from-indigo-500 to-purple-600",
      lightBg: "bg-indigo-50/80 border-indigo-200 text-indigo-900",
      icon: (
        <svg width="22" height="22" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
          <rect x="9" y="3" width="6" height="4" rx="1"></rect>
          <path d="M9 12h6m-6 4h4"></path>
        </svg>
      )
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // الانتقال الفوري بناءً على الدور المحدد
      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (role === 'receptionist') {
        navigate('/receptionist-dashboard');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex flex-col font-sans relative overflow-x-hidden">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 text-white flex items-center justify-between shadow-lg w-full shrink-0 z-10 sticky top-0">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/30 transform hover:rotate-6 transition-transform duration-300">
            <svg width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z"></path>
              <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1 3.5h3.78"></path>
            </svg>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Times New Roman', Times, serif" }} className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white via-teal-100 to-teal-300 bg-clip-text text-transparent">
              ClinicCare
            </h2>
            <p className="text-[11px] text-teal-400 font-medium tracking-wide">AI-Assisted Clinical Triage</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs bg-white/10 px-3.5 py-1.5 rounded-full text-teal-200 border border-white/10 backdrop-blur-md font-medium shadow-inner">
            Secure Portal
          </span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col justify-center z-10">
        
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-teal-950/50 border border-white/40 p-6 sm:p-10 transition-all duration-300">

          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm inline-block mb-2">
              Join Our Healthcare Platform
            </span>
            <h1 style={{ fontFamily: "'Times New Roman', Times, serif" }} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Select your role and enter your details to get started with intelligent triage</p>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">Select Your Role</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id)}
                  className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1 active:scale-95 shadow-sm ${
                    role === item.id 
                      ? `${item.lightBg} ring-2 ring-teal-500/30 shadow-md scale-[1.02] font-semibold` 
                      : 'border-slate-200/80 bg-slate-50/70 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mb-2 transition-transform duration-300 ${role === item.id ? `bg-gradient-to-r ${item.color} text-white shadow-lg` : 'bg-white text-slate-400 shadow-sm'}`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold">{item.title}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">{item.description}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {role === "patient" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200/60 flex items-center gap-4 mb-2 shadow-sm">
                  <span className="text-xl bg-teal-500 text-white p-2.5 rounded-xl shadow-md shrink-0 flex items-center justify-center">👤</span>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-teal-950">Patient Information</h3>
                    <p className="text-[11px] text-teal-700">Enter your personal profile details securely</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      defaultValue=""
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 shadow-inner font-medium cursor-pointer"
                    >
                      <option value="" disabled>Day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>

                    <select
                      defaultValue=""
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 shadow-inner font-medium cursor-pointer"
                    >
                      <option value="" disabled>Month</option>
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, idx) => (
                        <option key={m} value={idx + 1}>{m}</option>
                      ))}
                    </select>

                    <select
                      defaultValue=""
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 shadow-inner font-medium cursor-pointer"
                    >
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 100 }, (_, i) => 2026 - i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Gender</label>
                    <select
                      defaultValue=""
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner cursor-pointer"
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Address</label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                </div>
              </div>
            )}

            {role === "doctor" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200/60 flex items-center gap-4 mb-2 shadow-sm">
                  <span className="text-xl bg-cyan-500 text-white p-2.5 rounded-xl shadow-md shrink-0 flex items-center justify-center">🩺</span>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-cyan-950">Doctor Information</h3>
                    <p className="text-[11px] text-cyan-700">Enter your professional medical credentials</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Dr. Full Name"
                    className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="doctor@clinic.com"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Specialization</label>
                    <select
                      defaultValue=""
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50 text-slate-800 transition shadow-inner cursor-pointer"
                    >
                      <option value="" disabled>Select specialization</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Internal Medicine">Internal Medicine</option>
                      <option value="Pediatrics">Pediatrics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Department</label>
                    <select
                      defaultValue=""
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 bg-slate-50/50 text-slate-800 transition shadow-inner cursor-pointer"
                    >
                      <option value="" disabled>Select department</option>
                      <option value="1">Cardiology Department</option>
                      <option value="2">Dermatology Department</option>
                      <option value="3">Neurology Department</option>
                      <option value="4">General Medicine Department</option>
                      <option value="5">Internal Medicine Department</option>
                      <option value="6">Pediatrics Department</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {role === "receptionist" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/60 flex items-center gap-4 mb-2 shadow-sm">
                  <span className="text-xl bg-indigo-500 text-white p-2.5 rounded-xl shadow-md shrink-0 flex items-center justify-center">💼</span>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-indigo-950">Receptionist Information</h3>
                    <p className="text-[11px] text-indigo-700">Enter clinic staff details and credentials</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="staff@clinic.com"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 bg-slate-50/50 text-slate-800 transition shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 active:scale-[0.99] text-white py-3.5 rounded-2xl font-bold text-xs transition-all duration-300 shadow-xl shadow-teal-700/30 flex items-center justify-center space-x-2 space-x-reverse cursor-pointer disabled:opacity-70 mt-5 transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Create {role.charAt(0).toUpperCase() + role.slice(1)} Account</span>
                  <svg width="18" height="18" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </>
              )}
            </button>

            {role !== "patient" && (
              <p className="text-xs text-center text-amber-800 font-medium bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 animate-fadeIn flex items-center justify-center space-x-2 space-x-reverse shadow-sm">
                <span>⚠</span>
                <span>{role.charAt(0).toUpperCase() + role.slice(1)} registrations require administrator approval before access.</span>
              </p>
            )}
          </form>

          <div className="mt-8 text-center pt-5 border-t border-slate-100">
            <span className="text-xs text-slate-500">Already have an account? </span>
            <Link to="/login" className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline inline-flex items-center space-x-1 space-x-reverse">
              <span>Sign In</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </main>

    </div>
  );
}