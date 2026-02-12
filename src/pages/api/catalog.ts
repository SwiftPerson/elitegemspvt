import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { gemCategories, getAllProducts } from '../../data/gemstones';
import { services } from '../../data/services';
import type { GemCategory, GemProduct } from '../../data/gemstones';

// Use InstanceType to get the proper type from the PDFDocument constructor
type Doc = InstanceType<typeof PDFDocument>;

/* ─── Design tokens ─── */
const GOLD = '#c9952a';
const GOLD_LIGHT = '#d4a853';
const DARK_BG = '#0a0a0f';
const DARK_CARD = '#16161e';
const TEXT_LIGHT = '#f5f0e8';
const TEXT_MUTED = '#9a9494';
const WHITE = '#ffffff';

const PAGE_W = 595.28; // A4 width in points
const PAGE_H = 841.89; // A4 height in points
const MARGIN = 50;
const CONTENT_W = PAGE_W - 2 * MARGIN;

function resolvePublicFile(filePath: string): string {
  return path.join(process.cwd(), 'public', filePath);
}

function imageExists(filePath: string): boolean {
  try {
    return fs.existsSync(resolvePublicFile(filePath));
  } catch {
    return false;
  }
}

/** Draw a gold horizontal rule */
function drawGoldRule(doc: Doc, y: number, width: number = 120) {
  const startX = (PAGE_W - width) / 2;
  doc.save()
    .moveTo(startX, y)
    .lineTo(startX + width, y)
    .lineWidth(2)
    .strokeColor(GOLD)
    .stroke()
    .restore();
}

/** Draw a rounded rectangle */
function drawRoundedRect(doc: Doc, x: number, y: number, w: number, h: number, r: number, fill: string) {
  doc.save()
    .roundedRect(x, y, w, h, r)
    .fill(fill)
    .restore();
}

/* ═══════════════════════════════════════════════════
   PAGE BUILDERS
   ═══════════════════════════════════════════════════ */

function buildCoverPage(doc: Doc) {
  // Dark background
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);

  // Gold accent lines
  doc.save()
    .moveTo(0, 0).lineTo(PAGE_W, 0).lineWidth(4).strokeColor(GOLD).stroke()
    .moveTo(0, PAGE_H).lineTo(PAGE_W, PAGE_H).lineWidth(4).strokeColor(GOLD).stroke()
    .restore();

  // Decorative corner elements
  const cornerSize = 60;
  doc.save()
    .moveTo(MARGIN, MARGIN).lineTo(MARGIN + cornerSize, MARGIN).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(MARGIN, MARGIN).lineTo(MARGIN, MARGIN + cornerSize).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(PAGE_W - MARGIN, MARGIN).lineTo(PAGE_W - MARGIN - cornerSize, MARGIN).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(PAGE_W - MARGIN, MARGIN).lineTo(PAGE_W - MARGIN, MARGIN + cornerSize).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(MARGIN, PAGE_H - MARGIN).lineTo(MARGIN + cornerSize, PAGE_H - MARGIN).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(MARGIN, PAGE_H - MARGIN).lineTo(MARGIN, PAGE_H - MARGIN - cornerSize).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(PAGE_W - MARGIN, PAGE_H - MARGIN).lineTo(PAGE_W - MARGIN - cornerSize, PAGE_H - MARGIN).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .moveTo(PAGE_W - MARGIN, PAGE_H - MARGIN).lineTo(PAGE_W - MARGIN, PAGE_H - MARGIN - cornerSize).lineWidth(2).strokeColor(GOLD_LIGHT).stroke()
    .restore();

  // Logo
  const logoPath = resolvePublicFile('/images/logo.png');
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, PAGE_W / 2 - 45, 180, { width: 90 });
    } catch { }
  }

  // Title
  doc.font('Helvetica-Bold')
    .fontSize(36)
    .fillColor(GOLD)
    .text('ELITE GEMS', 0, 310, { align: 'center', width: PAGE_W });

  doc.font('Helvetica')
    .fontSize(14)
    .fillColor(TEXT_MUTED)
    .text('PRIVATE LIMITED', 0, 355, { align: 'center', width: PAGE_W, characterSpacing: 6 });

  drawGoldRule(doc, 390, 140);

  doc.font('Helvetica')
    .fontSize(20)
    .fillColor(TEXT_LIGHT)
    .text('Product Catalog', 0, 420, { align: 'center', width: PAGE_W });

  doc.font('Helvetica')
    .fontSize(11)
    .fillColor(TEXT_MUTED)
    .text('Premium Gemstones & Craftsmanship', 0, 455, { align: 'center', width: PAGE_W });

  // Year
  const year = new Date().getFullYear();
  doc.font('Helvetica')
    .fontSize(10)
    .fillColor(TEXT_MUTED)
    .text(`${year} Edition`, 0, 500, { align: 'center', width: PAGE_W });

  // Bottom tagline
  doc.font('Helvetica')
    .fontSize(9)
    .fillColor(TEXT_MUTED)
    .text('Ethical Sourcing  •  Certified Quality  •  Worldwide Shipping', 0, PAGE_H - 100, { align: 'center', width: PAGE_W });
}

