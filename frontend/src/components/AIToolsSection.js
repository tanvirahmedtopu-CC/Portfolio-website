import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { aiWorkflow } from '../data/aiWorkflow';

export default function AIToolsSection() {
  const [active, setActive] = useState(1);
  const reduced = useReducedMotion();
  const stage = aiWorkflow[active];
  return <section id="ai" className="ai-studio" aria-labelledby="ai-heading">
    <div className="studio-shell">
      <div className="section-kicker"><span className="status-light" /> The creative toolkit<span className="kicker-end">HUMAN DIRECTION × AI POSSIBILITY</span></div>
      <div className="ai-heading-row"><h2 id="ai-heading">Powered by AI.<br /><span className="studio-gradient">Directed by instinct.</span></h2><p>The tools evolve. The eye for a good story stays.<br />Explore the workflow behind the work.</p></div>
      <div className="ai-workbench">
        <div className="workflow-nav" aria-label="Explore the creative workflow">{aiWorkflow.map((item, i) => <button key={item.id} onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="workflow-panel"><span className="workflow-number">{item.number}</span><span>{item.label}</span><ArrowRight size={18} /></button>)}</div>
        <div id="workflow-panel" className="workflow-panel" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}><motion.div key={stage.id} className="workflow-content" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <div className="workflow-story"><span className="workflow-eyebrow"><Sparkles size={15} /> {stage.label} / {stage.number}</span><h3>{stage.subtitle}</h3><p>{stage.description}</p><div className={`workflow-art art-${stage.id}`} aria-hidden="true"><div className="art-frame art-frame-back"><img src={`${process.env.PUBLIC_URL}/media/work/restaurant.jpg`} alt="" loading="lazy" /></div><div className="art-frame art-frame-main"><img src={`${process.env.PUBLIC_URL}/media/work/${stage.image}.jpg`} alt="" loading="lazy" /><span>TAT. / CREATIVE STUDIO</span></div><div className="art-frame art-frame-front"><img src={`${process.env.PUBLIC_URL}/media/work/ai-ugc.jpg`} alt="" loading="lazy" /></div><div className="art-timeline"><i /><i /><i /><i /><span /></div></div><span className="workflow-output">{stage.output}</span></div>
            <div className="workflow-tools"><span className="tools-heading">THE TOOLS BEHIND THIS STAGE</span>{stage.tools.map(tool => <a className="workflow-tool" key={tool.name} href={tool.url} target="_blank" rel="noreferrer"><span className="tool-monogram" aria-hidden="true">{tool.mark}</span><span><strong>{tool.name}</strong><small>{tool.role}</small></span><ArrowUpRight size={17} /></a>)}<p className="tool-note">Technology is the starting point.<br />Taste brings it all together.</p></div>
          </motion.div></AnimatePresence>
        </div>
      </div>
      <div className="ai-footnote"><span>Always exploring. Always refining.</span><a href="#portfolio">See what it makes possible <ArrowUpRight size={16} /></a></div>
    </div>
  </section>;
}
