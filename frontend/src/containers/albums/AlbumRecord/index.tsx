'use client'

import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
// import { API } from '../../../utils/http'

interface Image {
  // Define the structure of your image object here
  id: string
  src: string
  alt: string
}

// export async function getServerSideProps({ params }) {
//   const slug = params.slug || [];
//   // Fetch your data based on slug
//   const data = await fetchDataBasedOnSlug(slug);
//   return { props: { data } };
// }

const AlbumRecord = () => {
  const pathname = usePathname()
  const [isLoading, setLoading] = useState(true)
  const [images, setImages] = useState<Image[]>([])
  // const [id, setId] = useState('')


  useEffect(() => {
    // const loadImages = async (id: string) => {
    //   try {
    //     const res = await API.get(`/v1/public/albums/${id}/images`)
    //     console.log(res)
    //     setId(id)
    //     setImages(res.data.images)
    //     setLoading(false)
    //   } catch (error) {
    //     console.error('An error occurred while fetching images', error)
    //     setLoading(false)
    //   }
    // }

    console.log('AlbumRecord mounted')
    document.title = 'Loading Album...'
    // setId(router.query.id as string)

    console.log(pathname)
    if (pathname) {
      const album = pathname.split('/')[2]
      console.log(album)
      // loadImages(id)
    }

    return () => {
      // Cleanup function
      setImages([])
      setLoading(true)
    }
  }, [pathname])

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
