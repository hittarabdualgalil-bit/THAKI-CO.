
import { TranslationKey } from './types';

export const CONTACT_INFO = {
  address: { ar: 'تعز، اليمن', en: 'Taiz, Yemen' },
  phone: '+967-735064530',
  whatsapp: '967735064530', // Just number for link
  email: 'info@thaki.ai'
};

export const TRANSLATIONS: Record<TranslationKey | string, { ar: string; en: string }> = {
  nav_home: { ar: 'الرئيسية', en: 'Home' },
  nav_about: { ar: 'من نحن', en: 'About' },
  nav_services: { ar: 'المنصة', en: 'Platform' },
  nav_careers: { ar: 'الوظائف', en: 'Careers' },
  nav_pricing: { ar: 'الأسعار', en: 'Pricing' },
  nav_demo: { ar: 'تجربة', en: 'Demo' },
  nav_contact: { ar: 'اتصل بنا', en: 'Contact' },
  
  hero_title: { ar: 'ذكاء اصطناعي يقود مستقبلك', en: 'AI Driving Your Future' },
  hero_subtitle: { ar: 'منصّة ثكي السحابية تمنحك طريقة أسرع وأكثر احترافية لأتمتة أعمالك وتشغيل خدمات الذكاء الاصطناعي بكفاءة عالية.', en: 'THAKI Cloud Platform gives you a faster and more professional way to automate your business and run AI services efficiently.' },
  hero_cta: { ar: 'ابدأ الآن', en: 'Get Started' },
  saas_badge: { ar: 'خدماتنا عبر السحابة SaaS', en: 'Our Services via SaaS Cloud' },

  services_title: { ar: 'أبرز خدماتنا القادمة', en: 'Featured Upcoming Services' },
  srv_exam: { ar: 'توليد الامتحانات', en: 'Exam Generation' },
  srv_auto: { ar: 'الأتمتة الذكية', en: 'Smart Automation' },
  srv_analytics: { ar: 'تحليل البيانات', en: 'Data Analytics' },
  srv_content: { ar: 'صانع المحتوى', en: 'Smart Writer' },
  srv_image: { ar: 'استوديو التصميم', en: 'Design Studio' },
  
  // Landing Services (Updated)
  srv_landing_1_title: { ar: 'توليد أسئلة الامتحانات', en: 'Exam Question Generation' },
  srv_landing_1_desc: { ar: 'توليد اختبارات شاملة لأي مادة ومستوى دراسي في ثوانٍ.', en: 'Create comprehensive exams for any subject and level in seconds.' },
  
  srv_landing_2_title: { ar: 'أتمتة المهام', en: 'Task Automation' },
  srv_landing_2_desc: { ar: 'روبوتات برمجية تقوم بتنفيذ المهام اليدوية المكررة بدقة وسرعة عالية.', en: 'Software robots executing repetitive manual tasks with high speed and precision.' },

  srv_landing_3_title: { ar: 'تحليل البيانات', en: 'Data Analytics' },
  srv_landing_3_desc: { ar: 'تحويل البيانات الخام إلى تقارير ورؤى استراتيجية تساعدك في اتخاذ القرارات.', en: 'Transform raw data into strategic reports and insights to help decision making.' },

  srv_content_desc: { ar: 'إنشاء مقالات ورسائل بريد ونصوص تسويقية احترافية فوراً.', en: 'Generate professional articles, emails, and marketing copy instantly.' },
  srv_image_desc: { ar: 'تحويل النصوص إلى صور وتصاميم إبداعية باستخدام أحدث تقنيات التوليد.', en: 'Transform text into creative images and designs using the latest generation technologies.' },

  btn_more: { ar: 'اعرف المزيد', en: 'Learn More' },
  btn_interested: { ar: 'أنا مهتم', en: 'I am Interested' },
  btn_launch_tool: { ar: 'تشغيل الأداة', en: 'Launch Tool' },
  btn_request_access: { ar: 'طلب وصول', en: 'Request Access' },

  testimonials_title: { ar: 'ماذا يقول عملاؤنا', en: 'What Our Clients Say' },
  btn_add_review: { ar: 'أضف تقييمك', en: 'Add Your Review' },

  about_mission: { ar: 'مهمتنا', en: 'Our Mission' },
  about_vision: { ar: 'رؤيتنا', en: 'Our Vision' },
  about_story: { ar: 'قصتنا', en: 'Our Story' },
  team_title: { ar: 'فريق القيادة', en: 'Leadership Team' },

  exam_title: { ar: 'مولد الامتحانات الذكي', en: 'Smart Exam Generator' },
  exam_topic: { ar: 'موضوع الاختبار', en: 'Exam Topic' },
  exam_difficulty: { ar: 'مستوى الصعوبة', en: 'Difficulty Level' },
  btn_generate: { ar: 'توليد الأسئلة', en: 'Generate Questions' },
  exam_result: { ar: 'الأسئلة المتولدة', en: 'Generated Questions' },

  careers_title: { ar: 'انضم إلى فريق المبتكرين', en: 'Join the Innovators' },
  btn_apply: { ar: 'قدم الآن', en: 'Apply Now' },
  upload_cv: { ar: 'رفع السيرة الذاتية', en: 'Upload CV' },

  pricing_title: { ar: 'خطط تناسب الجميع', en: 'Plans for Everyone' },
  plan_free: { ar: 'مجانية', en: 'Free' },
  plan_pro: { ar: 'احترافية', en: 'Professional' },
  plan_enterprise: { ar: 'مؤسسية', en: 'Enterprise' },
  btn_subscribe: { ar: 'اشترك الآن', en: 'Subscribe Now' },

  demo_title: { ar: 'احجز موعداً تجريبياً', en: 'Book a Demo' },
  dream_service: { ar: 'اطلب خدمتك الخاصة', en: 'Request Dream Service' },
  btn_submit: { ar: 'إرسال الطلب', en: 'Submit Request' },

  contact_title: { ar: 'تواصل معنا', en: 'Contact Us' },
  form_name: { ar: 'الاسم', en: 'Name' },
  form_email: { ar: 'البريد الإلكتروني', en: 'Email' },
  form_msg: { ar: 'الرسالة', en: 'Message' },
  form_send: { ar: 'إرسال', en: 'Send' },
  form_service_title: { ar: 'موضوع الخدمة', en: 'Service Subject' },
  form_phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
  form_details: { ar: 'وصف تفصيلي للخدمة', en: 'Service Details' },
  form_job_title: { ar: 'المسمى الوظيفي', en: 'Job Position' },
  
  lbl_project_type: { ar: 'نوع المشروع', en: 'Project Type' },
  lbl_budget: { ar: 'الميزانية المتوقعة', en: 'Expected Budget' },
  lbl_timeline: { ar: 'المدة الزمنية', en: 'Timeline' },

  footer_desc: { ar: 'منصة يمنية رائدة في مجال الذكاء الاصطناعي.', en: 'Leading Yemeni AI Platform.' },
  footer_solutions: { ar: 'حلولنا', en: 'Our Solutions' },
  footer_company: { ar: 'الشركة', en: 'Company' },
  footer_contact: { ar: 'التواصل', en: 'Contact' },

  admin_dashboard: { ar: 'لوحة التحكم', en: 'Admin Dashboard' },
  admin_stats: { ar: 'إحصائيات المنصة', en: 'Platform Stats' },

  modal_success: { ar: 'تم الإرسال بنجاح!', en: 'Sent Successfully!' },
  modal_close: { ar: 'إغلاق', en: 'Close' },

  market_title: { ar: 'تحليل السوق المباشر', en: 'Live Market Analytics' },
  btn_buy: { ar: 'شراء', en: 'Buy' },
  btn_sell: { ar: 'بيع', en: 'Sell' },
  order_success: { ar: 'تم تنفيذ الأمر بنجاح', en: 'Order Executed Successfully' },
  lbl_quantity: { ar: 'الكمية', en: 'Quantity' },
  lbl_total: { ar: 'الإجمالي', en: 'Total' },
  confirm_order: { ar: 'تأكيد الأمر', en: 'Confirm Order' },
  
  visitor_count: { ar: 'عدد الزوار', en: 'Visitor Count' },

  // Welcome Popup
  welcome_title: { ar: 'انتظرونا...', en: 'Stay Tuned...' },
  welcome_msg: { ar: 'مع خدمات الذكاء الاصطناعي لك', en: 'With AI Services tailored for you' },
  welcome_btn: { ar: 'استكشف الخدمات', en: 'Explore Services' },

  // Service Categories
  cat_education: { ar: 'التعليم', en: 'Education' },
  cat_research: { ar: 'البحث العلمي', en: 'Scientific Research' },
  cat_design: { ar: 'التصميم والإبداع', en: 'Design & Creative' },
  cat_business: { ar: 'الأعمال', en: 'Business' },

  // New Tools
  tool_summarizer: { ar: 'ملخص الأبحاث', en: 'Research Summarizer' },
  tool_summarizer_desc: { ar: 'تلخيص الأوراق البحثية والمقالات العلمية المعقدة.', en: 'Summarize complex research papers and scientific articles.' },
  
  tool_citation: { ar: 'مولد المراجع', en: 'Citation Generator' },
  tool_citation_desc: { ar: 'إنشاء توثيق للمراجع بأنماط APA, MLA وغيرها.', en: 'Generate citations in APA, MLA, and other styles.' },

  tool_lesson: { ar: 'مخطط الدروس', en: 'Lesson Planner' },
  tool_lesson_desc: { ar: 'إعداد خطط دروس تعليمية متكاملة للمعلمين.', en: 'Create comprehensive lesson plans for teachers.' },

  tool_quiz: { ar: 'منشئ الاختبارات', en: 'Quiz Creator' },
  tool_quiz_desc: { ar: 'توليد أسئلة اختبارات متنوعة للمراجعة.', en: 'Generate various quiz questions for review.' },

  tool_logo: { ar: 'مولد الشعارات', en: 'Logo Concept Generator' },
  tool_logo_desc: { ar: 'توليد أفكار وتصورات بصرية لتصميم الشعارات.', en: 'Generate visual concepts and ideas for logo design.' },

  tool_social: { ar: 'تصاميم سوشيال ميديا', en: 'Social Media Creator' },
  tool_social_desc: { ar: 'تصميم صور جذابة لمنشورات التواصل الاجتماعي.', en: 'Design engaging images for social media posts.' },

  lbl_input_topic: { ar: 'الموضوع / النص', en: 'Topic / Text' },
  lbl_input_context: { ar: 'سياق إضافي / تفاصيل', en: 'Additional Context' },
  lbl_input_style: { ar: 'الأسلوب / النمط', en: 'Style / Tone' },
};

export const JOBS = [
  { id: '1', title: { ar: 'مطور واجهات', en: 'Frontend Developer' }, dept: 'Tech' },
  { id: '2', title: { ar: 'مهندس ذكاء اصطناعي', en: 'AI Engineer' }, dept: 'Tech' },
  { id: '3', title: { ar: 'مدير مبيعات', en: 'Sales Manager' }, dept: 'Admin' },
];