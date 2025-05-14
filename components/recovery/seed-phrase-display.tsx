interface SeedPhraseDisplayProps {
  seedPhrase: string
}

export function SeedPhraseDisplay({ seedPhrase }: SeedPhraseDisplayProps) {
  const words = seedPhrase.split(" ")

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 p-4 bg-muted rounded-md">
      {words.map((word, index) => (
        <div key={index} className="flex items-center p-2 bg-background rounded border">
          <span className="text-muted-foreground mr-2 text-sm w-5">{index + 1}.</span>
          <span className="font-mono">{word}</span>
        </div>
      ))}
    </div>
  )
}
