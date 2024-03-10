import "./main.js";


const fs = require('fs');
const { PDFDocumentFactory, PDFJS } = require('pdfjs-dist');

async function convertToImagesAndSave(fileInput) {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = async function(event) {
            const typedarray = new Uint8Array(event.target.result);
            const pdf = await PDFDocumentFactory.load(typedarray);
            const totalPages = pdf.numPages;
            const promises = [];

            for (let i = 1; i <= totalPages; i++) {
                promises.push(convertPageToImage(pdf, i));
            }

            Promise.all(promises).then(async function(imagesData) {
                for (let j = 0; j < imagesData.length; j++) {
                    const fileName = `page_${j + 1}.png`;
                    await saveImageToFile(imagesData[j], fileName);
                    console.log(`${fileName} saved.`);
                }
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

async function convertPageToImage(pdf, pageNumber) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = PDFJS.createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    await page.render(renderContext).promise;
    return canvas.toDataURL('image/png');
}

async function saveImageToFile(imageData, fileName) {
  
  addEntryToPageDb(imageData, fileName);
  
}

var j = 0; 




function getNextPage() {
  var arr = returnAllEntriesPageDb();
  var nextPage = arr[j];
  j++;
  return nextPage;
}
  

