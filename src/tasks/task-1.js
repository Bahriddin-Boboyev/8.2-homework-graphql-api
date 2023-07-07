const categories = [
  {
    id: "1",
    name: "Milliy taomlar",
  },
  {
    id: "2",
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
    category: (parent, args, contextValue, info) => {
      const category = categories.find((c) => c.id == args.id);
      if (!category) {
        throw new Error("Category not found!");
      }
      return category;
    },
    ///////////////////////////////////////////////
    meals: () => meals,
    meal: (parent, args, contextValue, info) => {
      const meal = meals.find((m) => m.id == args.id);
      if (!meal) {
        throw new Error("Meal not found!");
      }
      return meal;
    },
  },
  Category: {
    meals: (parent) => {
      return meals.filter((meal) => meal.category_id == parent.id);
    },
  },
  Meal: {
    category: (parent) => {
      return categories.find((category) => category.id == parent.category_id);
    },
  },

  Mutation: {
    createCategory: (parent, args, contextValue, info) => {
      categories.push({
        id: categories.length + 1,
        name: args.input.name,
      });

      return categories.at(-1);
    },

    updateCategory: (parent, args, contextValue, info) => {
      const category = categories.find((c) => c.id == args.id);
      const index = categories.indexOf(category);
      if (!category) {
        throw new Error("Category not found!");
      }
      const update = { ...category, ...args.input };
      categories.splice(index, 1, update);
      return categories[index];
    },
    removeCategory: (parent, args, contextValue, info) => {
      const category = categories.find((c) => c.id == args.id);
      const index = categories.indexOf(category);

      if (!category) {
        throw new Error("Category not found!");
      }

      categories.splice(index, 1);
      return category;
    },

    /////////////////////////////////////

    createMeal: (parent, args, contextValue, info) => {
      console.log(args.input.category_id);
      const category = categories.find((c) => c.id == args.input.category_id);

      if (!category) {
        throw new Error("Category not found!");
      }

      meals.push({
        id: meals.length + 1,
        name: args.input.name,
        price: args.input.price,
        quantity: args.input.quantity,
        category_id: args.input.category_id,
      });

      return meals.at(-1);
    },

    updateMeal: (parent, args, contextValue, info) => {
      const meal = meals.find((c) => c.id == args.id);
      const index = meals.indexOf(meal);
      if (!meal) {
        throw new Error("Meal not found!");
      }

      if (args.input.category) {
        const category = categories.find((c) => c.id == args.input.category);

        if (!category) {
          throw new Error("Category not found!");
        }
      }

      const update = { ...meal, ...args.input };
      meals.splice(index, 1, update);
      return meals[index];
    },

    removeMeal: (parent, args, contextValue, info) => {
      const meal = meals.find((c) => c.id == args.id);
      const index = meals.indexOf(meal);

      if (!meal) {
        throw new Error("Meal not found!");
      }

      meals.splice(index, 1);
      return meal;
    },
  },
};

export default resolvers;
