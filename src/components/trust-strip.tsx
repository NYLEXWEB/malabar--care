import {
  ShieldCheck,
  Leaf,
  CheckCircle2,
  CalendarCheck,
  LucideIcon,
} from "lucide-react";

interface TrustItem {
  title: string;
  description: string;
  icon: string;
}

interface TrustStripProps {
  items?: TrustItem[];
}

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Leaf,
  CheckCircle2,
  CalendarCheck,
};

export function TrustStrip({
  items = [
    {
      title: "Verified Specialists",
      description: "Thoroughly background-checked and systematically trained cleaners.",
      icon: "ShieldCheck",
    },
    {
      title: "Eco-Safe Solutions",
      description: "Hospital-grade, non-hazardous products safe for families and pets.",
      icon: "Leaf",
    },
    {
      title: "50-Point Quality Checklist",
      description: "Standardized inspection protocols ensuring no corner is missed.",
      icon: "CheckCircle2",
    },
    {
      title: "Flexible Scheduling",
      description: "Scheduled recurring visits or prompt single-day deep cleans.",
      icon: "CalendarCheck",
    },
  ],
}: TrustStripProps) {
  return (
    <section className="bg-white py-10 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || CheckCircle2;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-100"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
