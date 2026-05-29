const CX = 720;
const CY = 450;

function ellipsePath(rx: number, ry: number, clockwise = true) {
  const sweep = clockwise ? 1 : 0;
  return `M ${CX - rx} ${CY} A ${rx} ${ry} 0 1 ${sweep} ${CX + rx} ${CY} A ${rx} ${ry} 0 1 ${sweep} ${CX - rx} ${CY}`;
}

type OrbitRingProps = {
  rx: number;
  ry: number;
  rotate: number;
  duration?: string;
  ringDuration?: string;
  delay?: string;
  reverse?: boolean;
  faint?: boolean;
  withBall?: boolean;
};

function OrbitRing({
  rx,
  ry,
  rotate,
  duration = "20s",
  ringDuration = "28s",
  delay = "0s",
  reverse = false,
  faint = false,
  withBall = false,
}: OrbitRingProps) {
  const ballPath = ellipsePath(rx, ry, !reverse);
  const ringPath = ellipsePath(rx, ry, true);
  const ringClass = [
    "orbit-ring",
    faint ? "orbit-ring-faint" : "",
    reverse ? "orbit-ring-reverse" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <g transform={`rotate(${rotate} ${CX} ${CY})`}>
      <path
        d={ringPath}
        className={ringClass}
        pathLength={1}
        style={{ animationDuration: ringDuration }}
      />
      {withBall && (
        <circle r="9" className="orbit-ball">
          <animateMotion
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
            path={ballPath}
          />
        </circle>
      )}
    </g>
  );
}

type OrbitBackgroundProps = {
  className?: string;
};

export default function OrbitBackground({ className = "orbit-canvas" }: OrbitBackgroundProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="core-grad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f5f0ff" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#c4b5fd" stopOpacity="0.28" />
          <stop offset="70%" stopColor="#6d5cff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#6d5cff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b8aeff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6d5cff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ball-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#a78bfa" />
        </radialGradient>
        <filter id="core-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="ball-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <OrbitRing rx={430} ry={155} rotate={-68} faint ringDuration="38s" />
      <OrbitRing rx={400} ry={145} rotate={-32} duration="24s" ringDuration="24s" withBall />
      <OrbitRing
        rx={355}
        ry={118}
        rotate={26}
        duration="17s"
        ringDuration="17s"
        delay="-6s"
        reverse
        withBall
      />

      <circle
        cx={CX}
        cy={CY}
        r={200}
        fill="url(#core-halo)"
        filter="url(#core-glow)"
        className="orbit-core-halo"
      />
      <circle cx={CX} cy={CY} r={115} fill="url(#core-grad)" filter="url(#core-glow)" />
    </svg>
  );
}
