const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

export const trackSignUp = (profileType: string) =>
  gtag('event', 'sign_up', { method: 'email', profile_type: profileType });

export const trackLead = () =>
  gtag('event', 'generate_lead', { form_name: 'contacto' });

export const trackPurchase = (plan: string, amount: number, companyName: string) =>
  gtag('event', 'purchase', {
    transaction_id: `FY-${Date.now()}`,
    value: amount,
    currency: 'EUR',
    items: [{ item_id: plan, item_name: `Plan ${plan}`, price: amount, quantity: 1 }],
    company_name: companyName,
  });

export const trackSelectPlan = (plan: string, price: string) =>
  gtag('event', 'select_item', {
    item_list_name: 'pricing',
    items: [{ item_id: plan, item_name: `Plan ${plan}`, price }],
  });

export const trackBeginCheckout = () =>
  gtag('event', 'begin_checkout');
