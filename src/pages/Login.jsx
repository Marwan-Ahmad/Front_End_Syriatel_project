import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const lowerUser = username.toLowerCase();
      
      if (lowerUser.includes('admin')) {
        navigate('/admin-dashboard'); // التوجيه إلى لوحة المسؤول
      } else if (lowerUser.includes('doc') || lowerUser.includes('doctor')) {
        navigate('/doctor-dashboard'); // التوجيه إلى لوحة الطبيب
      } else if (lowerUser.includes('reception') || lowerUser.includes('receptionist')) {
        navigate('/receptionist-dashboard'); // التوجيه إلى لوحة الاستقبال
      } else {
        navigate('/patient-dashboard'); // التوجيه إلى لوحة المريض افتراضياً
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-teal-950/30 overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-slate-100/20">
        
        {/* القسم الأيسر: الشعار والمميزات الطبية */}
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-950 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div 
            className="absolute -bottom-10 -right-10 w-80 h-80 pointer-events-none opacity-15 mix-blend-luminosity overflow-hidden"
            style={{
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
              alt="Medical Stethoscope" 
              className="w-full h-full object-cover transform rotate-12 scale-110"
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3.5 space-x-reverse mb-10">
              <div className="w-13 h-13 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-inner border border-white/20 shrink-0 p-2.5">
               <svg width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.04 3 5.5l7 7Z"></path>
                <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1 3.5h3.78"></path>
              </svg>
              </div>
              <div>
                <h2 
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  className="text-3xl font-bold tracking-wide text-white drop-shadow-sm"
                >
                  ClinicCare
                </h2>
                <p className="text-xs text-teal-200/80 font-medium tracking-wider">AI-Assisted Clinical Triage</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-teal-200 mb-4 border border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>SMARTER HEALTHCARE</span>
            </div>

            <h1 
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
              className="text-3xl lg:text-5xl font-normal tracking-wide mb-4 leading-tight text-teal-50"
            >
              Healthcare that feels simple.
            </h1>
            <p className="text-teal-100/90 text-sm leading-relaxed mb-8">
              A structured clinical workspace designed to connect patients, doctors, and clinic staff through one organized healthcare experience.
            </p>
          </div>

          <div className="space-y-4 my-6 relative z-10">
            <div className="flex items-start space-x-3 space-x-reverse p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition hover:bg-white/10">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-teal-400/20">
                <svg width="16" height="16" className="w-4 h-4 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Secure access</h3>
                <p className="text-xs text-teal-200/80">Your account stays fully protected</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition hover:bg-white/10">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-teal-400/20">
                <svg width="16" height="16" className="w-4 h-4 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI-assisted workflow</h3>
                <p className="text-xs text-teal-200/80">Organized clinical triage support</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition hover:bg-white/10">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-teal-400/20">
                <svg width="16" height="16" className="w-4 h-4 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Patient-focused</h3>
                <p className="text-xs text-teal-200/80">Clear and structured communication</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-teal-300/70 pt-4 border-t border-white/10 relative z-10 flex justify-between items-center">
            <span>ClinicCare • Training Prototype</span>
            <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded">v1.2</span>
          </div>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-3 shadow-inner border border-teal-100">
             <svg width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M12 8v8M8 12h8"></path>
            </svg>
            </div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">Welcome back</p>
            <h2 
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
              className="text-3xl font-bold text-slate-900"
            >
              Sign in to account
            </h2>
            <p className="text-xs text-slate-500 mt-1">Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <svg width="18" height="18" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username (e.g. admin, doctor, receptionist)"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-600 text-slate-800 bg-slate-50/50 hover:bg-slate-50 shadow-sm transition duration-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert('Password recovery link sent!'); }} 
                  className="text-xs text-teal-600 font-semibold hover:text-teal-700 hover:underline transition"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <svg width="18" height="18" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-600 text-slate-800 bg-slate-50/50 hover:bg-slate-50 shadow-sm transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-teal-600 text-xs font-semibold transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center py-1">
              <label className="flex items-center text-xs text-slate-600 cursor-pointer select-none group">
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 mr-2 transition cursor-pointer" 
                />
                <span className="group-hover:text-slate-800 transition">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white py-3.5 rounded-2xl font-semibold text-sm transition duration-200 shadow-lg shadow-teal-600/30 flex items-center justify-center space-x-2 space-x-reverse cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="18" height="18" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative inline-block px-4 bg-white text-xs text-slate-400 font-medium">
              New to ClinicCare?
            </div>
          </div>

          <Link
            to="/register"
            className="w-full border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-slate-700 py-3 rounded-2xl font-semibold text-sm transition duration-200 flex items-center justify-center space-x-2 space-x-reverse group shadow-sm"
          >
            <span>Create an account</span>
            <svg width="16" height="16" className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>

          <div className="mt-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-100/80 flex items-start space-x-3 space-x-reverse">
            <svg width="18" height="18" className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ClinicCare is a training prototype. AI recommendations do not replace professional medical judgment.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}