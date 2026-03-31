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
        slug: "/category/bedding",
      },
      {
        name: "Bedcovers",
        image: "/images/bedcover.jpg",
        slug: "/category/bedding",
      },
    ],
  },
  {
    name: "Clothing",
    slides: [
      {
        name: "Bathrobes",
        image: "/images/bathrobes.jpg",
        slug: "/category/clothing",
      },
      {
        name: "Towels",
        image: "/images/towels.jpg",
        slug: "/category/clothing",
      },
    ],
  },
  {
    name: "Kids",
    slides: [
      {
        name: "Baby Blankets",
        image: "/images/baby-blankets.jpg",
        slug: "/category/kids",
      },
      {
        name: "Baby Bags",
        image: "/images/baby-bags.jpg",
        slug: "/category/kids",
      },
    ],
  },
  {
    name: "Accessories",
    slides: [
      {
        name: "Tote Bags",
        image: "/images/tote-bags.jpg",
        slug: "/category/accessories",
      },
      {
        name: "Pouches",
        image: "/images/pouches.jpg",
        slug: "/category/accessories",
      },
    ],
  },
]