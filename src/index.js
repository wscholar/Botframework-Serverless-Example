"use strict";
console.log("starting index bestiebot");
const { BotFrameworkAdapter } = require("botbuilder");

const { QnAMakerBot } = require("./bot");

// Map the contents to the required format for `QnAMaker`.
const qnaEndpointSettings = {
  knowledgeBaseId: process.env.QNAKBID,
  endpointKey: process.env.QNABOTENDPOINTKEY,
  host: process.env.QNABOTHOST
};

const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Catch-all for errors.
adapter.onTurnError = async (turnContext, error) => {
  console.error("[onTurnError]:" + error);
  try {
    await turnContext.sendActivity("Oops. Something went wrong!");
  } catch (err) {
    console.error("[onTurnError CATCH ERROR]:" + err);
    process.exit();
  }
};

// Create the QnAMakerBot.
let bot;
try {
  bot = new QnAMakerBot(qnaEndpointSettings, {});
} catch (err) {
  console.error("[botInitializationError]:" + err);
  process.exit();
}

module.exports.message = (event, context, callback) => {
  //Fix until https://github.com/Microsoft/botbuilder-js/pull/503 gets merged
  var authheader = event.headers.Authorization;
  var newheader = {
    authorization: authheader
  };
  var req = {
    body: JSON.parse(event.body),
    headers: newheader
  };

  var _status = null;
  var _body = null;
  var _respond = function(status, body) {
    callback(null, {
      statusCode: status || 200,
      body: body || ""
    });
  };

  var res = {
    send: function(status, body) {
      _respond(status, body);
    },
    status: function(status) {
      _status = status;
    },
    write: function(body) {
      _body = body;
    },
    end: function() {
      _respond(_status, _body);
    }
  };

  adapter
    .processActivity(req, res, async turnContext => {
      try {
        await bot.onTurn(turnContext);
      } catch (err) {
        console.log("onturn error=" + err);
      }
    })
    .catch(err => {
      // Reject response with error code
      console.error(`BotFrameworkAdapter.processActivity() ${err.toString()}`);
      res.status(err.statusCode);
      res.send(err.toString());
      res.end();
      throw err;
    });
};
