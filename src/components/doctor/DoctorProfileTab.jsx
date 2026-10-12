import React, { useState } from 'react';

export default function DoctorProfileTab() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Specialist',
    email: 'doctor@cliniccare.com',
    phone: '+963 912 345 678',
    specialty: 'Cardiology & Medical AI Triage',
    bio: 'Consultant in Cardiology and Emergency Triage, with extensive experience in smart triage systems and telemedicine.',
    workingHours: '09:00 AM - 05:00 PM'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold shadow-sm">
          Profile updated successfully! ✅
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-500 text-white font-bold text-xl flex items-center justify-center shadow-md">
            DR
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{formData.name}</h3>
            <p className="text-xs text-teal-600 font-bold">{formData.specialty}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Full Name:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number:</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Working Hours:</label>
              <input 
                type="text" 
                name="workingHours"
                value={formData.workingHours} 
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Biography:</label>
            <textarea 
              rows="3"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-2xl font-bold text-xs shadow-md shadow-teal-500/20 hover:from-teal-600 hover:to-cyan-600 transition"
          >
            Save Changes 💾
          </button>
        </form>
      </div>
    </div>
  );
}