interface ImageInterface {
  type: string
  name: string
  updatedAt: string
  etag: string
  size: number
  _links: {
    self: string
    album: string
  }
}

export default ImageInterface
