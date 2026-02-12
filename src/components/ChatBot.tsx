import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { FaGem } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { gemCategories, getAllProducts } from '../data/gemstones';
import { services } from '../data/services';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
  priority: number;
  followUps?: string[];
}

/* ═══════════════════════════════════════════════════
   KNOWLEDGE BASE — built from actual product & company data
   ═══════════════════════════════════════════════════ */

function buildKnowledgeBase(t: (key: string) => string): KnowledgeEntry[] {
  // --- Dynamic product info ---
  const allProducts = getAllProducts();
  const categories = gemCategories.filter(c => c.id !== 'all');

  return [
    // ══════ GREETINGS ══════
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'assalam', 'salam', 'salaam'],
      response: "Hello! 👋 Welcome to Elite Gems. I'm your virtual assistant. How can I help you today?\n\nYou can ask me about our gemstones, services, pricing, shipping, or anything else!",
      category: 'greeting',
      priority: 10,
      followUps: ['What gemstones do you have?', 'Tell me about your services', 'How can I place an order?'],
    },

    // ══════ GRATITUDE / FAREWELL ══════
    {
      keywords: ['thank', 'thanks', 'thx', 'appreciate', 'grateful'],
      response: "You're welcome! 😊 We're always happy to help. Is there anything else you'd like to know?",
      category: 'gratitude',
      priority: 10,
      followUps: ['Tell me more about your products', 'How do I contact you?'],
    },
    {
      keywords: ['bye', 'goodbye', 'see you', 'later', 'take care'],
      response: "Goodbye! 👋 Thank you for choosing Elite Gems. Feel free to come back anytime. We're always here to help!",
      category: 'farewell',
      priority: 10,
    },

    // ══════ COMPANY INFO ══════
    {
      keywords: ['about', 'who are you', 'company', 'elite gems', 'tell me about', 'what is elite'],
      response: "Elite Gems Pvt Ltd is a premier gemstone and jewelry company based in Peshawar, Pakistan. 💎\n\nWith decades of experience, we specialize in:\n• Sourcing premium gemstones directly from mines\n• Expert gemstone processing (drilling, faceting, polishing, bead-making)\n• Crafting bespoke jewelry pieces\n\nWe serve customers worldwide through our shop, Etsy, eBay, WhatsApp, and WeChat.",
      category: 'about',
      priority: 5,
      followUps: ['Where are you located?', 'What services do you offer?', 'What gemstones do you sell?'],
    },

    // ══════ LOCATION & ADDRESS ══════
    {
      keywords: ['location', 'address', 'where', 'find you', 'shop', 'store', 'visit', 'directions', 'map'],
      response: "📍 You can visit us at:\n\n**Shop #20, MC Plaza, Namak Mandi, Peshawar, KPK, Pakistan**\n\nWe're open from 9:00 AM to 9:00 PM, every day.\n\nYou can also reach us online if you can't visit in person!",
      category: 'location',
      priority: 8,
      followUps: ['What are your operating hours?', 'Can I order online?', 'Do you ship internationally?'],
    },

    // ══════ HOURS ══════
    {
      keywords: ['hour', 'hours', 'time', 'timing', 'open', 'close', 'when', 'schedule', 'working days', 'availability'],
      response: "🕐 We're open every day from **9:00 AM to 9:00 PM** (Pakistan Standard Time).\n\nFor online inquiries, you can reach us anytime on WhatsApp and we'll respond as soon as possible!",
      category: 'hours',
      priority: 8,
      followUps: ['Where are you located?', 'How can I contact you?'],
    },

    // ══════ CONTACT ══════
    {
      keywords: ['contact', 'reach', 'phone', 'call', 'email', 'whatsapp', 'wechat', 'chat', 'message', 'talk'],
      response: "📞 Here's how to reach us:\n\n• **WhatsApp**: +92 333 9134320\n• **Email**: elitegems@protonmail.com\n• **WeChat**: Scan the QR code (click the green button)\n• **Visit**: Shop #20, MC Plaza, Namak Mandi, Peshawar\n\nFeel free to contact us for inquiries, custom orders, or consultations!",
      category: 'contact',
      priority: 8,
      followUps: ['How can I place an order?', 'Do you offer custom jewelry?'],
    },

    // ══════ ORDERING ══════
    {
      keywords: ['order', 'buy', 'purchase', 'how to order', 'place order', 'checkout', 'cart'],
      response: "🛒 You can place an order through multiple channels:\n\n1. **WhatsApp**: Message us at +92 333 9134320\n2. **Etsy**: Visit elitegemsprivate.etsy.com\n3. **eBay**: Visit ebay.com/usr/elitegems_pvt\n4. **WeChat**: Scan our QR code\n5. **In-Person**: Visit our Peshawar shop\n\nSimply tell us what you're looking for and we'll guide you through the process!",
      category: 'ordering',
      priority: 9,
      followUps: ['Do you ship internationally?', 'What payment methods do you accept?', 'What gemstones do you have?'],
    },

    // ══════ SHIPPING ══════
    {
      keywords: ['ship', 'shipping', 'delivery', 'deliver', 'international', 'worldwide', 'send', 'courier', 'tracking', 'dhl', 'fedex'],
      response: "🌍 Yes, we ship worldwide!\n\n• **International Shipping**: Via DHL, FedEx, and other trusted couriers\n• **Tracking**: Full tracking provided on every shipment\n• **Insurance**: All shipments are insured for your peace of mind\n• **Packaging**: Premium secure packaging to protect your gemstones\n\nShipping costs depend on the destination and order value. Contact us for a quote!",
      category: 'shipping',
      priority: 8,
      followUps: ['How long does shipping take?', 'How can I place an order?'],
    },

    // ══════ PRICING ══════
    {
      keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'affordable', 'budget', 'rate', 'discount', 'offer', 'deal', 'sale'],
      response: "💰 Our pricing varies by gemstone type, size, quality, and cut:\n\n• We offer competitive prices with direct mine-to-market sourcing\n• Wholesale pricing available for bulk orders\n• Custom quotes for bespoke jewelry\n• Discounts on returning customer orders\n\nFor specific pricing, please share the item you're interested in and we'll provide a detailed quote!",
      category: 'pricing',
      priority: 8,
      followUps: ['What gemstones do you have?', 'Do you offer wholesale?', 'How can I order?'],
    },

    // ══════ WHOLESALE ══════
    {
      keywords: ['wholesale', 'bulk', 'large order', 'dealer', 'reseller', 'b2b', 'business'],
      response: "📦 Yes, we offer wholesale/bulk pricing!\n\n• **Bulk loose gemstones** at competitive rates\n• **Custom bead strands** in any quantity\n• **Volume discounts** available\n• **Dedicated account manager** for wholesale clients\n\nContact us on WhatsApp at +92 333 9134320 to discuss your requirements.",
      category: 'wholesale',
      priority: 8,
      followUps: ['How can I contact you?', 'What gemstones do you offer?'],
    },

    // ══════ GEMSTONE CATEGORIES ══════
    {
      keywords: ['gemstone', 'gem', 'stone', 'gems', 'what do you have', 'collection', 'catalog', 'types', 'variety', 'mineral'],
      response: `💎 We carry a stunning collection of gemstones:\n\n${categories.map(c => `• **${c.name}** — ${c.products.length} item${c.products.length !== 1 ? 's' : ''}`).join('\n')}\n\nEach gemstone is ethically sourced and quality-verified. Ask me about any specific gemstone for more details!`,
      category: 'gemstones',
      priority: 7,
      followUps: categories.length > 0
        ? [`Tell me about ${categories[0]?.name}`, `Tell me about ${categories[1]?.name}`, 'Do you have loose stones?']
        : [],
    },

    // ══════ PRODUCT TYPES ══════
    {
      keywords: ['necklace', 'necklaces'],
      response: `📿 We offer beautiful gemstone necklaces:\n\n${allProducts.filter(p => p.type === 'Necklace').map(p => `• **${p.name}** — ${p.description}`).join('\n')}\n\nWould you like to see images or get pricing?`,
      category: 'product-type',
      priority: 7,
      followUps: ['How can I order?', 'Do you make custom necklaces?'],
    },
    {
      keywords: ['bracelet', 'bracelets', 'bangle', 'bangles'],
      response: `✨ Here are our bracelets & bangles:\n\n${allProducts.filter(p => p.type === 'Bracelet' || p.type === 'Bangle').map(p => `• **${p.name}** — ${p.description}`).join('\n')}\n\nInterested in any of these?`,
      category: 'product-type',
      priority: 7,
      followUps: ['How much do they cost?', 'Can I get a custom design?'],
    },
    {
      keywords: ['pendant', 'pendants'],
      response: `🔮 Our pendant collection:\n\n${allProducts.filter(p => p.type === 'Pendant').map(p => `• **${p.name}** — ${p.description}`).join('\n')}\n\nEach pendant is crafted to be a stunning centerpiece!`,
      category: 'product-type',
      priority: 7,
      followUps: ['How can I order?', 'Do you offer custom pendants?'],
    },
    {
      keywords: ['loose stone', 'loose stones', 'raw', 'rough', 'uncut', 'unmounted'],
      response: `💎 Available loose stones:\n\n${allProducts.filter(p => p.type === 'Loose Stone').map(p => `• **${p.name}** — ${p.description}`).join('\n')}\n\nPerfect for custom jewelry creation or investment!`,
      category: 'product-type',
      priority: 7,
      followUps: ['Do you offer faceting?', 'Can you make custom jewelry from loose stones?'],
    },
    {
      keywords: ['beads', 'bead', 'rosary', 'tasbih', 'mala', 'strand'],
      response: `📿 Our beads collection:\n\n${allProducts.filter(p => p.type === 'Beads' || p.type === 'Rosary').map(p => `• **${p.name}** — ${p.description}`).join('\n')}\n\nWe also offer custom bead-making services — any stone, any shape!`,
      category: 'product-type',
      priority: 7,
      followUps: ['Tell me about bead making service', 'Can you do custom beads?'],
    },
    {
      keywords: ['ring', 'rings', 'engagement', 'wedding'],
      response: "💍 While our current catalog focuses on necklaces, pendants, bracelets, and loose stones, we absolutely do custom ring making!\n\nOur artisans can create stunning engagement rings, wedding bands, and statement rings using any gemstone from our collection.\n\nContact us to discuss your dream ring!",
      category: 'product-type',
      priority: 7,
      followUps: ['How can I order a custom ring?', 'What gemstones are available?'],
    },

    // ══════ INDIVIDUAL GEMSTONE TYPES ══════
    {
      keywords: ['diamond quartz', 'diamond', 'quartz', 'clear quartz', 'crystal'],
      response: `✨ **Diamond Quartz** Collection:\n\n${categories.find(c => c.id === 'diamond-quartz')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our diamond quartz range!'}\n\nKnown for brilliant clarity and exceptional light refraction.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['How much does diamond quartz cost?', 'Can I see images?'],
    },
    {
      keywords: ['emerald', 'green stone', 'panna'],
      response: `💚 **Emerald** Collection:\n\n${categories.find(c => c.id === 'emerald')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our emerald range!'}\n\nPrized for their rich green color and rarity.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['Are these certified?', 'What sizes are available?'],
    },
    {
      keywords: ['ruby', 'red stone', 'yaqoot', 'rubies'],
      response: `❤️ **Ruby** Collection:\n\n${categories.find(c => c.id === 'ruby')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our ruby range!'}\n\nSymbols of passion — each ruby is hand-selected for vibrant color.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['How much do rubies cost?', 'Do you have loose rubies?'],
    },
    {
      keywords: ['sapphire', 'blue stone', 'neelam'],
      response: `💙 **Sapphire** Collection:\n\n${categories.find(c => c.id === 'sapphire')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our sapphire range!'}\n\nTimeless elegance in every shade of blue.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['Do you have Kashmir sapphires?', 'What cuts are available?'],
    },
    {
      keywords: ['lapis', 'lapis lazuli', 'lazuli'],
      response: `🔵 **Lapis Lazuli** Collection:\n\n${categories.find(c => c.id === 'lapis')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our lapis range!'}\n\nDeep royal blue with golden pyrite flecks — truly majestic.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['Do you have lapis beads?', 'What sizes are available?'],
    },
    {
      keywords: ['tourmaline', 'pink stone', 'watermelon'],
      response: `💜 **Tourmaline** Collection:\n\n${categories.find(c => c.id === 'tourmaline')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our tourmaline range!'}\n\nAvailable in a rainbow of colors from pink to green.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['What colors are available?', 'Do you have watermelon tourmaline?'],
    },
    {
      keywords: ['topaz', 'yellow stone', 'golden'],
      response: `💛 **Topaz** Collection:\n\n${categories.find(c => c.id === 'topaz')?.products.map(p => `• **${p.name}** — ${p.description}`).join('\n') || 'Explore our topaz range!'}\n\nWarm golden hues that radiate brilliance.`,
      category: 'gem-specific',
      priority: 9,
      followUps: ['Do you have blue topaz?', 'How much is a topaz pendant?'],
    },

    // ══════ SERVICES ══════
    {
      keywords: ['services', 'service', 'what do you do', 'offerings', 'capabilities'],
      response: `🔧 We offer professional gemstone processing services:\n\n${services.map(s => `• **${s.title}** — ${s.description}`).join('\n')}\n\nAll services are performed by experienced artisans using modern equipment.`,
      category: 'services',
      priority: 7,
      followUps: services.slice(0, 3).map(s => `Tell me about ${s.title.toLowerCase()}`),
    },
    {
      keywords: ['drill', 'drilling', 'hole', 'laser drill', 'laser'],
      response: `🔧 **${services.find(s => s.id === 'drilling')?.title || 'Gemstone Drilling'}**\n\n${services.find(s => s.id === 'drilling')?.details || services.find(s => s.id === 'drilling')?.description}\n\n• Precision Laser and diamond drilling\n• Safe for all gemstone types\n• Custom hole sizes available\n• Fast turnaround time`,
      category: 'service-detail',
      priority: 9,
      followUps: ['How much does drilling cost?', 'What other services do you offer?'],
    },
    {
      keywords: ['bead making', 'bead manufacturing', 'make beads', 'custom beads'],
      response: `📿 **${services.find(s => s.id === 'beads')?.title || 'Beads Making'}**\n\n${services.find(s => s.id === 'beads')?.details || services.find(s => s.id === 'beads')?.description}\n\n• Round, faceted, rondelle, and free-form shapes\n• Uniform or graduated strands\n• High-polish to matte finishes\n• Bulk orders welcome`,
      category: 'service-detail',
      priority: 9,
      followUps: ['What gemstones can you make beads from?', 'How much do custom beads cost?'],
    },
    {
      keywords: ['polish', 'polishing', 'refinish', 'buff', 'luster', 'shine', 'restore'],
      response: `✨ **${services.find(s => s.id === 'polishing')?.title || 'Gemstone Polishing'}**\n\n${services.find(s => s.id === 'polishing')?.details || services.find(s => s.id === 'polishing')?.description}\n\n• Scratch removal and re-polishing\n• Restores original brilliance\n• Safe for all gem types\n• Jewelry re-polishing also available`,
      category: 'service-detail',
      priority: 9,
      followUps: ['Can you polish my existing jewelry?', 'What other services do you offer?'],
    },
    {
      keywords: ['facet', 'faceting', 'cut', 'cutting', 'shape', 'shaping', 'recut'],
      response: `💎 **${services.find(s => s.id === 'faceting')?.title || 'Gemstone Faceting'}**\n\n${services.find(s => s.id === 'faceting')?.details || services.find(s => s.id === 'faceting')?.description}\n\n• Brilliant, Emerald, Radiant, Cushion & custom cuts\n• Precision machinery + master faceters\n• Re-cutting and re-shaping available\n• Optimized for maximum light return`,
      category: 'service-detail',
      priority: 9,
      followUps: ['What cuts do you offer?', 'Can you recut my gemstone?'],
    },

    // ══════ CUSTOM / BESPOKE ══════
    {
      keywords: ['custom', 'customize', 'bespoke', 'personalize', 'design', 'made to order', 'tailor'],
      response: "🎨 Absolutely! We offer fully customizable solutions:\n\n• **Custom Jewelry**: Design your own ring, necklace, or bracelet\n• **Custom Bead Strands**: Any gemstone, any shape, any size\n• **Re-cutting & Re-shaping**: Transform existing stones\n• **Engraving**: Personal messages and symbols\n\nShare your vision and we'll bring it to life!",
      category: 'custom',
      priority: 8,
      followUps: ['How do I place a custom order?', 'How long does custom work take?'],
    },

    // ══════ CERTIFICATION ══════
    {
      keywords: ['certif', 'certificate', 'authenticity', 'genuine', 'real', 'fake', 'gia', 'lab', 'tested', 'verify'],
      response: "📜 Authenticity is our promise!\n\n• High-value gemstones come with certificates from **GIA, GRS, or AIGS**\n• We provide authenticity guarantees on all purchases\n• Testing and verification services available\n• Transparent sourcing from trusted mines\n\nYour trust is our most valuable asset.",
      category: 'certification',
      priority: 8,
      followUps: ['Do all stones come certified?', 'How do I verify authenticity?'],
    },

    // ══════ PAYMENT ══════
    {
      keywords: ['payment', 'pay', 'money', 'transfer', 'bank', 'paypal', 'card', 'credit', 'method'],
      response: "💳 We accept multiple payment methods:\n\n• Bank Transfer\n• PayPal\n• Payment via Etsy/eBay checkout\n• Cash on visit\n• Western Union / MoneyGram for international\n\nContact us to arrange payment for your order!",
      category: 'payment',
      priority: 8,
      followUps: ['How can I place an order?', 'Do you offer COD?'],
    },

    // ══════ RETURN / REFUND ══════
    {
      keywords: ['return', 'refund', 'exchange', 'warranty', 'guarantee', 'money back', 'complaint', 'issue', 'problem'],
      response: "🔄 We stand behind our products!\n\n• Returns accepted within 14 days of receipt\n• Full refund if item doesn't match description\n• Exchange options available\n• Quality guarantee on all gemstones\n\nPlease contact us via WhatsApp or email if you have any concerns.",
      category: 'returns',
      priority: 8,
      followUps: ['How do I contact you?', 'What is your refund process?'],
    },

    // ══════ ETSY / EBAY ══════
    {
      keywords: ['etsy', 'ebay', 'online', 'website', 'marketplace'],
      response: "🌐 Find us on major marketplaces:\n\n• **Etsy**: elitegemsprivate.etsy.com\n• **eBay**: ebay.com/usr/elitegems_pvt\n\nBrowse our collections, read reviews, and order with buyer protection!",
      category: 'marketplace',
      priority: 7,
      followUps: ['How can I place a direct order?', 'Do you offer better prices direct?'],
    },

    // ══════ CATALOG / PDF ══════
    {
      keywords: ['catalog', 'catalogue', 'pdf', 'download', 'brochure'],
      response: "📄 You can download our full product catalog!\n\nClick the **\"Download Catalog\"** button in the header to get a beautifully designed PDF with all our gemstones, services, and contact information.\n\nIt's perfect for offline browsing!",
      category: 'catalog',
      priority: 7,
      followUps: ['What gemstones do you have?', 'What services do you offer?'],
    },
  ];
}

/* ═══════════════════════════════════════════════════
   MATCHING ENGINE — weighted fuzzy matching
   ═══════════════════════════════════════════════════ */

function findBestMatch(input: string, knowledge: KnowledgeEntry[]): KnowledgeEntry | null {
  const lowerInput = input.toLowerCase().trim();
  const inputWords = lowerInput.split(/\s+/);

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledge) {
    let score = 0;

    for (const keyword of entry.keywords) {
      const lowerKeyword = keyword.toLowerCase();

      // Exact phrase match (highest weight)
      if (lowerInput.includes(lowerKeyword)) {
        // Longer keyword matches are more specific → higher score
        score += 10 + lowerKeyword.length;
      }

      // Individual word match
      const keywordWords = lowerKeyword.split(/\s+/);
      for (const kw of keywordWords) {
        if (inputWords.some(w => w === kw || w.startsWith(kw) || kw.startsWith(w))) {
          score += 3;
        }
      }
    }

    // Apply priority multiplier
    score *= (entry.priority / 10);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Minimum threshold to avoid bad matches
  return bestScore >= 2 ? bestMatch : null;
}

/* ═══════════════════════════════════════════════════
   CHATBOT COMPONENT
   ═══════════════════════════════════════════════════ */

let messageIdCounter = 0;

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build knowledge on mount / language change
  const knowledgeBase = useRef<KnowledgeEntry[]>([]);
  useEffect(() => {
    knowledgeBase.current = buildKnowledgeBase(t);
  }, [t]);

  // Default quick replies
  const defaultSuggestions = [
    'What gemstones do you have?',
    'Tell me about your services',
    'How can I place an order?',
    'Where are you located?',
  ];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Greeting on first open
  const hasGreeted = useRef(false);
  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true;
      setIsTyping(true);
      setTimeout(() => {
        const greeting: Message = {
          id: ++messageIdCounter,
          sender: 'bot',
          text: `Welcome to Elite Gems! 💎\n\nI'm here to help you with information about our gemstones, services, pricing, and more.\n\nWhat would you like to know?`,
          timestamp: new Date(),
          suggestions: defaultSuggestions,
        };
        setMessages([greeting]);
        setActiveSuggestions(defaultSuggestions);
        setIsTyping(false);
      }, 800);
    }
  }, [isOpen]);

  const sendMessage = useCallback((text: string) => {
    if (text.trim() === '' || isTyping) return;

    const userMsg: Message = {
      id: ++messageIdCounter,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setActiveSuggestions([]);
    setIsTyping(true);

    // Simulate variable "thinking" time based on response complexity
    const delay = 600 + Math.random() * 800;

    setTimeout(() => {
      const match = findBestMatch(text, knowledgeBase.current);
      let responseText: string;
      let suggestions: string[] = [];

      if (match) {
        responseText = match.response;
        suggestions = match.followUps || [];
      } else {
        responseText = "I appreciate your question! 😊\n\nI don't have a specific answer for that, but I'd love to help. You can:\n\n• Ask me about our gemstones, services, or ordering process\n• Contact us directly on WhatsApp at +92 333 9134320\n• Email us at elitegems@protonmail.com\n\nOr try one of the suggestions below!";
        suggestions = defaultSuggestions;
      }

      const botMsg: Message = {
        id: ++messageIdCounter,
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
        suggestions,
      };

      setMessages(prev => [...prev, botMsg]);
      setActiveSuggestions(suggestions);
      setIsTyping(false);
    }, delay);
  }, [isTyping, t]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggleChat = () => setIsOpen(prev => !prev);

  /* ── Render helpers ── */
  const formatBotText = (text: string) => {
    // Simple markdown-like formatting
    return text.split('\n').map((line, i) => {
      // Bold
      const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Bullet points
      const isBullet = line.trimStart().startsWith('•') || line.trimStart().match(/^\d+\./);
      return (
        <span key={i} className={isBullet ? 'block pl-1' : 'block'}>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </span>
      );
    });
  };

  return (
    <>
      {/* ── Toggle button ── */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #d4a853, #c9952a)',
          boxShadow: '0 4px 20px rgba(212,168,83,0.3)',
        }}
        title="Chat with us"
      >
        {isOpen ? <FiX size={22} className="text-gem-dark" /> : <FiMessageSquare size={22} className="text-gem-dark" />}
      </button>

      {/* Pulse ring */}
      {!isOpen && (
        <div className="fixed bottom-8 left-8 z-40 w-14 h-14 rounded-full animate-glow-pulse pointer-events-none" />
      )}

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 left-8 z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.06] flex flex-col"
            style={{ background: '#111118', maxHeight: 'calc(100vh - 160px)' }}
          >
            {/* ── Header ── */}
            <div
              className="p-4 flex items-center justify-between border-b border-white/[0.06] flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.1), rgba(212,168,83,0.05))' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center">
                  <FaGem className="text-gem-dark text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{t('chatBotTitle')}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-white/40">Online — Instant replies</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleChat} className="text-white/40 hover:text-white transition-colors">
                <FiX size={18} />
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,83,0.3) transparent', minHeight: '200px', maxHeight: '360px' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full gold-gradient-bg flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <FaGem className="text-gem-dark" style={{ fontSize: 10 }} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold/20 text-gold-light rounded-br-md'
                        : 'bg-white/[0.05] text-white/80 rounded-bl-md border border-white/[0.06]'
                    }`}
                  >
                    {msg.sender === 'bot' ? formatBotText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="w-6 h-6 rounded-full gold-gradient-bg flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                    <FaGem className="text-gem-dark" style={{ fontSize: 10 }} />
                  </div>
                  <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggestions ── */}
            {activeSuggestions.length > 0 && !isTyping && (
              <div className="px-3 pb-2 border-t border-white/[0.04] pt-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {activeSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(suggestion)}
                    className="px-3 py-1.5 rounded-full text-[11px] border border-white/[0.08] bg-white/[0.03] text-white/60 hover:border-gold/30 hover:text-gold hover:bg-gold/5 transition-all whitespace-nowrap"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <div className="p-3 border-t border-white/[0.06] flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chatBotPlaceholder') || 'Type your message...'}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/25 focus:border-gold/30 focus:outline-none transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isTyping || !input.trim()}
                  className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  <FiSend size={14} className="text-gem-dark" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
