import request from "supertest";
import http, { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { nextCsrf } from "../index";

describe("test api route", () => {
  // mock for `apiResolver`'s 5th parameter to please TS
  const apiPreviewPropsMock = {
    previewModeId: "id",
    previewModeEncryptionKey: "key",
    previewModeSigningKey: "key",
  };

  const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    apiResolver(
      req,
      res,
      undefined,
      csrf((req: NextApiRequest, res: NextApiResponse) => {
        return res.status(200).json({ message: "Hello, world." });
      }),
      apiPreviewPropsMock
    );
  };

  const { csrf } = nextCsrf({});
  it("should setup a CSRF token", async () => {
    // If we receive a request without secret in a cookie we assume it's the first request to an API route

    const server = http.createServer(requestListener);
    const agent = await request.agent(server).post("/");

    expect(agent.header["set-cookie"][0]).toEqual(
      expect.stringMatching(/XSRF-TOKEN=(.+); Path=\/; HttpOnly/g)
    );

    expect(agent.text).toBe(JSON.stringify({ message: "Hello, world." }));
  });
});