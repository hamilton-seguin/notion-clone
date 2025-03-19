import { useRef, ChangeEventHandler } from 'react'

import { FileImage } from '@/components'

import { uploadImage } from '@/utils'

export const Cover = ({
  filePath,
  changePageCover,
}: {
  filePath?: string
  changePageCover: (filePath: string) => void
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onChangeCoverImage = () => {
    fileInputRef.current?.click()
  }

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const target = event.target
    const result = await uploadImage(target?.files?.[0])
    if (result?.filePath) {
      changePageCover(result.filePath)
    }
  }

  return (
    <div className="relative flex justify-center items-center h-80 border-light-border dark:border-dark-border border-b-2 w-full">
      {filePath ? (
        <FileImage
          filePath={filePath}
          className="w-full max-h-80 object-cover peer"
        />
      ) : (
        <img
          src="./notion-clone-cover.png"
          alt="cover"
          className="w-full max-h-80 object-cover peer"
          fetchPriority="high"
        />
      )}

      <button
        type="button"
        className="absolute bottom-5 right-24 p-1.5 border-2 rounded opacity-0 peer-hover:opacity-100 hover:opacity-100 text-light-text/80 hover:text-light-text/60 dark:text-dark-text/70 dark:hover:text-dark-text font-bold cursor-pointer"
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
