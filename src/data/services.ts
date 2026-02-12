/**
 * Service definitions used by both the UI (ServicesSection) and PDF catalog.
 * Keep icon-related concerns out of this file so it can be imported server-side.
 */

export interface ServiceData {
    id: string;
    title: string;
    description: string;
    accentColor: string;
    details: string;
}

export const services: ServiceData[] = [
    {
        id: 'drilling',
        title: 'Gemstone Drilling',
        description: 'Precision Laser and diamond drilling for all types of gemstones, from soft to extremely hard minerals.',
        details: 'We use state-of-the-art Laser drilling technology to create perfect holes without risking fractures. Suitable for beads, pendants, and industrial components in any gemstone variety.',
        accentColor: '#d4a853',
    },
    {
        id: 'beads',
        title: 'Beads Making',
        description: 'Custom bead manufacturing in various shapes: rounds, faceted, rondelles, and unique free-form designs.',
        details: 'Our artisans specialize in transforming rough material into uniform or graduated bead strands. We offer various finishes from high-polish to matte, ensuring consistent size and quality.',
        accentColor: '#2dd4a0',
    },
    {
        id: 'polishing',
        title: 'Gemstone Polishing',
        description: 'Professional polishing services to restore the luster and brilliance of your gemstones and jewelry.',
        details: 'Using premium diamond abrasives and traditional techniques, we remove scratches and surface wear to bring back the original fire and brilliance of your gems.',
        accentColor: '#60a5fa',
    },
    {
        id: 'faceting',
        title: 'Gemstone Faceting',
        description: 'Expert faceting to maximize light return and color purity following precise geometric patterns.',
        details: 'Our master faceters use precision machinery to cut gemstones into standard or custom designs (Brilliant, Emerald, Radiant, etc.), optimized for the specific refractive index of each mineral.',
        accentColor: '#ef4444',
    },
];