/* ─── Services Page ─── */
function buildServicesPage(doc: Doc) {
  doc.addPage();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);

  // Top gold line
  doc.save()
    .moveTo(0, 0).lineTo(PAGE_W, 0).lineWidth(3).strokeColor(GOLD).stroke()
    .restore();

  // Title
  doc.font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(GOLD)
    .text('OUR SERVICES', 0, MARGIN + 20, { align: 'center', width: PAGE_W });

  drawGoldRule(doc, MARGIN + 55, 100);

  doc.font('Helvetica')
    .fontSize(10)
    .fillColor(TEXT_MUTED)
    .text('Experience excellence in every facet of the gemstone industry.', 0, MARGIN + 70, { align: 'center', width: PAGE_W });

  let yPos = MARGIN + 120;

  services.forEach((service) => {
    const cardH = 110;

    // Card background
    drawRoundedRect(doc, MARGIN, yPos, CONTENT_W, cardH, 10, DARK_CARD);

    // Card border
    doc.save()
      .roundedRect(MARGIN, yPos, CONTENT_W, cardH, 10)
      .lineWidth(0.5)
      .strokeColor('#2a2a35')
      .stroke()
      .restore();

    // Accent bar on the left
    doc.save()
      .rect(MARGIN, yPos + 15, 4, cardH - 30)
      .fill(service.accentColor)
      .restore();

    // Service title
    doc.font('Helvetica-Bold')
      .fontSize(14)
      .fillColor(TEXT_LIGHT)
      .text(service.title, MARGIN + 20, yPos + 18, { width: CONTENT_W - 40 });

    // Service description
    doc.font('Helvetica')
      .fontSize(10)
      .fillColor(TEXT_MUTED)
      .text(service.description, MARGIN + 20, yPos + 40, { width: CONTENT_W - 40 });

    // Service details (smaller)
    doc.font('Helvetica')
      .fontSize(8)
      .fillColor(TEXT_MUTED)
      .text(service.details, MARGIN + 20, yPos + 60, {
        width: CONTENT_W - 40,
        height: 35,
        ellipsis: true,
      });

    yPos += cardH + 20;
  });
}

/* ─── Table of Contents ─── */
function buildToC(doc: Doc) {
  doc.addPage();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);
  doc.save().moveTo(0, 0).lineTo(PAGE_W, 0).lineWidth(3).strokeColor(GOLD).stroke().restore();

  doc.font('Helvetica-Bold').fontSize(22).fillColor(GOLD)
    .text('CONTENTS', 0, MARGIN + 20, { align: 'center', width: PAGE_W });

  drawGoldRule(doc, MARGIN + 55, 80);

  const categoriesWithProducts = gemCategories.filter(c => c.id !== 'all' && c.products.length > 0);

  let tocY = MARGIN + 80;

  // Services entry
  doc.circle(MARGIN + 20, tocY + 6, 4).fill(GOLD);
  doc.font('Helvetica').fontSize(12).fillColor(TEXT_LIGHT)
    .text('Our Services', MARGIN + 35, tocY);
  tocY += 35;

  // Category entries
  categoriesWithProducts.forEach((cat) => {
    // Category color dot
    doc.circle(MARGIN + 20, tocY + 6, 4).fill(cat.color);

    doc.font('Helvetica')
      .fontSize(12)
      .fillColor(TEXT_LIGHT)
      .text(cat.name, MARGIN + 35, tocY);

    doc.font('Helvetica')
      .fontSize(10)
      .fillColor(TEXT_MUTED)
      .text(`${cat.products.length} item${cat.products.length !== 1 ? 's' : ''}`, PAGE_W - MARGIN - 80, tocY, { width: 80, align: 'right' });

    // Dotted line
    const dotsY = tocY + 8;
    const dotsStart = MARGIN + 35 + doc.widthOfString(cat.name) + 10;
    const dotsEnd = PAGE_W - MARGIN - 90;
    for (let dx = dotsStart; dx < dotsEnd; dx += 6) {
      doc.circle(dx, dotsY, 0.5).fill(TEXT_MUTED);
    }

    tocY += 35;
  });

  // Contact entry
  doc.circle(MARGIN + 20, tocY + 6, 4).fill(GOLD);
  doc.font('Helvetica').fontSize(12).fillColor(TEXT_LIGHT)
    .text('Contact Us', MARGIN + 35, tocY);
}

