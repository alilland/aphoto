import React from 'react'
import Link from 'next/link'
import AlbumInterface from '../../interfaces/AlbumInterface'
import { API } from '../../utils/http'

async function getData () {
  const res = await API.get('/v1/public/albums')

  return res.data.data
}

const Albums = async () => {
  const data = await getData()
  const { albums } = data

  return (
    <>
      <div>
        <h1>Albums</h1>
        <div>
          {albums.map((album: AlbumInterface, i: number) => {
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
