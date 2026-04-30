export function Flourishes() {
  return (
    <>
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
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cef5a4" />
            <stop offset="100%" stopColor="#36893b" />
          </linearGradient>
        </defs>
        <g transform="rotate(15 121 117)">
          <rect
            x="32"
            y="22"
            width="180"
            height="180"
            rx="42"
            fill="url(#g1)"
          />
          <text
            x="121"
            y="148"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="900"
            fontSize="120"
            fill="#0e3d12"
          >
            %
          </text>
        </g>
      </svg>

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
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#36893b" />
            <stop offset="100%" stopColor="#0e3d12" />
          </linearGradient>
        </defs>
        <polygon
          points="20,80 100,20 200,80 170,200 60,210"
          fill="url(#g2)"
        />
      </svg>
    </>
  );
}
