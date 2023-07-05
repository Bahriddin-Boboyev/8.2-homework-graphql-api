const categories = [
  {
    id: "1",
    name: "Milliy taomlar",
  },
  {
    id: "1",
    name: "Salatlar",
  },
  {
    id: "3",
    name: "Fast food",
  },
  {
    id: "4",
    name: "KFC",
  },
];

const meals = [
  {
    id: "1",
    name: "Osh",
    price: 40000,
    quantity: 30,
    category_id: "1",
  },
  {
    id: "2",
    name: "Acchu-Chuchuk",
    price: 10000,
    quantity: 20,
    category_id: "2",
  },
  {
    id: "3",
    name: "Manti",
    price: 2500,
    quantity: 23,
    category_id: "1",
  },
  {
    id: "4",
    name: "Boksmaster",
    price: 50000,
    quantity: 14,
    category_id: "4",
  },
  {
    id: "5",
    name: "Burger",
    price: 19990,
    quantity: 34,
    category_id: "3",
  },
];

const resolvers = {
  Query: {
    categories: () => categories,
    meals: () => meals,
  },
  Category: {
    meals: (parent) => {
      return meals.filter((meal) => meal.category_id === parent.id);
    },
  },
  Meal: {
    category: (parent) => {
      return categories.find((category) => category.id === parent.category_id);
    },
  },
};

export default resolvers;
