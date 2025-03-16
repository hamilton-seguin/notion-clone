import { useRef, ChangeEventHandler } from 'react'

export default function Cover() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onChangeCoverImage = () => {
    fileInputRef.current?.click()
  }

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target
    console.log(target?.files?.[0])
  }

  return (
    <div className="relative flex justify-center items-center h-80 border-light-border dark:border-dark-border border-b-2">
      <img
        src="./notion-clone-cover.png"
        alt="cover"
        className="w-full max-h-80 object-cover peer"
        fetchPriority="high"
      />
      <button
        type="button"
        className="absolute bottom-5 right-24 p-1.5 border-2 rounded opacity-0 peer-hover:opacity-100 hover:opacity-100 text-light-text/80 hover:text-light-text/60 dark:text-light-border/80 dark:hover:text-light-border font-bold cursor-pointer"
        onClick={onChangeCoverImage}
      >
        change cover
      </button>
      <input
        onChange={onCoverImageUpload}
        className="hidden"
        ref={fileInputRef}
        type="file"
      />
    </div>
  )
}
