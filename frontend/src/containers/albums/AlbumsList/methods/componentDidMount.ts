import { Component } from 'react'
import MethodsInterface from '../interfaces/MethodsInterface'
import StateInterface from '../interfaces/StateInterface'

async function componentDidMount(this: Component<unknown, StateInterface> & MethodsInterface): Promise<void> {
  console.log(process.env.NEXT_PUBLIC_BACKEND_API)
  document.title = 'Loading ...'
  await this.getAlbums()
}

export default componentDidMount
