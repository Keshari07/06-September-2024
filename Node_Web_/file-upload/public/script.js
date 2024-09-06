document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'File uploaded and saved successfully!') {
            displayFiles(data.files);
        } else {
            document.getElementById('fileViewer').innerHTML = 'Error uploading files.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('fileViewer').innerHTML = 'Error uploading files.';
    });
});

function displayFiles(files) {
    const fileViewer = document.getElementById('fileViewer');
    fileViewer.innerHTML = '';

    files.forEach(file => {
        const fileType = file.type;
        const fileURL = `/uploads/${file.name}`;

        if (fileType === 'application/pdf') {
            const iframe = document.createElement('iframe');
            iframe.src = fileURL;
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            fileViewer.appendChild(iframe);
        } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
            fileViewer.innerHTML += `<p><a href="${fileURL}" target="_blank">${file.name}</a> (PowerPoint files need to be downloaded to view)</p>`;
        } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            fileViewer.innerHTML += `<p><a href="${fileURL}" target="_blank">${file.name}</a> (Word files need to be downloaded to view)</p>`;
        } else {
            fileViewer.innerHTML += `<p>Unsupported file type: ${file.name}</p>`;
        }
    });
}
