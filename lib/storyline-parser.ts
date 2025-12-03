import fs from 'fs'
import path from 'path'

export interface ChapterStory {
  chapter: number
  title: string
  story: string
}

export function parseStoryline(): ChapterStory[] {
  const storylinePath = path.join(process.cwd(), 'storyline.txt')
  const content = fs.readFileSync(storylinePath, 'utf-8')
  
  const chapters: ChapterStory[] = []
  const chapterRegex = /Chapter (\d+) – (.+?)\n([\s\S]+?)(?=Chapter \d+|$)/g
  
  let match
  while ((match = chapterRegex.exec(content)) !== null) {
    chapters.push({
      chapter: parseInt(match[1]),
      title: match[2].trim(),
      story: match[3].trim()
    })
  }
  
  return chapters
}

export function getChapterStory(chapterId: number): ChapterStory | null {
  const chapters = parseStoryline()
  return chapters.find(c => c.chapter === chapterId) || null
}
