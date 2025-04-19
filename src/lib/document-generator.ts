// Define a type for the report data
interface ReportData {
  incident_date: string;
  insurance_type_name: string;
  location_name: string;
  building_number: string;
  sector_number: string;
  description_fr: string;
  description_ar: string;
  manager_name: string;
  [key: string]: any; // Allow for additional properties
}

import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType, HeadingLevel } from 'docx';

// Function to generate French declaration form
export async function generateDeclarationForm(reportData: ReportData) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "SOCIÉTÉ ALGÉRIENNE D'ASSURANCE (SAA)",
                bold: true,
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "DÉCLARATION DE SINISTRE",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 200,
              after: 400,
            },
          }),
          
          // Header information table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 30,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Numéro de Police:",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 70,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [new Paragraph("AADL/SAA/2025")],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Date du sinistre:",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        new Date(reportData.incident_date).toLocaleDateString()
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Type d'assurance:",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph(reportData.insurance_type_name)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Lieu du sinistre:",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(
                        `${reportData.location_name} - ${reportData.building_number} ${reportData.sector_number}`
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
          
          // Description section
          new Paragraph({
            children: [
              new TextRun({
                text: "DESCRIPTION DU SINISTRE",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 400,
              after: 200,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: reportData.description_fr,
                size: 22,
              }),
            ],
            spacing: {
              before: 200,
              after: 400,
            },
          }),
          
          // Damage estimation table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 70,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "DÉSIGNATION DES DOMMAGES",
                            bold: true,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 30,
                      type: WidthType.PERCENTAGE,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "ESTIMATIONS",
                            bold: true,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Bâtiments:"),
                      new Paragraph("Mobiliers et Agencements:"),
                      new Paragraph("Marchandises, Matériels et Équipements:"),
                      new Paragraph("Dommages causés aux tiers:"),
                      new Paragraph("Autres (préciser la nature):"),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph("")],
                  }),
                ],
              }),
            ],
          }),
          
          // Signature section
          new Paragraph({
            children: [
              new TextRun({
                text: "Fait à __________________ le __________________",
              }),
            ],
            spacing: {
              before: 800,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Signature du déclarant:",
              }),
            ],
            spacing: {
              before: 200,
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Signature et cachet de l'assureur:",
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              before: 400,
            },
          }),
        ],
      },
    ],
  });
  
  return doc;
}

// Function to generate Arabic depot de plainte
export async function generateDepotPlainte(reportData: ReportData) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "وزارة السكن والعمران والمدينة",
                bold: true,
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "AADL. GEST.IMMO",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "فرع التسيير العقاري",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `المرجع: ${new Date().getFullYear()}/ ......... / م ت ع / عــدل`,
                size: 22,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `${new Date().toLocaleDateString('ar-DZ')} عـــنابـة في`,
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "إلــى الســـيــد : وكيـــل الجمـهــوريــــة",
                bold: true,
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 200,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "الشـــاكـــــية : مـــديــرية الفرع الجهوي للشرق عدل للتسيير العقاري",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "المشكــــو منه: شكوى ضــــد مجهول",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "الموضوع : سرقة",
                bold: true,
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "سيـــــــدي،",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "بعـــــد أداء التحيـــة و الاحتــــرام.",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 200,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "- بنــاءا على محتوى المرسوم 14/99 المؤرخ في 04 مارس 2014 المحدد للقواعد المتعلقة بالملكية المشتركة المطبق في مجال الترقية العقــارية.",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 200,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `- بناءا على المعاينات الميدانية التي تقوم بها مصالحنا على مستوى المجمعات السكنية تم تسجيل تجاوز خطير على مستوى ${reportData.location_name} عمارة ${reportData.building_number} قطاع ${reportData.sector_number} من طرف مجهول بموجب تقرير تقدم به مسير الحى السيد ${reportData.manager_name}.`,
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 200,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "تمثلت في :",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `- ${reportData.description_ar}`,
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "لهذه الأسباب و لأجلهـــا: فـــإن مديــــرية الـفـــرع الجهــوي للشرق عـدل للتسييـــر العقــاري ممثـلة في شخص مديــــرها الجهــوي تــلتمس مــن سيادتكم الموقـــرة التــدخـــل العاجل من اجـــل إتخاذ الإجـــــراءات القانونية الـــلازمة والصارمة ضد مرتكب هدا التجاوز والمديرية تتمسك بمتابعته قضائيا.",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 200,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "في انتظار ما ستقـــررونه من إجــراءات تقبلوا منا سيدي وكـيل الجمهـــورية فائـق الاحترام و التقدير",
                size: 22,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 400,
            },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "مـــديـــر الــفــرع الـــجهـــوي",
                bold: true,
                size: 22,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 800,
            },
          }),
        ],
      },
    ],
  });
  
  return doc;
}
