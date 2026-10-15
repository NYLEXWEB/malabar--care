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
  badge = "The Malabar Care Advantage",
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
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {badge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const IconComp = iconMap[item.icon] || CheckCircle2;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-blue-500/20">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
