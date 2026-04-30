export function Flourishes() {
  return (
    <>
      <PercentBadge />
      <FacetedPoly />
    </>
  );
}

function PercentBadge() {
  return (
    <svg
      className="flourish flourish--right"
      width="243"
      height="234"
      viewBox="0 0 243 234"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="badgeFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A8F26B" />
          <stop offset="100%" stopColor="#36893B" />
        </linearGradient>
        <linearGradient id="badgeSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F6022" />
          <stop offset="100%" stopColor="#0E3D12" />
        </linearGradient>
        <radialGradient id="badgeShine" cx="0.3" cy="0.25" r="0.7">
          <stop offset="0%" stopColor="#E8FFCB" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#E8FFCB" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="rotate(14 121 117)">
        <path
          d="M50 32 H 192 A 36 36 0 0 1 228 68 V 196 A 6 6 0 0 1 222 202 L 218 202 A 36 36 0 0 1 182 166 V 38 A 6 6 0 0 1 188 32 Z"
          fill="url(#badgeSide)"
          opacity="0.8"
          transform="translate(8 6)"
        />
        <rect
          x="36"
          y="20"
          width="170"
          height="170"
          rx="38"
          fill="url(#badgeFront)"
        />
        <rect
          x="36"
          y="20"
          width="170"
          height="170"
          rx="38"
          fill="url(#badgeShine)"
        />
        <text
          x="120"
          y="146"
          textAnchor="middle"
          fontFamily="'ABC ROM', Inter, sans-serif"
          fontWeight="900"
          fontSize="120"
          fill="#0E3D12"
        >
          %
        </text>
      </g>
    </svg>
  );
}

function FacetedPoly() {
  return (
    <svg
      className="flourish flourish--left"
      width="215"
      height="236"
      viewBox="0 0 215 236"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="polyA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8F26B" />
          <stop offset="100%" stopColor="#36893B" />
        </linearGradient>
        <linearGradient id="polyB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F6022" />
          <stop offset="100%" stopColor="#0E3D12" />
        </linearGradient>
        <linearGradient id="polyC" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0E3D12" />
          <stop offset="100%" stopColor="#1F6022" />
        </linearGradient>
      </defs>
      {/* dark back face */}
      <polygon points="20,90 110,30 200,80 175,210 60,215" fill="url(#polyB)" />
      {/* lit front facet */}
      <polygon points="20,90 110,30 130,140 60,215" fill="url(#polyA)" />
      {/* shadowed inset */}
      <polygon
        points="60,215 130,140 175,210"
        fill="url(#polyC)"
        opacity="0.85"
      />
      {/* highlight edge */}
      <polyline
        points="20,90 110,30 200,80"
        fill="none"
        stroke="#CEF5A4"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
    </svg>
  );
}
