import { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import app from "../server.js";

chai.use(chaiHttp);

// chai.use(chaiHttp);
// const expect = chai.expect;

describe("Authentication API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", (done) => {
      chai
        .request(app)
        .post("/api/auth/register")
        .send({
          name: "Test User",
          email: "test@example.com",
          password: "testpassword",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("email").equal("test@example.com");
          expect(res.body).to.have.property("name").equal("Test User");
          done();
        });
    });
  });
});
