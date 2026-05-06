type LogoProps = { className?: string };

export function TaxfixLogo({ className }: LogoProps) {
  return (
    <svg
      className={className}
      width="96"
      height="27"
      viewBox="0 0 96 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Taxfix"
    >
      <text
        x="0"
        y="22"
        fontFamily="'ABC ROM', 'Inter', system-ui, sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="-1"
        fill="#0E3D12"
      >
        ta
        <tspan fill="#36893B">x</tspan>
        fix
      </text>
      <circle cx="78" cy="20" r="2.4" fill="#36893B" />
    </svg>
  );
}
