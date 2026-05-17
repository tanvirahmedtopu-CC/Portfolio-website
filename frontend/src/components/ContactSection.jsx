import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { contactInfo } from '../data/mock';
import GlassCard from './GlassCard';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-[#030305]" />

      {/* Decorative gradient */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(50,100,150,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white"
          >
            {contactInfo.headline}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/50 text-lg leading-relaxed"
            >
              Ready to elevate your brand with cinematic video content and strategic digital marketing? Let's connect and create something extraordinary together.
            </motion.p>

            {/* Email Card */}
            <GlassCard delay={0.1} className="p-5" glow>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white group-hover:text-cyan-300 transition-colors">
                    {contactInfo.email}
                  </p>
                </div>
                <ArrowUpRight size={20} className="text-white/30 group-hover:text-cyan-400 transition-colors" />
              </a>
            </GlassCard>

            {/* Instagram Card */}
            <GlassCard delay={0.2} className="p-5">
              <a
                href="https://instagram.com/tanvir.ahmed.topu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-white/10 flex items-center justify-center text-pink-400">
                  <Instagram size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <p className="text-white group-hover:text-pink-300 transition-colors">
                    {contactInfo.instagram}
                  </p>
                </div>
                <ArrowUpRight size={20} className="text-white/30 group-hover:text-pink-400 transition-colors" />
              </a>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <GlassCard delay={0.15} hover={false} className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/50 text-sm mb-2 block">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-white/50 text-sm mb-2 block">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-white/50 text-sm mb-2 block">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:ring-cyan-500/20 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  flex items-center justify-center gap-3
                  px-8 py-4
                  bg-white/[0.08]
                  backdrop-blur-xl
                  border border-white/[0.12]
                  rounded-xl
                  text-white font-medium
                  transition-all duration-500
                  hover:bg-white/[0.15]
                  hover:border-white/[0.2]
                  hover:shadow-[0_0_40px_rgba(120,200,255,0.15)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : submitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
