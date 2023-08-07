const {
  testInstance,
  TestInstance,
  TestApplication,
  point,
  Timestamp,
  program,
} = require("@normalframework/applications-sdk");

/**
 * @type {TestInstance}
 */
var nf;

describe("Application test", () => {
  beforeAll(async () => {
    nf = await testInstance();
    await nf.loadFixtures(["fixtures/points.json"]);
  });

  it("test install", async () => {
    await nf.install("test-app");
    const reply =
      await nf.sdk.normalApi.applicationServiceClient.getApplications(
        program.GetApplicationsRequest.create()
      );

    expect(reply.response.applications.length).toBe(1);
    expect(reply.response.applications[0].name).toBe("test-app");
    expect(reply.response.applications[0].status).toBe(
      program.ApplicationStatus.STATUS_INSTALLED
    );
  });

  describe("test test hooks", () => {
    /**
     * @type {TestApplication}
     */
    let app;

    beforeAll(async () => {
      app = await nf.getApp("test-app");
    });

    it("test i3-add-data-webhook", async () => {
      const res = await app.startHook({
        args: {
          uuid: "9c521e1b-d8c2-34e3-a679-71dd6394a4fd",
          value: 10,
        },
        hookId: "i3-add-data-webhook",
      });

      expect(res.error).toBeUndefined();

      const data = await nf.sdk.normalApi.pointClient.getData(
        point.GetDataRequest.create({
          uuids: ["9c521e1b-d8c2-34e3-a679-71dd6394a4fd"],
          to: Timestamp.now(),
        })
      );

      expect(data.response.data.length).toBe(1);
      expect(data.response.data[0].values[0].valueType.double).toBe(10);
    });
  });

  afterAll(async () => {
    await nf.down();
  });
});
