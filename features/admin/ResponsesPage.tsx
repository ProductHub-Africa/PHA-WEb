
import React, { useState, useEffect } from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Database, Trash2, ExternalLink, Filter } from 'lucide-react';
import { Button } from '../../components/Button';

export const ResponsesPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('pha_submissions');
    if (data) setSubmissions(JSON.parse(data));
  }, []);

  const clearLogs = () => {
    if (confirm("Delete all local logs? This won't affect Google Sheets.")) {
      localStorage.removeItem('pha_submissions');
      setSubmissions([]);
    }
  };

  return (
    <div className="pt-[140px] pb-32 min-h-screen bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className={`${TYPOGRAPHY.header02} text-[#08223d]`}>Submission Responses</h1>
            <p className="text-gray-500">Viewing locally logged submissions for testing and verification.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={clearLogs} className="text-red-600 border-red-200">
              <Trash2 size={16} className="mr-2" /> Clear Local Logs
            </Button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-300">
             <Database size={48} className="mx-auto text-gray-300 mb-6" />
             <h3 className="text-xl font-bold text-gray-400">No responses logged yet</h3>
             <p className="text-gray-400">Submit any form to see the data appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((sub, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-50">
                   <div>
                      <span className="inline-block px-3 py-1 bg-blue-50 text-[#135291] rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                        {sub.source || 'General'}
                      </span>
                      <h4 className="font-black text-lg text-[#08223d]">
                        {sub.firstName} {sub.lastName} {sub.fullName || ''}
                      </h4>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold">{sub.timestamp}</p>
                      <p className="text-[10px] text-green-600 font-black uppercase mt-1">Live Sync Line {submissions.length - i + 1}</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {Object.entries(sub).map(([key, value]: [string, any]) => {
                     if (['timestamp', 'source', 'firstName', 'lastName', 'fullName'].includes(key)) return null;
                     return (
                       <div key={key}>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{key}</p>
                          <p className="text-sm font-bold text-gray-800 break-words">{String(value)}</p>
                       </div>
                     );
                   })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
