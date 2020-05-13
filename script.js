let Data = {
    "Title": "",
    "URL": ""
}

// Get Title and URL of current tab
chrome.tabs.getSelected(tab=>{
    Data.Title = tab.title;
    Data.URL = tab.url;
});

// Pop-up window
window.addEventListener('load', () => {
    const txtFormat = localStorage.getItem("format");

    let title = document.getElementById("title");
    let url = document.getElementById("url");
    let qrCode = document.getElementById('qrcode');
    let inputFormat = document.getElementById('format');
    let outputText = document.getElementById('formated-text');

    title.textContent = Data.Title;
    url.textContent = Data.URL;
    inputFormat.value = txtFormat;
    if (txtFormat) {
        outputText.value = txtFormat.replace(/\$title/g, `${Data.Title}`)
                                    .replace(/\$url/g, `${Data.URL}`)
                                    .replace(/\$n/g, `\r\n`);
    }

    document.querySelector('button.save').addEventListener('click',() => {
        console.log(`save`);
        localStorage.setItem("format", document.getElementById('format').value);
    });

    new QRCode(qrCode, {
        text: Data.URL,
        width: 200,
        height: 200,
        colorDark : "#2d2d2d",
        colorLight : "#f1f3f4",
        correctLevel : QRCode.CorrectLevel.M
    });

    let clipboard = new ClipboardJS('button.copy');
});
