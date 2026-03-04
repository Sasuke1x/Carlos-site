export type Property = {
  id: string;
  hospitable_id: string;
  slug: string;
  name: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    display: string;
    coordinates: { lat: number; lng: number };
  };
  summary: string;
  description: string;
  capacity: {
    bedrooms: number;
    bathrooms: number;
    beds: number;
    guests: number;
  };
  amenities: string[];
  highlights: string[];
  idealFor: string[];
  houseRules: {
    petsAllowed: boolean;
    smokingAllowed: boolean;
    eventsAllowed: boolean;
  };
  checkin: string;
  checkout: string;
  images: string[];
  heroImage: string;
  airbnbUrl: string;
  propertyType: string;
};

export const properties: Property[] = [
  {
    id: "mize-road",
    hospitable_id: "9c4e86e1-bb46-4809-8aad-8d81169cfb39",
    slug: "mize-road-retreat",
    name: "Modern 3BR Family Home Near Park",
    tagline: "Near Winston-Salem | Sleeps 6",
    address: {
      street: "110 Mize Road",
      city: "Lexington",
      state: "NC",
      zip: "27295",
      display: "Lexington, NC",
      coordinates: { lat: 35.8467241, lng: -80.263603 },
    },
    summary:
      "This newly renovated, furnished single family home features 3 bedrooms and 1.5 baths in a peaceful neighborhood right across from a playground and park — excellent for families with kids.",
    description:
      "In this home you'll find 3 fully furnished bedrooms, each decorated with their own unique style. 1 king bed with 42-inch television, and two queen beds both with 36-inch TVs. Plenty of storage space and hardwood floors throughout. Open kitchen with extra counter space and a lovely living room with a beautiful bay window streaming natural light. Huge backyard with patio and full-size grill. Located in a peaceful neighborhood right across the street from Picket Elementary School, playground and park. Easy access to Business 85/Highway 52.",
    capacity: { bedrooms: 3, bathrooms: 1.5, beds: 3, guests: 6 },
    amenities: [
      "High-Speed WiFi",
      "Smart TV",
      "Fully Equipped Kitchen",
      "Washer & Dryer",
      "Free Parking",
      "Air Conditioning",
      "Heating",
      "Iron",
      "Hair Dryer",
      "Coffee Maker",
      "Fire Pit",
      "BBQ Grill",
      "Patio",
      "First Aid Kit",
      "Smoke Detector",
      "Carbon Monoxide Detector",
    ],
    highlights: [
      "3 Bedrooms | 1.5 Bathrooms",
      "Sleeps 6 Comfortably",
      "Fully Equipped Kitchen",
      "High-Speed WiFi & Smart TVs",
      "Washer & Dryer",
      "Driveway Parking",
      "Backyard with Patio & Grill",
      "Self Check-In",
      "Next to Park & Playground",
    ],
    idealFor: [
      "Traveling nurses",
      "Corporate housing",
      "Insurance relocation stays",
      "Families visiting the Triad",
      "Mid-term stays (30+ days)",
    ],
    houseRules: {
      petsAllowed: true,
      smokingAllowed: false,
      eventsAllowed: false,
    },
    checkin: "4:00 PM",
    checkout: "10:00 AM",
    images: [
      "/images/properties/mize-road/b1313904-799b-448c-ad42-5ed82a5880e5.jpg-2.avif",
      "/images/properties/mize-road/14991b20-30aa-47e4-98b5-bfb140ae021a.jpeg.avif",
      "/images/properties/mize-road/4432f1cb-fdf4-4e20-8cda-143945994910.jpeg.avif",
      "/images/properties/mize-road/57d3136b-9d85-46cc-8691-cde73f2f1c72.jpg.avif",
      "/images/properties/mize-road/586c1332-199a-47e6-a216-cf204d2ad77a.jpg.avif",
      "/images/properties/mize-road/5b5e3b3f-d0e6-4d86-af63-baf3c8294c01.jpg.avif",
      "/images/properties/mize-road/62df0102-08fc-4437-a660-df88f8079d10.jpeg.avif",
      "/images/properties/mize-road/88a83881-7b21-4442-a8e6-5708412cc6a3.jpg.avif",
      "/images/properties/mize-road/9e955d4f-e574-440e-bfb8-d3d5f78f9e36.jpeg.avif",
      "/images/properties/mize-road/ae4bac61-f416-41f9-bc3c-890311ba800a.jpg.avif",
      "/images/properties/mize-road/c14032d7-df1c-4a77-ace2-c15135f09016.jpg.avif",
      "/images/properties/mize-road/cb83ecad-29fa-4f5d-9556-a53e85fb3f48.jpeg.avif",
      "/images/properties/mize-road/e9af1c83-cf85-4bfe-9dbd-b29cb3bee200.jpg.avif",
    ],
    heroImage:
      "/images/properties/mize-road/b1313904-799b-448c-ad42-5ed82a5880e5.jpg-2.avif",
    airbnbUrl: "https://www.airbnb.com/rooms/675556015346474270",
    propertyType: "Entire Home",
  },
  {
    id: "salisbury-unit-a",
    hospitable_id: "b9e48a3b-17c5-44e3-be41-4e668ad3af14",
    slug: "downtown-lexington-condo",
    name: "Cozy 2BR Condo in Downtown Lexington",
    tagline: "2 Min From Uptown | Sleeps 4",
    address: {
      street: "1222 South Salisbury Street, Unit A",
      city: "Lexington",
      state: "NC",
      zip: "27292",
      display: "Lexington, NC",
      coordinates: { lat: 35.809221, lng: -80.268885 },
    },
    summary:
      "Welcome to our newly renovated condo in the heart of Lexington, NC. Conveniently located near restaurants, shops, and parks — and just 30 minutes from High Point, Winston-Salem, and Greensboro.",
    description:
      "This villa offers 2 bedrooms with 1 full bathroom and a half restroom. Master bedroom includes a king comfy bed with smart TV, full dresser with mirror, stand-up chest, and walk-in closet. Second bedroom has a queen size pillow top mattress with smart TV and dresser with mirror. Located in the barbecue capital of the Southeast — home of Lexington! Close to High Rock Lake, NC Zoo, Grimes Park, Childress Vineyards, and the High Point Furniture Market. Spacious parking perfect for RV, boat, or camper.",
    capacity: { bedrooms: 2, bathrooms: 1.5, beds: 2, guests: 4 },
    amenities: [
      "High-Speed WiFi",
      "Smart TV",
      "Fully Equipped Kitchen",
      "Washer & Dryer",
      "Free Parking",
      "Air Conditioning",
      "Heating",
      "Iron",
      "Coffee Maker",
      "Blender",
      "Ceiling Fan",
      "Dining Table",
      "Garden/Backyard",
      "Safe",
      "Smoke Detector",
    ],
    highlights: [
      "2 Bedrooms | 1.5 Bathrooms",
      "Sleeps 4 Comfortably",
      "King & Queen Beds",
      "Walk-in Closet",
      "High-Speed WiFi & Smart TVs",
      "Washer & Dryer",
      "Spacious Parking (RV/Boat Friendly)",
      "Self Check-In",
      "2 Minutes from Uptown",
    ],
    idealFor: [
      "Traveling nurses",
      "Corporate housing",
      "Insurance relocation stays",
      "Couples & small families",
      "Mid-term stays (30+ days)",
    ],
    houseRules: {
      petsAllowed: true,
      smokingAllowed: false,
      eventsAllowed: false,
    },
    checkin: "4:00 PM",
    checkout: "10:00 AM",
    images: [
      "/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
      "/images/properties/salisbury-unit-a/1512a1da-0223-4707-902c-b9e4a3287266.jpg.avif",
      "/images/properties/salisbury-unit-a/1992c7b3-7c24-46c2-9d17-988c9c9beaba.jpeg.avif",
      "/images/properties/salisbury-unit-a/1d541a79-5c32-4f1b-90f1-7029fd19b9f6.jpeg.avif",
      "/images/properties/salisbury-unit-a/256ce0b4-45ad-4058-8241-45ebf2f96d39.jpeg.avif",
      "/images/properties/salisbury-unit-a/3c557725-a17a-43dc-af69-83d226950ccb.jpeg.avif",
      "/images/properties/salisbury-unit-a/5ec8c0a9-3bf1-4e9e-819c-1f50fecc4c33.jpeg.avif",
      "/images/properties/salisbury-unit-a/7625a5a2-211f-4e41-ac46-8b5af2344d6c.jpeg.avif",
      "/images/properties/salisbury-unit-a/9605bd91-88da-4fa2-b951-c85ce5e930af.jpeg.avif",
      "/images/properties/salisbury-unit-a/9b9d7095-4244-4059-acde-fcfb1c95403e.jpeg.avif",
      "/images/properties/salisbury-unit-a/9bbd14f5-7b09-4c26-95b3-bfdf884b1886.jpeg.avif",
      "/images/properties/salisbury-unit-a/a404fe23-4d92-4213-9044-a1202d0c78cc.jpg-2.avif",
      "/images/properties/salisbury-unit-a/c9ec61d6-5ebc-4c5b-be1c-8c5fdd855d7c.jpg.avif",
      "/images/properties/salisbury-unit-a/d625f19d-a2a8-46ec-b450-e7ada4a95a30.jpeg.avif",
      "/images/properties/salisbury-unit-a/e0e58c47-00f8-40c0-8aef-0b158ca78b24.jpeg.avif",
      "/images/properties/salisbury-unit-a/ee884196-88c4-4bf4-ad4f-050f486647cf.jpeg.avif",
    ],
    heroImage:
      "/images/properties/salisbury-unit-a/4d4bdee3-94a7-448e-a0ce-64846256a3f7.jpeg.avif",
    airbnbUrl: "https://www.airbnb.com/rooms/848024107875267690",
    propertyType: "Entire Home",
  },
  {
    id: "salisbury-apt-b",
    hospitable_id: "6bf14947-97a1-4664-971b-69fa73d71625",
    slug: "modern-lexington-apartment",
    name: "Modern 3BR Apartment Near I-85",
    tagline: "20 Min to Polar Express | Sleeps 6",
    address: {
      street: "1222 South Salisbury Street, APT B",
      city: "Lexington",
      state: "NC",
      zip: "27292",
      display: "Lexington, NC",
      coordinates: { lat: 35.809221, lng: -80.268885 },
    },
    summary:
      "Located just 1 mile from I-85 in Lexington, this 3-bedroom, 1.5-bath apartment includes a living room, balcony, and fully equipped kitchen. Modern finishes throughout with easy access to local amenities.",
    description:
      "This modern apartment offers three bedrooms and 1.5 bathrooms with contemporary finishes. Features include a spacious living room, private balcony, and a fully equipped kitchen. Located in the heart of Lexington, NC with easy access to I-85, restaurants, Planet Fitness, and local attractions. Perfect for families, professionals, and anyone needing comfortable extended-stay housing in the Triad area. Just 20 minutes from the NC Transportation Museum's Polar Express experience.",
    capacity: { bedrooms: 3, bathrooms: 1.5, beds: 3, guests: 6 },
    amenities: [
      "High-Speed WiFi",
      "Smart TV",
      "Fully Equipped Kitchen",
      "Washer & Dryer",
      "Free Parking",
      "Air Conditioning",
      "Heating",
      "Balcony",
      "Coffee Maker",
      "Iron",
      "Hair Dryer",
      "Smoke Detector",
      "Carbon Monoxide Detector",
      "First Aid Kit",
    ],
    highlights: [
      "3 Bedrooms | 1.5 Bathrooms",
      "Sleeps 6 Comfortably",
      "Modern Finishes Throughout",
      "Private Balcony",
      "High-Speed WiFi & Smart TVs",
      "Washer & Dryer",
      "Free Parking",
      "Self Check-In",
      "1 Mile from I-85",
    ],
    idealFor: [
      "Traveling nurses",
      "Corporate housing",
      "Insurance relocation stays",
      "Families visiting the Triad",
      "Mid-term stays (30+ days)",
    ],
    houseRules: {
      petsAllowed: true,
      smokingAllowed: false,
      eventsAllowed: false,
    },
    checkin: "4:00 PM",
    checkout: "10:00 AM",
    images: [
      "/images/properties/salisbury-apt-b/440cfc28-d4e4-44a7-b5d2-77900b027115.jpeg-2.avif",
      "/images/properties/salisbury-apt-b/22874c14-36af-45ba-b4ba-6e8c34a3eb56.jpeg.avif",
      "/images/properties/salisbury-apt-b/5033ba85-6f24-4440-a7c0-5f30a74a1264.jpeg.avif",
      "/images/properties/salisbury-apt-b/5cd5b02a-e918-4e34-be44-7f7c0f515ae2.jpeg.avif",
      "/images/properties/salisbury-apt-b/6121c66b-aeff-4856-b41c-f40172931b7b.jpeg-2.avif",
      "/images/properties/salisbury-apt-b/65aa409f-8bd0-4b1a-bf92-d7821d292224.jpeg.avif",
      "/images/properties/salisbury-apt-b/7c0b5feb-8ea9-492a-82b2-3065c5a1f00d.jpeg.avif",
      "/images/properties/salisbury-apt-b/7ce90ced-4617-4468-a63c-ac7b8e86acaa.jpeg.avif",
      "/images/properties/salisbury-apt-b/8e6227ef-5189-4062-9148-a233ae5e2340.jpeg.avif",
      "/images/properties/salisbury-apt-b/dbd66be9-f609-47ed-999d-7e66398f3169.jpeg.avif",
      "/images/properties/salisbury-apt-b/f88b32c5-80ff-4f52-a9fc-ce628589bdff.jpeg.avif",
    ],
    heroImage:
      "/images/properties/salisbury-apt-b/440cfc28-d4e4-44a7-b5d2-77900b027115.jpeg-2.avif",
    airbnbUrl: "https://www.airbnb.com/rooms/1574103632199842466",
    propertyType: "Entire Home",
  },
  {
    id: "linwood-retreat",
    hospitable_id: "09428019-0a4d-49d3-bd07-e556a8aed29a",
    slug: "family-retreat-hot-tub",
    name: "Family 3BR Retreat with Hot Tub",
    tagline: "Downtown Lexington | Sleeps 6",
    address: {
      street: "960 Old Linwood Road",
      city: "Lexington",
      state: "NC",
      zip: "27292",
      display: "Lexington, NC",
      coordinates: { lat: 35.809, lng: -80.268 },
    },
    summary:
      "Beautifully renovated 3BR villa in downtown Lexington, NC! Less than 1 mile to I-85, Planet Fitness, Chick-fil-A, Starbucks, Lowe's, Walmart and more. Features a private hot tub for ultimate relaxation.",
    description:
      "This beautifully renovated 3-bedroom, 2-bathroom villa sits in the heart of downtown Lexington. Enjoy modern finishes, a fully equipped kitchen, and a private hot tub perfect for unwinding after a long day. Conveniently located less than 1 mile from I-85 with easy access to restaurants, shopping, and local attractions. Just 30 minutes from Winston-Salem, High Point, and Greensboro. Ideal for families, traveling professionals, and anyone seeking comfortable, well-appointed housing in the Triad.",
    capacity: { bedrooms: 3, bathrooms: 2, beds: 3, guests: 6 },
    amenities: [
      "Hot Tub",
      "High-Speed WiFi",
      "Smart TV",
      "Fully Equipped Kitchen",
      "Washer & Dryer",
      "Free Parking",
      "Air Conditioning",
      "Heating",
      "Coffee Maker",
      "Iron",
      "Hair Dryer",
      "Smoke Detector",
      "Carbon Monoxide Detector",
    ],
    highlights: [
      "3 Bedrooms | 2 Bathrooms",
      "Sleeps 6 Comfortably",
      "Private Hot Tub",
      "Fully Equipped Kitchen",
      "High-Speed WiFi & Smart TVs",
      "Washer & Dryer",
      "Free Parking",
      "Self Check-In",
      "< 1 Mile from I-85",
    ],
    idealFor: [
      "Traveling nurses",
      "Corporate housing",
      "Insurance relocation stays",
      "Families visiting the Triad",
      "Mid-term stays (30+ days)",
    ],
    houseRules: {
      petsAllowed: false,
      smokingAllowed: false,
      eventsAllowed: false,
    },
    checkin: "3:00 PM",
    checkout: "11:00 AM",
    images: [
      "/images/properties/linwood-retreat/fd06c053-4bca-4895-9e56-4d18ee5aa2c0.jpeg-2.avif",
      "/images/properties/linwood-retreat/48b67188-6121-41a3-a86b-d4927f80b705.jpeg.avif",
      "/images/properties/linwood-retreat/6a5a2ac1-d767-489f-b3a1-de80fd42c05d.jpeg.avif",
      "/images/properties/linwood-retreat/731d71e2-4b1d-49c0-ab9c-86d74b3d0989.jpeg.avif",
      "/images/properties/linwood-retreat/7c587bfe-9a83-481e-87bb-40fb1443f667.jpeg.avif",
      "/images/properties/linwood-retreat/823ebfd8-01a8-4c19-a9d3-dcc29497ef7a.jpeg.avif",
      "/images/properties/linwood-retreat/a9941843-dbc2-4c84-a475-e4c22113f2cd.jpeg.avif",
      "/images/properties/linwood-retreat/cb7e699c-d20b-4038-b90d-f201abda0fd4.jpeg.avif",
      "/images/properties/linwood-retreat/f4b470ab-c27d-4ed5-a9a0-c7094ebce98f.jpeg.avif",
    ],
    heroImage:
      "/images/properties/linwood-retreat/fd06c053-4bca-4895-9e56-4d18ee5aa2c0.jpeg-2.avif",
    airbnbUrl: "https://www.airbnb.com/rooms/1619248354186567468",
    propertyType: "Entire Home",
  },
];

export const getPropertyBySlug = (slug: string): Property | undefined =>
  properties.find((p) => p.slug === slug);

export const getAllPropertySlugs = (): string[] =>
  properties.map((p) => p.slug);
