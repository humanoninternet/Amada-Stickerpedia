function openSubpage(title, folderName) {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("subpage").style.display = "block";
    document.getElementById("subpage-title").innerText = title;

    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = '';

    // Fetch the list of files in the specified folder
    fetch(folderName + '/')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const files = Array.from(doc.querySelectorAll('a')).map(link => link.getAttribute('href'));

            // Filter only image files (e.g., PNG)
            const imageFiles = files.filter(file => file.match(/\.(jpeg|jpg|png|gif)$/i));

            // Calculate the number of rows and columns based on the viewport size
            const viewportWidth = window.innerWidth;
            const numColumns = Math.floor(viewportWidth / 400);
            const numRows = Math.ceil(imageFiles.length / numColumns);

            for (let i = 0; i < numRows; i++) {
                const rowElement = document.createElement("div");
                rowElement.className = "image-row";

                for (let j = 0; j < numColumns; j++) {
                    const index = i * numColumns + j;
                    if (index < imageFiles.length) {
                        const imgElement = document.createElement("img");
                        imgElement.src = folderName + '/' + imageFiles[index];
                        imgElement.alt = "Image " + (index + 1);
                        imgElement.style.width = "400px";
                        imgElement.style.height = "400px";

                        const container = document.createElement("div");
                        container.appendChild(imgElement);

                        rowElement.appendChild(container);
                    }
                }

                imageContainer.appendChild(rowElement);
            }
        });

    // Event listener for the subpage heading to go back to the home page
    const subpageTitle = document.getElementById("subpage-title");
    subpageTitle.addEventListener("click", goBackToHomePage);
}

function goBackToHomePage() {
    document.getElementById("home-page").style.display = "block";
    document.getElementById("subpage").style.display = "none";
}

// the folder thing doesnt seem to be working for me.