import React, { useState } from 'react';
import { useLanguage } from '../index';
import { JOBS } from '../constants';
import { JobApplicationModal } from '../components/Modals';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export const Careers: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<{id: string, title: string} | null>(null);

  const filteredJobs = filter === 'All' ? JOBS : JOBS.filter(j => j.dept === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('careers_title')}</h1>
        <p className="text-xl opacity-90">Help us shape the future of AI in the region.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          {['All', 'Tech', 'Admin'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === f 
                  ? 'bg-primary-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Job List */}
        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title[language]}</h3>
                <div className="flex gap-4 text-gray-500 text-sm">
                   <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                   <span className="flex items-center gap-1"><MapPin size={14} /> Taiz, Yemen (Remote)</span>
                   <span className="flex items-center gap-1"><Clock size={14} /> Full-time</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedJob({ id: job.id, title: job.title[language] })}
                className="bg-primary-100 text-primary-700 px-8 py-3 rounded-xl font-bold hover:bg-primary-200 transition-colors"
              >
                {t('btn_apply')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedJob && (
        <JobApplicationModal 
          isOpen={!!selectedJob} 
          onClose={() => setSelectedJob(null)} 
          jobTitle={selectedJob.title}
          jobId={selectedJob.id}
        />
      )}
    </div>
  );
};