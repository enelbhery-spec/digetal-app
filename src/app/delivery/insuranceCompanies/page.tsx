"use client";

import { useState } from "react";

type Company = {
  id: number;
  name: string;
  type: string;
  phone: string;
  url: string;
};

const companies: Company[] = [
  {
    id: 1,
    name: "مصر للتأمين",
    type: "تأمين شامل – سيارات",
    phone: "19114",
    url: "https://misrins.com.eg/ar/",
  },
  {
    id: 2,
    name: "قناة السويس للتأمين",
    type: "تأمين سيارات",
    phone: "16569",
    url: "https://sci-egypt.com",
  },
  {
    id: 3,
    name: "أليانز مصر",
    type: "تأمين شامل",
    phone: "19909",
    url: "https://www.allianz.com.eg",
  },

  {
    id: 4,
    name: "AXA مصر",
    type: "تأمين سيارات – صحي",
    phone: "16363 ",
    url: "https://www.axa-egypt.com"
  },

  {
    id: 6,
    name: "رويال للتأمين",
    type: "تأمين سيارات وممتلكات",
    phone: "16902",
    url: "https://royalinsurance.com.eg"
  },
  {
    id: 7,
    name: "GIG مصر",
    type: "تأمين عام وحياة",
    phone: "19792",
    url: "https://gig.com.eg"
  },

  {
    id: 9,
    name: "بيت التأمين المصري السعودي",
    type: "تأمين شامل",
    phone: "19652",
    url: "https://ifti-sd.org/ar/members/65"
  },
  {
    id: 10,
    name: "وثاق للتأمين",
    type: "تأمين سيارات وأفراد",
    phone: "19685",
    url: "https://www.wethaq-egypt.com/home"
  },
];

export default function InsuranceCompanies() {
  const [search, setSearch] = useState("");

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">
        🚗 أفضل شركات التأمين على السيارات في مصر
      </h1>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="ابحث عن شركة أو نوع التأمين..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-3">
        {filtered.map((company) => (
          <li
            key={company.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{company.name}</p>
              <p className="text-sm text-gray-600">{company.type}</p>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${company.phone}`}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                اتصال
              </a>

              <a
                href={company.url}
                target="_blank"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                الموقع
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
