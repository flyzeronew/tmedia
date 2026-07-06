// Local mock data for the article detail page (`src/pages/[id].astro`).
// Mirrors the shape a future `GET /api/articles/:id` response would have —
// once the real API exists, replace `getArticleById` / `getAllArticles`
// with a fetch call and drop this file.

export interface Article {
  id: string;
  title: string;
  reporter: string;
  publishTime: string;
  updateTime: string;
  coverImage: string;
  videoId?: string | null;
  body: string[];
}

export const articles: Article[] = [
  {
    id: '3241614',
    title: 'New Taipei delegation studies waste tech in Germany',
    reporter: 'Yu Han Lei / TVBS World Taiwan',
    publishTime: '2026/06/26 17:14',
    updateTime: '2026/06/26 17:14',
    coverImage: 'https://cc.t.media/img/upload/2026/06/15/20260615175208-8f4488d4.jpg',
    videoId: 's6QuxSl3hmM',
    body: [
      "New Taipei City Deputy Mayor Liou Her-ran traveled to Germany in mid-June to study advanced waste-to-energy facilities and to present the city's climate initiatives at an international sustainability conference in Bonn.",
      "The delegation toured plants that convert wood waste and used EV batteries into heat and hot water for nearby communities, looking at ideas the city hopes to adapt at home.",
      'Liou also met with officials from other global cities and international organizations to exchange strategies on urban climate resilience and disaster monitoring.',
      "The visit reflects New Taipei's broader ambition to reach net-zero emissions by 2050 through smart technology and international partnerships.",
    ],
  },
  {
    id: '3241179',
    title: 'Taiwan warns of flash floods as Mekkhala and front collide',
    reporter: 'TVBS News Staff',
    publishTime: '2026/06/26 10:11',
    updateTime: '2026/06/26 13:18',
    coverImage: 'https://cc.t.media/img/upload/2025/04/22/20250422190712-9dd97463.jpg',
    videoId: null,
    body: [
      "Taiwan's meteorological authorities expanded severe weather warnings as Typhoon Mekkhala moved northward while a stalled front intensified rainfall across the island.",
      'Multiple regions received top-level precipitation alerts, with officials most concerned about flooding in low-lying areas and landslides in mountainous zones.',
      'The hazardous conditions were expected to persist through the weekend before easing as the front moves away from Taiwan.',
    ],
  },
  {
    id: '3240112',
    title: "Buchholz: Taiwan's chip crown is both a shield and a target",
    reporter: 'Dimitri Bruyas / TVBS World Taiwan',
    publishTime: '2026/06/25 09:48',
    updateTime: '2026/06/30 09:24',
    coverImage: 'https://cc.t.media/img/upload/2026/06/25/20260625094638-4904ec2d.jpg',
    videoId: null,
    body: [
      "Former White House economist Todd Buchholz argues that Taiwan's dominance in advanced semiconductor production is a double-edged sword — it underpins the island's global economic importance while also raising the stakes of any conflict with China.",
      'He suggests Taiwan diversify its strategic value by investing in defense software and command systems rather than relying solely on hardware manufacturing.',
      'Buchholz also floated the idea of Taiwan acting as a regional coordinator on shared security concerns among neighboring Asian countries that are otherwise wary of one another.',
    ],
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getAdjacentArticles(id: string): { prev: Article | null; next: Article | null } {
  const index = articles.findIndex((article) => article.id === id);
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : null,
  };
}
