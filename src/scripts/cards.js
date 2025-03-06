const peruImage = new URL(
  "../images/willian-justen-de-vasconcellos-4hMET7vYTAQ-unsplash (1).jpg",
  import.meta.url
);
const petersburgImage = new URL(
  "../images/evg-klimov-qMEsbgLSXVo-unsplash (1).jpg",
  import.meta.url
);
const tokyoImage = new URL(
  "../images/manuel-cosentino-pHPDs0xoBVE-unsplash (1).jpg",
  import.meta.url
);
const praguetImage = new URL(
  "../images/valya-polishchuk-yUVlVXEw370-unsplash (1).jpg",
  import.meta.url
);
const hawaiiImage = new URL(
  "../images/vishnu-tadimeti-DFbhalEBaJg-unsplash (1).jpg",
  import.meta.url
);
const egyptImage = new URL(
  "../images/simon-berger-boyXZfqpwpU-unsplash (1).jpg",
  import.meta.url
);

export const initialCards = [
  {
    name: "Перу",
    link: peruImage,
  },
  {
    name: "Санкт-Петербург",
    link: petersburgImage,
  },
  {
    name: "Токио",
    link: tokyoImage,
  },
  {
    name: "Прага",
    link: praguetImage,
  },
  {
    name: "Гавайи",
    link: hawaiiImage,
  },
  {
    name: "Египет",
    link: egyptImage,
  },
];
