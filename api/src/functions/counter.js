const { app } = require("@azure/functions");

let count = 0;

app.http("counter", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    count++;
    return {
      status: 200,
      jsonBody: { count }
    };
  }
});

