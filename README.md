- step 0 - create a `.env.development` file at the root of the folder
- step 1 - create an AWS account
- step 2 - provision an IAM user
- step 3 - download your access key / secret
- step 4 - install the AWS CLI tool and configure credentials to access your AWS account

if you did this right, your credentials should be stored in a text file at `~/.aws/credentials`
```bash
$ cat ~/.aws/credentials
[default]
region = us-west-1
aws_access_key_id = <your-key-id>
aws_secret_access_key = <your-secret-access-key>
```

- step 5 upload Example-1 folder to your AWS S3 bucket
- step 6 install docker if you dont already have it
- step 7 add the `AWS_REGION` from your AWS S3 bucket to the `.env.development` file
- step 8 add the `AWS_S3_BUCKET` name to your `.env.development` file
- step 9 add the AWS_PROFILE name from your `~/.aws/credentials` file, by default this should be `default`, but if you have a custom value use the one for the connection credentials you will be leveraging. I have multiple AWS accounts, so I use a different value than `default`
- step 10 generate a random 32 length string as an encryption key and store it in the `KEY_SECRET` on `.env.development`
- step 9 build the container image on docker (this will run it as well)

```bash
$ docker compose up -d
```
** note - if you ever update your `.env.development` file, you will need to delete the container and any associated images to that container on docker. the environment variables are built into the image at compile time.

---

make sure it works, run `curl` on the API root, and you should see a JSON output

```
$ curl http://localhost:3001
{"root":{"api":"API","version":"1.0.0"}}
```

to check if its reading from your AWS S3 account, do another curl request, you should see a JSON output like this with the folder `Example-1/` name as an "album"

```
$ curl http://localhost:3001/v1/public/albums
{
  "method": "GET",
  "status": "OK",
  "link": "/v1/public/albums",
  "pagination": {
    "per": 15,
    "nextPage": null
  },
  "data": {
    "document": "album",
    "albums": [
      {
        "type": "album",
        "name": "Example-1/",
        "_links": {
          "self": "/v1/public/albums/Example-1",
          "images": "/v1/public/albums/Example-1/images"
        }
      }
    ]
  }
}
```
