import React, { useState } from 'react';

export default function DoctorTicketsTab({ tickets = [], setTickets = () => {} }) {
  const defaultTickets = [
    {
      id: 'CK-4512',
      patientName: 'Sarah Khan',
      age: 45,
      gender: 'F',
      riskLevel: 'High',
      symptoms: 'Severe Chest Pain, Shortness of Breath',
      department: 'Cardiology',
      waitTime: '12m',
      status: 'UNDER_DOCTOR_REVIEW',
      vitals: {
        bp: '165/105 mmHg (Elevated)',
        hr: '112 bpm (Tachycardia)',
        temp: '37.1 °C',
        spo2: '94%'
      },
      aiAssessment: {
        risk: 'High',
        confidence: '91%',
        insights: 'OCR extracted "Elevated WBC (13.5)" from Lab Report'
      }
    }
  ];

  const activeTicketsList = Array.isArray(tickets) && tickets.length > 0 ? tickets : defaultTickets;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTicket, setActiveTicket] = useState(activeTicketsList[0]);
  const [successMsg, setSuccessMsg] = useState('');

  const [activeActionModal, setActiveActionModal] = useState(null); // 'INFO' | 'APPOINTMENT' | 'TRANSFER' | 'CLOSE' | null
  
  const [infoRequestMsg, setInfoRequestMsg] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [targetDepartment, setTargetDepartment] = useState('Emergency Care');
  const [transferReason, setTransferReason] = useState('');
  const [finalResponse, setFinalResponse] = useState('');

  const filteredTickets = activeTicketsList.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.patientName && t.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    t.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExecuteAction = (newStatus, message) => {
    if (!activeTicket) return;

    const updated = activeTicketsList.map(t => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          status: newStatus,
          history: [
            ...(t.history || []),
            {
              status: newStatus,
              time: "Just now",
              note: message
            }
          ]
        };
      }
      return t;
    });

    setTickets(updated);
    setSuccessMsg(`Ticket ${activeTicket.id} updated successfully. Status: ${newStatus} ✅`);
    setActiveActionModal(null);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto relative">
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold shadow-sm animate-fadeIn flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="text-emerald-600 font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Queue Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Assigned Tickets Queue ({filteredTickets.length})
            </h3>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assigned tickets..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 shadow-sm transition"
            />
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredTickets.map((ticket) => {
              const isSelected = activeTicket?.id === ticket.id;
              const riskBg = ticket.riskLevel === 'High' 
                ? 'bg-rose-50 text-rose-700 border-rose-200' 
                : ticket.riskLevel === 'Elevated' 
                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200';

              return (
                <div
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket)}
                  className={`bg-white border rounded-3xl p-5 cursor-pointer transition shadow-sm hover:shadow-md ${
                    isSelected ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/10' : 'border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-900">
                      {ticket.id} - {ticket.patientName || 'Patient'}
                    </span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${riskBg}`}>
                      Risk: {ticket.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium line-clamp-1 mb-3">
                    <strong className="text-slate-700">Symptoms:</strong> {ticket.symptoms}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
                    <span>Dept: <strong className="text-slate-700">{ticket.department || 'Cardiology'}</strong></span>
                    <span className="text-teal-700 font-bold">Status: {ticket.status || 'SUBMITTED'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detailed Review Panel */}
        <div className="lg:col-span-7">
          {activeTicket && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-lg border border-teal-200">
                    {activeTicket.patientName ? activeTicket.patientName.charAt(0) : 'P'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{activeTicket.patientName || 'Patient'}</h3>
                    <p className="text-xs text-slate-500">Clinical Review Panel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">{activeTicket.age || 45} yrs</span>
                  <span className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl border border-teal-200">{activeTicket.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <strong className="text-slate-700 block uppercase tracking-wider mb-2">Vitals & Symptoms:</strong>
                  <p className="text-slate-900 font-medium">{activeTicket.symptoms}</p>
                  <p className="text-slate-500 text-[11px] pt-1">BP: {activeTicket.vitals?.bp} | HR: {activeTicket.vitals?.hr}</p>
                </div>

                <div className="bg-teal-50/60 border border-teal-200 p-4 rounded-2xl text-xs space-y-1">
                  <strong className="text-teal-900 block uppercase tracking-wider mb-2">🤖 AI Prototype Recommendation:</strong>
                  <p className="text-teal-800 font-medium">Risk Level: <strong>{activeTicket.aiAssessment?.risk}</strong></p>
                  <p className="text-teal-700 text-[11px]">{activeTicket.aiAssessment?.insights}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Clinical Workflow Action:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveActionModal('INFO')}
                    className="p-4 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-2xl text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-teal-700">Request More Information</span>
                      <span className="text-[10px] text-slate-500">Status becomes WAITING_FOR_PATIENT</span>
                    </div>
                    <span className="text-lg">💬</span>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('APPOINTMENT')}
                    className="p-4 bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 rounded-2xl text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-cyan-700">Request Appointment</span>
                      <span className="text-[10px] text-slate-500">Status becomes WAITING_FOR_APPOINTMENT</span>
                    </div>
                    <span className="text-lg">📅</span>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('TRANSFER')}
                    className="p-4 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-amber-700">Transfer Ticket</span>
                      <span className="text-[10px] text-slate-500">Transfer case to another department</span>
                    </div>
                    <span className="text-lg">🔄</span>
                  </button>

                  <button
                    onClick={() => setActiveActionModal('CLOSE')}
                    className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700">Send Response & Close</span>
                      <span className="text-[10px] text-slate-500">Final response and close ticket</span>
                    </div>
                    <span className="text-lg">✅</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* ================= MODALS FOR DOCTOR ACTIONS ================= */}

      {activeActionModal === 'INFO' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Request More Information from Patient</h3>
            <p className="text-xs text-slate-500">This will change the ticket status to <code className="text-teal-600 font-bold">WAITING_FOR_PATIENT</code>.</p>
            <textarea
              rows="3"
              value={infoRequestMsg}
              onChange={(e) => setInfoRequestMsg(e.target.value)}
              placeholder="State what additional information or clarification is required..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
            ></textarea>
            <div className="flex gap-3">
              <button onClick={() => setActiveActionModal(null)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-xs text-slate-700">Cancel</button>
              <button 
                onClick={() => handleExecuteAction('WAITING_FOR_PATIENT', `Doctor requested info: ${infoRequestMsg || 'Additional details needed'}`)}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Send Request 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {activeActionModal === 'APPOINTMENT' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Request Consultation Appointment</h3>
            <p className="text-xs text-slate-500">This notifies the patient and receptionist to schedule an available slot (<code className="text-cyan-600 font-bold">WAITING_FOR_APPOINTMENT</code>).</p>
            <textarea
              rows="3"
              value={appointmentReason}
              onChange={(e) => setAppointmentReason(e.target.value)}
              placeholder="Reason or instructions for the consultation appointment..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
            ></textarea>
            <div className="flex gap-3">
              <button onClick={() => setActiveActionModal(null)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-xs text-slate-700">Cancel</button>
              <button 
                onClick={() => handleExecuteAction('WAITING_FOR_APPOINTMENT', `Appointment requested: ${appointmentReason || 'In-clinic consultation required'}`)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Request Appointment 📅
              </button>
            </div>
          </div>
        </div>
      )}

      {activeActionModal === 'TRANSFER' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Transfer Ticket to Another Department</h3>
            <p className="text-xs text-slate-500">Status updates to <code className="text-amber-600 font-bold">TRANSFERRED_TO_OTHER_DEPARTMENT</code>.</p>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Department:</label>
              <select
                value={targetDepartment}
                onChange={(e) => setTargetDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="Emergency Care">Emergency Care</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Pulmonology">Pulmonology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transfer Reason:</label>
              <textarea
                rows="2"
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                placeholder="Reason for department transfer..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setActiveActionModal(null)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-xs text-slate-700">Cancel</button>
              <button 
                onClick={() => handleExecuteAction('TRANSFERRED_TO_OTHER_DEPARTMENT', `Transferred to ${targetDepartment}. Reason: ${transferReason || 'Specialist evaluation needed'}`)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Confirm Transfer 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {activeActionModal === 'CLOSE' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Send Final Response & Close Ticket</h3>
            <p className="text-xs text-slate-500">Status updates to <code className="text-emerald-600 font-bold">CLOSED</code>.</p>
            <textarea
              rows="3"
              value={finalResponse}
              onChange={(e) => setFinalResponse(e.target.value)}
              placeholder="Enter final clinical response or summary for the patient..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            ></textarea>
            <div className="flex gap-3">
              <button onClick={() => setActiveActionModal(null)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-xs text-slate-700">Cancel</button>
              <button 
                onClick={() => handleExecuteAction('CLOSED', `Final Response: ${finalResponse || 'Review completed successfully.'}`)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs shadow-md"
              >
                Close Ticket ✅
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}