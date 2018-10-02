module.exports.chat = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body:
      '<html><iframe width=100% height=100% src="' +
      process.env.BOTEMBEDCODEURL +
      '"></iframe></html>'
  };
  //<iframe src='https://webchat.botframework.com/embed/xxxxx?s=YOUR_SECRET_HERE'></iframe>
  callback(null, response);
};
