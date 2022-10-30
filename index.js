const express = require("express");
const ptp = require("pdf-to-printer");
const fs = require("fs");

const onGeneratePDF = require("./make")

const app = express();
const port = 4000;

app.get('/print', async (req, res) => {

    // printer: 'Xprinter XP-365B',
    const options = {
        printer: 'Microsoft Print to PDF',
    }

    if (req.query.printer) {
        options.printer = req.query.printer
    }

    const payload = {
        sProyecto: "P001-0000650",
        sCliente: "MILTON SALAZAR IGLESIAS",
        sObra: null,
        dRegistro: "2022-09-22T00:00:00.000Z",
        dEntrega: "2022-09-22T19:05:32.820Z",
        nItem: 3,
        sCodTablero: "BDURATX0017",
        sDescTablero: "Duratex Melamina Negro 1830x2440 18mm",
        nAncho: 450,
        nLargo: 800,
        nEspesor: 18,
        nIdPza: 82269,
        nIdProyecto: 949,
        nCantidad: "1/2",
        sCantoA1: null,
        sDescA1: null,
        bA1: null,
        sCantoA2: null,
        sDescA2: null,
        bA2: null,
        sCantoL1: null,
        sDescL1: null,
        bL1: null,
        sCantoL2: null,
        sDescL2: null,
        bL2: null,
        sRanura: "",
        sRanuraTec: null,
        sPerforacion: null,
        sPerforacionTec: null,
        bServicioEsp: false,
        sServicioEsp: null,
        sPlano: "",
        sObservaciones: null,
        nPlano: 0,
        sVeta: " ",
        sCodRanD25: null,
        sCodPerfD25: null,
        sNombreComercial: "AmazonTIC"
    }

    const page = {
        pageSize: {
            width: 141.73,
            height: 141.73
        },
        pageMargins: [0, 0, 0, 0],
    }

    const content = [
        {
            columns: [
                {
                    width: 80.86,
                    margin: [0, 0, 0, 0],
                    stack: [
                        { text: 'P001-0000650', bold: true, fontSize: 8.25 },
                        {
                            columns: [
                                { text: 'ITEM:', width: 30.28, bold: true, fontSize: 8.25 },
                                { text: '333', width: 30.28, bold: true, fontSize: 8.25 },
                                { text: '3/3', width: 30.28, alignment: 'center', fontSize: 8.25 }
                            ]
                        },
                        {
                            columns: [
                                { text: 'PLANO:', width: 30.28, fontSize: 8.25 },
                                { text: '0', width: 30.28, fontSize: 8.25 },
                                { text: 'SE', width: 30.28, alignment: 'center', bold: true, fontSize: 8.25 }
                            ]
                        },
                        {
                            margin: [0, 4, 0, 0],
                            columns: [
                                { text: 'L: ', fontSize: 10.5 },
                                { text: '900', fontSize: 12, bold: true }
                            ]
                        },
                        {
                            columns: [
                                { text: 'A: ', fontSize: 10.5 },
                                { text: '800', fontSize: 12, bold: true }
                            ]
                        }

                    ]
                },
                {
                    width: 60,
                    margin: [0, 0, 0, 0],
                    stack: [
                        { text: '949|82268', alignment: 'center', fontSize: 8.25 },
                        { qr: '949|82268', alignment: 'center', eccLevel: 'H', fit: 60 },
                        { text: '949|82268', alignment: 'center', fontSize: 8.25 }
                    ]
                }
            ]
        },
        {
            margin: [0, 4, 0, 0],
            text: 'D01 - D01 - G01 - D02',
            fontSize: 8.25,
            alignment: 'center',
            bold: true
        },
        {
            columns: [
                { text: 'R-L1-A1', fontSize: 8.25, alignment: 'left', bold: true },
                { text: 'P- 2A2', fontSize: 8.25, alignment: 'right', bold: true }
            ]
        },
        {
            fontSize: 8.25,
            color: '#5c5c5c',
            table: {
                body: [
                    [{ text: 'Milton Salazar Iglesias', alignment: 'center', noWrap: true }],
                    [{ text: 'Duratex Melamina Negro 1830x24…', alignment: 'center', noWrap: true }],
                    [{ text: [{ text: 'Obs.: ', bold: true, color: '#000' }, { text: 'Test observación Item 001 T' }], noWrap: true }],
                ]
            },
            layout: 'noBorders'
        }
    ]

    const tmpFilePath = 'P001-0000650.pdf'

    const response = await onGeneratePDF({ content, page })

    fs.writeFileSync(tmpFilePath, response, 'base64');
    await ptp.print(tmpFilePath, options)
    fs.unlinkSync(tmpFilePath);

    res.status(200).send()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

