# Chapter Complete Modal - Usage Guide

## Component Created
`components/student/chapter-complete-modal.tsx`

## Features
✅ Confetti celebration effect (500 pieces)
✅ Trophy icon with green theme
✅ Displays chapter number and title
✅ Celebration sound effect
✅ "Next Chapter" button with depth effect
✅ Same styling as no-hearts modal

## How to Use

### 1. Import the component
```tsx
import ChapterCompleteModal from "@/components/student/chapter-complete-modal"
```

### 2. Add state to track modal visibility
```tsx
const [showChapterComplete, setShowChapterComplete] = useState(false)
const [completedChapter, setCompletedChapter] = useState({ number: 1, title: "" })
```

### 3. Show modal when chapter is completed
In your level completion logic (when level 5 is completed):

```tsx
// Check if this completes the chapter (level 5)
if (levelId === 5) {
  const chapterData = storyline.chapters.find((c) => c.chapter === chapterId)
  
  setCompletedChapter({
    number: chapterId,
    title: chapterData?.title || ""
  })
  setShowChapterComplete(true)
}
```

### 4. Add the modal to your JSX
```tsx
<ChapterCompleteModal
  isOpen={showChapterComplete}
  chapterNumber={completedChapter.number}
  chapterTitle={completedChapter.title}
  onNext={() => {
    setShowChapterComplete(false)
    // Navigate to next chapter or home
    router.push("/student/learn")
  }}
/>
```

## Example Integration in Level Page

```tsx
// In app/student/learn/[chapterId]/[levelId]/page.tsx

const [showChapterComplete, setShowChapterComplete] = useState(false)
const [completedChapter, setCompletedChapter] = useState({ number: 1, title: "" })

const handleNext = async () => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  } else {
    // Level completed!
    const isLastLevel = levelId >= 5
    
    // ... existing completion logic ...
    
    // Show chapter complete modal if this was level 5
    if (isLastLevel) {
      const chapterData = storyline.chapters.find((c) => c.chapter === chapterId)
      setCompletedChapter({
        number: chapterId,
        title: chapterData?.title || ""
      })
      setShowChapterComplete(true)
    } else {
      // Regular level completion - go to next level
      router.push(`/student/learn/${chapterId}/${levelId + 1}`)
    }
  }
}

// In JSX
return (
  <>
    <ChapterCompleteModal
      isOpen={showChapterComplete}
      chapterNumber={completedChapter.number}
      chapterTitle={completedChapter.title}
      onNext={() => {
        setShowChapterComplete(false)
        router.push("/student/learn")
      }}
    />
    
    {/* Rest of your component */}
  </>
)
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | boolean | Controls modal visibility |
| `chapterNumber` | number | Chapter number (1-8) |
| `chapterTitle` | string | Chapter title from storyline.json |
| `onNext` | () => void | Callback when "Next Chapter" is clicked |

## Customization

You can customize:
- Confetti amount: Change `numberOfPieces={500}`
- Confetti gravity: Change `gravity={0.3}`
- Sound effect: Replace `/sounds/platform_clicked.ogg`
- Button text: Change "Next Chapter" to anything
- Colors: Modify green theme to match your design
