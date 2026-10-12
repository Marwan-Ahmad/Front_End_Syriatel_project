import React, { useState } from 'react';

export default function PatientAppointmentsTab({ appointments = [], setAppointments = () => {} }) {
  // مواعيد تجريبية توضح المواعيد المحولة من الاستقبال بحالة الانتظار
  const defaultAppointments = [
    {
      id: 'APT-8821',
      ticketId: 'CK-4512',
      doctorName: 'Dr. Specialist (Cardiology)',
      appointmentDate: '2026-06-16',
      startTime: '09:00 AM',
      endTime: '09:30 AM',
      status: 'PENDING_PATIENT_CONFIRMATION',
      notes: 'Requested by doctor for clinical evaluation.'
    }
  ];

  const activeAppointments = appointments.length > 0 ? appointments : defaultAppointments;
  const [successMsg, setSuccessMsg] = useState('');
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [rescheduleReason, setRescheduleReason] = useState('');

  const handleConfirmAppointment = (aptId) => {
    const updated = activeAppointments.map(apt => 
      apt.id === aptId ? { ...apt, status: 'CONFIRMED' } : apt
    );
    setAppointments(updated);
    setSuccessMsg(`Appointment ${aptId} has been confirmed successfully! ✅`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleModal) return;

    const updated = activeAppointments.map(apt => 
      apt.id === rescheduleModal.id ? { ...apt, status: 'RESCHEDULE_REQUESTED', notes: `Reschedule requested: ${rescheduleReason}` } : apt
    );
    setAppointments(updated);
    setRescheduleModal(null);
    setRescheduleReason('');
    setSuccessMsg(`Reschedule request submitted to clinic reception for review. 🔄`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold shadow-sm animate-fadeIn">
          {successMsg}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">My Consultation Appointments</h3>
          <p className="text-xs text-slate-500 mt-1">
            Appointments scheduled by clinic reception based on doctor evaluation. You can confirm or request a reschedule.
          </p>
        </div>

        {activeAppointments.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
            No active appointment offers available at this time.
          </div>
        ) : (
          <div className="space-y-4">
            {activeAppointments.map((apt) => (
              <div key={apt.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div>
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                      {apt.id} (Ticket: {apt.ticketId})
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{apt.doctorName}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    apt.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    apt.status === 'RESCHEDULE_REQUESTED' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-cyan-50 text-cyan-700 border-cyan-200'
                  }`}>
                    Status: {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Date & Scheduled Time:</span>
                    <span className="font-bold text-slate-900">{apt.appointmentDate} | {apt.startTime} - {apt.endTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Clinical Instructions:</span>
                    <span className="text-slate-600">{apt.notes || 'Routine consultation'}</span>
                  </div>
                </div>

                {/* أزرار الإجراء الخاصة بالمريض */}
                {apt.status === 'PENDING_PATIENT_CONFIRMATION' && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleConfirmAppointment(apt.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer"
                    >
                      Confirm Appointment ✅
                    </button>
                    <button
                      onClick={() => setRescheduleModal(apt)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer"
                    >
                      Request Reschedule 🔄
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: طلب إعادة الجدولة */}
      {rescheduleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Request Appointment Reschedule</h3>
            <p className="text-xs text-slate-500">
              Please state why the scheduled time ({rescheduleModal.appointmentDate} at {rescheduleModal.startTime}) does not suit you:
            </p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <textarea
                rows="3"
                required
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                placeholder="Preferred days/times or reason for rescheduling..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              ></textarea>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRescheduleModal(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs shadow-md transition"
                >
                  Send Request 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}