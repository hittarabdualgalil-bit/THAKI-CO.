
export type Language = 'ar' | 'en';

export interface ServiceInterest {
  id: string;
  serviceName: string;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  type: 'standard' | 'dream';
  details?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface PaymentRequest {
  id: string;
  plan: string;
  depositorName: string;
  receiptNumber: string;
  phone: string;
  receiptImageBase64: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  date: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  position: string;
  cvBase64: string;
  date: string;
}

export interface ExamQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ExamSchema {
  questions: ExamQuestion[];
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface StockOrder {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  date: string;
}

// For translations
export type TranslationKey = 
  | 'nav_home' | 'nav_about' | 'nav_services' | 'nav_careers' | 'nav_pricing' | 'nav_demo' | 'nav_contact'
  | 'hero_title' | 'hero_subtitle' | 'hero_cta' | 'saas_badge'
  | 'services_title' | 'srv_exam' | 'srv_auto' | 'srv_analytics' | 'srv_content' | 'srv_image'
  | 'srv_landing_1_title' | 'srv_landing_1_desc'
  | 'srv_landing_2_title' | 'srv_landing_2_desc'
  | 'srv_landing_3_title' | 'srv_landing_3_desc'
  | 'srv_content_desc' | 'srv_image_desc'
  | 'btn_more' | 'btn_interested' | 'btn_launch_tool' | 'btn_request_access'
  | 'testimonials_title' | 'btn_add_review'
  | 'about_mission' | 'about_vision' | 'about_story' | 'team_title'
  | 'exam_title' | 'exam_topic' | 'exam_difficulty' | 'btn_generate' | 'exam_result'
  | 'careers_title' | 'btn_apply' | 'upload_cv'
  | 'pricing_title' | 'plan_free' | 'plan_pro' | 'plan_enterprise' | 'btn_subscribe'
  | 'demo_title' | 'dream_service' | 'btn_submit'
  | 'contact_title' | 'form_name' | 'form_email' | 'form_msg' | 'form_send' | 'form_service_title' | 'form_phone' | 'form_details' | 'form_job_title'
  | 'lbl_project_type' | 'lbl_budget' | 'lbl_timeline'
  | 'footer_desc' | 'admin_dashboard' | 'admin_stats'
  | 'modal_success' | 'modal_close'
  | 'market_title' | 'btn_buy' | 'btn_sell' | 'order_success' | 'lbl_quantity' | 'lbl_total' | 'confirm_order'
  | 'visitor_count' | 'welcome_title' | 'welcome_msg' | 'welcome_btn'
  | 'footer_solutions' | 'footer_company' | 'footer_contact'
  // New Categories & Tools
  | 'cat_education' | 'cat_research' | 'cat_design' | 'cat_business'
  | 'tool_summarizer' | 'tool_summarizer_desc'
  | 'tool_citation' | 'tool_citation_desc'
  | 'tool_lesson' | 'tool_lesson_desc'
  | 'tool_quiz' | 'tool_quiz_desc'
  | 'tool_logo' | 'tool_logo_desc'
  | 'tool_social' | 'tool_social_desc'
  | 'lbl_input_topic' | 'lbl_input_context' | 'lbl_input_style';