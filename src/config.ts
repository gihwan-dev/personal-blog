import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://personal-blog-rust-one.vercel.app/", // replace this with your deployed domain
  author: "최기환",
  desc: "프론트엔드 개발자 최기환의 기술 블로그 입니다.",
  title: "Gihwan-dev",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/gihwan-dev",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/%EA%B8%B0%ED%99%98-%EC%B5%9C-312530303/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:rlghks3004@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
