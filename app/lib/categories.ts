export type Slide = {
  name: string
  image: string
  slug: string
}

export type Category = {
  name: string
  slides: Slide[]
}

export const categories: Category[] = [
  {
    name: "Bedding",
    slides: [
      {
        name: "Bedsheets",
        image: "/images/bedsheets.jpg",
        slug: "/bedding/bedsheets",
      },
      {
        name: "Bedcovers",
        image: "/images/bedcover.jpg",
        slug: "/bedding/bedcovers",
      },
    ],
  },
  {
    name: "Clothing",
    slides: [
      {
        name: "Bathrobes",
        image: "/images/bathrobes.jpg",
        slug: "/clothing/bathrobes",
      },
      {
        name: "Towels",
        image: "/images/towels.jpg",
        slug: "/clothing/towels",
      },
    ],
  },
  {
    name: "Kids",
    slides: [
      {
        name: "Baby Blankets",
        image: "/images/baby-blankets.jpg",
        slug: "/kids/baby-blankets",
      },
      {
        name: "Baby Bags",
        image: "/images/baby-bags.jpg",
        slug: "/kids/baby-bags",
      },
    ],
  },
  {
    name: "Accessories",
    slides: [
      {
        name: "Tote Bags",
        image: "/images/tote-bags.jpg",
        slug: "/accessories/tote-bags",
      },
      {
        name: "Pouches",
        image: "/images/pouches.jpg",
        slug: "/accessories/pouches",
      },
    ],
  },
]