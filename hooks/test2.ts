// import { random } from 'lodash';
// import { InvokeFn } from '../src/models/AutomationFunction';
import { InvokeFn, Duration } from "@normalframework/applications-sdk";

const runner: InvokeFn = async (points, params) => {
  console.log("hook 2 ran");
  console.log(JSON.stringify(points, null, 2));
  // const above10 = await params.trueFor(
  //   points[0].automation,
  //   Duration.create({ seconds: 60 }),
  //   (v) => v > 10
  // );
  // if (above10) {
  //   console.log("above 10");
  // } else {
  //   console.log("below 10");
  // }

  // console.log("ran the thing 2");
  // console.log("points", JSON.stringify(points, null, 2));
  // params.groupVariables?.set({ label: "testvar1", value: 2 });

  // params.groupVariables?.set({ label: 'testgroupvar1', value: random(1, 50) });
  // console.log('Invoking function', params.groupKey, points);
};

export default runner;

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
