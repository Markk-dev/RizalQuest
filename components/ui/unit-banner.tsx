import { NotebookText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UnitBannerProps = {
  title: string;
  description: string;
  chapterId: number;
};

export const UnitBanner = ({ title, description, chapterId }: UnitBannerProps) => {
  // Chapter color mapping
  const chapterColors = {
    1: { bg: "bg-green-500", btn: "bg-green-600 hover:bg-green-700 border-green-700" },
    2: { bg: "bg-blue-500", btn: "bg-blue-600 hover:bg-blue-700 border-blue-700" },
    3: { bg: "bg-orange-500", btn: "bg-orange-600 hover:bg-orange-700 border-orange-700" },
    4: { bg: "bg-purple-500", btn: "bg-purple-600 hover:bg-purple-700 border-purple-700" },
    5: { bg: "bg-red-500", btn: "bg-red-600 hover:bg-red-700 border-red-700" },
    6: { bg: "bg-teal-500", btn: "bg-teal-600 hover:bg-teal-700 border-teal-700" },
    7: { bg: "bg-yellow-500", btn: "bg-yellow-600 hover:bg-yellow-700 border-yellow-700" },
    8: { bg: "bg-amber-500", btn: "bg-amber-600 hover:bg-amber-700 border-amber-700" },
  };

  const colors = chapterColors[chapterId as keyof typeof chapterColors] || chapterColors[1];

  return (
    <div className={cn("flex w-full items-center justify-between rounded-xl p-5 text-white", colors.bg)}>
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>

      <Link href="/student/learn">
        <Button
          size="lg"
          variant="secondary"
          className={cn("hidden border-2 border-b-4 active:border-b-2 xl:flex text-white", colors.btn)}
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};
