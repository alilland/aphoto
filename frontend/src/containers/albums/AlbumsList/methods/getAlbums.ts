import { Component } from 'react'
import { API } from '../../../../utils/http'
import StateInterface from '../interfaces/StateInterface'

async function getAlbums(this: Component<unknown, StateInterface>): Promise<void> {
  const res = await API.get('/v1/public/albums')
  console.log({ res })
  this.setState({
    loading: false,
    albums: res.data.data.albums
  }, () => {
    document.title = 'Albums'
  })
}

export default getAlbums
