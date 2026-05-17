/**
 * CardSwap Component - JS version with hover-to-front support
 * Drop into: frontend/src/components/CardSwap.js
 */
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useEffect,
  useRef
} from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, children, style, onClick, onMouseEnter, onMouseLeave, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    style={style}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`absolute top-1/2 left-1/2 rounded-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x, y: slot.y, z: slot.z,
    xPercent: -50, yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

export const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onCardHover,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? { ease: 'elastic.out(0.5,0.8)', durDrop: 1.8, durMove: 1.8, durReturn: 1.8, promoteOverlap: 0.9, returnDelay: 0.05 }
      : { ease: 'power2.inOut', durDrop: 0.7, durMove: 0.7, durReturn: 0.7, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(0);
  const container = useRef(null);
  const isAnimating = useRef(false);

  // Expose swapToFront so PortfolioSection can call it
  const swapToFront = (targetIdx) => {
    const pos = order.current.indexOf(targetIdx);
    if (pos === 0 || isAnimating.current) return;

    isAnimating.current = true;
    clearInterval(intervalRef.current);
    tlRef.current?.kill();

    const total = refs.length;
    const newOrder = [targetIdx, ...order.current.filter((idx) => idx !== targetIdx)];

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        if (!pauseOnHover) {
          intervalRef.current = window.setInterval(doAutoSwap, delay);
        }
      }
    });
    tlRef.current = tl;

    newOrder.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      tl.set(el, { zIndex: slot.zIndex }, 0);
      tl.to(el, {
        x: slot.x, y: slot.y, z: slot.z,
        skewY: i === 0 ? 0 : skewAmount,
        duration: config.durMove * 0.65,
        ease: 'power3.out',
      }, i * 0.07);
    });

    tl.call(() => { order.current = newOrder; });
  };

  const doAutoSwap = () => {
    if (order.current.length < 2 || isAnimating.current) return;
    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    if (!elFront) return;

    isAnimating.current = true;
    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false; } });
    tlRef.current = tl;

    tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });
    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
    tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
    tl.call(() => { order.current = [...rest, front]; });
  };

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    intervalRef.current = window.setInterval(doAutoSwap, delay);

    const node = container.current;
    if (pauseOnHover && node) {
      const pause = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => {
        if (!isAnimating.current) {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(doAutoSwap, delay);
        }
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onMouseEnter: () => {
            onCardHover?.(i);
            swapToFront(i);
          },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div
      ref={container}
      className="relative transform-gpu"
      style={{ width, height, perspective: '1200px' }}
    >
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {rendered}
      </div>
    </div>
  );
};

export default CardSwap;
