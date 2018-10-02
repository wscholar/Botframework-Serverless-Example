// 'use strict';

// const fetch = require('node-fetch');
// const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// var Promise = require('bluebird');
// var request = require('request-promise').defaults({ encoding: null });

// const s3 = new AWS.S3();

// module.exports.saveFromPost = (event, context, callback) => {
//   const boundary = multipart.getBoundary(event.data.headers['Content-Type'][0]);
//   const body = new Buffer(event.data.body, 'base64'); // eslint-disable-line
//   const parts = multipart.Parse(body, boundary);

//   const key = parts[0].filename;
//   const params = {
//     Body: parts[0].data,
//     Bucket: process.env.BUCKET,
//     Key: key,
//     ContentType: parts[0].type
//   };
//   s3.putObject(params)
//     .promise()
//     .then(() => {
//       const response = {
//         statusCode: 200,
//         body: JSON.stringify({
//           message: 'Success!'
//         })
//       };
//       callback(null, response);
//     })
//     .catch(() => {
//       callback('Something went wrong');
//     });
// };

// module.exports.saveFromUrl = (event, context, callback) => {
//   fetch(event.file_url)
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       return Promise.reject(
//         new Error(
//           `Failed to fetch ${response.url}: ${response.status} ${
//             response.statusText
//           }`
//         )
//       );
//     })
//     .then(response => response.buffer())
//     .then(buffer =>
//       s3
//         .putObject({
//           Bucket: process.env.BUCKET,
//           Key: event.key,
//           Body: buffer
//         })
//         .promise()
//         .then(() => {
//           const response = {
//             statusCode: 200,
//             body: JSON.stringify({
//               message: 'Success!'
//             })
//           };
//           callback(null, response);
//         })
//         .catch(() => {
//           callback('Something went wrong putObject');
//         })
//     )
//     .catch(() => {
//       callback('Something went wrong on FETCH');
//     });
// };

// // Request file with Authentication Header
// module.exports.requestWithToken = url => {
//   return obtainToken().then(function(token) {
//     return request({
//       url: url,
//       headers: {
//         Authorization: 'Bearer ' + token,
//         'Content-Type': 'application/octet-stream'
//       }
//     });
//   });
// };

// module.exports.postprocess = (event, context, callback) => {
//   event.Records.forEach(record => {
//     const filename = record.s3.object.key;
//     const filesize = record.s3.object.size;
//     console.log(
//       `New file object has been created: ${filename} (${filesize} bytes)`
//     );
//   });
// };
// // Promise for obtaining JWT Token (requested once)
// module.exports.obtainToken = connector => {
//   return Promise.promisify(connector.getAccessToken.bind(connector));
// };

// module.exports.checkRequiresToken = message => {
//   return message.source === 'skype' || message.source === 'msteams';
// };
