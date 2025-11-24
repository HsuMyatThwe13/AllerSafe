export interface Allergen {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  allergens: string[]; // allergen IDs
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
}

export function getMockAllergens(): Allergen[] {
  return [
    { id: 'a1', name: 'Peanuts', category: 'Nuts', description: 'Common legume allergy' },
    { id: 'a2', name: 'Tree Nuts', category: 'Nuts', description: 'Includes almonds, walnuts, cashews' },
    { id: 'a3', name: 'Milk', category: 'Dairy', description: 'Lactose and dairy proteins' },
    { id: 'a4', name: 'Eggs', category: 'Animal Products', description: 'Chicken eggs' },
    { id: 'a5', name: 'Soy', category: 'Legumes', description: 'Soybeans and soy products' },
    { id: 'a6', name: 'Wheat', category: 'Grains', description: 'Contains gluten' },
    { id: 'a7', name: 'Fish', category: 'Seafood', description: 'Finned fish' },
    { id: 'a8', name: 'Shellfish', category: 'Seafood', description: 'Crustaceans and mollusks' },
    { id: 'a9', name: 'Sesame', category: 'Seeds', description: 'Sesame seeds and oil' },
    { id: 'a10', name: 'Gluten', category: 'Grains', description: 'Found in wheat, barley, rye' },
  ];
}

export function getMockIngredients(): Ingredient[] {
  return [
    { id: 'i1', name: 'Chicken Breast', category: 'Meat', allergens: [] },
    { id: 'i2', name: 'Lettuce', category: 'Vegetables', allergens: [] },
    { id: 'i3', name: 'Parmesan Cheese', category: 'Dairy', allergens: ['a3'] },
    { id: 'i4', name: 'Caesar Dressing', category: 'Condiments', allergens: ['a3', 'a4', 'a7'] },
    { id: 'i5', name: 'Croutons', category: 'Bread', allergens: ['a6', 'a10'] },
    { id: 'i6', name: 'Salmon', category: 'Seafood', allergens: ['a7'] },
    { id: 'i7', name: 'Rice', category: 'Grains', allergens: [] },
    { id: 'i8', name: 'Avocado', category: 'Vegetables', allergens: [] },
    { id: 'i9', name: 'Soy Sauce', category: 'Condiments', allergens: ['a5', 'a6'] },
    { id: 'i10', name: 'Sesame Seeds', category: 'Seeds', allergens: ['a9'] },
    { id: 'i11', name: 'Peanut Butter', category: 'Spreads', allergens: ['a1'] },
    { id: 'i12', name: 'Almond Milk', category: 'Dairy Alternatives', allergens: ['a2'] },
    { id: 'i13', name: 'Shrimp', category: 'Seafood', allergens: ['a8'] },
    { id: 'i14', name: 'Pasta', category: 'Grains', allergens: ['a6', 'a10'] },
    { id: 'i15', name: 'Tomatoes', category: 'Vegetables', allergens: [] },
    { id: 'i16', name: 'Mozzarella', category: 'Dairy', allergens: ['a3'] },
    { id: 'i17', name: 'Basil', category: 'Herbs', allergens: [] },
    { id: 'i18', name: 'Eggs', category: 'Animal Products', allergens: ['a4'] },
    { id: 'i19', name: 'Butter', category: 'Dairy', allergens: ['a3'] },
    { id: 'i20', name: 'Flour', category: 'Grains', allergens: ['a6', 'a10'] },
  ];
}

export function getMockMeals(): Meal[] {
  const ingredients = getMockIngredients();
  
  return [
    {
      id: 'm1',
      name: 'Caesar Salad',
      description: 'Classic Caesar salad with grilled chicken, romaine lettuce, and parmesan',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i1')!,
        ingredients.find(i => i.id === 'i2')!,
        ingredients.find(i => i.id === 'i3')!,
        ingredients.find(i => i.id === 'i4')!,
        ingredients.find(i => i.id === 'i5')!,
      ],
    },
    {
      id: 'm2',
      name: 'Salmon Poke Bowl',
      description: 'Fresh salmon with rice, avocado, and sesame seeds',
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i6')!,
        ingredients.find(i => i.id === 'i7')!,
        ingredients.find(i => i.id === 'i8')!,
        ingredients.find(i => i.id === 'i9')!,
        ingredients.find(i => i.id === 'i10')!,
      ],
    },
    {
      id: 'm3',
      name: 'Thai Peanut Noodles',
      description: 'Rice noodles tossed in creamy peanut sauce',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i7')!,
        ingredients.find(i => i.id === 'i11')!,
        ingredients.find(i => i.id === 'i9')!,
        ingredients.find(i => i.id === 'i10')!,
      ],
    },
    {
      id: 'm4',
      name: 'Shrimp Pasta',
      description: 'Creamy garlic pasta with grilled shrimp',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i13')!,
        ingredients.find(i => i.id === 'i14')!,
        ingredients.find(i => i.id === 'i3')!,
        ingredients.find(i => i.id === 'i19')!,
      ],
    },
    {
      id: 'm5',
      name: 'Margherita Pizza',
      description: 'Traditional pizza with tomato, mozzarella, and fresh basil',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i20')!,
        ingredients.find(i => i.id === 'i15')!,
        ingredients.find(i => i.id === 'i16')!,
        ingredients.find(i => i.id === 'i17')!,
      ],
    },
    {
      id: 'm6',
      name: 'Vegan Buddha Bowl',
      description: 'Healthy bowl with rice, vegetables, and tahini dressing',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i7')!,
        ingredients.find(i => i.id === 'i8')!,
        ingredients.find(i => i.id === 'i2')!,
        ingredients.find(i => i.id === 'i15')!,
      ],
    },
    {
      id: 'm7',
      name: 'Breakfast Scramble',
      description: 'Fluffy scrambled eggs with cheese and butter',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i18')!,
        ingredients.find(i => i.id === 'i19')!,
        ingredients.find(i => i.id === 'i3')!,
      ],
    },
    {
      id: 'm8',
      name: 'Grilled Chicken & Rice',
      description: 'Simple and healthy grilled chicken breast with steamed rice',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
      ingredients: [
        ingredients.find(i => i.id === 'i1')!,
        ingredients.find(i => i.id === 'i7')!,
      ],
    },
  ];
}
