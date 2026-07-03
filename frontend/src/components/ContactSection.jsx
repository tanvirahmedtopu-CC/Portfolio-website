import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { contactInfo } from '../data/mock';
import GlassCard from './GlassCard';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MagneticButton from './ui/MagneticButton';
import SmoothReveal from './ui/SmoothReveal';
import TextReveal from './ui/TextReveal';

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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
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
        style={{ background: 'radial-gradient(ellipse, rgba(50,100,150,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SmoothReveal blur>
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 block">
              Contact
            </span>
          </SmoothReveal>

          <TextReveal
            text={contactInfo.headline}
            highlightWords={['Exceptional.']}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white justify-center"
            staggerDelay={0.07}
            delay={0.1}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <SmoothReveal blur delay={0.1}>
              <p className="text-white/50 text-lg leading-relaxed">
                Ready to elevate your brand with cinematic video content and strategic digital marketing? Let's connect and create something extraordinary together.
              </p>
            </SmoothReveal>

            {/* Email Card */}
            <GlassCard delay={0.15} className="p-5" glow tilt tiltStrength={5}>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 group"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 flex items-center justify-center text-cyan-400"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail size={20} />
                </motion.div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white group-hover:text-cyan-300 transition-colors">
                    {contactInfo.email}
                  </p>
                </div>
                <ArrowUpRight size={20} className="text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </a>
            </GlassCard>

            {/* Instagram Card */}
            <GlassCard delay={0.2} className="p-5" tilt tiltStrength={5}>
              <a
                href="https://instagram.com/tanvir.ahmed.topu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-white/10 flex items-center justify-center text-pink-400"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Instagram size={20} />
                </motion.div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <p className="text-white group-hover:text-pink-300 transition-colors">
                    {contactInfo.instagram}
                  </p>
                </div>
                <ArrowUpRight size={20} className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </a>
            </GlassCard>
          </div>

          {/* Contact Form with gradient border effect */}
          <SmoothReveal blur delay={0.15}>
            <div className="relative rounded-2xl p-[1px] overflow-hidden">
              {/* Animated gradient border */}
              <div 
                className="absolute inset-0 rounded-2xl animate-border-shimmer"
                style={{
                  background: 'linear-gradient(90deg, rgba(34,211,238,0.2), rgba(129,140,248,0.2), rgba(52,211,153,0.2), rgba(34,211,238,0.2))',
                  backgroundSize: '400% 400%',
                }}
              />
              
              <div className="relative bg-[#0a0b10] rounded-2xl p-8">
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)' }}
                />
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-white/50 text-sm mb-2 block">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300"
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
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300"
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
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:ring-cyan-500/20 resize-none transition-all duration-300"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <MagneticButton strength={0.1} className="w-full">
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
                        relative overflow-hidden
                      "
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* Shimmer sweep */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                      
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : submitted ? (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-cyan-400"
                        >
                          ✓ Message Sent!
                        </motion.span>
                      ) : (
                        <span className="relative z-10 flex items-center gap-3">
                          <Send size={18} />
                          Send Message
                        </span>
                      )}
                    </motion.button>
                  </MagneticButton>
                </form>
              </div>
            </div>
          </SmoothReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
