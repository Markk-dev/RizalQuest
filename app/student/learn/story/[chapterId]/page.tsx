"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Chapter data from storyline.txt
const CHAPTERS = [
  {
    chapter: 1,
    title: "Childhood and Early Life",
    description: "The beginning of a national hero's journey",
    story: "In the peaceful town of Calamba, a boy named José Protasio Rizal Mercado y Alonso Realonda lived in a big family with 11 children. Everyone called him Pepe, but his full name was very long and special! He was the 7th child in the middle of his big family. His older brother Paciano guided him, and his mother Teodora was his very first teacher. When Pepe was only three years old, his mother taught him the alphabet and told him the story of the moth that flew too close to the flame and got burned. Pepe believed his talents came from God, who gave him a special gift.\nPepe loved reading, drawing, and making little clay figures like a sculptor. He surprised his family with his art. He rode his pony Alipato around town, while his big black dog Usman ran happily beside him. His parents also taught him good manners and to be kind to everyone, even his younger siblings. His younger sisters Trinidad and Narcisa loved to play with him and learn from him too. These happy days in Calamba helped shape José Rizal, a smart, kind, and curious boy who would later become a great hero for his country."
  },
  {
    chapter: 2,
    title: "Student Years",
    description: "Education and intellectual awakening",
    story: "When Pepe grew older, he went to school in Manila. He studied at Ateneo, a school run by Jesuit priests, and later at the University of Santo Tomas, run by the Dominican priests. At first he was shy and small, and some boys teased him. But Pepe worked very hard, learned Spanish, and often earned the grade \"sobresaliente,\" which means excellent. He even learned fencing, wrestling, and how to measure land like a land surveyor, showing he was strong in body and mind.\nPepe decided to study medicine and become a doctor for the eyes, an eye doctor, because he wanted to help cure his mother's poor eyesight. In school he also loved writing poems and essays. He wrote a poem telling the youth that they are the \"hope of the fatherland.\" He studied science, math, and many other subjects, always polite and disciplined. His school years prepared him for the bigger challenges he would face for his country."
  },
  {
    chapter: 3,
    title: "Travel and Exposure",
    description: "Journeys across the world",
    story: "When Rizal became a young man, he quietly left the Philippines on a ship, without telling his parents. He sailed across the ocean and first went to Spain to finish his medical studies. He saved his money and spent it on books, not on fancy things. In Europe he met many new friends, like Professor Ferdinand Blumentritt, and learned new languages such as German and French.\nRizal saw how other nations lived freely and peacefully. People could speak up and be treated fairly. He visited cities like Berlin, the capital of Germany, where he worked hard and kept learning. He joined other Filipinos in the Propaganda Movement, and they sometimes called themselves Indios Bravos. As he traveled, Rizal realized that Filipinos also deserved fairness and respect, and he began to think of ways to help his country."
  },
  {
    chapter: 4,
    title: "Literary Works",
    description: "Creating the Noli Me Tangere and El Filibusterismo",
    story: "While living in Europe, Rizal began to write powerful stories about the Philippines. His first novel was called \"Noli Me Tangere,\" which means \"Touch Me Not\" in English. Later, he wrote a second, darker book called \"El Filibusterismo.\" He finished the Noli in Germany and later printed the Fili in Ghent, Belgium. In these books, he talked about injustices and a terrible \"social cancer\" that hurt Filipino society.\nMany characters in his novels were based on real people. Maria Clara was inspired by his great love, Leonor Rivera. In the story, the hero Ibarra dreamed of building a school, just like Rizal loved learning back when his mother first taught him to read in Calamba. Rizal chose to fight using a pen, not a sword. His books opened people's eyes and hearts, and many Filipinos were inspired to stand up for what is right."
  },
  {
    chapter: 5,
    title: "Advocacy and Reform",
    description: "Fighting for Filipino freedom",
    story: "Rizal did not want a bloody war. He wanted peaceful change for the Philippines. He wrote letters, essays, and articles for a newspaper called La Solidaridad. Sometimes he used secret pen names like Laong Laan and Dimasalang. He believed that education was the key to freedom and often said that the youth are the hope of the fatherland, just as he wrote in his school poem.\nBack in the Philippines, Rizal helped start a group called La Liga Filipina to unite Filipinos and teach them to be brave and united. He wanted the Philippines to have fair treatment and become a province of Spain, with equal rights. He believed that \"the pen is mightier than the sword,\" so he used his writing instead of violence. Just like when he loved reading as a child and saw freedom in other countries, he now used his words to push for justice and a better future."
  },
  {
    chapter: 6,
    title: "Return to the Philippines",
    description: "Years of reflection and resilience",
    story: "Even though it was dangerous, Rizal decided to return home. The Spanish government sent him far away to a town called Dapitan. There, Rizal did not give up. He lived simply and even won the lottery, using the money to buy land and help others. He built waterworks to bring clean water to the town and made coconut oil lamps to light the streets at night.\nRizal opened a free school for boys, where they paid him by helping with work instead of money. He taught them many skills and even made a giant map of Mindanao on the ground using stones, showing his love for art like his clay figures as a child. He worked as a doctor and operated on his mother's eyes, just as he had promised when he studied to be an eye doctor. In Dapitan he discovered a flying lizard later named Draco rizali, and he met Josephine Bracken, who became his wife. His mother and sisters came to live with him, and the people admired his kindness and hard work."
  },
  {
    chapter: 7,
    title: "Trial and Imprisonment",
    description: "The final chapter unfolds",
    story: "Later, the Spanish authorities became afraid of Rizal's ideas. Because of his writings and beliefs, he was arrested and put in Fort Santiago, a prison in Manila. They accused him of starting a rebellion, even though he always wanted peaceful reform. During his trial, Rizal stayed calm and brave, showing the same discipline he had as a student.\nInside his small jail cell, Rizal continued to write. He wrote a beautiful last poem called \"Mi Último Adiós\" or \"My Last Farewell,\" filled with love for his country, his parents, and his people. He hid the poem inside an alcohol lamp so the guards would not find it and gave the lamp to his sister Trinidad. In the poem, he spoke again of the \"social cancer\" hurting the land. Even in his darkest days, Rizal accepted his fate with courage, hope, and faith in his people."
  },
  {
    chapter: 8,
    title: "Execution and Legacy",
    description: "A hero's eternal legacy",
    story: "On December 30, 1896, Rizal was taken to Bagumbayan, now called Rizal Park or Luneta, to be executed by firing squad. Many soldiers stood in front of him. He asked not to be shot in the back, because he was not a traitor. When the shots were fired, Rizal turned and fell facing the sky, showing his bravery. His last words were \"Consummatum est,\" which means \"It is finished.\"\nMany Filipinos wept when they heard of his death, but they also felt inspired. They remembered the boy from Calamba, the student who wrote that the youth are the hope of the fatherland, the traveler who saw freedom, the writer of Noli Me Tangere and El Filibusterismo, and the doctor and teacher in Dapitan. His death awakened the spirit of the nation and helped lead to the Philippines' independence. Today, his monument stands in Rizal Park, with a book and a torch symbolizing his ideas. He is honored as a national hero whose story continues to guide children and adults."
  }
]

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = Number(params.chapterId)
  const [currentPage, setCurrentPage] = useState(0)

  const chapterData = CHAPTERS.find((c) => c.chapter === chapterId)

  if (!chapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    )
  }

  // Split story into 3 pages
  const splitStoryIntoPages = (text: string) => {
    const sentences = text.split('. ')
    const totalSentences = sentences.length
    const sentencesPerPage = Math.ceil(totalSentences / 3)
    
    const pages: string[] = []
    for (let i = 0; i < 3; i++) {
      const start = i * sentencesPerPage
      const end = Math.min(start + sentencesPerPage, totalSentences)
      const pageText = sentences.slice(start, end).join('. ')
      if (pageText.trim()) {
        pages.push(pageText.trim() + (pageText.endsWith('.') ? '' : '.'))
      }
    }
    
    return pages
  }

  const pages = splitStoryIntoPages(chapterData.story)
  const totalPages = 3

  const playButtonSound = () => {
    const audio = new Audio('/sounds/platform_clicked.ogg')
    audio.volume = 0.5
    audio.play().catch((err) => console.log('Audio play failed:', err))
  }

  const handleNext = () => {
    playButtonSound()
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      router.push("/student/learn")
    }
  }

  const handlePrevious = () => {
    playButtonSound()
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleClose = () => {
    playButtonSound()
    router.push("/student/learn")
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white border-2 border-red-600 border-b-4 border-b-red-700 active:translate-y-[2px] active:border-b-2 transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-8">
          <div className="h-full flex flex-col md:flex-row gap-8">
            {/* Left side - Image */}
            <div className="md:w-[400px] shrink-0">
              <Image
                src={`/chapters/Chapter${chapterId}.png`}
                alt={chapterData.title}
                width={400}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right side - Story */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-green-600">
                  Chapter {chapterId}: {chapterData.title}
                </h2>
                <p className="text-lg text-gray-600 mt-2">
                  {chapterData.description}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto mb-6 pr-2">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
                  {pages[currentPage]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Full width at bottom */}
      <div className="border-t-2 border-gray-200 bg-white shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
                {/* Dot indicators */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentPage ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                
                {/* Buttons grouped together */}
                <div className="flex gap-3">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-yellow-600 border-b-4 border-b-yellow-700 active:translate-y-[2px] active:border-b-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl border-2 border-green-600 border-b-4 border-b-green-700 active:translate-y-[2px] active:border-b-2 transition-all"
                  >
                    {currentPage < totalPages - 1 ? (
                      <>
                        Next
                        <ChevronRight size={20} />
                      </>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}
