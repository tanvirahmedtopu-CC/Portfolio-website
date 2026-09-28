// Model names checked against vendor pages on 2026-09-28.
// Keep the sources with the content so future updates are easy to verify.
export const aiWorkflow = [
  {
    id: 'imagine', number: '01', label: 'Imagine', subtitle: 'Find the story.',
    description: 'Turn a brief into a clear direction: the hook, the script, the visual language. Every frame starts with an idea worth watching.',
    output: 'Concept → script → visual direction', image: 'motion-story',
    tools: [
      { name: 'Claude Opus 5.5', role: 'Ideas, scripts & creative direction', mark: 'C', url: 'https://www.anthropic.com/claude/opus' },
      { name: 'Seedream 5.0 Pro', role: 'Image generation & visual exploration', mark: 'S', url: 'https://seed.bytedance.com/en/seedream5_0_pro' },
      { name: 'Canva', role: 'Moodboards & brand systems', mark: 'Ca', url: 'https://www.canva.com/' },
    ],
  },
  {
    id: 'create', number: '02', label: 'Create', subtitle: 'Make the impossible, visible.',
    description: 'Build new worlds, product moments and human stories. Pair the right model with a considered eye for light, movement and detail.',
    output: 'Visual direction → scenes → performance', image: 'ai-product',
    tools: [
      { name: 'Google Veo 3.1', role: 'Cinematic video & native audio', mark: 'V', url: 'https://deepmind.google/models/veo/' },
      { name: 'Runway Gen-4.5', role: 'Directed motion & image-to-video', mark: 'R', url: 'https://runway.com/research/introducing-runway-gen-4.5' },
      { name: 'Kling 3.0', role: 'Multi-shot video & character continuity', mark: 'K', url: 'https://klingai.com/video' },
      { name: 'HeyGen Avatar V', role: 'Avatar-led storytelling', mark: 'H', url: 'https://www.heygen.com/en-gb/avatars/avatar-v' },
    ],
  },
  {
    id: 'refine', number: '03', label: 'Refine', subtitle: 'Give it the human touch.',
    description: 'The edit makes the difference. Shape the pacing, clean up the voice, craft the captions, and make every cut earn its place.',
    output: 'Edit → sound → final film', image: 'skincare',
    tools: [
      { name: 'Descript', role: 'Voice cleanup & transcript editing', mark: 'D', url: 'https://www.descript.com/' },
      { name: 'Captions', role: 'Captions & finishing', mark: 'Cc', url: 'https://www.captions.ai/' },
      { name: 'OpusClip', role: 'Long-form to short-form', mark: 'O', url: 'https://www.opus.pro/' },
      { name: 'Higgsfield', role: 'Creative video workflows', mark: 'H', url: 'https://higgsfield.ai/' },
    ],
  },
];
