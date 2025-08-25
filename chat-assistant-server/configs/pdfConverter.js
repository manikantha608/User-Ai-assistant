import PDFParser from "pdf2json";

export function extractPdfText(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
      const text = pdfData.Pages.map(page =>
        page.Texts.map(t =>
          decodeURIComponent(t.R[0].T)
        ).join(" ")
      ).join("\n");
      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

