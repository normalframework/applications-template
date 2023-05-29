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
  const [priorityArray, readStartError] = await point.read(
    NormalSdk.PropertyIdentifier.PRIORITY_ARRAY
  );
  if (readStartError) {
    return false;
  }

  // Check if higher priority is already set
  for (let i = 0; i < PRIORITY_TO_CHECK - 1; i++) {
    if (!priorityArray.value.priorityValues[i]?.null) {
      return false;
    }
  }

  const currentValue =
    priorityArray.value.priorityValues[PRIORITY_TO_CHECK - 1]?.real;

  // Write value + 1;
  const valueToWrite = (currentValue ?? 0) + 1;
  const [success, err] = await point.write({ real: valueToWrite }, null, {
    priority: PRIORITY_TO_CHECK,
  });
  if (!success) {
    return false;
  }
  await sdk.sleep(2);

  // Read new priority array value
  const [endArray, readEndError] = await point.read(
    NormalSdk.PropertyIdentifier.PRIORITY_ARRAY
  );
  if (readEndError) {
    return false;
  }

  const endValue = endArray.value.priorityValues[PRIORITY_TO_CHECK - 1]?.real;
  // Validate that write took effect
  return endValue === valueToWrite;
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
