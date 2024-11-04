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
        fetch('http://localhost:9000/api/submit', {
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
                } else {
                    errDiv.innerHTML = 'URL is invalid';
                    errDiv.style.color = "red";
                }
            }); 
    }
}

module.exports = {
    onSubmit
}