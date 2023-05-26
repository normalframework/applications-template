const {
  InvokeSuccess,
  InvokeError,
} = require("@normalframework/applications-sdk");


const WRITE_VALUE = 2.0;

async function testPoint(point, sdk) {
  const [success, writeError] = await point.write(WRITE_VALUE);

  // Check for write error
  if (!success) {
    console.log(writeError);
    return false;
  }

  // Wait 2 seconds
  sdk.sleep(2);

  // Validate that value actually written
  const [value, error] = await point.read();
  if (error) {
    console.log(writeError);
    return false;
  }
  // Not strict equal to skip type validation
  return value.scalar == WRITE_VALUE;
}

/**
 *
 * @param {InvokeFn} a
 * @returns {Promise<SDK.InvokeResult>}
 */
module.exports = async (a) => {
  const pointsArray = [...points.values()];
  try {
    const promises = pointsArray.map((p) => testPoint(p, sdk));
    const results = await Promise.all(promises);
    const success = results.every((s) => s);
    if (success) {
      return InvokeSuccess("success");
    } else {
      console.log("Success count: ", results.filter((s) => s).length);
      console.log("Errors count: ", results.filter((s) => !s).length);
      return InvokeSuccess("some points are not writtable");
    }
  } catch (e) {
    return InvokeError("error while execution hook");
  }
  return 
};
