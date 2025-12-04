
import React, { useState } from 'react';
import { useLanguage } from '../index';
import { runServiceTool } from '../services/geminiService';
import { 
  Brain, FileText, PenTool, Image as ImageIcon, BarChart3, Cpu, 
  Sparkles, Search, GraduationCap, Palette, Briefcase, 
  FlaskConical, Library, Layout, Share2, Loader2, ArrowRight, ArrowLeft,
  CheckCircle, Copy, AlertCircle, RefreshCw, Layers
} from 'lucide-react';
import { ServiceModal } from '../components/Modals';

// --- Tool Configuration Definitions ---
interface ToolConfig {
  id: string;
  categoryId: string;
  icon: any;
  titleKey: string;
  descKey: string;
  type: 'text' | 'image';
  systemPrompt: string; // The instruction sent to AI
  inputs: { key: string; labelKey: string; placeholder: string; type: 'text' | 'textarea' | 'select'; options?: string[] }[];
}

const TOOLS_CONFIG: ToolConfig[] = [
  // --- Scientific Research ---
  {
    id: 'research_summarizer',
    categoryId: 'research',
    icon: FileText,
    titleKey: 'tool_summarizer',
    descKey: 'tool_summarizer_desc',
    type: 'text',
    systemPrompt: 'You are an expert academic researcher. Summarize the provided text or topic into a concise, structured abstract with key findings, methodology, and conclusion.',
    inputs: [
      { key: 'Topic', labelKey: 'lbl_input_topic', placeholder: 'Paste abstract or topic here...', type: 'textarea' },
      { key: 'Style', labelKey: 'lbl_input_style', placeholder: 'Select style', type: 'select', options: ['Academic', 'Simple', 'Bullet Points'] }
    ]
  },
  {
    id: 'research_citation',
    categoryId: 'research',
    icon: Library,
    titleKey: 'tool_citation',
    descKey: 'tool_citation_desc',
    type: 'text',
    systemPrompt: 'Generate a bibliographic citation for the provided source information in the requested format.',
    inputs: [
      { key: 'Source', labelKey: 'lbl_input_topic', placeholder: 'Book title, URL, or Paper name...', type: 'text' },
      { key: 'Format', labelKey: 'lbl_input_style', placeholder: 'Format', type: 'select', options: ['APA 7', 'MLA 9', 'Harvard', 'Chicago'] }
    ]
  },

  // --- Education ---
  {
    id: 'edu_lesson',
    categoryId: 'education',
    icon: GraduationCap,
    titleKey: 'tool_lesson',
    descKey: 'tool_lesson_desc',
    type: 'text',
    systemPrompt: 'Create a comprehensive lesson plan for the specified topic and grade level. Include objectives, activities, and assessment methods.',
    inputs: [
      { key: 'Topic', labelKey: 'lbl_input_topic', placeholder: 'e.g. Photosynthesis', type: 'text' },
      { key: 'Level', labelKey: 'lbl_input_context', placeholder: 'Grade Level (e.g. 5th Grade)', type: 'text' }
    ]
  },
  {
    id: 'edu_quiz',
    categoryId: 'education',
    icon: Brain,
    titleKey: 'tool_quiz',
    descKey: 'tool_quiz_desc',
    type: 'text',
    systemPrompt: 'Generate 5 multiple choice questions with answers and explanations for the given topic.',
    inputs: [
      { key: 'Topic', labelKey: 'lbl_input_topic', placeholder: 'e.g. World War II', type: 'text' },
      { key: 'Difficulty', labelKey: 'lbl_input_style', placeholder: 'Difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard'] }
    ]
  },

  // --- Design ---
  {
    id: 'design_logo',
    categoryId: 'design',
    icon: Layout,
    titleKey: 'tool_logo',
    descKey: 'tool_logo_desc',
    type: 'image',
    systemPrompt: 'A minimal, modern, vector-style logo design concept',
    inputs: [
      { key: 'Description', labelKey: 'lbl_input_topic', placeholder: 'e.g. A coffee shop named "Bean There"', type: 'text' },
      { key: 'Style', labelKey: 'lbl_input_style', placeholder: 'Style', type: 'select', options: ['Minimalist', 'Vintage', 'Futuristic', '3D'] }
    ]
  },
  {
    id: 'design_social',
    categoryId: 'design',
    icon: Share2,
    titleKey: 'tool_social',
    descKey: 'tool_social_desc',
    type: 'image',
    systemPrompt: 'A high-quality, engaging social media post background image',
    inputs: [
      { key: 'Topic', labelKey: 'lbl_input_topic', placeholder: 'e.g. Summer Sale Announcement', type: 'text' },
      { key: 'Platform', labelKey: 'lbl_input_context', placeholder: 'Platform', type: 'select', options: ['Instagram (Square)', 'Twitter (Wide)', 'Story (Vertical)'] }
    ]
  },

  // --- Business (Existing mapped to functional) ---
  {
    id: 'biz_writer',
    categoryId: 'business',
    icon: PenTool,
    titleKey: 'srv_content',
    descKey: 'srv_content_desc',
    type: 'text',
    systemPrompt: 'You are a professional business copywriter. Write content based on the request.',
    inputs: [
      { key: 'Topic', labelKey: 'lbl_input_topic', placeholder: 'Topic...', type: 'textarea' },
      { key: 'Type', labelKey: 'lbl_input_style', placeholder: 'Type', type: 'select', options: ['Email', 'Blog Post', 'Ad Copy', 'Proposal'] }
    ]
  }
];

