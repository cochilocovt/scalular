'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { GetStartedButton } from '@/components/ui/get-started-button';

const PRODUCT_TYPES = [
  'T-Shirt', 'Polo Shirt', 'Hoodie', 'Sweatshirt', 'Jacket',
  'Pants', 'Shorts', 'Dress', 'Skirt', 'Boxers',
  'Boxer Briefs', 'Joggers', 'Jeans', 'Undershirt', 'Socks',
  'Sweaters', 'Sweater Dresses',
];

const CERTS = ['GOTS', 'OEKO-TEX', 'WRAP', 'Fairtrade', 'Higg Index', 'BCI', 'Sedex', 'CTPAT', 'SA8000', 'ISO 9001', 'SGS', 'Amfori'];

interface FormState {
  factoryName: string;
  country: string;
  capacity: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  productTypes: string[];
  certifications: string[];
}

interface PartnerFormProps {
  darkMode?: boolean;
}

export function PartnerForm({ darkMode = false }: PartnerFormProps) {
  const [form, setForm] = useState<FormState>({
    factoryName: '', country: '', capacity: '', contactName: '',
    email: '', phone: '', website: '', message: '',
    productTypes: [], certifications: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const toggle = (field: 'productTypes' | 'certifications', val: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(val)
        ? f[field].filter((v) => v !== val)
        : [...f[field], val],
    }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.factoryName.trim()) e.factoryName = 'Factory name is required';
    if (!form.country.trim()) e.country = 'Country is required';
    if (!form.contactName.trim()) e.contactName = 'Contact name is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
    if (form.productTypes.length === 0) e.productTypes = 'Select at least one product type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  // Dark mode styles
  const cardCls = darkMode
    ? 'bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-3xl p-8 md:p-10'
    : 'glass-card rounded-3xl p-8 md:p-10';

  const inputCls = (field: keyof FormState) => darkMode
    ? `w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
        errors[field] ? 'border-red-500' : 'border-white/[0.1]'
      } text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9]/50 transition-all`
    : `w-full px-4 py-3 rounded-xl bg-surface border ${
        errors[field] ? 'border-destructive' : 'border-border'
      } text-text-primary placeholder:text-text-secondary/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all`;

  const labelCls = darkMode
    ? 'text-xs font-black uppercase tracking-widest mb-1.5 block'
    : 'text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block';

  // Inline styles needed to override globals.css `p, li, td, th, label, input { color: var(--color-neutral-900) }`
  const darkLabelStyle = darkMode ? { color: 'rgba(255,255,255,0.5)' } as const : undefined;
  const darkInputStyle = darkMode ? { color: '#ffffff' } as const : undefined;

  const errorCls = darkMode ? 'text-red-400 text-xs mt-1' : 'text-destructive text-xs mt-1';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`${cardCls} text-center`}
          >
            <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-[#0EA5E9]/10 border border-[#0EA5E9]/20' : 'bg-success/10 border border-success/20'} flex items-center justify-center mx-auto mb-6`}>
              <CheckCircle2 className={`w-8 h-8 ${darkMode ? 'text-[#0EA5E9]' : 'text-success'}`} />
            </div>
            <h3 className={`text-2xl font-black mb-3 ${darkMode ? 'text-white' : 'text-text-primary'}`}>Application Received!</h3>
            <div className={`leading-relaxed max-w-sm mx-auto ${darkMode ? 'text-white/60' : 'text-text-secondary'}`}>
              Thank you, <strong className={darkMode ? 'text-white' : ''}>{form.contactName}</strong>. Our team will review your application and
              reach out to <strong className={darkMode ? 'text-white' : ''}>{form.email}</strong> within 2 business days.
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className={`${cardCls} flex flex-col gap-6`}
          >
            {/* Factory + Country */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Factory Name *</label>
                <input className={inputCls('factoryName')} style={darkInputStyle} placeholder="Acme Apparel Ltd." value={form.factoryName} onChange={(e) => setForm({ ...form, factoryName: e.target.value })} />
                {errors.factoryName && <div className={errorCls}>{errors.factoryName}</div>}
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>Country *</label>
                <input className={inputCls('country')} style={darkInputStyle} placeholder="India" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                {errors.country && <div className={errorCls}>{errors.country}</div>}
              </div>
            </div>

            {/* Capacity + Website */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Monthly Capacity (units)</label>
                <input className={inputCls('capacity')} style={darkInputStyle} placeholder="e.g. 50,000" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>Website</label>
                <input className={inputCls('website')} style={darkInputStyle} placeholder="https://yourfactory.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
            </div>

            {/* Product types */}
            <div>
              <label className={labelCls} style={darkLabelStyle}>
                Product Types * {errors.productTypes && <span className="text-red-400 normal-case font-normal tracking-normal ml-1">{errors.productTypes}</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_TYPES.map((pt) => (
                  <button
                    type="button"
                    key={pt}
                    onClick={() => toggle('productTypes', pt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      form.productTypes.includes(pt)
                        ? darkMode ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]' : 'bg-primary text-white border-primary'
                        : darkMode ? 'bg-white/[0.04] border-white/[0.1] text-white/60 hover:border-[#0EA5E9]/50 hover:text-[#0EA5E9]' : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <label className={labelCls} style={darkLabelStyle}>Certifications Held</label>
              <div className="flex flex-wrap gap-2">
                {CERTS.map((cert) => (
                  <button
                    type="button"
                    key={cert}
                    onClick={() => toggle('certifications', cert)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      form.certifications.includes(cert)
                        ? darkMode ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/40' : 'bg-success/10 text-success border-success/40'
                        : darkMode ? 'bg-white/[0.04] border-white/[0.1] text-white/60 hover:border-[#0EA5E9]/40 hover:text-[#0EA5E9]' : 'bg-surface border-border text-text-secondary hover:border-success/40 hover:text-success'
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Contact Name *</label>
                <input className={inputCls('contactName')} style={darkInputStyle} placeholder="Jane Smith" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
                {errors.contactName && <div className={errorCls}>{errors.contactName}</div>}
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>Email *</label>
                <input type="email" className={inputCls('email')} style={darkInputStyle} placeholder="jane@factory.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <div className={errorCls}>{errors.email}</div>}
              </div>
            </div>

            {/* Phone + Message */}
            <div>
              <label className={labelCls} style={darkLabelStyle}>Phone</label>
              <input className={inputCls('phone')} style={darkInputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={darkLabelStyle}>Additional Notes</label>
              <textarea rows={3} className={`${inputCls('message')} resize-none`} style={darkInputStyle} placeholder="Tell us about your specialties, brand experience, or anything else..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <div className="flex justify-center pt-2">
              <GetStartedButton label="Submit Application" size="lg" />
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
