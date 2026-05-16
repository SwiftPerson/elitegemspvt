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
            { id: 'dq-necklace', name: 'Diamond Quartz Necklace', description: 'Elegant necklaces that embody timeless sophistication.', image: '/images/dqnb.jpg', type: 'Necklace' },
            { id: 'dq-necklacelg', name: 'Diamond Quartz Necklace large size', description: 'Elegant necklaces that embody timeless sophistication.', image: '/images/dqnvb.jpg', type: 'Necklace' },
            { id: 'dq-necklacesidedrill', name: 'Diamond Quartz leaf Necklace', description: 'Elegant side drill necklaces that embody timeless sophistication.', image: '/images/dqsdn.jpg', type: 'Necklace' },

        ],
    },
    {
        id: 'emerald',
        name: 'Emerald',
        color: '#2dd4a0',
        products: [
            { id: 'em-necklace', name: 'Emerald Necklace', description: 'Rich green emerald necklace.', image: '/images/efn.jpg', type: 'Necklace' },
            { id: 'em-set', name: 'Emerald set', description: 'Deep green emerald set in a classic setting.', image: '/images/ees.jpg', type: 'Pendant' },
            { id: 'em-beads', name: 'Emerald Beads necklace', description: ' emerald beads necklace facet cut.', image: '/images/efbn.jpg', type: 'Necklace' },
            { id: 'em-tumble', name: 'Emerald tumble necklace', description: ' emerald beads necklace tumble cut.', image: '/images/etn.jpg', type: 'Necklace' },
        ],
    },
    // {
    //     id: 'ruby',
    //     name: 'Ruby',
    //     color: '#ef4444',
    //     products: [
    //         { id: 'rb-necklace', name: 'Ruby Necklace', description: 'Vibrant ruby necklace radiating passion and elegance.', image: '/images/1.jpeg', type: 'Necklace' },
    //         { id: 'rb-bracelet', name: 'Ruby Bracelet', description: 'A stunning ruby bracelet for every occasion.', image: '/images/3.jpeg', type: 'Bracelet' },
    //     ],
    // },
    // {
    //     id: 'sapphire',
    //     name: 'Sapphire',
    //     color: '#60a5fa',
    //     products: [
    //         { id: 'sp-pendant', name: 'Sapphire Pendant', description: 'Brilliant blue sapphire pendant capturing light beautifully.', image: '/images/pendant.jpeg', type: 'Pendant' },
    //         { id: 'sp-loose', name: 'Loose Sapphire', description: 'Premium sapphire stones for bespoke creations.', image: '/images/2.jpeg', type: 'Loose Stone' },
    //     ],
    // },
    // {
    //     id: 'lapis',
    //     name: 'Lapis Lazuli',
    //     color: '#6366f1',
    //     products: [
    //         { id: 'lp-beads', name: 'Lapis Lazuli Beads', description: 'Deep blue lapis beads for distinctive jewelry.', image: '/images/rosary.jpeg', type: 'Beads' },
    //         { id: 'lp-necklace', name: 'Lapis Necklace', description: 'Royal blue lapis necklace with intricate details.', image: '/images/necklace-beads.jpeg', type: 'Necklace' },
    //     ],
    // },
    {
        id: 'black-tourmaline',
        name: 'Black Tourmaline',
        color: '#f472b6',
        products: [
            { id: 'bt-loose', name: 'Black Tourmaline', description: 'black tourmaline necklace.', image: '/images/btneck.jpg', type: 'Necklace' },
        ],
        // },
        // {
        //     id: 'topaz',
        //     name: 'Topaz',
        //     color: '#fbbf24',
        //     products: [
        //         { id: 'tz-pendant', name: 'Topaz Pendant', description: 'Warm golden topaz pendant for a radiant look.', image: '/images/pendant.jpeg', type: 'Pendant' },
        //         { id: 'tz-necklace', name: 'Topaz Necklace', description: 'Glowing topaz necklace crafted with precision.', image: '/images/1.jpeg', type: 'Necklace' },
        //     ],

    },//end of list
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
