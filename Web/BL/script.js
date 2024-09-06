document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileViewer = document.getElementById('fileViewer');
    fileViewer.innerHTML = ''; // Clear previous content

    const fileType = file.type;

    if (fileType === 'application/pdf') {
        // Display PDF
        const objectURL = URL.createObjectURL(file);
        const iframe = document.createElement('iframe');
        iframe.src = objectURL;
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        fileViewer.appendChild(iframe);
    } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        // Display PPT
        fileViewer.innerHTML = `<p>PowerPoint files cannot be directly displayed in the browser. Consider using Google Slides or Microsoft PowerPoint to view this file.</p>`;
    } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Display Word
        fileViewer.innerHTML = `<p>Word files cannot be directly displayed in the browser. Consider using Google Docs or Microsoft Word to view this file.</p>`;
    } else {
        fileViewer.innerHTML = `<p>Unsupported file type.</p>`;
    }
});

// Save the file
document.getElementById('saveFileButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('No file selected!');
        return;
    }

    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
