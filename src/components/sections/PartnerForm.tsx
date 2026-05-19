'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { GetStartedButton } from '@/components/ui/get-started-button';

interface FormState {
  factoryName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  streetAddress: string;
  fullAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PartnerFormProps {
  darkMode?: boolean;
}

export function PartnerForm({ darkMode = false }: PartnerFormProps) {
  const [form, setForm] = useState<FormState>({
    factoryName: '', contactName: '', email: '', phone: '', website: '',
    streetAddress: '', fullAddress: '', city: '', state: '', zip: '', country: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.factoryName.trim()) e.factoryName = 'Factory name is required';
    if (!form.contactName.trim()) e.contactName = 'POC name is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
    if (!form.country.trim()) e.country = 'Country is required';
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
      } text-sm focus:outline-none focus:ring-2 focus:ring-[#043377]/40 focus:border-[#043377]/50 transition-all`
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
            <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-[#043377]/10 border border-[#043377]/20' : 'bg-success/10 border border-success/20'} flex items-center justify-center mx-auto mb-6`}>
              <CheckCircle2 className={`w-8 h-8 ${darkMode ? 'text-[#043377]' : 'text-success'}`} />
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
            {/* Factory + POC */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Factory Name *</label>
                <input className={inputCls('factoryName')} style={darkInputStyle} placeholder="Acme Apparel Ltd." value={form.factoryName} onChange={(e) => setForm({ ...form, factoryName: e.target.value })} />
                {errors.factoryName && <div className={errorCls}>{errors.factoryName}</div>}
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>POC Name *</label>
                <input className={inputCls('contactName')} style={darkInputStyle} placeholder="Jane Smith" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
                {errors.contactName && <div className={errorCls}>{errors.contactName}</div>}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Email Address *</label>
                <input type="email" className={inputCls('email')} style={darkInputStyle} placeholder="jane@factory.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <div className={errorCls}>{errors.email}</div>}
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>Phone</label>
                <input className={inputCls('phone')} style={darkInputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className={labelCls} style={darkLabelStyle}>Website</label>
              <input className={inputCls('website')} style={darkInputStyle} placeholder="https://yourfactory.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            </div>

            {/* Street + Full Address */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Street Address</label>
                <input className={inputCls('streetAddress')} style={darkInputStyle} placeholder="123 Industrial Way" value={form.streetAddress} onChange={(e) => setForm({ ...form, streetAddress: e.target.value })} />
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>Full Address</label>
                <input className={inputCls('fullAddress')} style={darkInputStyle} placeholder="Suite/Building/Floor" value={form.fullAddress} onChange={(e) => setForm({ ...form, fullAddress: e.target.value })} />
              </div>
            </div>

            {/* City + State */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>City</label>
                <input className={inputCls('city')} style={darkInputStyle} placeholder="Mumbai" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>State</label>
                <input className={inputCls('state')} style={darkInputStyle} placeholder="Maharashtra" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
              </div>
            </div>

            {/* Zip + Country */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={darkLabelStyle}>Zip / Postal Code</label>
                <input className={inputCls('zip')} style={darkInputStyle} placeholder="400001" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
              <div>
                <label className={labelCls} style={darkLabelStyle}>Country *</label>
                <input className={inputCls('country')} style={darkInputStyle} placeholder="India" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                {errors.country && <div className={errorCls}>{errors.country}</div>}
              </div>
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
