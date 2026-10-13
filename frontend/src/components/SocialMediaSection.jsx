import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Instagram, Youtube } from 'lucide-react';
import useScrollRail from '../hooks/useScrollRail';

const socialMediaScreenshots = [
  { id: 1, image: "https://lh3.googleusercontent.com/d/1k1FIqAIsRPT_Yi06pNlcsNmgkG2bvYCf", platform: "instagram", brand: "Marugame Udon" },
  { id: 2, image: "https://lh3.googleusercontent.com/d/1QrECaoPQMybec_u9bs4YRuafZ6iVDhtS", platform: "instagram", brand: "Big Life Journal" },
  { id: 3, image: "https://lh3.googleusercontent.com/d/1S3uZ_tV5KjdkB2VcSXF4nNUfxZcOsfsw", platform: "instagram", brand: "Centric" },
  { id: 4, image: "https://lh3.googleusercontent.com/d/1QNDHMi_6ProVth1QZOFUbKpynjX8JMe7", platform: "instagram", brand: "Resonate Media" },
  { id: 5, image: "https://lh3.googleusercontent.com/d/1MkSU5iD1EV6s1Xdqx04L2lfszCBUtlN6", platform: "instagram", brand: "Halal Meals" },
  { id: 6, image: "https://lh3.googleusercontent.com/d/1pPFGDlls6iyMbTeGr6vYeBQY6jNKdGtC", platform: "instagram", brand: "Nada Manley Style" },
  { id: 7, image: "https://lh3.googleusercontent.com/d/1IF9GhnUA9UW9c17IRraBJLlnv4UcrISe", platform: "youtube", brand: "The Edge Of Show" },
  { id: 8, image: "https://lh3.googleusercontent.com/d/1pwL2me_TsnyDfS-ih4vSCdHuu0wrwgIo", platform: "youtube", brand: "Nada Manley Style" },
  { id: 9, image: "https://lh3.googleusercontent.com/d/1OHMrjaUdtCq6G2XXwgTydVEQApETicnq", platform: "youtube", brand: "Moving to Idaho" },
  { id: 10, image: "https://lh3.googleusercontent.com/d/1Ivpd6u4Ai2udb6pfqzBs6_FjDxPOEYML", platform: "instagram", brand: "Avaris Corporation" },
];


export default function SocialMediaSection() {
  const { section, rail, enabled, distance, x, progress, onKeyDown } = useScrollRail();
  return <section id="social-media" ref={section} className={`brands-section ${enabled ? 'rail-enabled' : ''}`} style={enabled ? { height: `calc(100svh + ${distance}px)` } : undefined} aria-labelledby="brands-heading">
    <div className="brands-sticky">
      <div className="studio-shell">
        <div className="section-kicker"><span className="status-light pink" /> Social media management<span className="kicker-end">REAL BRANDS. REAL PRESENCE.</span></div>
        <div className="brands-heading-row"><h2 id="brands-heading">Brands I’ve<br /><span className="pink-gradient">helped move forward.</span></h2><p>Different voices. Different audiences.<br />The same care in every post.<span>{enabled ? <ArrowDown size={15} /> : <ArrowRight size={15} />}{enabled ? 'Keep scrolling to explore' : 'Swipe or scroll to explore'}</span></p></div>
      </div>
      <div ref={rail} className="brand-rail" tabIndex={0} role="region" aria-label="Brands I’ve managed. Scroll to explore all ten profiles; use arrow keys on desktop." onKeyDown={onKeyDown} data-lenis-prevent-horizontal={!enabled ? true : undefined}>
        <motion.div className="brand-track" style={{ x: enabled ? x : 0 }}>{socialMediaScreenshots.map((brand, index) => <figure className="brand-profile" key={brand.id}>
          <div className="brand-phone"><div className="phone-island" /><img src={brand.image} alt={`${brand.brand} ${brand.platform} profile`} loading="lazy" width="260" height="540" /><div className="phone-home" /></div>
          <figcaption><span className="brand-platform">{brand.platform === 'instagram' ? <Instagram size={16} /> : <Youtube size={16} />}{brand.brand}</span><span className="brand-number">{String(index+1).padStart(2,'0')} / 10</span></figcaption>
        </figure>)}</motion.div>
      </div>
      <div className="studio-shell brand-rail-footer"><span>From the feed to the bigger picture.</span><div className="rail-progress" aria-hidden="true"><motion.span style={{ scaleX: enabled ? progress : 1 }} /></div><span>10 profiles / 2 platforms</span></div>
    </div>
  </section>;
}
