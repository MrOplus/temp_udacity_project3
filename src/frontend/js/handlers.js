const { checkUrlRegex } = require("./validators")
const onSubmit = async (event) => {
    const url = document.querySelector("#url");
    const address = url.value;
    const errDiv = document.querySelector("#error");
    errDiv.innerHTML = "";
    if (!checkUrlRegex(address)) {
        errDiv.innerHTML = "Invalid URL";
        errDiv.style.color = "red";
        return;
    } else {
        errDiv.innerHTML = 'Evaluation in progress...';
        errDiv.style.color = "black";
        fetch(`${process.env.API_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: address })
        }).then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    errDiv.innerHTML = 'URL is valid';
                    errDiv.style.color = "green";
                    const polarity = document.querySelector("#polarity");
                    const subjectivity = document.querySelector("#subjectivity");
                    const text = document.querySelector("#text");

                    polarity.innerHTML = data.data.score_tag;
                    subjectivity.innerHTML = data.data.subjectivity;
                    text.innerHTML = data.data.text;
                } else {
                    errDiv.innerHTML = data.message;
                    errDiv.style.color = "red";
                }
            }); 
    }
}

module.exports = {
    onSubmit
}