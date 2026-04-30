export function IdCardIcon() {
  return (
    <svg
      width="220"
      height="170"
      viewBox="0 0 220 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cardFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5ECFF" />
          <stop offset="100%" stopColor="#A9BCEE" />
        </linearGradient>
        <linearGradient id="cardSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E91C9" />
          <stop offset="100%" stopColor="#5C6FA8" />
        </linearGradient>
        <linearGradient id="lensRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB55A" />
          <stop offset="100%" stopColor="#E07B16" />
        </linearGradient>
        <radialGradient id="lensGlass" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#A9BCEE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7E91C9" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* card shadow */}
      <ellipse cx="105" cy="155" rx="80" ry="6" fill="#0c0b0a" opacity="0.08" />

      {/* card side / depth */}
      <path
        d="M30 50 L40 40 L180 40 L180 132 L170 142 L30 142 Z"
        fill="url(#cardSide)"
      />
      {/* card front */}
      <rect
        x="30"
        y="50"
        width="150"
        height="92"
        rx="10"
        fill="url(#cardFront)"
      />
      {/* avatar circle */}
      <circle cx="60" cy="82" r="13" fill="#7E91C9" />
      <rect x="46" y="100" width="28" height="6" rx="3" fill="#7E91C9" />
      {/* card lines */}
      <rect x="92" y="76" width="78" height="6" rx="3" fill="#7E91C9" opacity="0.6" />
      <rect x="92" y="92" width="60" height="5" rx="2.5" fill="#7E91C9" opacity="0.45" />
      <rect x="92" y="106" width="68" height="5" rx="2.5" fill="#7E91C9" opacity="0.45" />

      {/* magnifier shadow */}
      <ellipse cx="160" cy="120" rx="38" ry="5" fill="#0c0b0a" opacity="0.1" />
      {/* magnifier handle */}
      <rect
        x="170"
        y="68"
        width="10"
        height="46"
        rx="5"
        transform="rotate(40 170 68)"
        fill="url(#lensRim)"
      />
      {/* lens rim */}
      <circle cx="150" cy="58" r="30" fill="url(#lensRim)" />
      {/* lens glass */}
      <circle cx="150" cy="58" r="22" fill="url(#lensGlass)" />
      {/* highlight */}
      <ellipse
        cx="142"
        cy="50"
        rx="6"
        ry="4"
        fill="#FFFFFF"
        opacity="0.85"
        transform="rotate(-30 142 50)"
      />
    </svg>
  );
}
