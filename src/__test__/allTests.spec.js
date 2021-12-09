import { getKey } from "../client/js/formHandler"
import { validURL, validateLocalhost } from "../client/js/urlChecker"

// // ../src/client/js/formHandler

// API Test
it("Calling get key async, the code must be 200", async() => {
    let res = await getKey("http://localhost:8081/getKey")
    expect(res.code).toEqual(200);
})

it("Check email validation fasle", () => {
    expect(validURL("localhost")).toEqual(false)
})


it("Check email validation true", () => {
    expect(validURL("www.udacity.com")).toEqual(true)
})


it("Check Localhost is valid", () => {
    expect(validURL("localhost:8000")).toEqual(false)
})

it("Check Localhost is valid", () => {
    expect(validateLocalhost("localhost:8000")).toEqual(true)
})