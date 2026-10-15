import {
  BadgePercent,
  Sparkles,
  UserCheck,
  ThumbsUp,
  LucideIcon,
  CheckCircle2,
} from "lucide-react";

interface WhyItem {
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsProps {
  badge?: string;
  title?: string;
  items?: WhyItem[];
}

const iconMap: Record<string, LucideIcon> = {
  BadgePercent,
  Sparkles,
  UserCheck,
  ThumbsUp,
};

export function WhyChooseUs({
  title = "Why Clients Trust Our Hygiene Programs",
  items = [
    {
      title: "Transparent & Upfront Pricing",
      description: "Clear, itemized quotes based on square footage without hidden service fees.",
      icon: "BadgePercent",
    },
    {
      title: "Advanced Sanitizing Tools",
      description: "Industrial HEPA vacuums, rotary scrubbers, and micro-filtration systems.",
      icon: "Sparkles",
    },
    {
      title: "Dedicated On-Site Supervisor",
      description: "Every multi-room clean is audited by an experienced team lead.",
      icon: "UserCheck",
    },
    {
      title: "Complete Satisfaction Assurance",
      description: "Complimentary touch-up rectification if any specified area falls short.",
      icon: "ThumbsUp",
    },
  ],
}: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            The Malabar Care Advantage
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const IconComp = iconMap[item.icon] || CheckCircle2;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 shadow-xs"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
