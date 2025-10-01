import p_img1 from './p_img1.jpg'
import p_img1_1 from './p_img1_1.jpg'
import p_img1_2 from './p_img1_2.jpg'
import p_img1_3 from './p_img1_3.jpg'
import p_img2_1 from './p_img2_1.jpg'
import p_img2_2 from './p_img2_2.jpeg'
import p_img2_3 from './p_img2_3.jpg'
import p_img2_4 from './p_img2_4.jpeg'
import p_img3 from './p_img3.jpg'
import p_img4 from './p_img4.webp'
import p_img5 from './p_img5.jpg'
import p_img6 from './p_img6.jpg'
import p_img7 from './p_img7.jpg'
import p_img8 from './p_img8.jpg'
import p_img9 from './p_img9.jpg'
import p_img10 from './p_img10.jpg'
import p_img11 from './p_img11.jpg'
import p_img12 from './p_img12.avif'
import p_img13 from './p_img13.webp'
import p_img14 from './p_img14.webp'
import p_img15 from './p_img15.jpg'
import p_img16 from './p_img16.webp'
import p_img17 from './p_img17.jpg'
import p_img18 from './p_img18.avif'
import p_img19 from './p_img19.avif'
import p_img20 from './p_img20.webp'
import p_img21 from './p_img21.avif'
import p_img22 from './p_img22.avif'
import p_img23 from './p_img23.webp'
import p_img24 from './p_img24.avif'
import p_img25 from './p_img25.avif'
import p_img26 from './p_img26.webp'
import p_img27 from './p_img27.avif'
import p_img28 from './p_img28.avif'
import p_img29 from './p_img29.webp'
import p_img30 from './p_img30.webp'
import p_img31 from './p_img31.webp'
import p_img32 from './p_img32.webp'
import p_img33 from './p_img33.webp'
import p_img34 from './p_img34.avif'
import p_img35 from './p_img35.webp'
import p_img36 from './p_img36.jpg'
import p_img37 from './p_img37.webp'
import p_img38 from './p_img38.jpg'
import p_img39 from './p_img39.avif'
import p_img40 from './p_img40.avif'
import p_img41 from './p_img41.webp'
import p_img42 from './p_img42.webp'
import p_img43 from './p_img43.avif'
import p_img44 from './p_img44.webp'
import p_img45 from './p_img45.webp'
import p_img46 from './p_img46.webp'
import p_img47 from './p_img47.jpg'
import p_img48 from './p_img48.webp'
import p_img49 from './p_img49.webp'
import p_img50 from './p_img50.webp'
import p_img51 from './p_img51.webp'
import p_img52 from './p_img52.webp'


import logo from './logo.png'
import hero from './hero.png' 
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.jpg'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import paytm_logo from './paytm_logo.png'

