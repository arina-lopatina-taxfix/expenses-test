export function PrefillIcon() {
  return (
    <svg
      width="256"
      height="240"
      viewBox="0 0 256 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="boxFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E1ECFB" />
          <stop offset="100%" stopColor="#B6CCEC" />
        </linearGradient>
        <linearGradient id="boxLeftFace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8FA9D5" />
          <stop offset="100%" stopColor="#B6CCEC" />
        </linearGradient>
        <linearGradient id="boxRightFace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B6CCEC" />
          <stop offset="100%" stopColor="#7E97C2" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C7B6F2" />
          <stop offset="100%" stopColor="#8A6BD1" />
        </linearGradient>
        <linearGradient id="shieldSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#674BA5" />
          <stop offset="100%" stopColor="#8A6BD1" />
        </linearGradient>
        <linearGradient id="papers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8F6F0" />
          <stop offset="100%" stopColor="#E5E1D5" />
        </linearGradient>
      </defs>

      {/* drop shadow */}
      <ellipse cx="128" cy="218" rx="86" ry="8" fill="#0c0b0a" opacity="0.1" />

      {/* papers/files inside the box */}
      <rect x="78" y="92" width="100" height="80" rx="3" fill="url(#papers)" />
      <rect x="82" y="96" width="92" height="6" rx="3" fill="#D6CFB8" />
      <rect x="82" y="108" width="76" height="4" rx="2" fill="#D6CFB8" />
      <rect x="82" y="118" width="88" height="4" rx="2" fill="#D6CFB8" />
      <rect x="82" y="128" width="60" height="4" rx="2" fill="#D6CFB8" />

      {/* Box body — isometric look */}
      <polygon
        points="38,108 128,84 218,108 218,196 128,220 38,196"
        fill="url(#boxFront)"
      />
      {/* darker left face */}
      <polygon points="38,108 128,132 128,220 38,196" fill="url(#boxLeftFace)" />
      {/* darker right face */}
      <polygon
        points="218,108 128,132 128,220 218,196"
        fill="url(#boxRightFace)"
      />
      {/* lid front lip */}
      <polygon points="38,108 128,132 218,108 128,84" fill="#D2E0F3" />
      {/* keyhole */}
      <circle cx="72" cy="170" r="5" fill="#7E97C2" />
      <rect x="70" y="172" width="4" height="6" rx="1" fill="#7E97C2" />

      {/* Shield popping out the top */}
      <g transform="translate(150 28)">
        {/* side */}
        <path
          d="M8 8 L40 0 L72 8 L72 44 C72 60 40 80 40 80 C40 80 8 60 8 44 Z"
          fill="url(#shieldSide)"
          transform="translate(6 6)"
          opacity="0.55"
        />
        {/* front */}
        <path
          d="M8 8 L40 0 L72 8 L72 44 C72 60 40 80 40 80 C40 80 8 60 8 44 Z"
          fill="url(#shieldGrad)"
        />
        {/* check */}
        <path
          d="M22 36 L34 48 L58 22"
          stroke="#FFFFFF"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
