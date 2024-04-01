// import { expect } from "chai";
// import chaiHttp from "chai-http";
// import { describe, it } from "mocha";
// import app from "../server.js";

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe("Authentication API", () => {
// //   Clean up test data after each test
//     afterEach(async () => {
//       console.log("after each");
//       await User.deleteMany({});
//     });

//   describe("POST /api/auth/register", () => {
//     it("should register a new user", (done) => {
//       chai
//         .request(app)
//         .post("/api/auth/register")
//         .send({
//           name: "Test User",
//           email: "test@example.com",
//           password: "testpassword",
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(201);
//           expect(res.body).to.have.property("_id");
//           expect(res.body).to.have.property("email").equal("test@example.com");
//           expect(res.body).to.have.property("name").equal("Test User");
//           done();
//         });
//     });
//   });

//     describe("POST /api/auth/", () => {
//       before((done) => {
//         // Register a user before logging in
//         chai
//           .request(app)
//           .post("/api/auth/register")
//           .send({
//             name: "Test User",
//             email: "test@example.com",
//             password: "testpassword",
//           })
//           .end((err, res) => {
//             done();
//           });
//       });

//       it("should log in an existing user", (done) => {
//         chai
//           .request(app)
//           .post("/api/auth/")
//           .send({ email: "test@example.com", password: "testpassword" })
//           .end((err, res) => {
//             expect(res).to.have.status(201);
//             expect(res.body).to.have.property("_id");
//             expect(res.body).to.have.property("email").equal("test@example.com");
//             expect(res.body).to.have.property("name").equal("Test User");
//             expect(res.body).to.have.property("status").equal(true);
//             done();
//           });
//       });
//     });

//     describe("POST /api/auth/logout", () => {
//       it("should log out a user", (done) => {
//         chai
//           .request(app)
//           .post("/api/auth/logout")
//           .end((err, res) => {
//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property("message").equal("user logged out");
//             expect(res.body).to.have.property("status").equal(true);
//             done();
//           });
//       });
//     });
// });
