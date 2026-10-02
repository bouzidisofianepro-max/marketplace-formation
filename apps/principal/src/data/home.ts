export type Formation = {
  id: string;
  title: string;
  place: string;
  price: string;
  cpf: boolean;
  centre: string;
  rating: string;
  tags: string[];
};

export type Article = {
  title: string;
  href: string;
  kicker: string;
};

export const formations: Formation[] = [
  {
    id: "secretariat-medical",
    title: "Secrétariat médical",
    place: "À distance",
    price: "1 890 €",
    cpf: true,
    centre: "Atelier des savoirs",
    rating: "4,8",
    tags: ["professionnelle", "secrétariat", "santé"],
  },
  {
    id: "comptabilite",
    title: "Gestion comptable",
    place: "Lyon",
    price: "2 400 €",
    cpf: true,
    centre: "Cap Compétences",
    rating: "4,6",
    tags: ["professionnelle", "comptabilité"],
  },
  {
    id: "electricite",
    title: "Électricité du bâtiment",
    place: "Marseille",
    price: "1 650 €",
    cpf: false,
    centre: "Atelier Volt",
    rating: "4,7",
    tags: ["professionnelle", "btp", "électricien"],
  },
  {
    id: "petite-enfance",
    title: "Auxiliaire de puériculture",
    place: "Lille",
    price: "3 200 €",
    cpf: true,
    centre: "Maison des métiers",
    rating: "4,5",
    tags: ["professionnelle", "santé"],
  },
  {
    id: "anglais",
    title: "Anglais professionnel",
    place: "À distance",
    price: "890 €",
    cpf: true,
    centre: "Ligne Claire",
    rating: "4,9",
    tags: ["professionnelle", "langues", "anglais"],
  },
  {
    id: "management",
    title: "Management d'équipe",
    place: "Paris",
    price: "1 290 €",
    cpf: false,
    centre: "Studio Carrière",
    rating: "4,4",
    tags: ["professionnelle", "management"],
  },
  {
    id: "alternance-web",
    title: "Développeur web en alternance",
    place: "Nantes",
    price: "Alternance",
    cpf: false,
    centre: "Atelier Numérique",
    rating: "4,6",
    tags: ["alternance", "informatique"],
  },
  {
    id: "bilan",
    title: "Bilan de compétences",
    place: "Bordeaux",
    price: "1 500 €",
    cpf: true,
    centre: "Cap Compétences",
    rating: "4,7",
    tags: ["bilan", "reconversion"],
  },
];

export const shortcuts = [
  {
    title: "Financez avec le CPF",
    text: "Repérez les formations que votre compte peut prendre en charge.",
    href: "/recherche?cpf=1",
    action: "Voir les formations",
    featured: true,
  },
  {
    title: "Faites reconnaître votre expérience",
    text: "La VAE transforme des années de pratique en diplôme.",
    href: "/recherche?q=bilan",
  },
  {
    title: "Formations professionnelles",
    href: "/recherche?q=professionnelle",
  },
  {
    title: "Formations en alternance",
    href: "/recherche?q=alternance",
  },
  {
    title: "Apprenez à votre rythme, en ligne",
    href: "/recherche?lieu=À+distance",
  },
];

export const themes = [
  "Santé",
  "Informatique",
  "Commerce",
  "BTP",
  "Comptabilité",
  "Langues",
  "Cuisine",
  "Sécurité",
  "Ressources humaines",
  "Transport",
  "Beauté",
  "Immobilier",
];

export const jobs = [
  "Aide-soignant",
  "Comptable",
  "Développeur web",
  "Électricien",
  "Cuisine",
  "Anglais",
  "Management",
  "Secrétariat",
];

export const articles: Article[] = [
  {
    title: "Comment choisir une formation que le CPF peut financer",
    href: "/recherche?cpf=1",
    kicker: "Financement",
  },
  {
    title: "Alternance : les questions à poser au centre avant de signer",
    href: "/recherche?q=alternance",
    kicker: "Alternance",
  },
  {
    title: "Reprendre une formation après plusieurs années de travail",
    href: "/recherche?q=reconversion",
    kicker: "Reconversion",
  },
];

export const cities = [
  "Paris",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Lille",
  "Nantes",
  "Toulouse",
  "Strasbourg",
  "Rennes",
  "Nice",
  "Montpellier",
  "Grenoble",
];

export const centres = [
  "Atelier des savoirs",
  "Cap Compétences",
  "Maison des métiers",
  "Ligne Claire",
];
