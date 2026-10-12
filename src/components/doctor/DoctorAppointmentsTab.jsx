import React, { useState } from 'react';

export default function DoctorAppointmentsTab({ appointments = [], setAppointments = () => {} }) {
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const [filter, setFilter] = useState('all'); // all, upcoming, completed

  const filteredAppointments = safeAppointments.filter(app => {
    if (filter === 'upcoming') return app.status !== 'Completed';
    if (filter === 'completed') return app.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Appointments Management</h3>
          <p className="text-xs text-slate-500 mt-0.5">View and track patient consultation schedules for today.</p>
        </div>
        
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl transition ${filter === 'all' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All ({safeAppointments.length})
          </button>
          <button 
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-xl transition ${filter === 'upcoming' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-xl transition ${filter === 'completed' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No matching appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Consultation Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredAppointments.map((app, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-bold text-slate-900 flex items-center space-x-2">
                      <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 font-bold flex items-center justify-center border border-teal-100 text-xs">
                        {app.patientName ? app.patientName.charAt(0) : 'P'}
                      </span>
                      <span>{app.patientName || 'Registered Patient'}</span>
                    </td>
                    <td className="p-4 text-slate-600">{app.date || 'Today'} - {app.time || '10:00 AM'}</td>
                    <td className="p-4">
                      <span className="bg-cyan-50 text-cyan-700 font-bold px-3 py-1 rounded-full border border-cyan-100 text-[10px]">
                        {app.type || 'Online Consultation'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold px-3 py-1 rounded-full border text-[10px] ${
                        app.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {app.status || 'Confirmed'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => {
                          const updated = safeAppointments.map((item, idx) => 
                            idx === index ? { ...item, status: 'Completed' } : item
                          );
                          setAppointments(updated);
                        }}
                        className="bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold px-3 py-1.5 rounded-xl border border-teal-200 transition text-[11px]"
                      >
                        Finish Appointment ✅
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}