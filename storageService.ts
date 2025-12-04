
import { ServiceInterest, Review, PaymentRequest, JobApplication, StockOrder, ContactMessage } from '../types';

const KEYS = {
  INTERESTS: 'thaki_interests',
  REVIEWS: 'thaki_reviews',
  PAYMENTS: 'thaki_payments',
  APPLICATIONS: 'thaki_applications',
  HERO_IMAGE: 'thaki_hero_image',
  HERO_IMAGE_DATE: 'thaki_hero_date',
  ORDERS: 'thaki_orders',
  VISITORS: 'thaki_visitors',
  MESSAGES: 'thaki_messages'
};

export const storageService = {
  // Generic getter
  getItem: <T>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  // Interests
  addInterest: (interest: ServiceInterest) => {
    const list = storageService.getItem<ServiceInterest>(KEYS.INTERESTS);
    list.push(interest);
    localStorage.setItem(KEYS.INTERESTS, JSON.stringify(list));
  },
  getInterests: () => storageService.getItem<ServiceInterest>(KEYS.INTERESTS),

  // Reviews
  addReview: (review: Review) => {
    const list = storageService.getItem<Review>(KEYS.REVIEWS);
    list.unshift(review); // Add to top
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(list));
  },
  getReviews: () => storageService.getItem<Review>(KEYS.REVIEWS),

  // Payments
  addPayment: (payment: PaymentRequest) => {
    const list = storageService.getItem<PaymentRequest>(KEYS.PAYMENTS);
    list.push(payment);
    localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(list));
  },
  getPayments: () => storageService.getItem<PaymentRequest>(KEYS.PAYMENTS),
  
  updatePaymentStatus: (id: string, status: 'approved' | 'rejected') => {
    const list = storageService.getItem<PaymentRequest>(KEYS.PAYMENTS);
    const index = list.findIndex(p => p.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(list));
    }
  },

  // Applications
  addApplication: (app: JobApplication) => {
    const list = storageService.getItem<JobApplication>(KEYS.APPLICATIONS);
    list.push(app);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(list));
  },
  getApplications: () => storageService.getItem<JobApplication>(KEYS.APPLICATIONS),

  // Contact Messages
  addMessage: (msg: ContactMessage) => {
    const list = storageService.getItem<ContactMessage>(KEYS.MESSAGES);
    list.push(msg);
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(list));
  },
  getMessages: () => storageService.getItem<ContactMessage>(KEYS.MESSAGES),

  // Stock Orders
  addOrder: (order: StockOrder) => {
    const list = storageService.getItem<StockOrder>(KEYS.ORDERS);
    list.push(order);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(list));
  },
  getOrders: () => storageService.getItem<StockOrder>(KEYS.ORDERS),

  // Hero Image (Single Item)
  getHeroImage: (): string | null => {
    const date = localStorage.getItem(KEYS.HERO_IMAGE_DATE);
    const today = new Date().toDateString();
    if (date === today) {
      return localStorage.getItem(KEYS.HERO_IMAGE);
    }
    return null;
  },
  setHeroImage: (base64OrUrl: string) => {
    localStorage.setItem(KEYS.HERO_IMAGE, base64OrUrl);
    localStorage.setItem(KEYS.HERO_IMAGE_DATE, new Date().toDateString());
  },

  // Visitor Counter
  getVisitorCount: (): number => {
    const count = localStorage.getItem(KEYS.VISITORS);
    // Start at 12,450 to simulate an active site if empty
    return count ? parseInt(count) : 12450;
  },
  incrementVisitorCount: () => {
    const current = storageService.getVisitorCount();
    const newCount = current + 1;
    localStorage.setItem(KEYS.VISITORS, newCount.toString());
    return newCount;
  }
};