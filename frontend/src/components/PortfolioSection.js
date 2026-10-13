import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowUpRight, FolderOpen, Layers, Play, X, Volume2 } from 'lucide-react';
import selectedWork from '../data/selectedWork.json';
import { folderLinks } from '../data/portfolioVideos';
import '../portfolio-stacks.css';

const media = (id, suffix) => `${process.env.PUBLIC_URL}/media/work/${id}${suffix}`;
const collections = [
  { id: 'short', label: 'Short-form', description: 'A little time. A lasting impression.', accent: '#67e8f9', covers: ['motion-story', 'parenting', 'skincare'] },
  { id: 'brand', label: 'Brand stories', description: 'People, places and a point of view.', accent: '#c4b5fd', covers: ['restaurant', 'west-coast', 'new-year'] },
  { id: 'ai', label: 'AI creative', description: 'An idea. A whole new possibility.', accent: '#6ee7b7', covers: ['ai-product', 'arcads', 'ai-ugc'] },
];

function VideoPreview({ work, paused = false }) {
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
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      video.pause();
    };
  }, [paused, reduced, near]);
  return <video ref={ref} src={near ? media(work.id, '-preview.mp4') : undefined} poster={media(work.id, '.jpg')} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}

function CollectionStack({ collection, onOpen, busy }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const count = selectedWork.filter(work => work.kind === collection.id).length;
  // The front cover stays central; the two rear covers spread like a Dock stack.
  const positions = hovered ? [
    { x: -76, y: -32, rotate: -15 },
    { x: 76, y: -22, rotate: 14 },
    { x: 0, y: -51, rotate: -2 },
  ] : [
    { x: -26, y: -9, rotate: -10 },
    { x: 27, y: -5, rotate: 9 },
    { x: 0, y: 10, rotate: -3 },
  ];
  // Only a real mouse movement opens the fan. Page scroll slides stacks under a resting
  // cursor; reacting to that shook the cards and started previews mid-scroll.
  return (
    <button
      className="collection-stack"
      style={{ '--stack-accent': collection.accent }}
      onPointerMove={event => {
        if (hovered || event.pointerType !== 'mouse' || (!event.movementX && !event.movementY) || window.__lenis?.isScrolling) return;
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={event => { let keyboard = true; try { keyboard = event.currentTarget.matches(':focus-visible'); } catch {} if (keyboard) setHovered(true); }}
      onBlur={() => setHovered(false)}
      onClick={event => onOpen(collection, event.currentTarget)}
      aria-label={`Open ${collection.label} collection, ${count} films`}
      aria-haspopup="dialog"
    >
      <span className="stack-stage" aria-hidden="true">
        <span className="stack-aura" />
        <span className="stack-folder-back" />
        {[collection.covers[1], collection.covers[2], collection.covers[0]].map((id, index) => {
          const work = selectedWork.find(item => item.id === id);
          return (
            <motion.span key={id} className={`stack-film stack-film-${index}`} initial={false}
              animate={positions[index]}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 24 }}>
              {index === 2 ? <VideoPreview work={work} paused={!hovered || busy} /> : <img src={media(id, '.jpg')} alt="" loading="lazy" />}
              <span className="stack-film-shade" />
              <span className="stack-film-mark">TAT. <span>{work.duration}</span></span>
              {index === 2 && <span className="stack-play"><Play size={17} fill="currentColor" /></span>}
            </motion.span>
          );
        })}
        <span className="stack-folder-front"><FolderOpen size={18} /><span>{count} films</span><ArrowUpRight size={17} /></span>
      </span>
      <span className="stack-label"><strong>{collection.label}</strong><span>{collection.description}</span></span>
    </button>
  );
}

