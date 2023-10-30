import ImageInterface from '../../../../interfaces/ImageInterface'

interface StateInterface {
  loading: boolean
  id: string | null
  images: ImageInterface[]
}

export default StateInterface
