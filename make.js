const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('pdfmake/build/vfs_fonts')

pdfMake.vfs = pdfFonts.pdfMake.vfs

const onGeneratePDF = async ({ page, content, styles, pageOrientations = null, info = null, pageHeader, pageFooter }) => {
    return new Promise((resolve, reject) => {
        const docDefinition = {
            ...info ? info : null,
            permissions: {
                compress: true,
                printing: page && page.printing ? page.printing : 'highResolution',
                modifying: page && page.modifying ? page.modifying : false,
                copying: page && page.copying ? page.copying : false,
                annotating: page && page.annotating ? page.annotating : true,
                fillingForms: page && page.fillingForms ? page.fillingForms : true,
                contentAccessibility: page && page.contentAccessibility ? page.contentAccessibility : true,
                documentAssembly: page && page.documentAssembly ? page.documentAssembly : true
            },
            pageSize: page && page.pageSize ? page.pageSize : 'A4',
            pageMargins: page && page.pageMargins ? page.pageMargins : [20, 40, 20, 40],
            header: (currentPage, pageCount) => pageHeader ? pageHeader(currentPage, pageCount) : {},
            footer: (currentPage, pageCount) => pageFooter ? pageFooter(currentPage, pageCount) : {},
            pageOrientation: pageOrientations,
            content: content,
            styles
        }
        try {
            const pdfDocGenerator = pdfMake.createPdf(docDefinition)
            pdfDocGenerator.getBase64(data => resolve(data))
        } catch (error) {
            reject("Error al generar pdf")
        }
    }).catch(error => error)
}

module.exports = onGeneratePDF
