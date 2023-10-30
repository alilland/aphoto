import { Component } from 'react'
import MethodsInterface from '../interfaces/MethodsInterface'
import StateInterface from '../interfaces/StateInterface'

async function componentDidMount(this: Component<unknown, StateInterface> & MethodsInterface): Promise<void> {
  document.title = 'Loading ...'
  await this.loadImages()
}

export default componentDidMount
