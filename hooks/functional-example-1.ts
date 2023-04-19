// import { random } from 'lodash';
// import { InvokeFn } from '../src/models/AutomationFunction';
import {
  InvokeError,
  InvokeFn,
  InvokeSuccess,
  PropertyIdentifier,
} from "@normalframework/applications-sdk";
import { BACnetReadCommandOptions } from "@normalframework/applications-sdk/dist/sdk/src/ts-proto-client/src/proto/normalgw/hpl/v2/command";

// allow set on point? e.g. always a list or sometimes not?
//

const runner: InvokeFn = async (points, params) => {
  console.log("starting to run");
  const alrmpts = points.byLabel("ALRMPT");

  console.log("alrmpts", alrmpts);

  if (alrmpts && alrmpts.length > 0) {
    const initialRead = await alrmpts.read(PropertyIdentifier.PRESENT_VALUE);

    console.log("initial read ", initialRead);

    const testTarget = 1;

    const writeResult = await alrmpts.set(testTarget);
    console.log("write");
    console.log(writeResult.response);

    await params.sleep(2);

    const testRead = await alrmpts.read(PropertyIdentifier.PRIORITY_ARRAY);

    console.log(JSON.stringify(testRead, null, 2));

    console.log(`Expected ${testTarget}. Received ${testRead[0].scalar}`);

    if (testRead[0].scalar === testTarget.toString()) {
      return InvokeSuccess();
    }
    return InvokeError(
      `Expected ${testTarget}. Received ${testRead[0].scalar}`
    );
  }
  return InvokeError("Points not found");
};

export default runner;

// c07b9dd7-0d65-39ba-9991-57a3e081e3d2

// const hookId = '2e3a0434-c8b6-11ed-afa1-0242ac120002';
// const applicationId = '3c060ff4-c8b6-11ed-afa1-0242ac120002';

// const ahu1 = Query.create({ field: FieldQuery.create({ text: 'AHU-1 AFMS', property: 'device_prop_object_name' }) });
// const ahu2 = Query.create({ field: FieldQuery.create({ text: 'AHU-2 AFMS', property: 'device_prop_object_name' }) });
// const ahu3 = Query.create({ field: FieldQuery.create({ text: 'AHU-3 AFMS', property: 'device_prop_object_name' }) });

// export const prepare = PrepareHookRequest.create({
//   id: applicationId,
//   hook: Hook.create({
//     id: hookId,
//     onUpdate: true,
//     points: PointSelector.create({
//       // groups: ['hpl:bacnet:1.attrs.device_prop_object_name'],
//       query: Query.create({ or: [ahu1, ahu2, ahu3] }),
//       globalVariables: [
//         Variable.create({ label: 'testvar1', attrs: { testattr_2: 'josh is my hero' } }),
//         Variable.create({ label: 'testvar2', attrs: { testattr_2: 'some other attribute' } }),
//       ],
//       groupVariables: [
//         Variable.create({ label: 'testgroupvar1', attrs: { testattr_1: 'group1' } }),
//         Variable.create({ label: 'testgroupvar2', attrs: { testattr_1: 'group2' } }),
//       ],
//     }),
//   }),
// });

// export const invoke = InvokeHookRequest.create({ args: { outsideTemp: '79' } });
