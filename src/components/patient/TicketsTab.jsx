import React, { useState } from 'react';

export default function PatientTicketsTab({ tickets = [], setTickets = () => {} }) {
  const [symptoms, setSymptoms] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('1-3 days');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // حالات البحث، التصفية، والنافذة المنبثقة للتفاصيل
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsSubmitting(true);

    // محاكاة معالجة النظام والـ AI لاستخراج الخطورة وإسناد القسم تلقائياً
    setTimeout(() => {
      const newTicket = {
        id: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
        symptoms: symptoms,
        symptomDuration: symptomDuration,
        department: 'Primary care', // القسم الذي تم التحويل إليه آلياً
        status: 'In review',
        riskLevel: 'Low Risk', // يحدده نظام الـ AI تلقائياً
        createdAt: '12 أكتوبر 2026',
        labReportName: selectedFile ? selectedFile.name : 'No report uploaded',
        history: [
          { title: 'Assigned for review', desc: 'Routed automatically to Primary care for clinician review.', time: 'الآن' },
          { title: 'AI Triage Completed', desc: 'Symptom and lab report analyzed by AI pipeline.', time: 'الآن' },
          { title: 'Ticket submitted', desc: 'Symptom ticket created with a demo report.', time: 'الآن' }
        ]
      };

      setTickets([newTicket, ...tickets]);
      setIsSubmitting(false);
      setSuccessMsg(`Ticket ${newTicket.id} created & routed to Primary care successfully!`);
      setSymptoms('');
      setSelectedFile(null);

      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1200);
  };

  // تصفية التذاكر بناءً على البحث والحالة
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold shadow-sm animate-fadeIn">
          ✅ {successMsg}
        </div>
      )}

      {/* نموذج إنشاء تذكرة جديدة */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Create New Medical Ticket
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Describe your symptoms and upload your lab report. Our AI system will assess the urgency and route your case to the right department.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Symptoms Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="4"
              required
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Detailed description of what you are experiencing..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none focus:border-teal-500 transition shadow-inner"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Symptom Duration <span className="text-rose-500">*</span>
              </label>
              <select
                value={symptomDuration}
                onChange={(e) => setSymptomDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 transition font-medium"
              >
                <option value="Less than 24 hours">Less than 24 hours</option>
                <option value="1-3 days">1-3 days</option>
                <option value="1 week">1 week</option>
                <option value="More than a week">More than a week</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Upload Demo Lab Report (PDF, PNG, JPG)
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-600 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-extrabold text-xs shadow-md shadow-teal-500/20 transition cursor-pointer flex items-center justify-center space-x-2"
          >
            {isSubmitting ? <span>Processing Ticket & AI Routing...</span> : <span>Submit Ticket for AI Assessment 🚀</span>}
          </button>
        </form>
      </div>

      {/* قسم عرض التذاكر المرفوعة للمريض */}
      <div className="space-y-4">
        
        {/* شريط البحث وفلتر الحالة */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search my tickets..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-800 font-bold focus:outline-none focus:border-teal-500 shadow-sm cursor-pointer"
            >
              <option value="All">All statuses</option>
              <option value="In review">In review</option>
              <option value="Information requested">Information requested</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* الجدول الاحترافي لعرض التذاكر والأسماك المحولة إليها */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No matching tickets found.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-100 text-[10px]">
                <tr>
                  <th className="p-4.5">TICKET</th>
                  <th className="p-4.5">SUMMARY</th>
                  <th className="p-4.5">DEPARTMENT (AI ROUTED)</th>
                  <th className="p-4.5">STATUS</th>
                  <th className="p-4.5 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => setSelectedTicketModal(ticket)}
                    className="hover:bg-slate-50/80 transition cursor-pointer group"
                  >
                    <td className="p-4.5">
                      <p className="font-bold text-teal-700 text-sm group-hover:underline" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        {ticket.id}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{ticket.createdAt}</p>
                    </td>
                    <td className="p-4.5 font-medium text-slate-700 max-w-xs truncate">
                      {ticket.symptoms}
                    </td>
                    <td className="p-4.5 font-semibold text-teal-800">
                      🏥 {ticket.department || 'Primary care'}
                    </td>
                    <td className="p-4.5">
                      <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                        ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        ticket.status === 'Information requested' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4.5 text-center">
                      <span className="text-slate-400 group-hover:text-teal-600 font-bold text-base transition">
                        ↗
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* نافذة تفاصيل التذكرة المنبثقة (Modal) مع عرض القسم المحول إليه والذكاء الاصطناعي */}
      {selectedTicketModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 animate-scaleUp">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">CLINICCARE WORKSPACE</span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Ticket {selectedTicketModal.id}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTicketModal(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Badges & Date */}
            <div className="flex items-center justify-between">
              <span className="bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full text-xs font-bold">
                {selectedTicketModal.status}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Submitted {selectedTicketModal.createdAt}
              </span>
            </div>

            {/* Symptoms Text */}
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              {selectedTicketModal.symptoms}
            </p>

            {/* بطاقات معلومات التوجيه والذكاء الاصطناعي */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Duration</span>
                <p className="text-xs font-bold text-slate-900 mt-1">{selectedTicketModal.symptomDuration}</p>
              </div>

              <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-3.5">
                <span className="text-[10px] text-teal-600 font-semibold uppercase tracking-wider block">AI Routed Dept</span>
                <p className="text-xs font-bold text-teal-900 mt-1 truncate">🏥 {selectedTicketModal.department || 'Primary care'}</p>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">AI Triage Risk</span>
                <p className="text-xs font-bold text-teal-700 mt-1">
                  🤖 {selectedTicketModal.riskLevel || 'Low Risk'}
                </p>
              </div>
            </div>

            {/* Progress History */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">PROGRESS HISTORY & AI ROUTING</h4>
              
              <div className="space-y-4 border-l-2 border-slate-200 ml-2 pl-4">
                {selectedTicketModal.history ? (
                  selectedTicketModal.history.map((h, i) => (
                    <div key={i} className="relative space-y-1">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white"></div>
                      <p className="text-xs font-bold text-slate-900">{h.title}</p>
                      <p className="text-xs text-slate-500">{h.desc}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{h.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white"></div>
                    <p className="text-xs font-bold text-slate-900">Routed to Primary care</p>
                    <p className="text-xs text-slate-500">Ticket routed automatically by AI system.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedTicketModal(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-md"
              >
                Close details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}