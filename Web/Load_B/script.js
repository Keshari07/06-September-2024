document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const fileViewer = document.getElementById('fileViewer');
    fileViewer.innerHTML = ''; // Clear previous content

    Array.from(files).forEach(file => {
        const fileType = file.type;
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileURL = e.target.result;

            if (fileType === 'application/pdf') {
                const iframe = document.createElement('iframe');
                iframe.src = fileURL;
                iframe.style.width = '100%';
                iframe.style.height = '500px';
                fileViewer.appendChild(iframe);
            } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                fileViewer.innerHTML += `<p>PowerPoint files cannot be directly displayed in the browser. Use appropriate software to view this file.</p>`;
            } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                fileViewer.innerHTML += `<p>Word files cannot be directly displayed in the browser. Use appropriate software to view this file.</p>`;
            } else {
                fileViewer.innerHTML += `<p>Unsupported file type.</p>`;
            }
        };

        reader.readAsDataURL(file); // Use readAsDataURL to get a URL for the file
    });
});

document.getElementById('saveFileButton').addEventListener('click', function() {
    const files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert('No file selected!');
        return;
    }

    Array.from(files).forEach(file => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
