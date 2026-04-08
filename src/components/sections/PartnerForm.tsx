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

export function PartnerForm() {
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

  const inputCls = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-xl bg-surface border ${
      errors[field] ? 'border-destructive' : 'border-border'
    } text-text-primary placeholder:text-text-secondary/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-black text-text-primary mb-3">Application Received!</h3>
            <p className="text-text-secondary leading-relaxed max-w-sm mx-auto">
              Thank you, <strong>{form.contactName}</strong>. Our team will review your application and
              reach out to <strong>{form.email}</strong> within 2 business days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-8 md:p-10 flex flex-col gap-6"
          >
            {/* Factory + Country */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                  Factory Name *
                </label>
                <input
                  className={inputCls('factoryName')}
                  placeholder="Acme Apparel Ltd."
                  value={form.factoryName}
                  onChange={(e) => setForm({ ...form, factoryName: e.target.value })}
                />
                {errors.factoryName && <p className="text-destructive text-xs mt-1">{errors.factoryName}</p>}
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                  Country *
                </label>
                <input
                  className={inputCls('country')}
                  placeholder="India"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
                {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
              </div>
            </div>

            {/* Capacity + Website */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                  Monthly Capacity (units)
                </label>
                <input
                  className={inputCls('capacity')}
                  placeholder="e.g. 50,000"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                  Website
                </label>
                <input
                  className={inputCls('website')}
                  placeholder="https://yourfactory.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
            </div>

            {/* Product types */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-2 block">
                Product Types * {errors.productTypes && <span className="text-destructive normal-case font-normal tracking-normal ml-1">{errors.productTypes}</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_TYPES.map((pt) => (
                  <button
                    type="button"
                    key={pt}
                    onClick={() => toggle('productTypes', pt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      form.productTypes.includes(pt)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface border-border text-text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-2 block">
                Certifications Held
              </label>
              <div className="flex flex-wrap gap-2">
                {CERTS.map((cert) => (
                  <button
                    type="button"
                    key={cert}
                    onClick={() => toggle('certifications', cert)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      form.certifications.includes(cert)
                        ? 'bg-success/10 text-success border-success/40'
                        : 'bg-surface border-border text-text-secondary hover:border-success/40 hover:text-success'
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
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                  Contact Name *
                </label>
                <input
                  className={inputCls('contactName')}
                  placeholder="Jane Smith"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                />
                {errors.contactName && <p className="text-destructive text-xs mt-1">{errors.contactName}</p>}
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                  Email *
                </label>
                <input
                  type="email"
                  className={inputCls('email')}
                  placeholder="jane@factory.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone + Message */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                Phone
              </label>
              <input
                className={inputCls('phone')}
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1.5 block">
                Additional Notes
              </label>
              <textarea
                rows={3}
                className={`${inputCls('message')} resize-none`}
                placeholder="Tell us about your specialties, brand experience, or anything else..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
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