export default function PortfolioSection() {
  const [collection, setCollection] = useState(null);
  const [selected, setSelected] = useState(null);
  const [playbackError, setPlaybackError] = useState(false);
  const triggerRef = useRef(null);
  const filmTriggerRef = useRef(null);
  const backRef = useRef(null);
  const reduced = useReducedMotion();
  const items = selectedWork.filter(work => work.kind === collection?.id);

  useEffect(() => {
    if (!collection) return;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [collection]);

  useEffect(() => {
    if (selected) backRef.current?.focus({ preventScroll: true });
    else if (filmTriggerRef.current) {
      document.getElementById(`collection-film-${filmTriggerRef.current}`)?.focus({ preventScroll: true });
    }
  }, [selected]);

  const openCollection = (item, trigger) => {
    triggerRef.current = trigger;
    filmTriggerRef.current = null;
    setSelected(null);
    setCollection(item);
  };
  const openFilm = work => {
    filmTriggerRef.current = work.id;
    setPlaybackError(false);
    setSelected(work);
  };
  const closeCollection = () => { setCollection(null); setSelected(null); };

  return (
    <section id="portfolio" className="portfolio-section portfolio-stacks" aria-labelledby="portfolio-heading">
      <div className="studio-shell">
        <div className="section-kicker"><span className="status-light" /> Selected work <span className="kicker-end">12 FILMS / 3 COLLECTIONS</span></div>
        <div className="work-heading-row">
          <h2 id="portfolio-heading">The work.<br /><span className="studio-gradient">Worth a closer look.</span></h2>
          <div className="work-intro"><p>Edits, brand stories and AI experiments.<br />A few favourites, collected for you.</p><span><Layers size={15} /><span className="stack-desktop-hint">Hover to peek. Click to explore.</span><span className="stack-touch-hint">Swipe the stacks. Tap to explore.</span></span></div>
        </div>
      </div>
      <div className="stack-shelf" role="group" aria-label="Portfolio collections" data-lenis-prevent-horizontal>
        {collections.map(item => <CollectionStack key={item.id} collection={item} onOpen={openCollection} busy={!!collection} />)}
      </div>
      <div className="studio-shell">
        <div className="stack-archive"><span>The full archives</span><div><a href={folderLinks.shortFormEdits} target="_blank" rel="noreferrer">Short-form <ArrowUpRight size={13} /></a><a href={folderLinks.reelsTiktoks} target="_blank" rel="noreferrer">Reels & TikTok <ArrowUpRight size={13} /></a><a href={folderLinks.aiGenerated} target="_blank" rel="noreferrer">AI experiments <ArrowUpRight size={13} /></a></div></div>
      </div>
      <Dialog.Root open={!!collection} onOpenChange={value => { if (!value) closeCollection(); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="film-overlay" />
          <Dialog.Content
            className={`film-dialog collection-dialog ${selected ? 'collection-playing' : ''}`}
            data-lenis-prevent
            onEscapeKeyDown={event => { if (selected) { event.preventDefault(); setSelected(null); } }}
            onCloseAutoFocus={event => { event.preventDefault(); triggerRef.current?.focus({ preventScroll: true }); }}
          >
            <div className="film-header">
              <div className="collection-title">
                {selected && <button ref={backRef} className="collection-back" onClick={() => setSelected(null)} aria-label={`Back to ${collection?.label}`}><ArrowLeft size={19} /></button>}
                <div><Dialog.Title>{selected?.title || collection?.label}</Dialog.Title><Dialog.Description>{selected ? `${selected.category} · ${selected.duration}` : `${items.length} selected films · Choose a film to watch with sound`}</Dialog.Description></div>
              </div>
              <Dialog.Close className="film-close" aria-label="Close collection"><X size={22} /></Dialog.Close>
            </div>
            {selected ? (
              <>
                <video key={selected.id} src={media(selected.id, '.mp4')} poster={media(selected.id, '.jpg')} controls autoPlay playsInline preload="metadata" onError={() => setPlaybackError(true)} />
                <div className="film-footer"><span><Volume2 size={15} /> Best experienced with sound</span><a href={media(selected.id, '.mp4')} target="_blank" rel="noreferrer">{playbackError ? 'Open video directly' : 'Open full video'} <ArrowUpRight size={15} /></a></div>
              </>
            ) : (
              <div className="collection-films">
                {items.map((work, index) => (
                  <motion.button key={work.id} id={`collection-film-${work.id}`} className="collection-film" onClick={() => openFilm(work)} aria-label={`Play ${work.title}`}
                    initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, delay: reduced ? 0 : index * 0.04 }}>
                    <span className="collection-poster"><img src={media(work.id, '.jpg')} alt="" loading="lazy" /><span className="collection-duration">{work.duration}</span><span className="stack-play"><Play size={19} fill="currentColor" /></span></span>
                    <strong>{work.title}</strong><small>{work.category}</small>
                  </motion.button>
                ))}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
