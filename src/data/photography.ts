export interface GalleryImage {
  id: string;
  previewUrl: string;
  driveLink: string;
}

export interface PhotoSeries {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  driveFolder: string;
  images: GalleryImage[];
}

const drivePreview = (fileId: string) =>
  `https://lh3.googleusercontent.com/d/${fileId}=w800`;

const driveView = (fileId: string) =>
  `https://drive.google.com/file/d/${fileId}/view`;

const sunnyIds = [
  "1fim0sCojj-61FlZLE7GrqqL-L0CaV4xS",
  "1fCLe3HqXUSOpIchePOEIdkIF0YmpOi7I",
  "1N7tPMLXdaJk9SPVT8TAJZNMUSyuf3-z6",
  "1CQXtgnSPekpxj9R6sEH7MtNBA8OUqAHf",
  "1SAb4_EDv1RbOvY7tEkDp5aygyEMiTnLr",
  "176Z-EukIS8FBP0CVS3AITZo2USWYNWoO",
  "1wQDyHXk1OLjl4Ho-CEYmyXs-5c_3ukTb",
  "1lyQM-zwXRUXnfG7gr6TPGZyCry1d6m3O",
  "1OGx3dpU8IDCcm5YcxY1TYvn_T7Buh1Zd",
  "1iOaVp7fr0gVccANHZ4oTgQ-BxZM1tq0z",
  "19RKGdIn9yltVA05cyFoP2u9JMB9p0s0K",
  "1xNDc_xhgyEImSA9xCDJ8wri4vxzqN98Y",
  "1cdyb7iA-6O9wMdacK4wEWuuZz2gZVwV4",
];

const khasoIds = [
  "11p3l4cQ7Zx2kKW3aleO_2sl3xt7MD2e7",
  "1P4FQPlUxUIIoYCqq_OSgbLc8qeWFckDI",
  "1tCOOPRkKLrgS-ORZ8Yp7M1ZHrrfqqIRQ",
  "17EGPdrihiLfPsJtcnu0u0B83hrXCHYzn",
  "17RSj6YbmnhuvKqBwWZkgw4cCTXu0Ytg5",
  "1LUA0upsYX6bRghb9dcUfn_XJKusB-w86",
  "1wwJHwnCJyAj9IKC7UN74J_y7PAAcYu-e",
  "1IpoLJPZZDbD3B3wHWUbWpdUagR8mcU6T",
  "1_iZ-odo1r7zxzvucA3NeMT7KckcpJ7Wu",
  "1C9gLHHpu5Pi434JDHamtn5GqVrgU1lOZ",
  "14RHWamCpM6tsHE5mus22jUPVvtiquO6E",
  "1TfYSr7OAY3yaozXfEBBJISwfljGOkGB-",
  "1HEjfiXjBanryBsny_DqgiUs3v8TD9Fe0",
  "1PPCogoCFrw3i1X0VGOBHa19r38AqcQha",
  "12a2GSMcv_Yz4voB62gRamQ1MIHeekKap",
];

const foodIds = [
  "1gP4qa2IXMq_WFhkl_yonwYBP-gpTAgev",
  "1CED1sJrQfrWI4gbskLlTi2w27cW1K3M9",
  "1ZSf6-3sBdCv5QzJ1Et1OYeq1GwhZ6XEI",
  "158hfM6R-8a0oiSkPn6Qwtdh0BQyYdjDJ",
  "1ApfkuwiwHK70Z-dmiiAbakEpElVYFu-e",
  "1pp6MBDCDsQdwU3JlFNMXbE0YNz6Vx8V-",
  "16zh2SvVqTaYA1tWyHlKTNGjZKBgt53Ch",
  "1FBeiEhQBq1gKM4-Z0nwhopi7793DeA3f",
  "1JQiClod3FmU1ue4dflLLSxQyiVBa3srT",
  "1gEsb_gxfe3explrn_5lFbbzSrnsoh0cj",
  "106lAm-xbHG5RgNms04m8Pn6ahc0TG__4",
  "10K15CsvGFZMC5vgF9QPlMuvOXvw2FGAT",
];

const urvashiIds = [
  "1aWst6S1_EPMRiLK2p_UajUsN4E9IS_Zo",
  "1lFkMMsbzQ-7mScKqVkq9TyuVY759omDq",
  "1AfJ8ZNXQNgSnxUeVy0U01ybWg5UTNgQZ",
  "1kFaNyptU-xmo2yt3q-KsVkaCcUJVHdn8",
  "1arg8-mxPNCFLnZouQpwzg-pU3mH9xidC",
  "12fMytKCO86Vp2AakVJS7B9rU-SHadRb2",
  "1fI1ISOx0FV5BLx1ru0Yoj7JWEpUZAHDi",
  "16uwb7KSNbQQEoS_V2Y9wwIfFSkyzNZWE",
  "1Kf1jtsrd93T_IY2bQXbZn8RR-nJ51EQX",
  "1ZB4Q2Q-naAAsIkvOHgt5S1lA8_N7ZQrd",
  "1l3bVKUb0Y96ed4zvCke86zMyeC2E3LUc",
  "1XXrbmWbn67IcmKkQT49-kWnjls-lGxWu",
  "1iVZxvuRuXpHuEqDbb-XwmTmDrQCoY6ts",
  "1CRdNoLnaGXZr9Guwew5giM32Rgp5gPdA",
  "1CF_Zyf_nb1ZC61RX27KmAJ48MEp6uQs3",
  "1FNfv1q5u3rx9kL108fItbJKgfc-Z69xc",
  "1Rsae3vVjfkhZ1mwnIqvtB7L5TkBRP5fl",
  "1BFEWn8zHeppy_bel_uES-3BQsyjKIqRo",
  "138K9f7lYZcrUQaWlIixyG55dmR2_qiRK",
  "17dQV9-uvZITF3DurQGkT4HXDpl7kW1e_",
  "1-ZYt875o7jjiaZmjL2LreGkiTBOKfedr",
  "10kIWubAvDX6S155oYVTkizO984aBjKci",
  "19_TSAaVDNwxC0pBDgg24YcNTDyG_IiOn",
  "1lSDtmTeUewN5w12ByEV2aDlr6MFvifdv",
  "1gKHUr4EmGrW-8r5leaje414vNSTWHdfA",
  "1K4XHMTsm7WtdBGD1ym4nlAdfXA-vQdY2",
];

