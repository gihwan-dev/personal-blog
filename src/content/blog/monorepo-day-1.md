---
author: Gihwan-dev
pubDatetime: 2024-05-13T18:00:00Z
title: My own monorepo - 1
slug: mono-repo-travel-day-1
featured: false
draft: false
tags:
  - daily
description: I'm making my own monorepo with turborepo and pnpm. This post about my travel for build own monorepo
---

## Table of contents

## Why?

Before getting a job as a frontend developer, I felt I needed a project that would serve as a sharp weapon... I came up with an idea and decided to implement it. I proceeded with the design and decided to introduce `monorepo` this time.

## Is Monorepo Right for Me?

Yes. It is not. While studying monorepo, I realized that it might not be suitable for me since I am an individual and I am doing projects as an individual. Nevertheless, I thought there was a point in trying this out, so I started the design.

[Ongoing monorepo GitHub repo](https://github.com/gihwan-dev/gihwan-dev-monorepo)

## What's Important in Monorepo?

Before exploring what's important in a monorepo, let's briefly summarize the background of its emergence:

1. We previously used a multirepo, which gave **autonomy** to each team conducting projects. **They could use whatever technology and pipelines they wanted in their projects.**
2. However, this **autonomy comes from independence.** As numerous teams developed with their own technologies, **it became difficult to collaborate between teams.**
3. Therefore, monorepo emerged. **It allowed all teams to share numerous codebases within one repository.** For example, where previously each team applied their own linters in a multirepo, now everyone uses one shared linter.

This is the background of the emergence of `monorepo`. However, a poorly designed `monorepo` is no different from a `monolith`. A well-organized `monorepo` is exactly the opposite of a `monolith`.

I decided to start with this `monorepo` and began the structural design. That's how I made `version 1.0` based on `GPT`.

```text
/root
├── packages/
│   ├── core/
│   │   └── src/
│   │       ├── auth/
│   │       ├── api/
│   │       └── utils/
│   ├── ui-components/
│   │   └── src/
│   │       ├── Button/
│   │       ├── Widget/
│   │       └── Grid/
│   └── themes/
│       └── src/
│           ├── light-theme/
│           └── dark-theme/
├── apps/
│   └── web-app/
│       └── src/
│           ├── components/
│           ├── layouts/
│           └── pages/
├── node_modules/
└── package.json
```

It felt strange... I wasn't sure, but something didn't seem right... So I thought I should refer to other monorepos and vigorously searched for references.

[Triple Frontend Monorepo GitHub](https://github.com/titicacadev/triple-frontend/tree/main)

I think I understood why I felt a sense of rejection. Monorepo was born for team collaboration. Thus, the structure like the one above is not suitable. The above structure is merely a detailed organization of the project I intended to proceed with. It's a `monorepo` that won't be used once my project is finished.

### Mindset

So, I decided to make a `monorepo` not for my project but for me. The current `me` working on this project and the future `me` who will handle other projects are different teams. And these two `me`s need to collaborate.

Thinking this way, a reasonably plausible structure began to take shape. Below is the redesigned `monorepo 2.0`.

```text
/root
├── packages/
│   │
│   ├── config-eslint/
│   │   └── eslint configuration files
│   │
│   ├── config-prettier/
│   │   └── prettier configuration files
│   │
│   ├── config-vitest/
│   │   └── vitest configuration files
│   │
│   ├── config-tailwind/
│   │   └── tailwind configuration files
│   │
│   ├── config-storybook/
│   │   └── storybook configuration files
│   │
│   ├── react-hooks/
│   │   └── commonly used react hooks
│   │
│   ├── fetchers
│   │   └── commonly used fetch wrapper and fetch utility functions


│   │
│   ├── constants
│   │   └── commonly used constants, regex, etc.
│   │
│   ├── utils
│   │   └── commonly used utility functions
│   │
│   ├── framer-motions
│   │   └── commonly used framer-motion related codes
│   │
├── apps/
│   └── dashboard/
│       └── src/
│           └── my first project
└── package.json
```

Thus, I can proceed with the next project with minimal modifications to the `Next.js` settings, making use of the existing configurations. The future me and the current me can collaborate easily!

## Reflections

It's good to spend time pondering why a technology is needed and how it can be utilized, rather than blindly applying it. I think it fortunately worked out well in the end...

I recently realized that **development sensitivity** is important. It's a term I recently coined. If one can empathize even with the smallest problems encountered in development, developing **development sensitivity** can help solve problems as they arise and become a better developer.

Future posts will mainly focus on building the `monorepo` and conducting the first project therein. I need to work hard to create my weapon for employment!

---

You can check the source code of my ongoing `monorepo` construction at the GitHub address below!
[Monorepo address](https://github.com/gihwan-dev/gihwan-dev-monorepo)

---

## References

[Triple.com Monorepo](https://github.com/titicacadev/triple-frontend/tree/main)
[Monorepo Concept Learning Site](https://monorepo.tools/)
