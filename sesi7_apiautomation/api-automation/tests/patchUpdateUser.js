const { expect } = require("chai");

describe("PATCH Update User API", () => {
  it("should return status 200 and updated user data", async () => {

    const response = await fetch("https://reqres.in/api/users/2", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({
        name: "Peter Parker",
        job: "Spiderman",
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data.name).to.equal("Peter Parker");
    expect(data.job).to.equal("Spiderman");

    console.log("Updated data:", data);
  });
});