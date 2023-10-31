import React from 'react'
import Link from 'next/link'
import AlbumInterface from '../../interfaces/AlbumInterface'

async function getData () {
  const res = await fetch(`${process.env.PRIVATE_BACKEND_API}/v1/public/albums`)

  if (!res.ok) throw new Error('Failed to fetch data')

  const data = await res.json()
  return data.data
}

const Albums = async () => {
  const data = await getData()
  const { albums } = data

  return (
    <>
      <div>
        <h1>Albums</h1>
        <div>
          {(albums || []).map((album: AlbumInterface, i: number) => {
            return (
              <div key={i}>
                <Link href={`/albums/${album.name.replaceAll('/', '')}`}>
                  {album.name}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Albums
