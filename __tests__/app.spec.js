const {
  testInstance,
  TestInstance,
  TestApplication,
  point,
  Timestamp,
  program,
} = require("@normalframework/applications-sdk");

describe("Application test", () => {
  /**
   * @type {TestInstance}
   */
  let nf;
  beforeEach(async () => {
    nf = await testInstance();
    await nf.loadFixtures(["fixtures/points.json"]);
  });

  afterEach(async () => {
    await nf.down();
  });

  it("test install", async () => {
    const app = await nf.install();
    const reply = await nf.api.applicationServiceClient.getApplications(
      program.GetApplicationsRequest.create()
    );

    expect(reply.response.applications.length).toBe(1);
    expect(reply.response.applications[0].id).toBe(app.applicationId);
    expect(reply.response.applications[0].status).toBe(
      program.ApplicationStatus.STATUS_INSTALLED
    );
  });

  describe("test test hooks", () => {
    /**
     * @type {TestApplication}
     */
    let app;

    beforeEach(async () => {
      app = await nf.install();
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

      const data = await nf.api.pointClient.getData(
        point.GetDataRequest.create({
          uuids: ["9c521e1b-d8c2-34e3-a679-71dd6394a4fd"],
          to: Timestamp.now(),
        })
      );

      expect(data.response.data.length).toBe(1);
      expect(data.response.data[0].values[0].valueType.double).toBe(10);
    });

    it("test f1-check-priority-hook", async () => {
      const res = await app.startHook({
        hookId: "f1-check-priority",
      });

      expect(res.error).toBeUndefined();
      expect(Object.values(res.results).length).toBe(1);
      expect(res.results[''].returnValue).toBe('success');
    });
  });
});
