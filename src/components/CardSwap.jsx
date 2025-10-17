import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card1 = forwardRef(({ customClass, cardType, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card1 ${customClass ?? ''} ${rest.className ?? ''}`.trim()}>
    {/* Card Content */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '2rem',
        color: '#fff'
      }}
    >
      {cardType === "profile" && (
        <>
          <img
            src="assets/profile.jpg"
            alt="Profile"
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              marginBottom: 10,
              border: '2px solid #C8A2C8'
            }}
          />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, color: '#C8A2C8' }}>
            Emmanuel Yegon
          </h3>
          <p style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#fff' }}>
            Full Stack Developer
          </p>
          <span style={{ fontSize: '0.95rem', color: '#C8A2C8', fontWeight: 500 }}>
            Building modern web experiences
          </span>
          <div style={{ marginTop: 10 }}>
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff', marginRight: 12 }}
            >
              <img
                src="assets/github.png"
                alt="GitHub"
                style={{ width: 24, height: 24, verticalAlign: 'middle' }}
              />
            </a>
          </div>
        </>
      )}
      {cardType === "skills" && (
        <>
          <h3 style={{ fontSize: "1.2rem", color: "#C8A2C8", marginBottom: 8 }}>Skills</h3>
          <ul style={{ listStyle: "none", padding: 0, color: "#fff", fontSize: "1rem" }}>
            <li>React, Node.js, MySQL</li>
            <li>Python, Data Analytics</li>
            <li>UI/UX Design, Figma</li>
          </ul>
          <span style={{ marginTop: 12, color: "#C8A2C8", fontWeight: 500 }}>Always learning new tech!</span>
        </>
      )}
      {cardType === "projects" && (
        <>
          <h3 style={{ fontSize: "1.2rem", color: "#C8A2C8", marginBottom: 8 }}>Featured Projects</h3>
          <ul style={{ listStyle: "none", padding: 0, color: "#fff", fontSize: "1rem" }}>
            <li>
              <strong>Portfolio Website:</strong> Personal brand, React, Framer Motion
            </li>
            <li>
              <strong>Leave Management System:</strong> HR solution, Node.js, MySQL
            </li>
            <li>
              <strong>Chat Application:</strong> Real-time, Electron, Socket.io
            </li>
          </ul>
          <span style={{ marginTop: 12, color: "#C8A2C8", fontWeight: 500 }}>See more on GitHub!</span>
        </>
      )}
    </div>
  </div>
));
Card1.displayName = 'Card1';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 350,
  height = 250,
  cardDistance = 40,
  verticalDistance = 70,
  delay = 10000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  // Example cards for portfolio UI
  const exampleCards = [
    <Card1 key="profile" customClass="bg-gradient-to-br from-[#511D43] to-[#8A2BE2]" cardType="profile" />,
    <Card1 key="skills" customClass="bg-gradient-to-br from-[#8A2BE2] to-[#C8A2C8]" cardType="skills" />,
    <Card1 key="projects" customClass="bg-gradient-to-br from-[#C8A2C8] to-[#511D43]" cardType="projects" />
  ];

  const childArr = useMemo(
    () => Children.toArray(children && Children.count(children) > 0 ? children : exampleCards),
    [children]
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
