import { cn } from "@/lib/utils";
import {
  BookText,
  Sparkles,
  NotebookPen,
  Download

} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
        title: "Fit for all your needs",
        description:
        "Works with research papers, articles, books, course materials etc.",
        icon: <BookText color="#c2410c" />,
    },
    {
        title: "AI-powered Assistant",
        description:
        "Answer your questions from your paper and save it to your notes",
        icon: <Sparkles color="#c2410c" />,
    },
    {
        title: "Notes Flexibility",
        description:
        "Make formatted notes or free-style notes as per your need for each document separately",
        icon: <NotebookPen color="#c2410c" />,
    },
    {
        title: "Unlimited Export",
        description: "Download your notes in PDF, HTML, JSON or PNG format",
        icon: <Download color="#c2410c" />,
    }];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 py-10 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
    return (
    <div
        className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-purple-900/40",
        "lg:border-l border-orange-900/40",
        index < 4 && "lg:border-b border-orange-900/40"
        )}
    >
        {index < 4 && (
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t  from-orange-500/20 to-transparent pointer-events-none" />
        )}
        {index >= 4 && (
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-400">
            {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-orange-500 transition-all duration-200 origin-center" />
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-700">
                {title}
            </span>
        </div>
        <p className="text-sm text-neutral-500 max-w-sm relative z-10 px-10">
            {description}
        </p>
    </div>
);
};
