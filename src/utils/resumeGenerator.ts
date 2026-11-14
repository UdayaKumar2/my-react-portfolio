import { PROFILE_DATA } from '../data/profile';
import { SKILL_CATEGORIES } from '../data/skills';
import {
  CERTIFICATIONS_AND_ACHIEVEMENTS,
  EDUCATION_ENTRIES,
  EXPERIENCE_ENTRIES,
} from '../data/experience';
import { PROJECTS_DATA } from '../data/projects';

function escapePdfText(text: string): string {
  return text
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '–' || ch === '—') return '-';
      if (ch === '·') return '-';
      return ' ';
    })
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

interface PdfLine {
  text: string;
  size: number;
  bold?: boolean;
  gapAfter?: number;
}

function buildResumeLines(): PdfLine[] {
  const lines: PdfLine[] = [];

  lines.push({ text: PROFILE_DATA.name.toUpperCase(), size: 18, bold: true, gapAfter: 4 });
  lines.push({ text: PROFILE_DATA.role, size: 11, bold: true, gapAfter: 4 });
  lines.push({
    text: `${PROFILE_DATA.location} | ${PROFILE_DATA.email} | ${PROFILE_DATA.phone}`,
    size: 9,
    gapAfter: 2,
  });
  lines.push({
    text: `LinkedIn: ${PROFILE_DATA.linkedin}`,
    size: 9,
    gapAfter: 14,
  });

  lines.push({ text: 'PROFESSIONAL SUMMARY', size: 11, bold: true, gapAfter: 5 });
  for (const l of wrapText(PROFILE_DATA.summary, 90)) {
    lines.push({ text: l, size: 9.5, gapAfter: 2 });
  }
  lines.push({ text: '', size: 6, gapAfter: 6 });

  lines.push({ text: 'EXPERIENCE', size: 11, bold: true, gapAfter: 5 });
  for (const exp of EXPERIENCE_ENTRIES) {
    const loc = exp.location ? ` (${exp.location})` : '';
    lines.push({
      text: `${exp.company}${loc} - ${exp.role} | ${exp.period}`,
      size: 9.5,
      bold: true,
      gapAfter: 4,
    });
  }
  lines.push({ text: '', size: 6, gapAfter: 6 });

  lines.push({ text: 'TECHNICAL EXPERTISE', size: 11, bold: true, gapAfter: 5 });
  for (const cat of SKILL_CATEGORIES) {
    const joined = `${cat.label}: ${cat.items.map((i) => i.name).join(', ')}`;
    for (const l of wrapText(joined, 92)) {
      lines.push({ text: l, size: 9.5, gapAfter: 2 });
    }
  }
  lines.push({ text: '', size: 6, gapAfter: 6 });

  lines.push({ text: 'FEATURED PROJECTS', size: 11, bold: true, gapAfter: 5 });
  for (const proj of PROJECTS_DATA.filter((p) => p.filterGroup === 'engineering')) {
    lines.push({
      text: `${proj.index}. ${proj.title} [${proj.technologies.join(', ')}]`,
      size: 9.5,
      bold: true,
      gapAfter: 2,
    });
    for (const l of wrapText(proj.description, 90)) {
      lines.push({ text: l, size: 9.2, gapAfter: 2 });
    }
    lines.push({ text: '', size: 4, gapAfter: 3 });
  }

  lines.push({ text: 'EDUCATION', size: 11, bold: true, gapAfter: 5 });
  for (const edu of EDUCATION_ENTRIES) {
    const details = [
      edu.institution,
      edu.period ? `(${edu.period})` : '',
    ]
      .filter(Boolean)
      .join(' ');
    lines.push({
      text: details
        ? `${edu.degree} - ${details} | ${edu.score}`
        : `${edu.degree} | ${edu.score}`,
      size: 9.3,
      gapAfter: 3,
    });
  }
  lines.push({ text: '', size: 6, gapAfter: 6 });

  lines.push({ text: 'CERTIFICATIONS & ACHIEVEMENTS', size: 11, bold: true, gapAfter: 5 });
  for (const cert of CERTIFICATIONS_AND_ACHIEVEMENTS) {
    const period = cert.period ? ` (${cert.period})` : '';
    lines.push({
      text: `${cert.issuer}${period}: ${cert.title}`,
      size: 9.3,
      gapAfter: 3,
    });
  }
  lines.push({ text: '', size: 6, gapAfter: 6 });

  lines.push({ text: 'LANGUAGES & INTERESTS', size: 11, bold: true, gapAfter: 5 });
  lines.push({
    text: `Languages: ${PROFILE_DATA.languages.map((l) => `${l.language} (${l.proficiency})`).join(' | ')}`,
    size: 9.3,
    gapAfter: 2,
  });
  lines.push({
    text: `Interests: ${PROFILE_DATA.interests.join(', ')}`,
    size: 9.3,
    gapAfter: 2,
  });

  return lines;
}

export function createResumePdfBlob(): Blob {
  const lines = buildResumeLines();
  const pageHeight = 792;
  const pageWidth = 612;
  const marginX = 48;
  let y = pageHeight - 48;

  const streamCommands: string[] = [];
  for (const line of lines) {
    if (line.text) {
      const fontRef = line.bold ? '/F2' : '/F1';
      streamCommands.push('BT');
      streamCommands.push(`${fontRef} ${line.size} Tf`);
      streamCommands.push(`1 0 0 1 ${marginX} ${y.toFixed(1)} Tm`);
      streamCommands.push(`(${escapePdfText(line.text)}) Tj`);
      streamCommands.push('ET');
    }
    y -= line.size + (line.gapAfter ?? 3);
    if (y < 42) break;
  }

  const streamContent = streamCommands.join('\n');

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n`,
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadResumePdf(): void {
  const blob = createResumePdfBlob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Udayakumar_P_Resume.pdf';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
