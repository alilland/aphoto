// import AlbumRecord from '../../containers/albums/AlbumRecord'

interface AlbumPageInterface {
  params: { id: string }
}
const AlbumPage = ({ params: { id } }: AlbumPageInterface) => {
  console.log('AlbumPage', id)
  return 'success'
  // return <AlbumRecord />
}
export default AlbumPage
