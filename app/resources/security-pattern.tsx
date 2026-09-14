import { HouseWifi, Cctv, ShieldKeyhole, LockKeyhole } from "lucide-react";

const ICONS = [HouseWifi, Cctv, ShieldKeyhole, LockKeyhole];

interface SecurityPatternProps {
  color?: string;
}

export function SecurityPattern({
  color = "text-white/5",
}: SecurityPatternProps) {
  const rows = 12;
  const cols = 20;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 flex flex-col gap-10 w-[200vw] h-[200vh] justify-center">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-10 justify-center">
            {Array.from({ length: cols }).map((_, colIndex) => {
              const Icon = ICONS[(rowIndex + colIndex) % ICONS.length];
              return (
                <Icon
                  key={colIndex}
                  className={`${color} shrink-0`}
                  size={32}
                  strokeWidth={1.5}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
