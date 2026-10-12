import React, { useState } from 'react';

export default function PatientTicketsTab({ tickets = [], setTickets = () => {} }) {
  const [symptoms, setSymptoms] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('1-3 days');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsSubmitting(true);

    // محاكاة معالجة النظام والـ AI لاستخراج الخطورة وإسناد القسم
    setTimeout(() => {
      const newTicket = {
        id: `CK-${Math.floor(1000 + Math.random() * 9000)}`,
        symptoms: symptoms,
        symptomDuration: symptomDuration,
        status: 'SUBMITTED',
        riskLevel: 'AI Processing...', // يحدده نظام الـ AI تلقائياً
        createdAt: new Date().toISOString().split('T')[0],
        labReportName: selectedFile ? selectedFile.name : 'No report uploaded'
      };

      setTickets([newTicket, ...tickets]);
      setIsSubmitting(false);
      setSuccessMsg(`Ticket ${newTicket.id} created successfully! AI Triage is evaluating your risk level.`);
      setSymptoms('');
      setSelectedFile(null);

      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold shadow-sm animate-fadeIn">
          ✅ {successMsg}
        </div>
      )}

      {/* نموذج إنشاء تذكرة جديدة */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Create New Medical Ticket</h3>
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
            {isSubmitting ? <span>Processing Ticket & OCR Triage...</span> : <span>Submit Ticket for AI Assessment 🚀</span>}
          </button>
        </form>
      </div>

      {/* قائمة التذاكر المرفوعة للمريض */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          My Submitted Tickets ({tickets.length})
        </h3>

        {tickets.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
            You have not submitted any medical tickets yet.
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                      {ticket.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{ticket.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium line-clamp-1">{ticket.symptoms}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    ticket.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    ticket.riskLevel === 'Elevated' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    AI Risk: {ticket.riskLevel || 'Normal'}
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-bold">
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}