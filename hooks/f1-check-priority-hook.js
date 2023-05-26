const NormalSdk = require("@normalframework/applications-sdk");

const PRIORITY_TO_CHECK = 5;

/**
 *
 * @param {NormalSdk.IPoint} point
 * @param {NormalSdk.IRunParams} sdk
 * @returns {boolean} success or not
 */
async function testPoint(point, sdk) {
  // Read current priority array value
  const [startValue, readStartError] = await point.readPriority(
    PRIORITY_TO_CHECK
  );
  if (readStartError) {
    return false;
  }

  // Write value + 1;
  const valueToWrite = (startValue.real ?? 0) + 1;
  const [success] = await point.write(valueToWrite, null, {
    priority: PRIORITY_TO_CHECK,
  });
  if (!success) {
    return false;
  }
  await sdk.sleep(2);

  // Read new priority array value
  const [endValue, readEndError] = await point.readPriority(PRIORITY_TO_CHECK);
  if (readEndError) {
    return false;
  }

  // Validate that write took effect
  return endValue.real === valueToWrite;
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
    console.error(e);
    return NormalSdk.InvokeError("error while execution hook");
  }
};
