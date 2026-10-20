// Facts transcribed from the uploaded portfolio; statuses reflect the owner's latest instructions.
export const resumeViewUrl = 'https://raw.githubusercontent.com/saiprasath00/Leo/main/public/downloads/Sai_Prasath_DP_Resume_Professional.pdf';
export const resumeDownloadUrl = 'https://raw.githubusercontent.com/saiprasath00/Leo/main/public/downloads/Sai_Prasath_Resume_Pack.zip';
export const excelProjectDownloadUrl = 'https://raw.githubusercontent.com/saiprasath00/Leo/main/public/downloads/TCS_Financial_Forecasting_Model.xlsx';

export const powerBiProject = {
  title: 'TCS Financial Outlook Dashboard',
  downloadUrl: 'https://raw.githubusercontent.com/saiprasath00/Leo/main/public/downloads/TCS_Financial_Outlook_Dashboard_PBIP.zip',
  intro: 'A four-page Power BI Desktop scenario-analysis dashboard that turns TCS historical financial data into clear executive, trend, scenario-driver and financial-detail views.',
  downloadNote: 'PBIP source download includes the report project and static workbook. Set its local WorkbookPath before the first refresh; FY2027–FY2028 figures are sensitivity cases, not TCS guidance or consensus.',
  facts: [
    ['Scope', 'Four report pages covering executive KPIs, historical trends, scenario drivers and financial detail.'],
    ['Analytical work', 'Power Query M, a semantic model and DAX measures for revenue, calculated EBITDA proxy, adjusted PAT and organic free cash flow.'],
    ['Data context', 'FY2018–FY2025 historical workbook data and an FY2026 actual baseline; scenario values are analytical sensitivity cases, not TCS guidance, audited actuals or consensus estimates.'],
  ],
  skills: ['Power BI Desktop', 'Power Query', 'DAX', 'Data Modeling', 'KPI Reporting', 'Scenario Analysis'],
};

export const education = [
  { period: '2023 – 2026', title: 'Bachelor of Commerce (B.Com)', institution: "Charan’s Degree College · Bengaluru City University", result: 'CGPA: 9.05', status: 'Completed' },
  { period: 'Feb – Apr 2026', title: 'Intensive Excel Training Program', institution: 'Structured Skill Development · Bengaluru', detail: 'Case-based assignments covering IF, SUMIF, COUNTIF, VLOOKUP, XLOOKUP and INDEX-MATCH, with exposure to Power Query automation, data cleaning and PivotTable-driven analytical reporting.' },
  { period: '2021 – 2023', title: 'Pre-University Certificate (Commerce – SCBA)', institution: 'Dr. Ambedkar PU College · Bengaluru', result: 'Score: 90.50%' },
  { period: '2016 – 2019', title: 'Secondary School Leaving Certificate (SSLC)', institution: 'Sacred Heart Boys’ High School · Bengaluru', result: 'Score: 69.76%' },
];

export const certifications = [
  { provider: 'Google · Coursera', title: 'Google Data Analytics Professional', status: 'In Progress', courses: [['Foundations: Data, Everywhere', '91%'], ['Prepare Data for Exploration', '94%'], ['Ask Questions / Data-Driven Decisions', '90%']] },
  { provider: 'Microsoft · Coursera', title: 'Power BI Data Analyst', status: 'In Progress', courses: [['Preparing Data with Excel', '91%'], ['Harnessing Data with Power BI', '89%'], ['Extract, Transform & Load', '88%'], ['Data Modeling in Power BI', '88%']] },
  { provider: 'EDUCBA · Coursera', title: 'Excel Advanced Functions & Analytics', courses: [['Advanced Functions & Analytics', '100%'], ['Apply, Analyze & Visualize Data', '93%'], ['Getting Started with Excel', '96%']] },
  { provider: 'Tally Education · Coursera', title: 'Fundamentals of Accounting & Reporting', courses: [['Accounting & Reporting (Tally Prime)', '94%'], ['Ledger & journal entries, financial reporting', '✓']] },
];

export const skillGroups = [
  { title: 'Data & Business Intelligence', items: ['Microsoft Excel', 'Power BI', 'Data Cleaning', 'Data Transformation', 'Data Visualization', 'MIS Reporting', 'KPI Reporting', 'Dashboard Development'], detail: 'Excel: PivotTables, VLOOKUP, XLOOKUP, INDEX-MATCH, Power Query, Macros & VBA. Power BI: Data Modeling & DAX.' },
  { title: 'Finance & Accounting', items: ['Financial Analysis', 'Financial Modeling', 'Accounting', 'Tally Prime', 'Capital Budgeting', 'Auditing', 'Statement Analysis', 'Journal & Ledger'], detail: 'A commerce foundation applied to financial statements, scenario modeling and reporting.' },
];

export const languages = [['English', 'Proficient'], ['Tamil', 'Native'], ['Kannada', 'Proficient'], ['Hindi', 'Conversational']];

