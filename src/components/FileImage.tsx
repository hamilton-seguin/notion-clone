import { ImgHTMLAttributes, useEffect, useState } from 'react'

import { Loader } from '@/components'

import { supabase } from '@/supabaseClient'

type ImageProps = {
  filePath: string
} & ImgHTMLAttributes<HTMLImageElement>

export const FileImage = ({ filePath, ...props }: ImageProps) => {
  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const downloadImage = async (filePath: string) => {
      setLoading(true)
      const { data } = await supabase.storage.from('images').download(filePath)
      if (data) {
        const url = URL.createObjectURL(data)
        setImage(url)
        setLoading(false)
      }
    }
    if (filePath && filePath.length > 0) {
      downloadImage(filePath)
    }
  }, [filePath])

  if (loading) return <Loader />

  return <img src={image} alt={filePath} {...props} />
}
