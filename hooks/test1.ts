// import { random } from 'lodash';
// import { InvokeFn } from '../src/models/AutomationFunction';
import { InvokeFn } from "@normalframework/applications-sdk";

const Supply_Air_Temperature_Reset_Initial_Setpoint = 60;
const Morning_Warmup_Supply_Air_Temperature_Setpoint = 80;

const runner: InvokeFn = async (points, params) => {
  // const test = points.label("ALRMPT");
  // console.log("ALRMPT", test);
  // const mode = points.label("HVACMDCMD");
  // console.log("mode", JSON.stringify(mode, null, 2));
  // if (mode == "Warmup" || mode == "Night Setback") {
  //   // could also be points.label("DATCLSP").set(Morning_Warmup_Supply_Air_Temperature_Setpoint);
  //   await params.setPoint(
  //     points.label("DATCLSP"),
  //     Morning_Warmup_Supply_Air_Temperature_Setpoint
  //   );
  // } else if (mode == "Night Setup" || mode == "Occupied") {
  //   // TODO: what do here?? (Below is from sdk v1 code)
  //   // grp.labels.DATCLSP.write(Scale(oat[0].value, 0,
  //   //   Supply_Air_Temperature_Reset_OATMin, Supply_Air_Temperature_Reset_TMax,
  //   //   Supply_Air_Temperature_Reset_OATMax, Supply_Air_Temperature_Reset_Minimum_Setpoint))
  // }
  // // Supply Air TMax resut using trim and respond
  // if (points.label("RARH").value > 60) {
  //   params.setPoint(points.label("DATCLSP"), 55);
  // } else if (
  //   grp.labels.HVACMDCMD?.changed &&
  //   (mode == "Night Setup" || mode == "occupied")
  // ) {
  //   grp.labels.DATCLSP.write(Supply_Air_Temperature_Reset_Initial_Setpoint);
  // }
  // points.get
  // console.log("pizoings", JSON.stringify(points, null, 2));
  // points.label['zt']
  // params.globalVariables?.set({ label: "testvar1", value: 15 });
  // await params.globalVariables?.set("globaltest1", 78);
  // console.log("variable", JSON.stringify(variable, null, 2));
  // const targetPoint = points.find(
  //   (p) => p["hpl:bacnet:1"].uuid === "c908c5a9-8527-3ee4-9544-ebec0ae15a32"
  // )?.["hpl:bacnet:1"];
  // if (targetPoint) {
  //   console.log("got target point");
  //   params.setPoint(targetPoint, 22);
  // }
  // console.log("ran the thing");
  // // params.globalVariables?.set('test1');
  // const variable = await params.globalVariables?.get("testvar1");
  // await params.globalVariables?.set({ label: "testvar1", value: 12 });
  // console.log("uuid", variable?.uuid);
  // params.groupVariables?.get("somename");
  // params.groupVariables?.set({ label: 'testgroupvar1', value: random(1, 50) });
  // console.log('Invoking function', params.groupKey, points);
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
