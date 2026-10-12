import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. حالات إدارة النوافذ المنبثقة (Modals State)
  const [userModal, setUserModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [deptModal, setDeptModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, data: null });

  // 2. نماذج البيانات (Form States for Modals)
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Patient', department: 'None', status: 'Active' });
  const [deptForm, setDeptForm] = useState({ name: '', doctor: 'Dr. Sarah Smith' });
  const [scheduleForm, setScheduleForm] = useState({ doctor: 'Dr. Sarah Smith', days: 'Mon, Tue, Wed, Thu, Fri', startTime: '09:00', endTime: '16:30', duration: '30 minutes' });

  // 3. بيانات الإحصائيات والقوائم من ERD
  const [stats] = useState({
    openTickets: 3,
    urgentFlags: 0,
    appointmentRequests: 1,
    activeProfiles: 6
  });

  const [ticketStatuses] = useState([
    { label: 'Submitted', count: 0 },
    { label: 'In review', count: 1 },
    { label: 'Awaiting info', count: 0 },
    { label: 'Appointment requested', count: 1 },
    { label: 'Closed / Resolved', count: 1 }
  ]);

  const [riskSuggestions] = useState([
    { level: 'Low', count: 3, percentage: '75%', color: 'bg-teal-500' },
    { level: 'Medium', count: 1, percentage: '25%', color: 'bg-amber-500' },
    { level: 'High', count: 0, percentage: '0%', color: 'bg-rose-500' }
  ]);

  // الأقسام الطبية الستة الأساسية
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', doctor: 'Dr. Specialist', openTickets: 1 },
    { id: 2, name: 'Emergency Care', doctor: 'Dr. John Doe', openTickets: 0 },
    { id: 3, name: 'Internal Medicine', doctor: 'Dr. Sarah Smith', openTickets: 2 },
    { id: 4, name: 'Pulmonology', doctor: 'Dr. Michael Brown', openTickets: 0 },
    { id: 5, name: 'Pediatrics', doctor: 'Dr. Emily Davis', openTickets: 0 },
    { id: 6, name: 'Dermatology', doctor: 'Dr. Robert Wilson', openTickets: 0 }
  ]);

  // المستخدمين والأدوار (Users & Roles)
  const [users, setUsers] = useState([
    { id: 1, name: 'Bayan Alrahil', email: 'bayan@cliniccare.sys', role: 'Admin', department: 'None', status: 'Active' },
    { id: 2, name: 'Maya Chen', email: 'maya.chen@example.test', role: 'Patient', department: 'None', status: 'Active' },
    { id: 3, name: 'Dr. Sarah Smith', email: 'sarah.smith@cliniccare.sys', role: 'Doctor', department: 'Internal Medicine', status: 'Active' },
    { id: 4, name: 'Dr. John Doe', email: 'john.doe@cliniccare.sys', role: 'Doctor', department: 'Emergency Care', status: 'Active' },
    { id: 5, name: 'Mira Ahmad', email: 'mira@cliniccare.sys', role: 'Receptionist', department: 'General Reception', status: 'Active' }
  ]);

  // جدول المواعيد (Schedules)
  const [schedules, setSchedules] = useState([
    { id: 1, doctor: 'Dr. Sarah Smith', days: 'Mon, Tue, Wed, Thu, Fri', hours: '09:00–16:30', slot: '30 minutes', dept: 'Internal Medicine' },
    { id: 2, doctor: 'Dr. John Doe', days: 'Mon, Wed, Thu, Fri', hours: '09:30–15:30', slot: '30 minutes', dept: 'Emergency Care' },
    { id: 3, doctor: 'Dr. Specialist', days: 'Sun, Tue, Thu', hours: '10:00–14:00', slot: '20 minutes', dept: 'Cardiology' }
  ]);

  // سجل التدقيق وتاريخ سير العمل
  const [workflowHistory] = useState([
    { id: 1, title: 'System initialized', desc: 'Clinical database connected and online.', time: '12m ago' },
    { id: 2, title: 'Appointment confirmed', desc: 'AP-803 scheduled with Internal Medicine.', time: '7m ago' },
    { id: 3, title: 'AI Triage Evaluated', desc: 'Ticket #104 assigned Low Urgency flag.', time: '2m ago' }
  ]);

  const handleLogout = () => navigate('/login');

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // --- دوال التحكم بالنوافذ المنبثقة (Modal Handlers) ---
  
  // 1. User Modal Actions
  const openAddUserModal = () => {
    setUserForm({ name: '', email: '', role: 'Patient', department: 'None', status: 'Active' });
    setUserModal({ isOpen: true, mode: 'add', data: null });
  };

  const openEditUserModal = (u) => {
    setUserForm({ name: u.name, email: u.email, role: u.role, department: u.department || 'None', status: u.status });
    setUserModal({ isOpen: true, mode: 'edit', data: u });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (userModal.mode === 'add') {
      const newUser = { id: Date.now(), ...userForm };
      setUsers([...users, newUser]);
      showNotification(`User ${userForm.name} created successfully!`);
    } else {
      setUsers(users.map(u => u.id === userModal.data.id ? { ...u, ...userForm } : u));
      showNotification(`User ${userForm.name} updated successfully!`);
    }
    setUserModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleRemoveUser = (id, name) => {
    setUsers(users.filter(u => u.id !== id));
    showNotification(`User ${name} removed.`);
  };

  // 2. Department Modal Actions
  const openAddDeptModal = () => {
    setDeptForm({ name: '', doctor: 'Dr. Sarah Smith' });
    setDeptModal({ isOpen: true, mode: 'add', data: null });
  };

  const openEditDeptModal = (dept) => {
    setDeptForm({ name: dept.name, doctor: dept.doctor });
    setDeptModal({ isOpen: true, mode: 'edit', data: dept });
  };

  const handleSaveDept = (e) => {
    e.preventDefault();
    if (deptModal.mode === 'add') {
      const newDept = { id: Date.now(), name: deptForm.name, doctor: deptForm.doctor, openTickets: 0 };
      setDepartments([...departments, newDept]);
      showNotification(`Department ${deptForm.name} added!`);
    } else {
      setDepartments(departments.map(d => d.id === deptModal.data.id ? { ...d, name: deptForm.name, doctor: deptForm.doctor } : d));
      showNotification(`Department ${deptForm.name} updated!`);
    }
    setDeptModal({ isOpen: false, mode: 'add', data: null });
  };

  // 3. Schedule Modal Actions
  const openEditScheduleModal = (sch) => {
    const times = sch.hours ? sch.hours.split('–') : ['09:00', '16:30'];
    setScheduleForm({
      doctor: sch.doctor,
      days: sch.days,
      startTime: times[0] || '09:00',
      endTime: times[1] || '16:30',
      duration: sch.slot || '30 minutes'
    });
    setScheduleModal({ isOpen: true, data: sch });
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    const updatedHours = `${scheduleForm.startTime}–${scheduleForm.endTime}`;
    setSchedules(schedules.map(s => s.id === scheduleModal.data.id ? {
      ...s,
      doctor: scheduleForm.doctor,
      days: scheduleForm.days,
      hours: updatedHours,
      slot: scheduleForm.duration
    } : s));
    showNotification(`Schedule updated for ${scheduleForm.doctor}`);
    setScheduleModal({ isOpen: false, data: null });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans w-full selection:bg-teal-500 selection:text-white">
      
      {/* Sidebar الموحد */}
      <aside className="w-72 bg-gradient-to-b from-teal-950 via-slate-950 to-slate-950 border-r border-teal-800/20 p-5 flex flex-col justify-between fixed h-screen z-20 shadow-2xl backdrop-blur-xl">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 px-2 py-3 bg-teal-900/20 rounded-2xl border border-teal-700/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 font-bold text-base border border-teal-300/30">
              🛡️
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                ClinicCare
              </h2>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[9px] text-teal-300/80 font-bold tracking-widest uppercase">Admin Operations</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-teal-400/60 uppercase">System Navigation</div>
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'users', label: 'Users & roles', icon: '👥' },
              { id: 'departments', label: 'Departments', icon: '🏥' },
              { id: 'schedules', label: 'Schedules', icon: '⏰' },
              { id: 'workflow', label: 'Workflow history', icon: '📜' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-white border border-teal-500/40 shadow-lg shadow-teal-950'
                    : 'text-teal-200/60 hover:text-white hover:bg-teal-900/30 border border-transparent'
                }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full shadow-glow"></div>
                )}
                <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                <span style={{ fontFamily: "'Times New Roman', Times, serif" }} className="text-sm tracking-wide">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-teal-800/30">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-teal-900/10 border border-teal-700/20">
            <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-xs font-bold text-teal-200 border border-teal-600/40">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">System Administrator</p>
              <p className="text-[10px] text-teal-400/80 truncate">admin@cliniccare.sys</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 text-xs hover:border-rose-500/40"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-8 space-y-6 max-w-[1500px]">
        
        {successMsg && (
          <div className="bg-teal-900/80 border border-teal-500/40 text-teal-200 p-4 rounded-2xl text-xs font-bold shadow-lg animate-fadeIn flex items-center justify-between">
            <span>✅ {successMsg}</span>
          </div>
        )}

        {/* Header */}
        <header className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">ADMINISTRATION</span>
          <h1 className="text-3xl font-normal text-white tracking-wide" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Clinic operations
          </h1>
        </header>

        {/* Tab Navigation Header */}
        <div className="border-b border-teal-800/40 flex items-center space-x-8 pt-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: 'Users & roles' },
            { id: 'departments', label: 'Departments' },
            { id: 'schedules', label: 'Schedules' },
            { id: 'workflow', label: 'Workflow history' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === tab.id
                  ? 'text-cyan-300 border-b-2 border-cyan-400'
                  : 'text-teal-200/60 hover:text-white'
              }`}
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-5 shadow-lg flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-teal-300/80">Open tickets</span>
                  <h2 className="text-3xl font-normal text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {stats.openTickets}
                  </h2>
                  <p className="text-[10px] text-teal-400/60 mt-1">Cases not yet closed or resolved</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 text-sm">📋</div>
              </div>

              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-5 shadow-lg flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-teal-300/80">Urgent review flags</span>
                  <h2 className="text-3xl font-normal text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {stats.urgentFlags}
                  </h2>
                  <p className="text-[10px] text-teal-400/60 mt-1">Flags set by a doctor</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 text-sm">🛡️</div>
              </div>

              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-5 shadow-lg flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-teal-300/80">Appointment requests</span>
                  <h2 className="text-3xl font-normal text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {stats.appointmentRequests}
                  </h2>
                  <p className="text-[10px] text-teal-400/60 mt-1">Waiting for reception coordination</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 text-sm">📅</div>
              </div>

              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-5 shadow-lg flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-teal-300/80">Active profiles</span>
                  <h2 className="text-3xl font-normal text-white mt-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {stats.activeProfiles}
                  </h2>
                  <p className="text-[10px] text-teal-400/60 mt-1">Across clinic roles</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 text-sm">👥</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-teal-800/40 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Ticket status overview</h3>
                    <p className="text-[10px] text-teal-300/60">System workflow distribution</p>
                  </div>
                  <span className="text-teal-400">📈</span>
                </div>
                <div className="space-y-3 pt-1">
                  {ticketStatuses.map((st, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs border-b border-teal-900/30 pb-2">
                      <span className="text-teal-200/80">{st.label}</span>
                      <span className="font-mono font-bold text-white bg-teal-950 px-2 py-0.5 rounded border border-teal-800/40">{st.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-6 shadow-lg space-y-4">
                <div className="border-b border-teal-800/40 pb-3">
                  <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Routing by department</h3>
                  <p className="text-[10px] text-teal-300/60">Current active queue across 6 core units</p>
                </div>
                <div className="space-y-3 pt-1 max-h-[220px] overflow-y-auto pr-1">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between text-xs border-b border-teal-900/30 pb-2">
                      <div>
                        <p className="font-bold text-white">{dept.name}</p>
                        <p className="text-[10px] text-teal-400/60">{dept.doctor}</p>
                      </div>
                      <span className="bg-teal-950 text-cyan-300 border border-teal-700/50 px-2.5 py-1 rounded-full text-[10px] font-bold">{dept.openTickets} open</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-6 shadow-lg space-y-4">
                <div className="border-b border-teal-800/40 pb-3">
                  <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Risk suggestion counts</h3>
                  <p className="text-[10px] text-teal-300/60">AI triage classification labels</p>
                </div>
                <div className="space-y-4 pt-1">
                  {riskSuggestions.map((risk, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-teal-200/90 font-semibold">{risk.level}</span>
                        <span className="font-mono text-white font-bold">{risk.count}</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-teal-900/50">
                        <div className={`${risk.color} h-2 rounded-full`} style={{ width: risk.percentage }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS & ROLES */}
        {activeTab === 'users' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="🔍 Search users or roles..."
                  className="w-full bg-teal-950/60 border border-teal-700/40 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-teal-400/50 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button 
                onClick={openAddUserModal}
                className="bg-teal-700 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition cursor-pointer flex items-center space-x-2"
              >
                <span>👤+</span>
                <span>Add user</span>
              </button>
            </div>

            <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-teal-950/80 text-teal-300 uppercase font-bold border-b border-teal-800/50">
                  <tr>
                    <th className="p-4">USER</th>
                    <th className="p-4">ROLE</th>
                    <th className="p-4">DEPARTMENT</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/40 text-teal-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-teal-900/30 transition">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-teal-800 text-teal-200 border border-teal-600/40 flex items-center justify-center font-bold text-xs">
                            {u.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{u.name}</p>
                            <p className="text-[10px] text-teal-400/70">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-teal-200">{u.role}</td>
                      <td className="p-4 text-teal-300/80">{u.department}</td>
                      <td className="p-4">
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <button 
                          onClick={() => openEditUserModal(u)}
                          className="bg-teal-900/50 hover:bg-teal-800 text-teal-200 px-3.5 py-1.5 rounded-xl border border-teal-700/50 font-bold transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleRemoveUser(u.id, u.name)}
                          className="text-rose-400 hover:text-rose-300 font-bold px-2 py-1 transition cursor-pointer"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DEPARTMENTS */}
        {activeTab === 'departments' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-teal-300">Registered Medical Units</h3>
              <button 
                onClick={openAddDeptModal}
                className="bg-teal-700 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition cursor-pointer"
              >
                + Add department
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-800/50 inline-block mb-2">
                        Department
                      </span>
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        {dept.name}
                      </h3>
                      <p className="text-xs text-teal-300/70 mt-1">
                        Assigned doctor: <span className="text-white font-semibold">{dept.doctor}</span>
                      </p>
                    </div>
                    <span className="text-teal-400 text-lg">⚙️</span>
                  </div>

                  <div className="border-t border-teal-800/40 pt-3 flex items-center justify-between">
                    <span className="text-xs text-teal-400/80 font-mono">{dept.openTickets} tickets</span>
                    <button 
                      onClick={() => openEditDeptModal(dept)}
                      className="bg-teal-950 hover:bg-teal-900 text-teal-200 border border-teal-700/50 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Edit routing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SCHEDULES */}
        {activeTab === 'schedules' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-teal-300">Doctor Working Schedules & Slot Durations</h3>
            
            <div className="space-y-3">
              {schedules.map((sch) => (
                <div key={sch.id} className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 text-lg">
                      📅
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{sch.doctor}</h4>
                      <p className="text-xs text-teal-300/70 mt-0.5">
                        {sch.days} · <span className="text-cyan-300 font-mono">{sch.hours}</span> · <span className="text-teal-400">{sch.slot}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-teal-950 text-teal-300 border border-teal-800/50 px-3 py-1 rounded-full font-bold">
                      {sch.dept}
                    </span>
                    <button 
                      onClick={() => openEditScheduleModal(sch)}
                      className="bg-teal-900/50 hover:bg-teal-800 text-teal-200 border border-teal-700/50 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Configure ⚙️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WORKFLOW HISTORY */}
        {activeTab === 'workflow' && (
          <div className="bg-teal-900/20 border border-teal-700/30 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Workflow history
              </h3>
              <p className="text-xs text-teal-300/70 mt-0.5">
                Recent configuration and coordination events logged in system memory.
              </p>
            </div>

            <div className="divide-y divide-teal-900/40 pt-2">
              {workflowHistory.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-teal-950 border border-teal-800/50 flex items-center justify-center text-teal-300 text-xs mt-0.5">
                      🔄
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.title}</p>
                      <p className="text-xs text-teal-300/70">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-teal-400/60">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ------------------ MODALS SECTION (مطابقة للصور الـ 6 تماماً) ------------------ */}

      {/* 1. Add / Edit User Modal (مطابق للصورتين 1 و 2) */}
      {userModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">CLINICCARE WORKSPACE</span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  {userModal.mode === 'add' ? 'Add a demo user' : 'Edit demo user'}
                </h3>
              </div>
              <button 
                onClick={() => setUserModal({ isOpen: false, mode: 'add', data: null })}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full name</label>
                <input 
                  type="text" 
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="e.g. Maya Chen"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email address</label>
                <input 
                  type="email" 
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="e.g. maya.chen@example.test"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                <select 
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department, if applicable</label>
                <select 
                  value={userForm.department}
                  onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="None">None</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Emergency Care">Emergency Care</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                <select 
                  value={userForm.status}
                  onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setUserModal({ isOpen: false, mode: 'add', data: null })}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  Save user
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 2. Department Routing Modal (مطابق للصورتين 3 و 4) */}
      {deptModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">CLINICCARE WORKSPACE</span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Department routing
                </h3>
              </div>
              <button 
                onClick={() => setDeptModal({ isOpen: false, mode: 'add', data: null })}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDept} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department name</label>
                <input 
                  type="text" 
                  required
                  value={deptForm.name}
                  onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                  placeholder="e.g. Primary care"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned doctor</label>
                <select 
                  value={deptForm.doctor}
                  onChange={(e) => setDeptForm({ ...deptForm, doctor: e.target.value })}
                  className="w-full border border-teal-600 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none bg-white font-semibold"
                >
                  <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
                  <option value="Dr. John Doe">Dr. John Doe</option>
                  <option value="Dr. Specialist">Dr. Specialist</option>
                  <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                  <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                  <option value="Dr. Robert Wilson">Dr. Robert Wilson</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setDeptModal({ isOpen: false, mode: 'add', data: null })}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  Save department
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 3. Doctor Schedule Modal (مطابق للصورتين 5 و 6) */}
      {scheduleModal.isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">CLINICCARE WORKSPACE</span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                  Doctor appointment schedule
                </h3>
              </div>
              <button 
                onClick={() => setScheduleModal({ isOpen: false, data: null })}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doctor</label>
                <select 
                  value={scheduleForm.doctor}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, doctor: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
                  <option value="Dr. John Doe">Dr. John Doe</option>
                  <option value="Dr. Specialist">Dr. Specialist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Working days</label>
                <input 
                  type="text" 
                  required
                  value={scheduleForm.days}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, days: e.target.value })}
                  placeholder="Mon, Tue, Wed, Thu, Fri"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Use abbreviated days separated by commas, such as Mon, Wed, Fri</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start time</label>
                  <input 
                    type="time" 
                    required
                    value={scheduleForm.startTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End time</label>
                  <input 
                    type="time" 
                    required
                    value={scheduleForm.endTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, endTime: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Appointment duration</label>
                <select 
                  value={scheduleForm.duration}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="20 minutes">20 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setScheduleModal({ isOpen: false, data: null })}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  Save schedule
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}