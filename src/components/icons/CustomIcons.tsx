// Custom SVG Icons - 20px outline icons
interface IconProps {
  size?: number;
  className?: string;
}

export const PlusIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 6v8M6 10h8" />
  </svg>
);

export const TargetIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="10" cy="10" r="7" />
    <circle cx="10" cy="10" r="3" />
    <circle cx="10" cy="10" r="1" />
  </svg>
);

export const ListIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 6h12M4 10h12M4 14h12" />
    <circle cx="2" cy="6" r="0.5" fill="currentColor" />
    <circle cx="2" cy="10" r="0.5" fill="currentColor" />
    <circle cx="2" cy="14" r="0.5" fill="currentColor" />
  </svg>
);

export const HistoryIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="10" cy="10" r="7" />
    <path d="M10 5v5l3 2" />
    <path d="M3 10a7 7 0 0 1 11-5.7" />
  </svg>
);

export const BookIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 4h14v12H3z" />
    <path d="M10 4v12" />
    <path d="M3 4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const HelpIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="10" cy="10" r="7" />
    <path d="M7.5 7.5a2.5 2.5 0 0 1 5 0c0 1.25-2.5 1.875-2.5 3.125" />
    <circle cx="10" cy="14.5" r="0.5" fill="currentColor" />
  </svg>
);

export const ActivityIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 10h3l2-4 4 8 2-4h3" />
  </svg>
);

// Classic Gear Icon for Settings
export const SettingsIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="10" cy="10" r="3" />
    <path d="M10 2v6M10 12v6M18 10h-6M8 10H2" />
    <path d="M15.24 6.76L13.12 8.88M8.88 13.12L6.76 15.24M15.24 13.24L13.12 11.12M8.88 6.88L6.76 4.76" />
  </svg>
);

// Toolbox Icon for Resources
export const ToolboxIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 5h10v2H5z" />
    <path d="M3 8h14v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" />
    <path d="M7 8v3M13 8v3" />
    <path d="M6 5V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" />
    <path d="M8 12h4" />
  </svg>
);

// Small Plus Icon
export const SmallPlusIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 6v8M6 10h8" />
  </svg>
);

// Microphone Icon
export const MicrophoneIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" />
    <path d="M5 10v1a5 5 0 0 0 10 0v-1M10 15v3M8 18h4" />
  </svg>
);

// Send Icon
export const SendIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2L2 8l5 2 2 5 9-13z" />
  </svg>
);

// Send Icon with Gradient Background
export const SendIconWithBackground = ({ size = 40, className = "" }: IconProps) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className="absolute inset-0"
    >
      <defs>
        <linearGradient id="sendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D6C4" />
          <stop offset="100%" stopColor="#0180E7" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#sendGradient)" />
    </svg>
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-0 m-auto"
    >
      <path d="M18 2L2 8l5 2 2 5 9-13z" />
    </svg>
  </div>
);

export const ChevronDownIcon = ({ size = 16, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
);

export const MenuIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h14M3 10h14M3 14h14" />
  </svg>
);

export const FileIcon = ({ size = 16, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 2h7l3 3v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    <path d="M10 2v3h3" />
  </svg>
);

export const FolderIcon = ({ size = 16, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8L6 3H3a1 1 0 0 0-1 1z" />
  </svg>
);