const NormalSdk = require("@normalframework/applications-sdk");

/**
 *
 * @param {NormalSdk.IPoint} point
 * @param {NormalSdk.IRunParams} sdk
 * @returns {boolean} success or not
 */
async function testPoint(point, sdk) {
  const [initialValue, readError] = await point.read();
  if (readError) {
    return false;
  }

  const targetValue = (initialValue.value.real ?? 0) + 1;
  const [success, writeError] = await point.write({ real: targetValue });

  // Check for write error
  if (!success) {
    return false;
  }

  // Wait 2 seconds
  sdk.sleep(2);

  // Validate that value actually written
  const [value, error] = await point.read();
  if (error) {
    return false;
  }
  // Not strict equal to skip type validation
  return value.value.real === targetValue;
}

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, sdk }) => {
  const pointsArray = [...points.values()];
  try {
    const promises = pointsArray.map((p) => testPoint(p, sdk));
    const results = await Promise.all(promises);
    const success = results.every((s) => s);
    if (success) {
      return NormalSdk.InvokeSuccess("success");
    } else {
      console.log("Success count: ", results.filter((s) => s).length);
      console.log("Errors count: ", results.filter((s) => !s).length);
      return NormalSdk.InvokeSuccess("some points are not writtable");
    }
  } catch (e) {
    return NormalSdk.InvokeSuccess("error while execution hook");
  }
};
