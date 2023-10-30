import React, { Component } from 'react'
import componentDidMount from './methods/componentDidMount'
import getAlbums from './methods/getAlbums'
import PropsInterface from './interfaces/PropsInterface'
import StateInterface from './interfaces/StateInterface'
import MethodsInterface from './interfaces/MethodsInterface'
import AlbumInterface from '../../../interfaces/AlbumInterface'

class AlbumsList extends Component<PropsInterface, StateInterface> implements MethodsInterface {
  constructor (props: PropsInterface) {
    super(props)
    this.state = {
      loading: true,
      albums: []
    }
    this.componentDidMount = componentDidMount.bind(this)
    this.getAlbums = getAlbums.bind(this)
  }

  componentDidMount: () => Promise<void>
  getAlbums: () => Promise<void>

  render () {
    const {
      loading,
      albums
    } = this.state
    return (
      <>
        {loading &&
          <div>Loading ...</div>
        }
        {!loading &&
          <div>
            <h1>Albums</h1>
            <div>
              {albums.map((album: AlbumInterface, i: number) => {
                return (
                  <div key={i}>
                    <a href={`/albums/${album.name.replaceAll('/', '')}`}>{album.name}</a>
                  </div>
                )
              })}
            </div>
          </div>
        }
      </>
    )
  }
}

export default AlbumsList