const donearIds = [
  "174CytmhkPI88k5k21qpjoBDPZdlBN4Me",
  "1MDjefVUTftjNM6ZW_zgNVemCz-XXoN9O",
  "1TvniR_bg8Gjs9KysomXf6F4PFLtedL-S",
  "1CwsNmBRmfVIn1An55OK757kzbLJvNRDg",
  "1a7ubM90gTc6he2ShEVSdLDMELcGhrVy0",
  "1PUWZwGC88R-ST_XK2eIrgxM-aZaD1Aji",
  "1lnnN8Q84hdjfxmhdj0ZoPZbPig4Prqac",
  "1Zmqhkh_VHE8uDcqBfb6DCY3v17kh9SCh",
  "1cgXyTb5spdMdhEw-gNfDttMttfC7dNGH",
];

const sunnyBrandShootIds = [
  "1jGiHCP8Gd3d8NY2sL-gYurSyEQJTtmtF",
  "1HlkbA8C9Qpg36j-hyUU_DvE8OcnmWmse",
  "14xf37tkCC4LpT1EQd7t_fgN1yQwBa1u2",
  "1SOrseWmEEBOZUPVciBXzZR3arQGuFoec",
  "1B1a4SDjCcAvvOQDRP7IX9zwzN-aw34mW",
  "1ivVU9b6bghrWaeXKE5yiNSXZaU3FWObc",
  "18DbnukTPXVItKdFMPHxWiOYj0NZul_qN",
  "1dLrCqkrFoozLiEIpv3s6AsXUF0BJKnbp",
];

export const photographySeries: PhotoSeries[] = [
  {
    id: "sunny",
    title: "Sunny",
    category: "Editorial",
    coverImage: drivePreview(sunnyIds[0]),
    driveFolder: "https://drive.google.com/drive/folders/1CFFS0Feor8yT6W_47n3j7T4xYhxnNGs4",
    images: sunnyIds.slice(0, 10).map((fid, i) => ({
      id: `sunny-${i + 1}`,
      previewUrl: drivePreview(fid),
      driveLink: driveView(fid),
    })),
  },
  {
    id: "khaso",
    title: "Khaso",
    category: "Clothing Brand",
    coverImage: drivePreview(khasoIds[0]),
    driveFolder: "https://drive.google.com/drive/folders/1CFFS0Feor8yT6W_47n3j7T4xYhxnNGs4", // Using placeholder until provided
    images: khasoIds.slice(0, 10).map((fid, i) => ({
      id: `khaso-${i + 1}`,
      previewUrl: drivePreview(fid),
      driveLink: driveView(fid),
    })),
  },
  {
    id: "food",
    title: "Food",
    category: "Food & Beverage",
    coverImage: drivePreview(foodIds[0]),
    driveFolder: "https://drive.google.com/drive/folders/1CFFS0Feor8yT6W_47n3j7T4xYhxnNGs4", // Placeholder
    images: foodIds.slice(0, 10).map((fid, i) => ({
      id: `food-${i + 1}`,
      previewUrl: drivePreview(fid),
      driveLink: driveView(fid),
    })),
  },
  {
    id: "urvashi",
    title: "Urvashi Rautela x Wedding Affairs",
    category: "Editorial",
    coverImage: drivePreview(urvashiIds[0]),
    driveFolder: "https://drive.google.com/drive/folders/1CFFS0Feor8yT6W_47n3j7T4xYhxnNGs4", // Placeholder
    images: urvashiIds.slice(0, 10).map((fid, i) => ({
      id: `urvashi-${i + 1}`,
      previewUrl: drivePreview(fid),
      driveLink: driveView(fid),
    })),
  },
  {
    id: "donear",
    title: "Donear",
    category: "Clothing Brand",
    coverImage: drivePreview(donearIds[0]),
    driveFolder: "https://drive.google.com/drive/folders/1CFFS0Feor8yT6W_47n3j7T4xYhxnNGs4", // Placeholder
    images: donearIds.slice(0, 10).map((fid, i) => ({
      id: `donear-${i + 1}`,
      previewUrl: drivePreview(fid),
      driveLink: driveView(fid),
    })),
  },
  {
    id: "sunny-brand-shoot",
    title: "Sunny Brand Shoot",
    category: "Brand Campaign",
    coverImage: drivePreview(sunnyBrandShootIds[0]),
    driveFolder: "https://drive.google.com/drive/folders/1CFFS0Feor8yT6W_47n3j7T4xYhxnNGs4", // Placeholder
    images: sunnyBrandShootIds.slice(0, 10).map((fid, i) => ({
      id: `sunny-brand-${i + 1}`,
      previewUrl: drivePreview(fid),
      driveLink: driveView(fid),
    })),
  },
];

export function getSeriesById(id: string): PhotoSeries | undefined {
  return photographySeries.find((s) => s.id === id);
}
