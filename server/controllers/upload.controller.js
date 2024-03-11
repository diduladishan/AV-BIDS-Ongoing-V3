const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const fileUpload = async (req, res) => {
  let fileExtension;

  if (req.query.type === 'jpeg') {
    fileExtension = 'jpeg';
  } else if (req.query.type === 'jpg') {
    fileExtension = 'jpg';
  } else if (req.query.type === 'png') {
    fileExtension = 'png';
  } else if (req.query.type === 'pdf') {
    fileExtension = 'pdf';
  } else if (req.query.type === 'docx') {
    fileExtension = 'docx';
  } else if (req.query.type === 'doc') {
    fileExtension = 'doc';
  } else {
    // Handle other file types if needed
    return res.status(400).send('Unsupported file type');
  }

  const key = `${req.user.id}/${uuidv4()}.${fileExtension}`;

  try {
    const contentType =
      fileExtension === 'pdf'
        ? 'application/pdf'
        : fileExtension === 'docx' || fileExtension === 'doc'
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : `image/${fileExtension}` || '';

    const params = {
      Bucket: 'av-bids-bucket',
      Key: key,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command);
    res.send({ key, url: signedUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  fileUpload,
};
