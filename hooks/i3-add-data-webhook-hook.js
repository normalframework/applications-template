const NormalSdk = require("@normalframework/applications-sdk");

// Call function endpoint: POST {NF_URL}/api/v1/apps/{APP_ID}/hooks/{HOOK_ID}
// Body:
/**
{
  "uuid": "9c521e1b-d8c2-34e3-a679-71dd6394a4fd",
  "value": 123.45,
  "layer": "hpl:bacnet:1"
}
*/

// CURL example:
/* 
curl --request POST \
  --url http://localhost:8080/api/v1/apps/sample/hooks/i3-add-data-webhook \
  --header 'Content-Type: application/json' \
  --data '{
	 "uuid": "9c521e1b-d8c2-34e3-a679-71dd6394a4fd",
		"layer": "hpl:bacnet:1",
	 "value": "123.45"
}'
*/

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ sdk, args }) => {
  if (!args) {
    return NormalSdk.InvokeError("Missing arguments");
  }
  if (!args["uuid"]) {
    return NormalSdk.InvokeError("Missing point uuid");
  }
  if (!args["value"]) {
    return NormalSdk.InvokeError("Missing point value");
  }
  const value = parseFloat(args["value"]);
  if (Number.isNaN(value)) {
    return NormalSdk.InvokeError("Can not parse value");
  }
  try {
    const res = await sdk.normalApi.pointClient.addPointsData({
      uuid: args["uuid"],
      errors: [],
      layer: args["layer"] ?? "hpl:bacnet:1",
      values: [
        {
          ts: NormalSdk.Timestamp.now(),
          valueType: {
            oneofKind: "real",
            real: value,
          },
        },
      ],
    });
    console.log(res);
    return NormalSdk.InvokeSuccess("Data added");
  } catch (e) {
    return NormalSdk.InvokeError("Error adding data");
  }
};
