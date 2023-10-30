import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// import { API } from '../../../utils/http'

interface Image {
  // Define the structure of your image object here
  id: string
  src: string
  alt: string
}

const AlbumRecord = () => {
  const [isLoading, setLoading] = useState(true)
  const [images, setImages] = useState<Image[]>([])
  const router = useRouter()

  // const loadImages = async (id: string) => {
  //   try {
  //     const res = await API.get(`/v1/public/albums/${id}/images`)
  //     if (res.status === 200) {
  //       setImages(res.data) // Assuming the API returns the images in res.data
  //       setLoading(false)
  //     } else {
  //       console.error('Failed to load images', res.status)
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while fetching images', error)
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    const id = router.query.id as string | undefined
    if (id) {
      document.title = 'Loading Album...'
      // loadImages(id)
    }

    return () => {
      // Cleanup function
      setImages([])
      setLoading(true)
    }
  }, [router.query.id])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <h1>Album Record</h1>
          {images.map((image, i: number) => (
            <Image key={i} src={image.src} alt={image.alt} />
          ))}
        </div>
      )}
    </>
  )
}

export default AlbumRecord
