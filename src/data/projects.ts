// Auto-curated from Akshar Foshan 2026 catalog. 40 frames.
import p01 from "@/assets/portfolio/p01.jpg.asset.json";
import p02 from "@/assets/portfolio/p02.jpg.asset.json";
import p03 from "@/assets/portfolio/p03.jpg.asset.json";
import p04 from "@/assets/portfolio/p04.jpg.asset.json";
import p05 from "@/assets/portfolio/p05.jpg.asset.json";
import p06 from "@/assets/portfolio/p06.jpg.asset.json";
import p07 from "@/assets/portfolio/p07.jpg.asset.json";
import p08 from "@/assets/portfolio/p08.jpg.asset.json";
import p09 from "@/assets/portfolio/p09.jpg.asset.json";
import p10 from "@/assets/portfolio/p10.jpg.asset.json";
import p11 from "@/assets/portfolio/p11.jpg.asset.json";
import p12 from "@/assets/portfolio/p12.jpg.asset.json";
import p13 from "@/assets/portfolio/p13.jpg.asset.json";
import p14 from "@/assets/portfolio/p14.jpg.asset.json";
import p15 from "@/assets/portfolio/p15.jpg.asset.json";
import p16 from "@/assets/portfolio/p16.jpg.asset.json";
import p17 from "@/assets/portfolio/p17.jpg.asset.json";
import p18 from "@/assets/portfolio/p18.jpg.asset.json";
import p19 from "@/assets/portfolio/p19.jpg.asset.json";
import p20 from "@/assets/portfolio/p20.jpg.asset.json";
import p21 from "@/assets/portfolio/p21.jpg.asset.json";
import p22 from "@/assets/portfolio/p22.jpg.asset.json";
import p23 from "@/assets/portfolio/p23.jpg.asset.json";
import p24 from "@/assets/portfolio/p24.jpg.asset.json";
import p25 from "@/assets/portfolio/p25.jpg.asset.json";
import p26 from "@/assets/portfolio/p26.jpg.asset.json";
import p27 from "@/assets/portfolio/p27.jpg.asset.json";
import p28 from "@/assets/portfolio/p28.jpg.asset.json";
import p29 from "@/assets/portfolio/p29.jpg.asset.json";
import p30 from "@/assets/portfolio/p30.jpg.asset.json";
import p31 from "@/assets/portfolio/p31.jpg.asset.json";
import p32 from "@/assets/portfolio/p32.jpg.asset.json";
import p33 from "@/assets/portfolio/p33.jpg.asset.json";
import p34 from "@/assets/portfolio/p34.jpg.asset.json";
import p35 from "@/assets/portfolio/p35.jpg.asset.json";
import p36 from "@/assets/portfolio/p36.jpg.asset.json";
import p37 from "@/assets/portfolio/p37.jpg.asset.json";
import p38 from "@/assets/portfolio/p38.jpg.asset.json";
import p39 from "@/assets/portfolio/p39.jpg.asset.json";
import p40 from "@/assets/portfolio/p40.jpg.asset.json";

export type Category =
  | "Guest Rooms"
  | "Suites"
  | "Lobby & Lounge"
  | "Casegoods"
  | "Workshop"
  | "Brand Projects";

export type Project = {
  id: string;
  url: string;
  title: string;
  category: Category;
  brand?: string;
  year: number;
  location: string;
  blurb: string;
};

const ASSETS = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p36, p37, p38, p39, p40,
];