/* ─── Category Page Header ─── */
function buildCategoryPage(doc: Doc, category: GemCategory) {
  doc.addPage();

  // Dark background
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);

  // Top gold line
  doc.save()
    .moveTo(0, 0).lineTo(PAGE_W, 0).lineWidth(3).strokeColor(GOLD).stroke()
    .restore();

  // Category color accent bar
  doc.rect(MARGIN, MARGIN, 4, 30).fill(category.color);

  // Category title
  doc.font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(GOLD)
    .text(category.name.toUpperCase(), MARGIN + 16, MARGIN + 3, { width: PAGE_W - 2 * MARGIN - 20 });

  doc.font('Helvetica')
    .fontSize(10)
    .fillColor(TEXT_MUTED)
    .text(`${category.products.length} product${category.products.length !== 1 ? 's' : ''}`, MARGIN + 16, MARGIN + 32);

  drawGoldRule(doc, MARGIN + 55, PAGE_W - 2 * MARGIN);

  return MARGIN + 70;
}

/* ─── Product Card ─── */
function buildProductCard(doc: Doc, product: GemProduct, x: number, y: number, cardW: number) {
  const cardH = 260;
  const imgH = 160;
  const padding = 12;

  // Card background
  drawRoundedRect(doc, x, y, cardW, cardH, 8, DARK_CARD);

  // Card border
  doc.save()
    .roundedRect(x, y, cardW, cardH, 8)
    .lineWidth(0.5)
    .strokeColor('#2a2a35')
    .stroke()
    .restore();

  // Gold top accent
  doc.save()
    .moveTo(x + 20, y)
    .lineTo(x + cardW - 20, y)
    .lineWidth(1.5)
    .strokeColor(GOLD)
    .opacity(0.6)
    .stroke()
    .restore();

  // Product image
  const imgPath = resolvePublicFile(product.image);
  if (fs.existsSync(imgPath)) {
    try {
      doc.save();
      doc.roundedRect(x + padding, y + padding, cardW - 2 * padding, imgH, 6).clip();
      doc.image(imgPath, x + padding, y + padding, {
        width: cardW - 2 * padding,
        height: imgH,
        cover: [cardW - 2 * padding, imgH] as [number, number],
      });
      doc.restore();
    } catch {
      // fallback: gray placeholder
      drawRoundedRect(doc, x + padding, y + padding, cardW - 2 * padding, imgH, 6, '#1e1e28');
      doc.font('Helvetica').fontSize(9).fillColor(TEXT_MUTED)
        .text('Image', x + padding, y + padding + imgH / 2 - 5, { width: cardW - 2 * padding, align: 'center' });
    }
  }

  // Type badge
  doc.save();
  const badgeText = product.type;
  const badgeW = doc.font('Helvetica').fontSize(7).widthOfString(badgeText) + 14;
  drawRoundedRect(doc, x + cardW - padding - badgeW - 4, y + padding + 6, badgeW, 16, 8, 'rgba(0,0,0,0.6)');
  doc.font('Helvetica').fontSize(7).fillColor(TEXT_LIGHT)
    .text(badgeText, x + cardW - padding - badgeW - 4, y + padding + 10, { width: badgeW, align: 'center' });
  doc.restore();

  // Product name
  const textY = y + padding + imgH + 10;
  doc.font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(TEXT_LIGHT)
    .text(product.name, x + padding, textY, { width: cardW - 2 * padding, lineBreak: true });

  // Description
  doc.font('Helvetica')
    .fontSize(8)
    .fillColor(TEXT_MUTED)
    .text(product.description, x + padding, textY + 18, {
      width: cardW - 2 * padding,
      lineBreak: true,
      height: 30,
      ellipsis: true,
    });

  return cardH;
}

