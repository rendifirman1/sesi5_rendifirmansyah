const {expect} = require("chai");

describe("Delete User API", () => {
    it("should return status 204 on successful delection", async () => {
        const response = await fetch("https://reqres.in/api/users/2", {
            method: "DELETE",
            headers: {
                "x-api-key": "reqres-free-v1",
            },
        });

        expect(response.status).to.equal(204);
        console.log("Status Code:", response.status);
    });
});