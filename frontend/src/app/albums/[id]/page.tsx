import React from 'react'
import Image from 'next/image'
import { API } from '../../../utils/http'

async function getData (id: string) {
  const res = await API.get(`/v1/public/albums/${id}/images`)

  return res.data.data
}

const Album = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getData(id)
  const { images } = data

  return (
    <>
      {id || 'No ID'}
      {images.map((image: { name: string }, i: number) => {
        return (
          <div key={i}>
            <Image
              key={i}
              src={`${process.env.PRIVATE_BACKEND_API}/v1/public/albums/${id}/images/${image.name}`}
              alt={image.name}
              width={200}
              height={200}
            />
          </div>
        )
      })}
    </>
  )
}

export default Album
