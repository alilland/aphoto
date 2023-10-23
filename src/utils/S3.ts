import AWS from '../config/AWS'

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: process.env.AWS_S3_BUCKET
  }
})

export default S3
