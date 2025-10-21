const { expect } = require("chai");

describe("POST Create User API", () => {
  it("should return status 201 and correct response body", async () => {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"},
      body: JSON.stringify({
        name: "Rendi Firmansyah",
        job: "QA Engineer",
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data.name).to.equal("Rendi Firmansyah");
    expect(data.job).to.equal("QA Engineer");

    console.log("Response data:", data);
  });
});