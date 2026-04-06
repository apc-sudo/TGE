/**
 * Mega-menu layout: group titles + labels. Labels must match DB categories
 * after slugify (case-insensitive), e.g. "Headbands" ↔ HEADBANDS.
 */
export const ACCESSORY_MENU_GROUPS = [
  {
    title: 'Hair Accessories',
    items: [
      'Headbands',
      'Scrunchies',
      'Alligator Bows',
      'Hair Clips/Pins',
      'Claw Clips',
      'Mickey Ears',
    ],
  },
  {
    title: 'Jewelry & Small Accessories',
    items: [
      'Earrings',
      'Brooches',
      'Key Circle/Chains',
      'Wristlets',
      'Lanyards',
      'Handcuffs',
    ],
  },
  {
    title: 'Bags & Storage',
    items: [
      'Tote Bags',
      'Coin Purses',
      'Mobile Purses',
      'Clutches',
      'Box Bags',
      'Stadium Bag Straps',
    ],
  },
  {
    title: 'Miscellaneous',
    items: ['Eye Masks', 'Coasters', 'Trucker Hats', 'Wreath Sash'],
  },
];