export const assets = {
    paytm_logo,
    logo,
    hero,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const products = [
    {
        _id: "aaaaa",
        name: "CeraVe Hydrating Facial Cleanser",
        description: "Gently cleanse and hydrate your skin with CeraVe Hydrating Facial Cleanser – formulated with ceramides and hyaluronic acid to restore the skin’s natural barrier without stripping moisture. Ideal for normal to dry skin.",
        price: 14,
        image: [p_img1, p_img1_1, p_img1_2, p_img1_3],
        category: "Acne-Prone Skin",
        subCategory: "Cleanser",
        volume: ["30ml", "50ml", "100ml"],
        date: 1716634345448,
        bestseller: true
    },
    {
    _id: "aaaab",
    name: "Eva Naturals Vitamin C Face Serum",
    description: "Revitalize your skin with Eva Naturals Vitamin C Serum – a potent blend of Vitamin C, Retinol, and Hyaluronic Acid that brightens, firms, and deeply hydrates your skin while reducing signs of aging and blemishes.",
    price: 24,
    image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
    category: "Acne-Prone Skin",
    subCategory: "Serum",
    volume: ["30ml", "50ml", "100ml"],
    date: 1716621345448,
    bestseller: true
   },

    {
        _id: "aaaac",
        name: "Anua Peach 70 Niacinamide Serum 30ml",
        description: "A daily clean beauty face serum enriched with 70% peach fruit extract and 5% niacinamide to brighten, hydrate, and even skin tone. Ideal for dull, tired skin and suitable for all skin types.",
        price: 22,
        image: [p_img3],
        category: "Beauty",
        subCategory: "Skincare",
        volume: ["30ml", "50ml", "100ml"], 
        date: 1716625345448, 
        bestseller: true
    },
    {
    _id: "aaaae",
    name: "Rhode Peptide Lip Tint",
    description: "A nourishing lip treatment with a hint of tint, infused with peptides and cupuaçu butter to visibly plump, hydrate, and smooth lips. Adds a sheer wash of color with long-lasting moisture and shine.",
    price: 20,
    image: [p_img4],
    category: "Normal Skin",
    subCategory: "Lip Care",
    volume: ["30ml", "50ml", "100ml"], 
    date: 1716641345448,
    bestseller: true
    },
    {
    _id: "aaaae",
    name: "Cetaphil Gentle Skin Cleanser",
    description: "A mild, non-irritating cleanser that soothes skin as it cleans. Ideal for dry, sensitive skin, and suitable for all skin types.",
    price: 17.58,
    image: [p_img5],
    category: "Dry Skin",
    subCategory: "Cleanser",
    volume: ["30ml", "50ml", "100ml"],
    date: 1716622345449,
    bestseller: true
    },

    {
        _id: "aaaag",
        name: "Dot & Key Vitamin C Moisturizer",
        description: "A lightweight, hydrating moisturizer enriched with Vitamin C that brightens skin, evens skin tone, and provides lasting hydration for all skin types.",
        price: 3.39, 
        image: [p_img6],
        category: "Oily Skin",
        subCategory: "Moisturizer",
        volume: ["30ml", "50ml", "100ml"],
        date: 1716623499999,
        bestseller: true
    },
    {
        _id: "aaaah",
        name: "CLAYCO Detan Rice Pack with AHA & BHA",
        description: "A gentle exfoliating face pack with AHA & BHA that helps remove tan, unclog pores, and brighten skin. Infused with rice extracts for natural glow.",
        price: 10.47,
        image: [p_img7],
        category: "Oily Skin",
        subCategory: "Face Pack",
        volume: ["30ml", "50ml", "100ml"],
        date: 1716623555555,
        bestseller: true
    },
    {
          _id: "aaaai",
         name: "CeraVe Blemish Control Cleanser",
         description: "A gentle yet effective cleanser with salicylic acid that helps clear blemishes, unclog pores, and maintain the skin’s natural barrier with 3 essential ceramides.",
        price: 13.87,
        image: [p_img8],
         category: "Oily Skin",
        subCategory: "Cleanser",
        volume: ["30ml", "50ml", "100ml"],
        date: 1716623612345,
        bestseller: true
    },
    {
         _id: "aaaaj",
         name: "COSRX Advanced Snail 96 Mucin Power Essence",
         description: "Lightweight essence enriched with 96% snail mucin to hydrate, repair skin, improve elasticity, and enhance skin barrier. Suitable for all skin types.",
         price: 10.47,
        image: [p_img9],
        category: "All Skin Types",
        subCategory: "Essence",
        volume: ["30ml", "50ml", "100ml"],
        date: 1716623699999,
        bestseller: true
    },
    {
       _id: "aaaak",
        name: "Dot & Key Vitamin C + E Sunscreen SPF 50 PA+++",
        description: "A lightweight, non-greasy sunscreen enriched with Vitamin C, E, and UV filters that protect against UVA/UVB rays, brighten skin, and prevent tanning.",
        price: 3.38,
        image: [p_img10],
        category: "All Skin Types",
        subCategory: "Sunscreen",
        volume: ["30ml","50ml", "100ml"],
        date: 1716623755555,
        bestseller: true
    },
    {
     _id: "aaaak",
     name: "Neutrogena Hydro Boost Hyaluronic Acid Face Moisturizer",
     description: "Lightweight, oil-free moisturizer with hyaluronic acid to hydrate and plump dry skin. Ideal for dry to very dry skin types.",
     price: 8.72,
     image: [p_img11], 
     category: "Dry Skin",
     subCategory: "Moisturizer",
     volume: ["30ml", "50ml", "100ml"],
     date: 1716623345448,
     bestseller: true
    }
,
    {
     _id: "aaaal",
     name: "Minimalist 5% Niacinamide Face Serum With Bifida Ferment & Oat Extract",
     description: "A gentle serum with 5% Niacinamide, Bifida Ferment, and Oat Extract to soothe, repair, and strengthen skin barrier. Ideal for sensitive and irritated skin.",
     price: 6.28,
     image: [p_img12], 
     category: "Sensitive Skin",
     subCategory: "Serum",
     volume: ["30ml", "50ml", "100ml"],
     date: 1716624470000,
     bestseller: true
    },
    {
     _id: "aaaam",
     name: "Blueberry Hydrate Barrier Repair Rice Water Toner",
     description: "A hydrating and barrier-repairing toner enriched with blueberry extract and rice water to deeply moisturize, soothe, and strengthen the skin. Ideal for dry and sensitive skin.",
     price: 3.68,
     image: [p_img13], 
     category: "Dry Skin",
     subCategory: "Toner",
     volume: ["30ml", "50ml", "100ml"],
     date: 1716624560000,
     bestseller: true
    },

    {
     _id: "aaaan",
     name: "Kesar & Kojic Acid Sunscreen - 125g",
     description: "A lightweight sunscreen enriched with Kesar and Kojic Acid that provides broad spectrum protection while helping to brighten and even out skin tone. Ideal for normal to dry skin.",
     price: 9.77,
     image: [p_img14], 
     category: "Normal Skin",
     subCategory: "Sunscreen",
     volume: ["30ml", "50ml", "100ml"],
     date: 1716624655000,
     bestseller: false
    },
    { 
        _id: "aaaao",
        name: "Earth Rhythm Aqua Surge Clear Sunstick",
        description: "A transparent sunstick with broad-spectrum SPF protection, designed for easy reapplication and a non-greasy finish. Suitable for oily and acne-prone skin types.",
        price: 5.75,
        image: [p_img15], 
        category: "Oily Skin",
        subCategory: "Sunscreen",
        volume: ["30ml", "50ml", "100ml"],
        date: 1716624720000,
        bestseller: true
    },
    {
       _id: "aaaap",
       name: "Cetaphil Bright Healthy Radiance Refresh Toner Cream - White, 150 ml",
       description: "A brightening toner cream that helps even skin tone, hydrate, and restore skin radiance. Gentle formula suitable for sensitive skin.",
       price: 10.96,  
       image: [p_img16],  
       category: "Sensitive Skin",
       subCategory: "Toner",
       volume: ["30ml", "50ml", "100ml"],
       date: 1716628845448,
       bestseller: false
    },
    {
      _id: "aaaaq",
      name: "LANEIGE Lip Glowy Balm Berry Fruits Rouges",
      description: "A lightweight, moisturizing lip balm that provides a glossy finish and hydration. Infused with berry extracts to nourish and smooth dry lips.",
      price: 8.78, 
      image: [p_img17], 
      category: "All Skin Types",
      subCategory: "LipCare",
      volume: ["30ml", "50ml", "100ml"],
      date: 1716629999999,
      bestseller: true
    }
,
    {
      _id: "aaaar",
      name: "Forest Essentials Eladi Day Cream With SPF 30 PA++",
      description: "An Ayurvedic formulation enriched with Eladi, Niacinamide, and SPF 30 PA++ that nourishes and protects acne-prone skin while providing a radiant finish.",
      price: 32.55,
      image: [p_img18],
      category: "Acne-Prone Skin",
      subCategory: "Moisturizer",
      volume: ["30ml", "50ml", "100ml"],   
      skinType: ["All", "Dry", "Oily"],
      date: 1716630599999,
      bestseller: true
   },
    {
        _id: "aaaas",
        name: "The Derma Co 1% Hyaluronic Sunscreen SPF 50 PA+++ Aqua Gel",
        description: "A lightweight, fragrance-free sunscreen with 1% Hyaluronic Acid that hydrates while protecting against UVA/UVB rays. Suitable for normal to oily skin.",
        price: 49.99,
        image: [p_img19], 
        category: "Acne-Prone Skin",
        subCategory: "Sunscreen",
        volume: ["30ml", "50ml", "80ml"],
        skinType: ["Normal", "Oily"],
        date: 1716632145448,
        bestseller: false
    },
    {
        _id: "aaaat",
        name: "Plum 3% Niacinamide Toner With Rice Water",
        description: "A gentle, alcohol-free toner with 3% Niacinamide and Rice Water that helps minimize pores, fade blemishes, and balance excess oil for healthy-looking skin.",
        price: 4.34,
        image: [p_img20],
        category: "Acne-Prone Skin",
        subCategory: "Toner",
        volume: ["100ml", "150ml", "200ml"],
        skinType: ["Normal", "Oily"],
        date: 1716633245448,
        bestseller: false
    },
    {
        _id: "aaaau",
        name: "Florence by Mills Pout Party Coffee Lip Scrub",
        description: "A coffee-infused lip scrub that exfoliates and nourishes lips, leaving them soft, smooth, and hydrated.",
        price: 17.79,
        image: [p_img21],
        category: "Combination Skin",
        subCategory: "LipCare",
        volume: ["15g", "30g", "50g"],
        skinType: ["All Skin Types"],
        date: 1716634345448,
        bestseller: false
    },
    {
       _id: "aaaav",
       name: "Dot & Key Vitamin C + E Super Bright Face Moisturizer",
       description: "A lightweight daily moisturizer powered with Vitamin C and Vitamin E to brighten dull skin, fade dark spots, and provide a natural glow. Suitable for all skin types and ideal for achieving radiant, healthy-looking skin.",
       price: 4.83,  
       image: [p_img22], 
       category: "All Skin Types",
       subCategory: "Moisturizer",
       volume: ["25ml", "50ml"],
       date: 1716626345448, 
       bestseller: true
    },
    {
        _id: "aaaaw",
        name: "Niacinamide & Rice Water CTMS Combo",
        description: "A complete skincare combo enriched with Niacinamide and Rice Water to brighten skin, fade blemishes, tighten pores, and protect with SPF50 PA++++. Includes Cleanser, Toner, Moisturizer, and Sunscreen for daily skincare routine.",
        price: 19, 
        image: [p_img23], 
        category: "All Skin Type",
        subCategory: "Toner",
        volume: ["4 Steps Combo"],
        date: 1716627345448,
        bestseller: true
    },
    {
        _id: "aaaax",
        name: "Plum Green Tea Pore Cleansing Gel Face Wash With Glycolic Acid - Fights Acne & Oil For Clear Skin",
        description: "A gentle, soap-free gel face wash enriched with Green Tea and Glycolic Acid to fight acne, control excess oil, and deeply cleanse pores. Ideal for oily and acne-prone skin.",
        price: 4.15, 
        image: [p_img24], 
        category: "Beauty",
        subCategory: "Face Wash",
        volume: ["150ml"],
        date: 1716627445448,
        bestseller: false
    },
    {
        _id: "aaaaz",
        name: "Neutrogena Oil Free Acne Wash - 2% Salicylic Acid Deep Cleansing Face Wash (175ml)",
        description: "A dermatologist-tested oil-free face wash with 2% Salicylic Acid. Effectively cleanses deep into pores, removes excess oil, and treats acne without over-drying. Hydrating, alcohol-free, non-comedogenic, and suitable for men and women with oily, acne-prone skin.",
        price: 6.60,
        image: [p_img25],
        category: "All Skin Type",
        subCategory: "Face Pack",
        volume: ["175ml"],
        date: 1716627745448,
        bestseller: true
    },
    {
        _id: "aaaay",
        name: "Brightening Lip Balm SPF30 - 2% Kojic Acid, Vitamin C & 1% Vitamin E - 10g",
        description: "A nourishing lip balm infused with 2% Kojic Acid, Vitamin C, and 1% Vitamin E. Provides SPF30 sun protection, helps brighten dark lips, fades pigmentation, and keeps lips soft and hydrated.",
        price: 3.60,
        image: [p_img26],
        category: "Normal Skin",
        subCategory: "Lip Care",
        volume: ["10g"],
        date: 1716627545448,
        bestseller: true
    },
    {
        _id: "aaabb",
        name: "Garnier Vitamin C Regime Bright Complete Facewash With Vitamin C Serum, Serum Cream SPF 40",
        description: "A skincare combo with Vitamin C facewash, serum, and serum cream SPF 40 that helps brighten skin, reduce dark spots, and provide sun protection.",
        price: 499,
        image: [p_img27], 
        category: "All Skin Types",
        subCategory: "Moisturizer",
        volume: ["50ml", "100ml"],
        date: 1716640945449,
        bestseller: true
    },

    {
        _id: "aaabc",
        name: "Foxtale Brightening Vitamin C Face Serum With L-Ascorbic Acid And Vitamin E For Glowing Skin",
        description: "A lightweight serum enriched with L-Ascorbic Acid and Vitamin E that helps brighten skin, reduce pigmentation, and promote an even glowing complexion.",
        price: 4.3,
        image: [p_img28], 
        category: "Sensitive Skin",
        subCategory: "Serum",
        volume: ["30ml", "50ml"],
        date: 1716640945450,
        bestseller: true
    },

    {
        _id: "aaabd",
        name: "Mamaearth Skin Illuminate Vitamin C Serum With Turmeric For Radiant Skin",
        description: "A natural Vitamin C serum with turmeric that reduces dullness, improves skin texture, and enhances natural glow.",
        price: 599,
        image: [p_img29], 
        category: "All Skin Types",
        subCategory: "Serum",
        volume: ["30ml"],
        date: 1716640945451,
        bestseller: true
    },

    {
        _id: "aaabe",
        name: "The Derma Co 10% Niacinamide Serum For Acne Marks and Oil Control",
        description: "A dermatologically tested serum with Niacinamide and Zinc that reduces acne scars, minimizes pores, and controls excess oil.",
        price: 499,
        image: [p_img30],
        category:  "Acne-Prone Skin",
        subCategory: "Serum",
        volume: ["30ml"],
        date: 1716640945452,
        bestseller: true 
    }, 
    {
        _id: "aaabf",
        name: "Minimalist 2% Hyaluronic Acid Serum For Intense Hydration",
        description: "A lightweight hydrating serum with 2% Hyaluronic Acid and Vitamin B5 that plumps skin and restores moisture balance.",
        price: 599,
        image: [p_img31],
        category:  "Dry Skin",
        subCategory: "Serum",
        volume: ["30ml"],
        date: 1716640945453,
        bestseller: false
    },
    {
       _id: "aaabg",
       name: "L’Oreal Paris Revitalift Crystal Micro-Essence",
       description: "A liquid skincare essence that penetrates up to 10 layers deep to refine pores, smoothen skin, and boost radiance.",
       price: 899,
       image: [p_img32],
       category: "All Skin Types",
       subCategory: "Essence",
       volume: ["65ml", "130ml"],
       date: 1716640945454,
       bestseller: true
    }, 
    {
      _id: "aaabh",
      name: "Neutrogena Hydro Boost Water Gel With Hyaluronic Acid",
      description: "A refreshing water-based moisturizer with Hyaluronic Acid that delivers long-lasting hydration and keeps skin plump and soft.",
      price: 950,
      image: [p_img33],
      category:   "Combination Skin",
      subCategory: "Moisturizer",
      volume: ["50g"],
      date: 1716640945455,
      bestseller: true
    },
    {
        _id: "aaabi",
        name: "Cetaphil Gentle Skin Cleanser",
        description: "A mild, soap-free cleanser that soothes and hydrates while effectively removing dirt and impurities without stripping skin.",
        price: 399,
        image: [p_img34],
        category: "Dry Skin",
        subCategory: "Cleanser",
        volume: ["125ml", "250ml"],
        date: 1716640945456,
        bestseller: true
    },
    {
      _id: "aaabj",
      name: "Plum Green Tea Oil-Free Moisturizer",
      description: "A lightweight, non-comedogenic moisturizer infused with green tea extracts that controls excess oil and provides hydration.",
      price: 475,
      image: [p_img35],
      category: "Combination Skin", 
      subCategory: "Moisturizer",
      volume: ["50ml"],
      date: 1716640945457,
      bestseller: true
},
{
    _id: "aaabk",
    name: "Kiehl’s Calendula Herbal Extract Toner",
    description: "An alcohol-free toner formulated with calendula petals that gently cleanses, soothes, and refreshes skin.",
    price: 1650,
    image: [p_img36],
    category: "Normal Skin",
    subCategory: "Toner",
    volume: ["125ml", "250ml"],
    date: 1716640945458,
    bestseller: false
},
{
    _id: "aaabl",
    name: "Biotique Morning Nectar Sunscreen SPF 30+",
    description: "An ayurvedic sunscreen enriched with honey and aloe vera that protects from UVA/UVB rays while nourishing skin.",
    price: 320,
    image: [p_img37],
    category:"Dry Skin",
    subCategory:"Sunscreen",
    volume: ["120ml"],
    date: 1716640945459,
    bestseller: true
},
{
    _id: "aaabm",
    name: "Laneige Lip Sleeping Mask Berry",
    description: "A nourishing overnight lip care mask enriched with vitamin C and antioxidants that softens and hydrates lips.",
    price: 1150,
    image: [p_img38],
    category: "All Skin Types",
    subCategory: "LipCare",
    volume: ["20g"],
    date: 1716640945460,
    bestseller: true
},
{
    _id: "aaabn",
    name: "Himalaya Neem Face Pack",
    description: "An herbal face pack with neem and turmeric that helps reduce pimples, absorb excess oil, and cleanse impurities.",
    price: 130,
    image: [p_img39],
    category:  "Combination Skin",
    subCategory: "Face Pack",
    volume: ["100g"],
    date: 1716640945461,
    bestseller: true
},
{
    _id: "aaabo",
    name: "Cosrx Advanced Snail 96 Mucin Power Essence",
    description: "A lightweight essence with 96% snail mucin that repairs damaged skin, improves elasticity, and provides deep hydration.",
    price: 1250,
    image: [p_img40],
    category: "All Skin Types",
    subCategory: "Essence",
    volume: ["100ml"],
    date: 1716640945462,
    bestseller: true
},
{
    _id: "aaabq",
    name: "CeraVe Moisturizing Cream With Ceramides & Hyaluronic Acid",
    description: "A rich cream that restores the skin’s natural barrier with ceramides and provides long-lasting hydration.",
    price: 1250,
    image: [p_img41],
    category: "Sensitive Skin",
    subCategory: "Moisturizer",
    volume: ["50ml", "200ml"],
    date: 1716640945464,
    bestseller: true
},
{
    _id: "aaabp",
    name: "Clean & Clear Foaming Face Wash",
    description: "An oil-free foaming face wash that removes excess oil and dirt, preventing pimples and leaving skin refreshed.",
    price: 180,
    image: [p_img42],
    category:  "Acne-Prone Skin", 
    subCategory:"Cleanser",
    volume: ["100ml"],
    date: 1716640945463,
    bestseller: true
},
{
    _id: "aaabr",
    name: "Pixi Glow Tonic Exfoliating Toner With Glycolic Acid",
    description: "An exfoliating toner with 5% glycolic acid that removes dead skin cells and promotes a healthy radiant glow.",
    price: 1450,
    image: [p_img43],
    category: "All Skin Types",
    subCategory: "Toner",
    volume: ["100ml", "250ml"],
    date: 1716640945465,
    bestseller: true
},
{
    _id: "aaabs",
    name: "Aqualogica Glow+ Dewy Sunscreen SPF 50",
    description: "A lightweight water-based sunscreen with Vitamin C and Hyaluronic Acid that provides broad spectrum UV protection with a dewy finish.",
    price: 699,
    image: [p_img44],
    category: "Oily Skin",
    subCategory: "Sunscreen",
    volume: ["50ml"],
    date: 1716640945466,
    bestseller: true
},
{
    _id: "aaabt",
    name: "Vaseline Lip Therapy Original",
    description: "A moisturizing lip balm that locks in moisture and protects dry, chapped lips for smooth and healthy results.",
    price: 249,
    image: [p_img45],
    category: "All Skin Types",
    subCategory: "Lip Care",
    volume: ["10g"],
    date: 1716640945467,
    bestseller: true
},
{
    _id: "aaabu",
    name: "The Face Shop Real Nature Green Tea Face Mask",
    description: "A refreshing sheet mask infused with green tea extract that hydrates and purifies skin for a clear complexion.",
    price: 150,
    image: [p_img46],
    category: "Combination Skin", 
    subCategory: "Face Pack",
    volume: ["20ml"],
    date: 1716640945468,
    bestseller: false
},
{
    _id: "aaabv",
    name: "Missha Time Revolution First Treatment Essence",
    description: "A cult-favorite essence with fermented yeast extract that brightens skin tone, smooths texture, and boosts hydration.",
    price: 2200,
    image: [p_img47],
    category:"All Skin Types",
    subCategory: "Essence",
    volume: ["150ml"],
    date: 1716640945469,
    bestseller: true
},
{
    _id: "aaabw",
    name: "Simple Refreshing Facial Wash",
    description: "A gentle, soap-free facial cleanser with no artificial fragrance or harsh chemicals, perfect for everyday use.",
    price: 325,
    image: [p_img48],
    category: "Sensitive Skin",
    subCategory: "Cleanser",
    volume: ["150ml"],
    date: 1716640945470,
    bestseller: true
},
{
    _id: "aaabx",
    name: "Clinique Moisture Surge 72-Hour Auto-Replenishing Hydrator",
    description: "An oil-free gel-cream moisturizer that provides 72 hours of hydration and keeps skin plump and dewy.",
    price: 2950,
    image: [p_img49],
    category: "Dry Skin",
    subCategory: "Moisturizer",
    volume: ["30ml", "50ml"],
    date: 1716640945471,
    bestseller: true
},
{
    _id: "aaaby",
    name: "Forest Essentials Facial Tonic Mist Pure Rosewater",
    description: "A refreshing facial mist made with steam-distilled rosewater that tones, hydrates, and refreshes skin naturally.",
    price: 750,
    image: [p_img50],
    category: "Beauty",
    subCategory: "Skincare",
    type: "Toner",
    skinType: ["All Skin Types", "Sensitive Skin", "Normal Skin"],
    volume: ["100ml"],
    date: 1716640945472,
    bestseller: false
},
{
    _id: "aaabz",
    name: "Innisfree Super Volcanic Pore Clay Mask 2X",
    description: "A powerful face mask with volcanic clusters that absorbs excess oil, minimizes pores, and deeply cleanses impurities.",
    price: 1050,
    image: [p_img51],
    category: "Beauty",
    subCategory: "Skincare",
    type: "Face Pack",
    skinType: ["Oily Skin", "Combination Skin", "Acne-Prone Skin"],
    volume: ["100ml"],
    date: 1716640945473,
    bestseller: true
},
{
    _id: "aaaca",
    name: "Kiehl's Ultra Facial Cream",
    description: "A lightweight, daily moisturizer that provides 24-hour hydration while strengthening the skin’s barrier. Suitable for all skin types including sensitive skin.",
    price: 1200,
    image: [p_img52],
    category: "Beauty",
    subCategory: "Skincare",
    type: "Moisturizer",
    skinType: ["All Skin Types", "Dry Skin", "Normal Skin"],
    volume: ["50ml", "100ml"],
    date: 1716640945474,
    bestseller: true
}

]