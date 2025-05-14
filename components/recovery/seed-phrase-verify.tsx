"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SeedPhraseVerifyProps {
  seedPhrase: string
  onSuccess: () => void
  onBack: () => void
}

export function SeedPhraseVerify({ seedPhrase, onSuccess, onBack }: SeedPhraseVerifyProps) {
  const [words, setWords] = useState<string[]>([])
  const [shuffledWords, setShuffledWords] = useState<string[]>([])
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const { toast } = useToast()

  // Initialize the component with the seed phrase
  useEffect(() => {
    const wordArray = seedPhrase.split(" ")
    setWords(wordArray)
    setShuffledWords(shuffleArray([...wordArray]))
  }, [seedPhrase])

  // Shuffle an array using Fisher-Yates algorithm
  function shuffleArray(array: string[]) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  function handleWordSelect(word: string) {
    if (selectedWords.includes(word)) return

    const newSelectedWords = [...selectedWords, word]
    setSelectedWords(newSelectedWords)

    // Check if all words have been selected
    if (newSelectedWords.length === words.length) {
      const isMatch = newSelectedWords.join(" ") === words.join(" ")
      setIsCorrect(isMatch)

      if (isMatch) {
        onSuccess()
      } else {
        toast({
          title: "Verification failed",
          description: "The seed phrase you entered doesn't match. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  function handleWordRemove(index: number) {
    const newSelectedWords = [...selectedWords]
    newSelectedWords.splice(index, 1)
    setSelectedWords(newSelectedWords)
    setIsCorrect(null)
  }

  function resetVerification() {
    setSelectedWords([])
    setShuffledWords(shuffleArray([...words]))
    setIsCorrect(null)
  }

  return (
    <div className="space-y-6">
      {/* Display area for selected words */}
      <div className="p-4 bg-muted rounded-md min-h-24">
        <div className="grid grid-cols-3 gap-2">
          {selectedWords.map((word, index) => (
            <Button
              key={index}
              variant="secondary"
              className="justify-start font-mono"
              onClick={() => handleWordRemove(index)}
            >
              <span className="text-muted-foreground mr-2 text-sm">{index + 1}.</span>
              {word}
            </Button>
          ))}
          {Array.from({ length: words.length - selectedWords.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="h-10 border border-dashed rounded-md flex items-center justify-center text-muted-foreground"
            >
              <span className="text-xs">Select word {selectedWords.length + index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Word selection area */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Select words in the correct order</h3>
          <Button variant="ghost" size="sm" onClick={resetVerification}>
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {shuffledWords.map((word, index) => (
            <Button
              key={index}
              variant="outline"
              className="font-mono"
              disabled={selectedWords.includes(word)}
              onClick={() => handleWordSelect(word)}
            >
              {word}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="outline" onClick={resetVerification}>
          Reset
        </Button>
      </div>
    </div>
  )
}
