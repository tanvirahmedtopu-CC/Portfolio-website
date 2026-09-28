import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowDown, ArrowUpRight, Play, Pause, X, Volume2 } from 'lucide-react';
import selectedWork from '../data/selectedWork.json';
import { folderLinks } from '../data/portfolioVideos';

const media = (id, suffix) => `${process.env.PUBLIC_URL}/media/work/${id}${suffix}`;
const filters = [{ id: 'all', label: 'All work' }, { id: 'short', label: 'Short-form' }, { id: 'brand', label: 'Brand stories' }, { id: 'ai', label: 'AI creative' }];

// Load only nearby previews; pause offscreen videos and hidden tabs.
export function VideoPreview({ work, paused = false, className = '' }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    let visible = false;
    const update = () => {
      if (visible && !paused && !reduced && !document.hidden && !navigator.connection?.saveData) {
        setNear(true);
        video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); video.pause(); };
  }, [paused, reduced, near]);
  return <video ref={ref} className={className} src={near ? media(work.id, '-preview.mp4') : undefined} poster={media(work.id, '.jpg')} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}

function WorkCard({ work, index, onOpen, paused }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 ? 32 : 0, index % 2 ? -32 : 0]);
  return <motion.article ref={ref} className={`work-card ${work.landscape ? 'work-card-wide' : ''}`} style={{ y: reduced ? 0 : y }}>
    <button className="work-screen" onClick={(event) => onOpen(work, event.currentTarget)} aria-label={`Play ${work.title}`}>
      <VideoPreview work={work} paused={paused} />
      <span className="work-topline"><span>{work.category}</span><span>{work.duration}</span></span>
      <span className="work-play"><Play size={20} fill="currentColor" /><span>Watch film</span></span>
      <span className="work-bottomline"><span>{work.kind === 'ai' ? 'AI CREATIVE' : 'SELECTED FILM'}</span><ArrowUpRight size={20} /></span>
    </button>
    <div className="work-caption"><h3>{work.title}</h3><span>{work.category}</span></div>
  </motion.article>;
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const triggerRef = useRef(null);
  const items = selectedWork.filter(work => filter === 'all' || work.kind === filter);
  useEffect(() => {
    if (!selected) return;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [selected]);
  const open = (work, trigger) => { triggerRef.current = trigger; setPlaybackError(false); setSelected(work); };
  return <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-heading">
    <div className="studio-shell">
      <div className="section-kicker"><span className="status-light" /> Selected work <span className="kicker-end">EDITING / STORYTELLING / AI</span></div>
      <div className="work-heading-row">
        <h2 id="portfolio-heading">Good stories.<br /><span className="studio-gradient">Impossible to scroll past.</span></h2>
        <div className="work-intro"><p>A few of the stories I’ve helped bring to life. Made for people. Built for the way they watch.</p><span><ArrowDown size={15} /> Scroll to explore. Click to play.</span></div>
      </div>
      <div className="work-toolbar">
        <div className="work-filters" aria-label="Filter portfolio">{filters.map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<sup>{item.id === 'all' ? selectedWork.length : selectedWork.filter(w => w.kind === item.id).length}</sup></button>)}</div>
        <button className="preview-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? 'Resume previews' : 'Pause previews'}</span></button>
      </div>
      <div className="work-grid" key={filter}>{items.map((work, index) => <WorkCard key={work.id} work={work} index={index} onOpen={open} paused={paused || !!selected} />)}</div>
      <div className="work-archive"><div><span className="section-kicker">Keep exploring</span><h3>There’s more to the story.</h3></div><div className="archive-links"><a href={folderLinks.shortFormEdits} target="_blank" rel="noreferrer">Short-form archive <ArrowUpRight size={17} /></a><a href={folderLinks.reelsTiktoks} target="_blank" rel="noreferrer">Reels & TikTok <ArrowUpRight size={17} /></a><a href={folderLinks.aiGenerated} target="_blank" rel="noreferrer">AI experiments <ArrowUpRight size={17} /></a></div></div>
    </div>
    <Dialog.Root open={!!selected} onOpenChange={value => { if (!value) setSelected(null); }}>
      <Dialog.Portal><Dialog.Overlay className="film-overlay" /><Dialog.Content className="film-dialog" data-lenis-prevent onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus({ preventScroll: true }); }}>
        <div className="film-header"><div><Dialog.Title>{selected?.title}</Dialog.Title><Dialog.Description>{selected?.category} · {selected?.duration}</Dialog.Description></div><Dialog.Close className="film-close" aria-label="Close video"><X size={22} /></Dialog.Close></div>
        {selected && <video key={selected.id} src={media(selected.id, '.mp4')} poster={media(selected.id, '.jpg')} controls autoPlay playsInline preload="metadata" onError={() => setPlaybackError(true)} />}
        <div className="film-footer"><span><Volume2 size={15} /> Best experienced with sound</span><a href={selected ? media(selected.id, '.mp4') : undefined} target="_blank" rel="noreferrer">{playbackError ? 'Playback unavailable. Open video directly' : 'Open full video'} <ArrowUpRight size={15} /></a></div>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </section>;
}
