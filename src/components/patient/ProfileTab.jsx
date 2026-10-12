import React, { useState } from 'react';

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    fullName: "Patient Name",
    email: "patient@example.com",
    phone: "+1 (555) 000-0000",
    dob: "1990-01-01",
    gender: "Female",
    address: "City, Country"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false); // إعادة إغلاق الحقول بعد الحفظ
    setSuccessMessage("Profile updated successfully on " + new Date().toLocaleString());
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-500/20 px-3.5 py-1.5 rounded-full border border-teal-500/30 inline-block mb-3">
          Patient Administrative Profile
        </span>
        <h3 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          Manage Personal & Contact Information
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          View and update your administrative profile to ensure the clinic has current contact details.
        </p>
      </div>

      {successMessage && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl text-xs font-bold">
          ✅ {successMessage}
        </div>
      )}

      {/* Profile Form / Card */}
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white disabled:opacity-60 focus:outline-none focus:border-teal-500 transition shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white disabled:opacity-60 focus:outline-none focus:border-teal-500 transition shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="text" 
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white disabled:opacity-60 focus:outline-none focus:border-teal-500 transition shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white disabled:opacity-60 focus:outline-none focus:border-teal-500 transition shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Address</label>
            <input 
              type="text" 
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white disabled:opacity-60 focus:outline-none focus:border-teal-500 transition shadow-inner"
            />
          </div>

          <div className="flex items-center justify-end space-x-4 space-x-reverse pt-4 border-t border-white/10">
            {!isEditing ? (
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 px-6 py-3 rounded-2xl font-bold text-xs transition cursor-pointer"
              >
                Edit Profile ✏️
              </button>
            ) : (
              <div className="flex space-x-3 space-x-reverse">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-white/10 hover:bg-white/20 text-slate-300 px-5 py-3 rounded-2xl font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 px-6 py-3 rounded-2xl font-extrabold text-xs transition shadow-xl cursor-pointer"
                >
                  Save Changes 💾
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}