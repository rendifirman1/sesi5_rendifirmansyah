const { expect } = require("chai");

describe("GET Single User API", () => {
  it("should return status code 200 and correct user data", async () => {
    const response = await fetch("https://reqres.in/api/users/2");
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data.data).to.have.property("id");
    expect(data.data.id).to.equal(2);
    console.log("User ID:", data.data.id);
  });
});

