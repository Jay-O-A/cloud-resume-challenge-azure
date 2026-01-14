const { TableClient } = require("@azure/data-tables");

const tableName = "visitors";
const partitionKey = "resume";
const rowKey = "count";

module.exports = async function (context, req) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableClient = TableClient.fromConnectionString(
    connectionString,
    tableName
  );

  try {
    await tableClient.createTable();
  } catch (e) {
    // table already exists
  }

  let count = 1;

  try {
    const entity = await tableClient.getEntity(partitionKey, rowKey);
    count = entity.count + 1;
    entity.count = count;
    await tableClient.updateEntity(entity, "Replace");
  } catch {
    await tableClient.createEntity({
      partitionKey,
      rowKey,
      count,
    });
  }

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: { count },
  };
};