/* ─── Contact Page ─── */
function buildContactPage(doc: Doc) {
  doc.addPage();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);

  // Gold lines
  doc.save()
    .moveTo(0, 0).lineTo(PAGE_W, 0).lineWidth(3).strokeColor(GOLD).stroke()
    .moveTo(0, PAGE_H).lineTo(PAGE_W, PAGE_H).lineWidth(3).strokeColor(GOLD).stroke()
    .restore();

  doc.font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(GOLD)
    .text('GET IN TOUCH', 0, 200, { align: 'center', width: PAGE_W });

  drawGoldRule(doc, 240, 100);

  const contactInfo = [
    { label: 'Address', value: 'Shop #20, MC Plaza, Namak Mandi, Peshawar, Pakistan' },
    { label: 'WhatsApp', value: '+92 333 9134320' },
    { label: 'Email', value: 'elitegems@protonmail.com' },
    { label: 'Etsy', value: 'elitegemsprivate.etsy.com' },
    { label: 'eBay', value: 'ebay.com/usr/elitegems_pvt' },
  ];

  let contactY = 270;
  for (const info of contactInfo) {
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(GOLD_LIGHT)
      .text(info.label, 0, contactY, { align: 'center', width: PAGE_W });

    doc.font('Helvetica')
      .fontSize(11)
      .fillColor(TEXT_LIGHT)
      .text(info.value, 0, contactY + 15, { align: 'center', width: PAGE_W });

    contactY += 50;
  }

  // Footer note
  doc.font('Helvetica')
    .fontSize(9)
    .fillColor(TEXT_MUTED)
    .text('We offer worldwide shipping with certified quality gemstones.', 0, PAGE_H - 120, { align: 'center', width: PAGE_W });

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor(TEXT_MUTED)
    .text(`© ${new Date().getFullYear()} Elite Gems Private Limited. All rights reserved.`, 0, PAGE_H - 100, { align: 'center', width: PAGE_W });
}

/* ─── Page Numbers ─── */
function addPageNumber(doc: Doc, pageNum: number) {
  doc.font('Helvetica')
    .fontSize(8)
    .fillColor(TEXT_MUTED)
    .text(`${pageNum}`, 0, PAGE_H - 35, { align: 'center', width: PAGE_W });
}

/* ═══════════════════════════════════════════════════
   API HANDLER
   ═══════════════════════════════════════════════════ */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="EliteGems-Catalog.pdf"');

    const doc = new PDFDocument({ size: 'A4', margin: MARGIN, bufferPages: true });
    doc.pipe(res);

    // ─── 1. COVER PAGE ───
    buildCoverPage(doc);

    // ─── 2. TABLE OF CONTENTS ───
    buildToC(doc);

    // ─── 3. SERVICES PAGE ───
    buildServicesPage(doc);

    // ─── 4. CATEGORY PAGES WITH PRODUCTS ───
    const categoriesWithProducts = gemCategories.filter(c => c.id !== 'all' && c.products.length > 0);

    let pageNum = 4; // Cover(1) + ToC(2) + Services(3)

    for (const category of categoriesWithProducts) {
      let startY = buildCategoryPage(doc, category);
      pageNum++;

      const cols = 2;
      const gap = 16;
      const cardW = (PAGE_W - 2 * MARGIN - gap) / cols;
      let col = 0;

      for (let i = 0; i < category.products.length; i++) {
        const product = category.products[i];
        const x = MARGIN + col * (cardW + gap);

        if (startY + 270 > PAGE_H - 60) {
          addPageNumber(doc, pageNum);
          doc.addPage();
          doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);
          doc.save().moveTo(0, 0).lineTo(PAGE_W, 0).lineWidth(3).strokeColor(GOLD).stroke().restore();
          startY = MARGIN + 20;
          col = 0;
          pageNum++;
        }

        buildProductCard(doc, product, x, startY, cardW);
        col++;

        if (col >= cols) {
          col = 0;
          startY += 275;
        }
      }

      // If last row was incomplete, advance Y
      if (col > 0) startY += 275;

      addPageNumber(doc, pageNum);
    }

    // ─── 5. CONTACT PAGE ───
    buildContactPage(doc);
    pageNum++;
    addPageNumber(doc, pageNum);

    doc.end();
  } catch (err) {
    console.error('Catalog generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate catalog' });
    }
  }
}
