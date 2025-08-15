// Custom SVG Icons - 16px outline icons
interface IconProps {
  size?: number;
  className?: string;
}

export const PlusIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <path d="M8 1v14M1 8h14" />
  </svg>
);

export const TargetIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <circle cx="8" cy="8" r="6" />
    <circle cx="8" cy="8" r="3" />
    <circle cx="8" cy="8" r="1" />
  </svg>
);

export const ListIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <path d="M3 3h10M3 8h10M3 13h10" />
    <circle cx="1.5" cy="3" r="0.5" fill="currentColor" />
    <circle cx="1.5" cy="8" r="0.5" fill="currentColor" />
    <circle cx="1.5" cy="13" r="0.5" fill="currentColor" />
  </svg>
);

export const HistoryIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4v4l3 2" />
    <path d="M2 8a6 6 0 0 1 9-5.2" />
  </svg>
);

export const BookIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <path d="M2 3h12v10H2z" />
    <path d="M8 3v10" />
    <path d="M2 3c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" />
  </svg>
);

export const HelpIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <circle cx="8" cy="8" r="6" />
    <path d="M6 6a2 2 0 0 1 4 0c0 1-2 1.5-2 2.5" />
    <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
  </svg>
);

export const ActivityIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <path d="M1 8h3l2-4 4 8 2-4h3" />
  </svg>
);

export const SettingsIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <circle cx="8" cy="8" r="2.5" />
    <path d="M13.5 8a5.5 5.5 0 0 0-.4-2l-1.5.9a3.5 3.5 0 0 1 0 2.2l1.5.9a5.5 5.5 0 0 0 .4-2z" />
    <path d="M2.5 8a5.5 5.5 0 0 0 .4 2l1.5-.9a3.5 3.5 0 0 1 0-2.2L2.9 6a5.5 5.5 0 0 0-.4 2z" />
    <path d="M8 2.5a5.5 5.5 0 0 0-2 .4l.9 1.5a3.5 3.5 0 0 1 2.2 0L10 2.9a5.5 5.5 0 0 0-2-.4z" />
    <path d="M8 13.5a5.5 5.5 0 0 0 2-.4l-.9-1.5a3.5 3.5 0 0 1-2.2 0L6 13.1a5.5 5.5 0 0 0 2 .4z" />
  </svg>
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

export const MenuIcon = ({ size = 16, className = "" }: IconProps) => (
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
    <path d="M2 4h12M2 8h12M2 12h12" />
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