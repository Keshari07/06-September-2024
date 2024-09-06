document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;
            document.getElementById('fileContent').textContent = content;
        };

        reader.readAsText(file); // Reads the file as a text file
    } else {
        document.getElementById('fileContent').textContent = 'No file selected';
    }
});
