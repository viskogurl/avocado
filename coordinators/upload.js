const aws = require("aws-sdk");
const fs = require("fs");

const uploadFile = async ({ fileName, filePath, fileType }) => {
  const promise = await new Promise((resolve, reject) => {
    aws.config.update({
      region: "nyc3",
      // You'll need your service's access keys here
      accessKeyId: "SMHKETACAGMNCOAHFYRC",
      secretAccessKey: "30LfyksY0lsjLJT2FWYvClNgBEOUHutwFEzgLClNQdU",
    });

    const s3 = new aws.S3({
      apiVersion: "2006-03-01",
      // If you want to specify a different endpoint, such as using DigitalOcean spaces
      endpoint: new aws.Endpoint("nyc3.digitaloceanspaces.com"),
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: "private",
        // You'll input your bucket name here
        Bucket: "avocado-api",
        Body: stream,
        Key: fileName,
        ContentType: fileType,
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
  return promise;
};

module.exports = { uploadFile };