const META: Omit<Project, "id" | "url">[] = [
  { title: "Marriott TownePlace Suite", category: "Suites", brand: "Marriott", year: 2024, location: "Texas, USA", blurb: "Full suite FF&E — casegoods, soft seating and signage millwork." },
  { title: "Hilton Brand Refresh", category: "Brand Projects", brand: "Hilton", year: 2024, location: "Indianapolis, USA", blurb: "Refresh program across keys, public spaces and back-of-house." },
  { title: "Candlewood Studio Suite", category: "Suites", brand: "Candlewood by IHG", year: 2023, location: "Midwest, USA", blurb: "Extended-stay suite outfit: kitchenette, sleeper sectional, dual desk." },
  { title: "Country Inn King Room", category: "Guest Rooms", brand: "Country Inn & Suites", year: 2024, location: "Wisconsin, USA", blurb: "Warm residential king room with custom headboard and luggage bench." },
  { title: "Boutique Lobby Lounge", category: "Lobby & Lounge", year: 2024, location: "Foshan, China", blurb: "Sculpted lounge seating, brass-and-stone cocktail tables." },
  { title: "Executive Casegoods Set", category: "Casegoods", year: 2023, location: "Custom", blurb: "Walnut veneer dresser, media console and writing desk." },
  { title: "Workshop — CNC Floor", category: "Workshop", year: 2024, location: "Foshan, China", blurb: "Live shot of the panel-cutting and edge-banding line." },
  { title: "Double Queen Guestroom", category: "Guest Rooms", brand: "Marriott", year: 2023, location: "Florida, USA", blurb: "Dual-queen layout with shared media wall and lounge corner." },
  { title: "King Suite with Lounge", category: "Suites", year: 2024, location: "Atlanta, USA", blurb: "Soft-curve sectional, walnut accent wall, layered lighting." },
  { title: "Hilton Hotel Exterior", category: "Brand Projects", brand: "Hilton", year: 2024, location: "USA", blurb: "FF&E supplier for refurbished property — 240 keys delivered." },
  { title: "Upholstered Headboard", category: "Casegoods", year: 2024, location: "Custom", blurb: "Channel-tufted velvet headboard, brass nail trim." },
  { title: "Workshop — Assembly Bay", category: "Workshop", year: 2024, location: "Foshan, China", blurb: "Final assembly, finishing and QC inspection bay." },
  { title: "Studio Suite Lounge", category: "Suites", year: 2023, location: "Houston, USA", blurb: "Sleeper sofa, swivel armchair and bespoke media unit." },
  { title: "Lobby Reception Bench", category: "Lobby & Lounge", year: 2024, location: "Foshan, China", blurb: "Solid-oak banquette under linear pendant array." },
  { title: "Queen-Queen Standard Room", category: "Guest Rooms", year: 2023, location: "Texas, USA", blurb: "Standard-room refresh across 180 keys." },
  { title: "Coffee Table Collection", category: "Casegoods", year: 2024, location: "Custom", blurb: "Stone-top occasional tables for boutique lounges." },
  { title: "Suite Bedroom Wing", category: "Suites", year: 2023, location: "Chicago, USA", blurb: "King suite bedroom with vanity-desk hybrid." },
  { title: "Brand Pillow Program", category: "Brand Projects", year: 2024, location: "Multi-property", blurb: "Custom decorative pillow program across three brands." },
  { title: "Lounge Chair Detail", category: "Lobby & Lounge", year: 2024, location: "Foshan, China", blurb: "Hand-stitched leather lounge chair, brass swivel base." },
  { title: "Standard Double Room", category: "Guest Rooms", year: 2023, location: "Ohio, USA", blurb: "Mid-segment double-queen layout, full FF&E package." },
  { title: "Writing Desk + Chair", category: "Casegoods", year: 2024, location: "Custom", blurb: "Slim writing desk with integrated cable management." },
  { title: "Workshop — Spray Booth", category: "Workshop", year: 2024, location: "Foshan, China", blurb: "Climate-controlled spray and curing booth." },
  { title: "Junior Suite", category: "Suites", year: 2024, location: "Denver, USA", blurb: "Two-room junior suite with lounge separation." },
  { title: "Lounge Banquette Wall", category: "Lobby & Lounge", year: 2023, location: "Boston, USA", blurb: "Continuous banquette under arched paneling." },
  { title: "Bedside Storage", category: "Casegoods", year: 2024, location: "Custom", blurb: "Floating nightstand with integrated USB-C charging." },
  { title: "Marriott Refresh Wing", category: "Brand Projects", brand: "Marriott", year: 2024, location: "Florida, USA", blurb: "Full-floor refresh — 56 keys turned in 21 days." },
  { title: "Executive Lounge Vignette", category: "Lobby & Lounge", year: 2024, location: "Foshan, China", blurb: "Showroom vignette for upper-upscale executive lounge." },
  { title: "Family Suite Living Area", category: "Suites", year: 2023, location: "Orlando, USA", blurb: "Family-suite living area with convertible sectional." },
  { title: "Wardrobe & Luggage Bench", category: "Casegoods", year: 2024, location: "Custom", blurb: "Open wardrobe with hanging rail and bench combo." },
  { title: "Suite Workspace Corner", category: "Suites", year: 2024, location: "Phoenix, USA", blurb: "Daylit workspace with ergonomic task chair." },
  { title: "Workshop — Wood Stock", category: "Workshop", year: 2024, location: "Foshan, China", blurb: "Kiln-dried hardwood stock awaiting milling." },
  { title: "Boutique Suite Bed", category: "Suites", year: 2024, location: "Nashville, USA", blurb: "Sculptural headboard with integrated reading sconces." },
  { title: "Lobby Coffee Nook", category: "Lobby & Lounge", year: 2023, location: "Foshan, China", blurb: "Boutique coffee nook with marble counter." },
  { title: "Standard King Room", category: "Guest Rooms", year: 2023, location: "Georgia, USA", blurb: "Refresh of standard king rooms across two floors." },
  { title: "Custom Media Console", category: "Casegoods", year: 2024, location: "Custom", blurb: "Wall-hung media console with cable trough." },
  { title: "Brand Program — Lighting", category: "Brand Projects", year: 2024, location: "Multi-property", blurb: "Decorative lighting program — 12 fixture SKUs." },
  { title: "Studio Suite Kitchenette", category: "Suites", brand: "Candlewood by IHG", year: 2023, location: "Midwest, USA", blurb: "Compact in-suite kitchenette and dinette set." },
  { title: "Lounge Cocktail Table", category: "Lobby & Lounge", year: 2024, location: "Foshan, China", blurb: "Solid-stone cocktail table on bronzed-steel frame." },
  { title: "Executive Floor Corridor", category: "Brand Projects", year: 2024, location: "USA", blurb: "Corridor wall paneling, art program and carpet planning." },
  { title: "Workshop — QC Inspection", category: "Workshop", year: 2024, location: "Foshan, China", blurb: "Final inspection bay before crating and FOB dispatch." },
];

