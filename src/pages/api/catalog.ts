// src/pages/api/catalog.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';

type Product = {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string; // path under /public
};

const products: Product[] = [
  { title: 'Diamond Quartz Necklaces', subtitle: 'Timeless elegance', description: 'Our Diamond Quartz Necklaces are meticulously crafted to showcase the natural brilliance and clarity of each gemstone.', image: '/images/p1.jpeg' },
  { title: 'Loose Diamond Quartz', subtitle: 'Premium loose stones', description: 'Sourced from the finest mines, our loose Diamond Quartz is perfect for bespoke jewelry designs.', image: '/images/p2.jpeg' },
  { title: 'Bracelets', subtitle: 'Tradition × modern', description: 'Meticulous design, comfortable fit — perfect for every occasion.', image: '/images/p3.jpeg' },
  { title: 'Pendants', subtitle: 'Statement centerpieces', description: 'Each pendant is a masterpiece of design and craftsmanship.', image: '/images/p4.jpeg' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="EliteGems-Catalog.pdf"');

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Pipe PDF document into the response
    doc.pipe(res);

    // Title page
    doc.fontSize(28).fillColor('#1f2937').text('Elite Gems — Product Catalog', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#6b7280').text('Exquisite gemstone jewelry & manufacturing', { align: 'center' });
    doc.moveDown(2);

    // Insert logo if available in /public/images/logo.png
    try {
      doc.image('public/images/logo.png', doc.page.width / 2 - 40, doc.y, { width: 80 });
    } catch (e) {
      // ignore if no logo file
    }

    doc.addPage();

    // Product listing
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const yBefore = doc.y;

      // Try to place image left
      if (p.image) {
        try {
          // image with fixed width, auto height
          doc.image(`public${p.image}`, { fit: [150, 150], align: 'left' });
        } catch (err) {
          // ignore missing images
        }
      }

      // Move to right of image
      doc.fontSize(16).fillColor('#111827').text(p.title, 220, yBefore, { continued: false });
      doc.moveDown(0.25);
      if (p.subtitle) doc.fontSize(11).fillColor('#6b7280').text(p.subtitle, { align: 'left' });
      doc.moveDown(0.5);
      if (p.description) {
        doc.fontSize(10).fillColor('#374151').text(p.description, { align: 'left', width: doc.page.width - 100 });
      }

      doc.moveDown(1.5);
      if ((i + 1) % 2 === 0) doc.addPage(); // new page every 2 items
    }

    doc.addPage();
    doc.fontSize(10).fillColor('#6b7280').text('Contact us: Shop #20, MC Plaza, Namak Mandi, Peshawar • WhatsApp: +92 333 9134320 • Email: elitegems@protonmail.com', { align: 'center' });

    doc.end();
    // NOTE: piping to res will cause Next to finalize the response when doc.end() is called.
  } catch (err) {
    console.error('Catalog generation error', err);
    res.status(500).json({ error: 'Failed to generate catalog' });
  }
}
