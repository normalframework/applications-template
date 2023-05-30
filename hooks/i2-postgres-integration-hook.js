const NormalSdk = require("@normalframework/applications-sdk");
const { Client } = require("pg");

const UPSERT_QUERY = `
INSERT INTO points (uuid, layer, name, value)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (uuid)
  DO UPDATE SET layer = excluded.layer, name = excluded.name, value=excluded.value;
`;

/**
 *
 * @param {Client} client
 * @param {NormalSdk.IPoint} point
 */
async function upsertPoint(client, point) {
  await client.query(UPSERT_QUERY, [
    point.uuid,
    point.layer,
    point.name,
    point.latestValue?.value,
  ]);
}

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, sdk, update }) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "nf",
    user: "postgres",
    password: "password",
  });

  await client.connect();
  if (update) {
    await upsertPoint(client, update);
  } else {
    for (const point of points.values()) {
      await upsertPoint(client, point);
    }
  }
  await client.end();
};
