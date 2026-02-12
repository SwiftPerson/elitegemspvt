/**
 * ═══════════════════════════════════════════════════
 *  GEMSTONE DATA — Edit this file to add/remove
 *  categories and products. Changes will instantly
 *  appear on the Products & Gallery sections.
 * ═══════════════════════════════════════════════════
 */

export interface GemProduct {
    id: string;
    /** i18n key or plain text */
    name: string;
    /** i18n key or plain text */
    description: string;
    /** Path to image in /public */
    image: string;
    /** Product type for display */
    type: 'Necklace' | 'Bracelet' | 'Pendant' | 'Ring' | 'Loose Stone' | 'Beads' | 'Rosary' | 'Bangle';
}

export interface GemCategory {
    id: string;
    /** Display name */
    name: string;
    /** Hex color for accent/tag */
    color: string;
    /** Products in this category */
    products: GemProduct[];
}

/**
 * ─── ADD / EDIT CATEGORIES & PRODUCTS HERE ───
 * Each category has a unique id, display name, accent color,
 * and an array of products with image paths.
 *
 * To add a new category:
 *   1. Add a new object to this array
 *   2. Put product images in /public/images/
 *   3. Done — the UI updates automatically
 */
export const gemCategories: GemCategory[] = [
    {
        id: 'all',
        name: 'All Gems',
        color: '#d4a853',
        products: [], // populated dynamically
    },
    {
        id: 'diamond-quartz',
        name: 'Diamond Quartz',
        color: '#e8e8e8',
        products: [
            { id: 'dq-necklace', name: 'Diamond Quartz Necklace', description: 'Elegant necklaces that embody timeless sophistication.', image: '/images/1.jpeg', type: 'Necklace' },
            { id: 'dq-loose', name: 'Loose Diamond Quartz', description: 'Premium loose stones for custom creations.', image: '/images/2.jpeg', type: 'Loose Stone' },
            { id: 'dq-bracelet', name: 'Diamond Quartz Bracelet', description: 'Exquisite bracelets blending tradition with modern style.', image: '/images/3.jpeg', type: 'Bracelet' },
            { id: 'dq-pendant', name: 'Diamond Quartz Pendant', description: 'Stunning pendants as a centerpiece of any ensemble.', image: '/images/4.jpeg', type: 'Pendant' },
        ],
    },
    {
        id: 'emerald',
        name: 'Emerald',
        color: '#2dd4a0',
        products: [
            { id: 'em-necklace', name: 'Emerald Necklace', description: 'Rich green emerald necklace with gold accents.', image: '/images/necklace-beads.jpeg', type: 'Necklace' },
            { id: 'em-pendant', name: 'Emerald Pendant', description: 'Deep green emerald pendant in a classic setting.', image: '/images/pendant.jpeg', type: 'Pendant' },
            { id: 'em-beads', name: 'Emerald Beads', description: 'Hand-polished emerald beads for custom designs.', image: '/images/rosary.jpeg', type: 'Beads' },
        ],
    },
    {
        id: 'ruby',
        name: 'Ruby',
        color: '#ef4444',
        products: [
            { id: 'rb-necklace', name: 'Ruby Necklace', description: 'Vibrant ruby necklace radiating passion and elegance.', image: '/images/1.jpeg', type: 'Necklace' },
            { id: 'rb-bracelet', name: 'Ruby Bracelet', description: 'A stunning ruby bracelet for every occasion.', image: '/images/3.jpeg', type: 'Bracelet' },
        ],
    },
    {
        id: 'sapphire',
        name: 'Sapphire',
        color: '#60a5fa',
        products: [
            { id: 'sp-pendant', name: 'Sapphire Pendant', description: 'Brilliant blue sapphire pendant capturing light beautifully.', image: '/images/pendant.jpeg', type: 'Pendant' },
            { id: 'sp-loose', name: 'Loose Sapphire', description: 'Premium sapphire stones for bespoke creations.', image: '/images/2.jpeg', type: 'Loose Stone' },
        ],
    },
    {
        id: 'lapis',
        name: 'Lapis Lazuli',
        color: '#6366f1',
        products: [
            { id: 'lp-beads', name: 'Lapis Lazuli Beads', description: 'Deep blue lapis beads for distinctive jewelry.', image: '/images/rosary.jpeg', type: 'Beads' },
            { id: 'lp-necklace', name: 'Lapis Necklace', description: 'Royal blue lapis necklace with intricate details.', image: '/images/necklace-beads.jpeg', type: 'Necklace' },
        ],
    },
    {
        id: 'tourmaline',
        name: 'Tourmaline',
        color: '#f472b6',
        products: [
            { id: 'tm-loose', name: 'Loose Tourmaline', description: 'Multi-colored tourmaline stones in various cuts.', image: '/images/4.jpeg', type: 'Loose Stone' },
            { id: 'tm-bracelet', name: 'Tourmaline Bracelet', description: 'Colorful tourmaline bracelet with natural beauty.', image: '/images/3.jpeg', type: 'Bracelet' },
        ],
    },
    {
        id: 'topaz',
        name: 'Topaz',
        color: '#fbbf24',
        products: [
            { id: 'tz-pendant', name: 'Topaz Pendant', description: 'Warm golden topaz pendant for a radiant look.', image: '/images/pendant.jpeg', type: 'Pendant' },
            { id: 'tz-necklace', name: 'Topaz Necklace', description: 'Glowing topaz necklace crafted with precision.', image: '/images/1.jpeg', type: 'Necklace' },
        ],
    },
];

/**
 * Helper: get all products across all categories (for "All" tab)
 */
export function getAllProducts(): GemProduct[] {
    return gemCategories
        .filter(c => c.id !== 'all')
        .flatMap(c => c.products);
}

/**
 * Helper: get products for a specific category (or all)
 */
export function getProductsByCategory(categoryId: string): GemProduct[] {
    if (categoryId === 'all') return getAllProducts();
    const cat = gemCategories.find(c => c.id === categoryId);
    return cat ? cat.products : [];
}

/**
 * Helper: get category by id
 */
export function getCategoryById(id: string): GemCategory | undefined {
    return gemCategories.find(c => c.id === id);
}