export const PROJECTS: Project[] = ASSETS.map((a, i) => ({
  id: `p${String(i + 1).padStart(2, "0")}`,
  url: a.url,
  ...META[i],
}));

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Guest Rooms",
  "Suites",
  "Lobby & Lounge",
  "Casegoods",
  "Brand Projects",
  "Workshop",
];

export type Collection = {
  category: Category;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  palette: string;
  signature: string;
};

export const COLLECTIONS: Collection[] = [
  {
    category: "Guest Rooms",
    tagline: "The first impression, multiplied by a thousand keys.",
    description:
      "Residential warmth engineered for hospitality wear. Full-package guest room FF&E — headboards, casegoods, lighting and soft seating — delivered to brand standard and ready to install.",
    stats: [
      { label: "Keys delivered", value: "2,400+" },
      { label: "Active brands", value: "9" },
      { label: "Lead time", value: "10–14 wk" },
    ],
    palette: "Warm oak · brushed brass · ivory bouclé",
    signature: "Country Inn King Room",
  },
  {
    category: "Suites",
    tagline: "Two rooms, one continuous mood.",
    description:
      "Junior, family and extended-stay suite programs that hold their geometry over years of turnover. Sleeper sectionals, dual-desk workstations, kitchenettes and bespoke media walls.",
    stats: [
      { label: "Suite typologies", value: "12" },
      { label: "Convertible seating", value: "All units" },
      { label: "Brands served", value: "Marriott · IHG · Hilton" },
    ],
    palette: "Walnut veneer · ribbed velvet · smoked glass",
    signature: "King Suite with Lounge",
  },
  {
    category: "Lobby & Lounge",
    tagline: "The room that sets the tariff.",
    description:
      "Sculpted public-space seating, stone-top cocktail tables and banquettes built for the camera and the calendar. Bespoke per property — never catalog-stock.",
    stats: [
      { label: "Bespoke ratio", value: "100%" },
      { label: "Material library", value: "180+ SKUs" },
      { label: "Avg. turn", value: "8 weeks" },
    ],
    palette: "Travertine · bronzed steel · saddle leather",
    signature: "Boutique Lobby Lounge",
  },
  {
    category: "Casegoods",
    tagline: "Cabinetry with a millimetre of tolerance.",
    description:
      "Dressers, media consoles, writing desks and wardrobes built on a CNC line with hand-finished veneer. Cable management and USB-C charging integrated as standard.",
    stats: [
      { label: "Edge tolerance", value: "±0.3 mm" },
      { label: "Finish layers", value: "7-coat" },
      { label: "Veneers stocked", value: "24" },
    ],
    palette: "Walnut · rift oak · matte lacquer",
    signature: "Executive Casegoods Set",
  },
  {
    category: "Brand Projects",
    tagline: "Refresh programs at the speed of operations.",
    description:
      "Multi-property refresh and rollout for major flags — keys, corridors, public space and back-of-house — coordinated with brand standards and the operating calendar.",
    stats: [
      { label: "Properties refreshed", value: "60+" },
      { label: "Fastest turn", value: "21 days / 56 keys" },
      { label: "Flags", value: "Marriott · Hilton · IHG" },
    ],
    palette: "Brand-standard · custom-matched",
    signature: "Marriott Refresh Wing",
  },
  {
    category: "Workshop",
    tagline: "Inside the Foshan floor.",
    description:
      "Frames from our own production floor — kiln-dried stock, CNC cutting, climate-controlled spray, final QC. Every project ships from one campus, one team.",
    stats: [
      { label: "Floor area", value: "32,000 m²" },
      { label: "QC stations", value: "6" },
      { label: "Daily output", value: "120 cartons" },
    ],
    palette: "Raw timber · steel · sodium light",
    signature: "Workshop — Assembly Bay",
  },
];

export function collectionFor(cat: Category) {
  return COLLECTIONS.find((c) => c.category === cat)!;
}

export function projectsIn(cat: Category) {
  return PROJECTS.filter((p) => p.category === cat);
}

export function featuredIn(cat: Category, n = 4) {
  return projectsIn(cat).slice(0, n);
}

