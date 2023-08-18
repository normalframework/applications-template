const {
  testInstance,
  TestInstance,
  TestApplication,
  program,
} = require("@normalframework/applications-sdk");

describe("Application test", () => {
  /**
   * @type {TestInstance}
   */
  let nf;
  beforeAll(async () => {
    nf = await testInstance();
    await nf.loadFixtures(["fixtures/points.json"]);
  });

  afterAll(async () => {
    await nf.down();
  });

  describe("test install", () => {
    it("should successfully install app", async () => {
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

    afterEach(async () => {
      await nf.cleanup();
    });
  });

  describe("test hooks", () => {
    /**
     * @type {TestApplication}
     */
    let app;

    beforeEach(async () => {
      app = await nf.install();
    });

    afterEach(async () => {
      await nf.cleanup({ keepApps: true });
    });

    it("test i3-add-data-webhook", async () => {
      // Can not mock here
      const res = await app.startHook({
        args: {
          uuid: "9c521e1b-d8c2-34e3-a679-71dd6394a4fd",
          value: 10,
        },
        hookId: "i3-add-data-webhook",
      });

      expect(res.error).toBeUndefined();

      const point = nf.point("9c521e1b-d8c2-34e3-a679-71dd6394a4fd");
      const data = await point.data(undefined, new Date());

      expect(data.length).toBe(1);
      expect(data[0].valueType.double).toBe(10);
    });
  });
});
