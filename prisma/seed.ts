import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

interface SeedPop {
  district: string;
  generalArea: string;
  name: string;
  btrcPopId: string;
  exactAddress: string;
  latitude: number;
  longitude: number;
  nttnProvider: string;
  linkId: string;
  vlan: string;
  ipAddress: string;
  oltInfo: string;
  routerSwitchInfo: string;
  internalCapacityMbps: number;
}

let counter = 0;
function pop(district: string, generalArea: string): SeedPop {
  counter += 1;
  return {
    district,
    generalArea,
    name: `${district} PoP-${counter}`,
    btrcPopId: `BTRC-POP-${1000 + counter}`,
    exactAddress: `${generalArea} Bazar Road, ${district}, Khulna Division`,
    latitude: 22.5 + Math.random() * 1.5,
    longitude: 89.0 + Math.random() * 1.5,
    nttnProvider: counter % 2 === 0 ? "Fiber@Home" : "BSCCL/Summit",
    linkId: `LNK-${district.slice(0, 3).toUpperCase()}-${counter}`,
    vlan: `VLAN-${100 + counter}`,
    ipAddress: `10.${counter % 250}.${(counter * 3) % 250}.1/29`,
    oltInfo: `Huawei MA5800, 16 PON ports`,
    routerSwitchInfo: `MikroTik CCR2004, core switch`,
    internalCapacityMbps: 1000 + (counter % 5) * 1000,
  };
}

const seedData: SeedPop[] = [
  pop("Jashore", "Jashore Sadar"),
  pop("Jashore", "Abhaynagar"),
  pop("Jashore", "Bagherpara"),
  pop("Jashore", "Chaugachha"),
  pop("Jashore", "Jhikargacha"),
  pop("Jashore", "Keshabpur"),
  pop("Jashore", "Manirampur"),
  pop("Jashore", "Sharsha"),

  pop("Satkhira", "Satkhira Sadar"),
  pop("Satkhira", "Satkhira Sadar"),
  pop("Satkhira", "Kalaroa"),
  pop("Satkhira", "Kalaroa"),
  pop("Satkhira", "Tala"),
  pop("Satkhira", "Debhata"),
  pop("Satkhira", "Kaliganj"),
  pop("Satkhira", "Shyamnagar"),
  pop("Satkhira", "Assasuni"),

  pop("Chuadanga", "Chuadanga Sadar"),
  pop("Chuadanga", "Jibannagar"),

  pop("Khulna", "Khulna Metropolitan"),

  pop("Narail", "Narail Sadar"),
  pop("Narail", "Lohagara"),

  pop("Jhenaidah", "Kaliganj"),
];

async function main() {
  const existing = await prisma.pointOfPresence.count();
  if (existing === 0) {
    await prisma.pointOfPresence.createMany({ data: seedData });
    console.log(`Seeded ${seedData.length} PoPs.`);
  } else {
    console.log(`Skipped PoP seed — ${existing} PoP(s) already exist.`);
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@sunlitnetwork.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "SunlitAdmin123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Sunlit Admin",
      role: "ADMIN",
    },
  });
  console.log(`Admin user ready: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
