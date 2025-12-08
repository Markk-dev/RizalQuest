"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UnitBannerProps = {
  title: string;
  description: string;
  chapterId: number;
};

export const UnitBanner = ({ title, description, chapterId }: UnitBannerProps) => {
  const router = useRouter()
  const [isUnlocked, setIsUnlocked] = useState(false)
  
  useEffect(() => {
    // Check if this chapter is unlocked
    const currentLevel = JSON.parse(localStorage.getItem("currentLevel") || '{"chapter": 1, "level": 1}')
    const completedLevels = JSON.parse(localStorage.getItem("completedLevels") || "[]")
    
    // Chapter is unlocked if:
    // 1. It's the current chapter or earlier
    // 2. OR any level from this chapter has been completed
    const isCurrentOrPast = currentLevel.chapter >= chapterId
    const hasCompletedLevel = completedLevels.some((level: string) => level.startsWith(`${chapterId}-`))
    
    setIsUnlocked(isCurrentOrPast || hasCompletedLevel)
  }, [])
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

  const playStorySound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch(err => console.log('Audio play failed:', err))
  }

  const handleReadClick = () => {
    if (isUnlocked) {
      playStorySound()
      router.push(`/student/learn/story/${chapterId}`)
    }
  }

  return (
    <div className={cn("flex w-full items-center justify-between rounded-xl p-5 text-white", colors.bg)}>
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>

      <Button
        size="lg"
        variant="secondary"
        onClick={handleReadClick}
        disabled={!isUnlocked}
        className={cn(
          "hidden border-2 border-b-4 active:border-b-2 xl:flex text-white",
          colors.btn,
          !isUnlocked && "opacity-50 cursor-not-allowed"
        )}
      >
        <NotebookText className="mr-2" />
        READ
      </Button>
    </div>
  );
};
