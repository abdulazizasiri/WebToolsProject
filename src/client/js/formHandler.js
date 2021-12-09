const fetch = require("node-fetch");
import { validURL, validateLocalhost } from "./urlChecker"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
        // validURL(formText)

    console.log("::: Form Submitted :::" + formText)
    var text = { "txt": formText }

    let result = getKey("http://localhost:8081/getKey")
        // console.log("RESULT BACK " + (result))
    result.then(function(res) {
        console.log("RESPONSE " + JSON.stringify(res))
        let userKey = JSON.stringify(res.key)
        let data = getSentiment("https://api.meaningcloud.com/sentiment-2.1", userKey, text.txt)
        data.then(function(data) {
                console.log("we got your sentiment " + JSON.stringify(data))
            })
            // document.getElementById('results').innerHTML = res.answer
    })
}
const getSentiment = async(url, key, text) => {
    if (document.getElementById("name").value === "") {
        alert("Please type something")
        return
    }
    if (!validURL(url)) {
        console.log("Not valid url")
        return
    }
    // console.log("type " + typeof url)
    // console.log("URL " + url)

    const formdata = new FormData();
    formdata.append("key", key.replace(/['"]+/g, ''));
    formdata.append("txt", text);
    formdata.append("lang", "en"); // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = fetch(url, requestOptions)
        .then(response => ({
            status: response.status,
            body: response.json()
        }))
        .then(function({ status, body }) {
            // console.log(status, body)
            body.then(function(result) {
                let scoreTag = result.score_tag
                let irony = result.irony
                let confidence = result.confidence
                console.log("Score Tag " + scoreTag)
                console.log("irony " + irony)
                console.log("confidence " + confidence)
                    // console.log(JSON.stringify(result))
                document.getElementById('results').innerHTML = `Score: ${scoreTag},  \nConfidence: ${confidence},  \n
                Is ironic?: ${irony}`

            })
        })

    .catch(error => console.log('error', error));

}

async function getKey(url) {
    if (!validateLocalhost(url)) {
        console.log("Not valid url")
        return
    }
    const response = await fetch(url);

    try {
        const newData = await response.json();
        // console.log("Data came " + JSON.stringify(newData))
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
    // console.log("data passed " + JSON.stringify(data));

}

function sum(a, b) {
    return a + b;
}

export { handleSubmit, getKey, sum }