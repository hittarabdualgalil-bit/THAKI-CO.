
import React, { useState } from 'react';
import { useLanguage } from '../index';
import { storageService } from '../services/storageService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, CreditCard, Star, Activity, Eye, CheckCircle, XCircle, X, Globe, Mail, FileText, Filter, Download, AlertTriangle } from 'lucide-react';
import { PaymentRequest } from '../types';

export const Admin: React.FC = () => {
  const { t } = useLanguage();
  
  // Tabs for better organization
  const [activeTab, setActiveTab] = useState<'payments' | 'interests' | 'messages'>('payments');
  
  // Filters
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [interestFilter, setInterestFilter] = useState<string | null>(null);

  // State for data to allow re-rendering after updates
  const [payments, setPayments] = useState(storageService.getPayments());
  const [interests] = useState(storageService.getInterests());
  const [messages] = useState(storageService.getMessages());
  const [reviews] = useState(storageService.getReviews());
  const [visitorCount] = useState(storageService.getVisitorCount());
  
  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRequest | null>(null);
  
  // Confirmation Modal State
  const [confirmAction, setConfirmAction] = useState<{ id: string, status: 'approved' | 'rejected' } | null>(null);

  const refreshData = () => {
    setPayments(storageService.getPayments());
  };

  const handleStatusUpdate = (id: string, status: 'approved' | 'rejected') => {
    setConfirmAction({ id, status });
  };

  const performStatusUpdate = () => {
    if (!confirmAction) return;

    storageService.updatePaymentStatus(confirmAction.id, confirmAction.status);
    refreshData();
    
    // If viewing receipt, close it if it matches the updated item
    if (selectedReceipt && selectedReceipt.id === confirmAction.id) {
        setSelectedReceipt(null);
    }
    
    setConfirmAction(null);
  };

  // CSV Export Function
  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    
    // Get headers
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add header row
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const dreamRequests = interests.filter(i => i.type === 'dream').length;

  const stats = [
    { label: 'Total Visitors', value: visitorCount.toLocaleString(), icon: <Globe />, color: 'bg-indigo-500' },
    { label: 'Inquiries', value: messages.length, icon: <Mail />, color: 'bg-blue-500' },
    { label: 'Payments', value: payments.length, icon: <CreditCard />, color: 'bg-green-500' },
    { label: 'Dream Requests', value: dreamRequests, icon: <Star />, color: 'bg-purple-500' },
  ];

  // Dynamic Chart Data Calculation for Service Demand
  const getInterestStats = () => {
    const counts: Record<string, number> = {};
    interests.forEach(i => {
      // Use the service name as the key
      const name = i.serviceName; 
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.keys(counts).map(name => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name, // Truncate long names for chart
      fullName: name,
      value: counts[name]
    })).sort((a, b) => b.value - a.value); // Sort by highest demand
  };

  const interestData = getInterestStats();

  const paymentStatusData = [
    { name: 'Pending', value: payments.filter(p => p.status === 'pending').length },
    { name: 'Approved', value: payments.filter(p => p.status === 'approved').length },
    { name: 'Rejected', value: payments.filter(p => p.status === 'rejected').length },
  ];

  const filteredPayments = paymentFilter === 'all' 
    ? payments 
    : payments.filter(p => p.status === paymentFilter);

  const filteredInterests = interestFilter
    ? interests.filter(i => i.serviceName === interestFilter)
    : interests;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'];

  // Handlers for Chart Interaction
  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const serviceName = data.activePayload[0].payload.fullName;
      setInterestFilter(serviceName);
      setActiveTab('interests');
    }
  };

  const handlePieClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const status = data.activePayload[0].payload.name.toLowerCase();
      setPaymentFilter(status);
      setActiveTab('payments');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-gray-900">{t('admin_dashboard')}</h1>
             <button onClick={refreshData} className="text-primary-600 hover:bg-primary-50 px-3 py-1 rounded transition-colors text-sm font-medium">Refresh Data</button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
               <div>
                 <p className="text-gray-500 text-sm mb-1">{s.label}</p>
                 <h2 className="text-3xl font-bold text-gray-900">{s.value}</h2>
               </div>
               <div className={`p-3 rounded-full text-white ${s.color}`}>
                 {s.icon}
               </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 relative group">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold">Service Demand (Click to Filter)</h3>
               {interestFilter && <button onClick={() => setInterestFilter(null)} className="text-xs text-red-500 hover:underline">Clear Filter</button>}
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interestData} margin={{ bottom: 20 }} onClick={handleBarClick} className="cursor-pointer">
                <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={60} tick={{fontSize: 10}} />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {interestData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={interestFilter === entry.fullName ? '#000' : 'none'} strokeWidth={2} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 relative">
            <h3 className="font-bold mb-4">Payment Status (Click to Filter)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={handlePieClick} className="cursor-pointer">
                <Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#fbbf24' : index === 1 ? '#10b981' : '#ef4444'} stroke={paymentFilter === entry.name.toLowerCase() ? '#000' : 'none'} strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
           <button 
             onClick={() => setActiveTab('payments')}
             className={`pb-3 px-4 font-bold transition-colors border-b-2 ${activeTab === 'payments' ? 'border-primary-600 text-primary-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             <div className="flex items-center gap-2"><CreditCard size={18} /> Financial Requests</div>
           </button>
           <button 
             onClick={() => setActiveTab('interests')}
             className={`pb-3 px-4 font-bold transition-colors border-b-2 ${activeTab === 'interests' ? 'border-primary-600 text-primary-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             <div className="flex items-center gap-2"><Users size={18} /> Service Interests</div>
           </button>
           <button 
             onClick={() => setActiveTab('messages')}
             className={`pb-3 px-4 font-bold transition-colors border-b-2 ${activeTab === 'messages' ? 'border-primary-600 text-primary-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             <div className="flex items-center gap-2"><Mail size={18} /> Inbox Messages</div>
           </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          
          {/* 1. Payments Table */}
          {activeTab === 'payments' && (
            <>
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <button onClick={() => exportToCSV(payments, 'Thaki_Payments')} className="flex items-center gap-2 text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors text-sm font-bold">
                    <Download size={16} /> Export CSV
                 </button>
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                       <Filter size={16} />
                       <span>Filter by Status:</span>
                    </div>
                    <select 
                      value={paymentFilter} 
                      onChange={(e) => setPaymentFilter(e.target.value as any)}
                      className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-3 py-1.5 outline-none shadow-sm"
                    >
                       <option value="all">All Statuses</option>
                       <option value="pending">Pending</option>
                       <option value="approved">Approved</option>
                       <option value="rejected">Rejected</option>
                    </select>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="p-4">Depositor</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">Receipt #</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredPayments.map(p => (
                      <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-medium">{p.depositorName}</td>
                        <td className="p-4">{p.phone || '-'}</td>
                        <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{p.plan}</span></td>
                        <td className="p-4 font-mono">{p.receiptNumber}</td>
                        <td className="p-4 text-gray-500 text-xs">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize 
                            ${p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                              p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center justify-center gap-2">
                             <button onClick={() => setSelectedReceipt(p)} className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors" title="View Receipt"><Eye size={18} /></button>
                             {p.status === 'pending' && (
                               <>
                                 <button onClick={() => handleStatusUpdate(p.id, 'approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Approve"><CheckCircle size={18} /></button>
                                 <button onClick={() => handleStatusUpdate(p.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Reject"><XCircle size={18} /></button>
                               </>
                             )}
                           </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPayments.length === 0 && <tr><td colSpan={7} className="p-4 text-center text-gray-400">No payment requests found matching filter</td></tr>}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* 2. Interests Table */}
          {activeTab === 'interests' && (
            <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <div>
                    {interestFilter ? (
                       <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          Filter: {interestFilter}
                          <button onClick={() => setInterestFilter(null)} className="hover:text-blue-900"><X size={14} /></button>
                       </div>
                    ) : (
                       <span className="text-sm text-gray-500 italic">Showing all records</span>
                    )}
                 </div>
                 <button onClick={() => exportToCSV(interests, 'Thaki_Interests')} className="flex items-center gap-2 text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors text-sm font-bold">
                    <Download size={16} /> Export CSV
                 </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Service / Title</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredInterests.map(i => (
                    <tr key={i.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium">{i.customerName}</td>
                      <td className="p-4">{i.email}</td>
                      <td className="p-4">{i.phone || '-'}</td>
                      <td className="p-4 font-bold text-primary-800">{i.serviceName}</td>
                      <td className="p-4 text-gray-500 text-sm">
                        {i.type === 'dream' ? (
                          <div className="flex flex-col gap-1">
                             <span className="font-bold text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded w-fit">{i.projectType || 'Custom'}</span>
                             <span className="truncate max-w-xs">{i.details}</span>
                             <div className="flex gap-2 text-xs opacity-75">
                               <span>{i.budget}</span>
                               {i.timeline && <span>- {i.timeline}</span>}
                             </div>
                          </div>
                        ) : (
                          <span className="truncate max-w-xs block">{i.details || 'Standard Request'}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredInterests.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-400">No interests found matching {interestFilter}</td></tr>}
                </tbody>
              </table>
            </div>
            </>
          )}

          {/* 3. Messages Table */}
          {activeTab === 'messages' && (
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Message</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {messages.slice().reverse().map(m => (
                    <tr key={m.id} className="border-t border-gray-100 hover:bg-gray-50">
                       <td className="p-4 text-gray-500 text-xs w-32">{new Date(m.date).toLocaleDateString()}</td>
                       <td className="p-4 font-bold">{m.name}</td>
                       <td className="p-4 text-primary-600">{m.email}</td>
                       <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase">{m.type}</span></td>
                       <td className="p-4 text-gray-600 max-w-md">{m.message}</td>
                    </tr>
                  ))}
                   {messages.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-400">No messages found</td></tr>}
                </tbody>
               </table>
            </div>
          )}

        </div>
      </div>

      {/* Receipt View Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedReceipt(null)}>
           <div className="bg-white rounded-xl overflow-hidden max-w-2xl w-full" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b flex justify-between items-center">
                 <h3 className="font-bold">Payment Receipt</h3>
                 <button onClick={() => setSelectedReceipt(null)}><X /></button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                 <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                    <p><span className="text-gray-500">Depositor:</span> <span className="font-bold block">{selectedReceipt.depositorName}</span></p>
                    <p><span className="text-gray-500">Phone:</span> <span className="font-bold block">{selectedReceipt.phone || 'N/A'}</span></p>
                    <p><span className="text-gray-500">Receipt #:</span> <span className="font-bold block font-mono">{selectedReceipt.receiptNumber}</span></p>
                    <p><span className="text-gray-500">Plan:</span> <span className="font-bold block">{selectedReceipt.plan}</span></p>
                    <p><span className="text-gray-500">Date:</span> <span className="font-bold block">{new Date(selectedReceipt.date).toLocaleString()}</span></p>
                 </div>
                 <div className="border rounded-lg overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
                    {selectedReceipt.receiptImageBase64 ? (
                      <img src={selectedReceipt.receiptImageBase64} alt="Receipt" className="max-w-full max-h-[60vh] object-contain" />
                    ) : (
                      <span className="text-gray-400">No Image Data</span>
                    )}
                 </div>
                 {selectedReceipt.status === 'pending' && (
                    <div className="flex gap-2 justify-end">
                       <button onClick={() => handleStatusUpdate(selectedReceipt.id, 'rejected')} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">Reject</button>
                       <button onClick={() => handleStatusUpdate(selectedReceipt.id, 'approved')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Approve</button>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl scale-100 animate-slideUp">
                <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${confirmAction.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {confirmAction.status === 'approved' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Action</h3>
                    <p className="text-gray-500 mb-6">
                        Are you sure you want to <span className="font-bold">{confirmAction.status}</span> this payment request?
                    </p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setConfirmAction(null)}
                            className="flex-1 py-2.5 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={performStatusUpdate}
                            className={`flex-1 py-2.5 rounded-lg font-bold text-white transition-colors ${confirmAction.status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