const CATEGORIES = [
  { id: 'all', icon: Layers, labelKey: 'nav_services' },
  { id: 'research', icon: FlaskConical, labelKey: 'cat_research' },
  { id: 'education', icon: GraduationCap, labelKey: 'cat_education' },
  { id: 'design', icon: Palette, labelKey: 'cat_design' },
  { id: 'business', icon: Briefcase, labelKey: 'cat_business' },
];

export const Services: React.FC = () => {
  const { t, dir, language } = useLanguage();
  
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  
  // Tool Execution State
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const activeTool = activeToolId ? TOOLS_CONFIG.find(t => t.id === activeToolId) : null;
  
  const filteredTools = activeCategory === 'all' 
    ? TOOLS_CONFIG 
    : TOOLS_CONFIG.filter(tool => tool.categoryId === activeCategory);

  const handleToolSelect = (toolId: string) => {
    setActiveToolId(toolId);
    setInputs({});
    setResult(null);
    setError(null);
  };

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTool) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await runServiceTool(
        activeTool.type,
        activeTool.systemPrompt,
        inputs,
        language
      );
      setResult(output);
    } catch (err) {
      setError('Service unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert('Copied!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-200 flex-shrink-0 z-20">
         <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="text-primary-600" />
              {t('nav_services')}
            </h2>
            <div className="space-y-2">
               {CATEGORIES.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => { setActiveCategory(cat.id); setActiveToolId(null); }}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                     activeCategory === cat.id 
                       ? 'bg-primary-50 text-primary-700 shadow-sm' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                   <cat.icon size={20} />
                   {t(cat.labelKey)}
                 </button>
               ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
               <button 
                  onClick={() => setShowInterestModal(true)}
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center gap-3 hover:scale-105 transition-transform group"
               >
                  <div className="bg-white/20 p-2 rounded-lg"><Sparkles size={20} className="text-yellow-300" /></div>
                  <div className="text-left">
                     <p className="text-xs text-gray-400 uppercase font-bold">{t('dream_service')}</p>
                     <p className="text-sm font-bold">Request Custom</p>
                  </div>
               </button>
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* View 1: Catalog Grid (No tool selected) */}
        {!activeTool && (
           <div className="max-w-5xl mx-auto animate-fadeIn">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {CATEGORIES.find(c => c.id === activeCategory)?.icon && React.createElement(CATEGORIES.find(c => c.id === activeCategory)!.icon, { className: "inline-block mr-2 mb-1 w-8 h-8 text-primary-600" })}
                  {t(CATEGORIES.find(c => c.id === activeCategory)?.labelKey || 'nav_services')}
                </h1>
                <p className="text-gray-500">Select a tool to start working immediately.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredTools.map(tool => (
                    <div 
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.id)}
                      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                    >
                       <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                          <tool.icon size={24} />
                       </div>
                       <h3 className="text-lg font-bold text-gray-900 mb-2">{t(tool.titleKey)}</h3>
                       <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">{t(tool.descKey)}</p>
                       <div className="flex items-center text-primary-600 text-sm font-bold group-hover:underline">
                          {t('btn_launch_tool')} {dir === 'ltr' ? <ArrowRight size={16} className="ml-1" /> : <ArrowLeft size={16} className="mr-1" />}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* View 2: Active Tool Interface */}
        {activeTool && (
           <div className="max-w-4xl mx-auto animate-fadeIn">
              <button 
                onClick={() => setActiveToolId(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 font-medium transition-colors"
              >
                 {dir === 'rtl' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />} Back to Catalog
              </button>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                  
                  {/* Left: Input Form */}
                  <div className="md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
                      <div className="flex items-center gap-3 mb-6 text-primary-800">
                         <activeTool.icon size={28} />
                         <h2 className="text-xl font-bold leading-tight">{t(activeTool.titleKey)}</h2>
                      </div>
                      
                      <form onSubmit={handleExecute} className="space-y-5">
                         {activeTool.inputs.map(input => (
                            <div key={input.key}>
                               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                  {t(input.labelKey)}
                               </label>
                               
                               {input.type === 'textarea' ? (
                                  <textarea
                                    required
                                    rows={4}
                                    placeholder={input.placeholder}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                    onChange={(e) => handleInputChange(input.key, e.target.value)}
                                  />
                               ) : input.type === 'select' ? (
                                  <select 
                                    className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    onChange={(e) => handleInputChange(input.key, e.target.value)}
                                  >
                                     <option value="">Select...</option>
                                     {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                  </select>
                               ) : (
                                  <input 
                                    type="text"
                                    required
                                    placeholder={input.placeholder}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                    onChange={(e) => handleInputChange(input.key, e.target.value)}
                                  />
                               )}
                            </div>
                         ))}

                         <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-primary-800 text-white py-3 rounded-xl font-bold hover:bg-primary-900 transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                         >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                            {loading ? 'Processing...' : 'Generate'}
                         </button>
                      </form>
                  </div>

                  {/* Right: Output Area */}
                  <div className="md:w-2/3 p-8 flex flex-col bg-white relative">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-700">Result</h3>
                          {result && activeTool.type === 'text' && (
                              <button onClick={copyToClipboard} className="text-gray-400 hover:text-primary-600 flex items-center gap-1 text-sm font-medium transition-colors">
                                  <Copy size={16} /> Copy
                              </button>
                          )}
                      </div>

                      <div className="flex-grow border border-gray-100 rounded-2xl bg-gray-50/30 p-6 overflow-y-auto min-h-[400px]">
                          {loading ? (
                              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4 animate-pulse">
                                  <RefreshCw className="animate-spin text-primary-300" size={48} />
                                  <p>AI is working on your {t(activeTool.titleKey)}...</p>
                              </div>
                          ) : result ? (
                              activeTool.type === 'image' ? (
                                 <div className="flex items-center justify-center h-full">
                                    <img src={result} alt="Generated" className="max-w-full rounded-lg shadow-lg" />
                                 </div>
                              ) : (
                                 <div className="text-gray-800 whitespace-pre-wrap leading-relaxed animate-fadeIn prose max-w-none">
                                    {result}
                                 </div>
                              )
                          ) : (
                              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                                  <div className="bg-gray-100 p-4 rounded-full"><activeTool.icon size={32} /></div>
                                  <p className="text-center max-w-xs">Fill in the details on the left and click Generate to see the magic happen.</p>
                              </div>
                          )}
                      </div>
                      
                      {error && (
                         <div className="absolute bottom-4 left-4 right-4 bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={16} /> {error}
                         </div>
                      )}
                  </div>

              </div>
           </div>
        )}

      </main>

      <ServiceModal 
        isOpen={showInterestModal} 
        onClose={() => setShowInterestModal(false)} 
        serviceName="Custom Request"
        isDream={true}
      />
    </div>
  );
};