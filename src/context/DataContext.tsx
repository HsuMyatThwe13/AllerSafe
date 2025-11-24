import { createContext, useContext, type ReactNode } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { getMockAllergens, getMockIngredients, getMockMeals, type Allergen, type Ingredient, type Meal } from '../lib/mockData';
import type { StoredUser } from '../types/user';

const STORAGE_KEYS = {
  users: 'allersafe:users',
  meals: 'allersafe:meals',
  ingredients: 'allersafe:ingredients',
  allergens: 'allersafe:allergens',
} as const;

const defaultUsers: StoredUser[] = [
  {
    id: 'admin-default',
    name: 'AllerSafe Admin',
    email: 'admin@allersafe.com',
    password: 'admin123',
    role: 'admin',
    phone: '',
  },
];

interface DataContextValue {
  users: StoredUser[];
  setUsers: React.Dispatch<React.SetStateAction<StoredUser[]>>;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  allergens: Allergen[];
  setAllergens: React.Dispatch<React.SetStateAction<Allergen[]>>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = usePersistentState<StoredUser[]>(STORAGE_KEYS.users, defaultUsers);
  const [allergens, setAllergens] = usePersistentState<Allergen[]>(STORAGE_KEYS.allergens, getMockAllergens);
  const [ingredients, setIngredients] = usePersistentState<Ingredient[]>(STORAGE_KEYS.ingredients, getMockIngredients);
  const [meals, setMeals] = usePersistentState<Meal[]>(STORAGE_KEYS.meals, getMockMeals);

  const value: DataContextValue = {
    users,
    setUsers,
    meals,
    setMeals,
    ingredients,
    setIngredients,
    allergens,
    setAllergens,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }

  return context;
}
