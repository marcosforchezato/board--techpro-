import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: { label: string; href: string };
  variant?: "vertical" | "horizontal";
}

export function InfoCard({
  icon: Icon,
  title,
  description,
  link,
  variant = "vertical",
}: InfoCardProps) {
  if (variant === "horizontal") {
    return (
      <div className="flex items-center gap-4">
        <div className="bg-cyan rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
          <Icon className="text-dark-blue" size={32} strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-semibold text-black">{title}</h3>
          {description && (
            <p className="text-sm text-dark-gray">{description}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm p-6 flex flex-col h-full">
      <div className="bg-green rounded-xl w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="text-white" size={26} strokeWidth={2} />
      </div>
      <h3 className="font-semibold text-black mb-2">{title}</h3>
      <p className="text-sm text-dark-gray leading-relaxed flex-1">
        {description}
      </p>

      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-green hover:underline mt-4"
        >
          {link.label}
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
