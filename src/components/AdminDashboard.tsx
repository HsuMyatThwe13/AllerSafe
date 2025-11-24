import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Plus, Trash2, UtensilsCrossed, Leaf, AlertCircle } from 'lucide-react';
import type { Meal, Ingredient, Allergen } from '../lib/mockData';
import { useDataContext } from '../context/DataContext';

export function AdminDashboard() {
  const { meals, setMeals, ingredients, setIngredients, allergens, setAllergens } = useDataContext();
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);
  const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null);
  const [allergenToDelete, setAllergenToDelete] = useState<string | null>(null);

  // New Meal Form
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    image: '',
    ingredientIds: [] as string[],
  });

  // New Ingredient Form
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    category: '',
    allergenIds: [] as string[],
  });

  // New Allergen Form
  const [newAllergen, setNewAllergen] = useState({
    name: '',
    category: '',
    description: '',
  });

  const handleAddMeal = () => {
    if (!newMeal.name || newMeal.ingredientIds.length === 0) return;

    const meal: Meal = {
      id: `meal-${Date.now()}`,
      name: newMeal.name,
      description: newMeal.description,
      image: newMeal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      ingredients: ingredients.filter(ing => newMeal.ingredientIds.includes(ing.id)),
    };

    setMeals(prev => [meal, ...prev]);
    setNewMeal({ name: '', description: '', image: '', ingredientIds: [] });
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals(prev => prev.filter(m => m.id !== mealId));
  };

  const handleAddIngredient = () => {
    if (!newIngredient.name) return;

    const ingredient: Ingredient = {
      id: `ingredient-${Date.now()}`,
      name: newIngredient.name,
      category: newIngredient.category || 'Other',
      allergens: newIngredient.allergenIds,
    };

    setIngredients(prev => [ingredient, ...prev]);
    setNewIngredient({ name: '', category: '', allergenIds: [] });
  };

  const handleDeleteIngredient = (ingredientId: string) => {
    setIngredients(prev => prev.filter(i => i.id !== ingredientId));
    // Also remove from meals
    setMeals(prev => prev.map(meal => ({
      ...meal,
      ingredients: meal.ingredients.filter(ing => ing.id !== ingredientId),
    })));
  };

  const handleAddAllergen = () => {
    if (!newAllergen.name) return;

    const allergen: Allergen = {
      id: `allergen-${Date.now()}`,
      name: newAllergen.name,
      category: newAllergen.category,
      description: newAllergen.description,
    };

    setAllergens(prev => [allergen, ...prev]);
    setNewAllergen({ name: '', category: '', description: '' });
  };

  const handleDeleteAllergen = (allergenId: string) => {
    setAllergens(prev => prev.filter(a => a.id !== allergenId));
    // Also remove from ingredients
    setIngredients(prev => prev.map(ingredient => ({
      ...ingredient,
      allergens: ingredient.allergens.filter(id => id !== allergenId),
    })));
  };

  const toggleMealIngredient = (ingredientId: string) => {
    setNewMeal(prev => ({
      ...prev,
      ingredientIds: prev.ingredientIds.includes(ingredientId)
        ? prev.ingredientIds.filter(id => id !== ingredientId)
        : [...prev.ingredientIds, ingredientId],
    }));
  };

  const toggleIngredientAllergen = (allergenId: string) => {
    setNewIngredient(prev => ({
      ...prev,
      allergenIds: prev.allergenIds.includes(allergenId)
        ? prev.allergenIds.filter(id => id !== allergenId)
        : [...prev.allergenIds, allergenId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border shadow-sm">
        <h2 className="text-emerald-700 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">
          Manage the food database, add meals, ingredients, and assign allergens
        </p>
      </div>

      {/* Delete Meal Confirmation Dialog */}
      <AlertDialog open={!!mealToDelete} onOpenChange={() => setMealToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this meal from the database. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mealToDelete && handleDeleteMeal(mealToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Ingredient Confirmation Dialog */}
      <AlertDialog open={!!ingredientToDelete} onOpenChange={() => setIngredientToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this ingredient and remove it from all meals. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => ingredientToDelete && handleDeleteIngredient(ingredientToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Allergen Confirmation Dialog */}
      <AlertDialog open={!!allergenToDelete} onOpenChange={() => setAllergenToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this allergen and remove it from all ingredients. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => allergenToDelete && handleDeleteAllergen(allergenToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="meals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="meals" className="gap-2">
            <UtensilsCrossed className="w-4 h-4" />
            Meals ({meals.length})
          </TabsTrigger>
          <TabsTrigger value="ingredients" className="gap-2">
            <Leaf className="w-4 h-4" />
            Ingredients ({ingredients.length})
          </TabsTrigger>
          <TabsTrigger value="allergens" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            Allergens ({allergens.length})
          </TabsTrigger>
        </TabsList>

        {/* Meals Tab */}
        <TabsContent value="meals" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-emerald-700 mb-4">Add New Meal</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="meal-name">Meal Name</Label>
                <Input
                  id="meal-name"
                  placeholder="e.g., Caesar Salad"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="meal-description">Description</Label>
                <Textarea
                  id="meal-description"
                  placeholder="Describe the meal..."
                  value={newMeal.description}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="meal-image">Image URL (optional)</Label>
                <Input
                  id="meal-image"
                  placeholder="https://..."
                  value={newMeal.image}
                  onChange={(e) => setNewMeal(prev => ({ ...prev, image: e.target.value }))}
                />
              </div>
              <div>
                <Label className="mb-3 block">Select Ingredients</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="flex items-start gap-2">
                      <Checkbox
                        id={`meal-ing-${ingredient.id}`}
                        checked={newMeal.ingredientIds.includes(ingredient.id)}
                        onCheckedChange={() => toggleMealIngredient(ingredient.id)}
                      />
                      <label
                        htmlFor={`meal-ing-${ingredient.id}`}
                        className="text-sm cursor-pointer leading-tight"
                      >
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddMeal} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Meal
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-emerald-700">All Meals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meals.map(meal => (
                <Card key={meal.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-emerald-700">{meal.name}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setMealToDelete(meal.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {meal.ingredients.map(ing => (
                        <Badge key={ing.id} variant="secondary" className="text-xs">
                          {ing.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Ingredients Tab */}
        <TabsContent value="ingredients" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-emerald-700 mb-4">Add New Ingredient</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ingredient-name">Ingredient Name</Label>
                <Input
                  id="ingredient-name"
                  placeholder="e.g., Peanuts"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="ingredient-category">Category (optional)</Label>
                <Input
                  id="ingredient-category"
                  placeholder="e.g., Nuts, Dairy, Vegetables"
                  value={newIngredient.category}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div>
                <Label className="mb-3 block">Assign Allergens</Label>
                <div className="grid grid-cols-2 gap-3 border rounded-lg p-4">
                  {allergens.map(allergen => (
                    <div key={allergen.id} className="flex items-start gap-2">
                      <Checkbox
                        id={`ing-all-${allergen.id}`}
                        checked={newIngredient.allergenIds.includes(allergen.id)}
                        onCheckedChange={() => toggleIngredientAllergen(allergen.id)}
                      />
                      <label
                        htmlFor={`ing-all-${allergen.id}`}
                        className="text-sm cursor-pointer leading-tight"
                      >
                        <div>{allergen.name}</div>
                        <div className="text-xs text-gray-500">{allergen.category}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddIngredient} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Ingredient
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-emerald-700">All Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients.map(ingredient => (
                <Card key={ingredient.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-emerald-700">{ingredient.name}</h4>
                      <p className="text-sm text-gray-500">{ingredient.category}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIngredientToDelete(ingredient.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {ingredient.allergens.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Allergens:</p>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.allergens.map(allergenId => {
                          const allergen = allergens.find(a => a.id === allergenId);
                          return allergen ? (
                            <Badge key={allergenId} variant="destructive" className="text-xs">
                              {allergen.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Allergens Tab */}
        <TabsContent value="allergens" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-emerald-700 mb-4">Add New Allergen</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="allergen-name">Allergen Name</Label>
                <Input
                  id="allergen-name"
                  placeholder="e.g., Peanuts"
                  value={newAllergen.name}
                  onChange={(e) => setNewAllergen(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="allergen-category">Category</Label>
                <Input
                  id="allergen-category"
                  placeholder="e.g., Tree Nuts, Dairy, Shellfish"
                  value={newAllergen.category}
                  onChange={(e) => setNewAllergen(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddAllergen} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add Allergen
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-emerald-700">All Allergens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allergens.map(allergen => (
                <Card key={allergen.id} className="p-4 bg-gradient-to-br from-white to-emerald-50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-emerald-700">{allergen.name}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setAllergenToDelete(allergen.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600">{allergen.category}</p>
                      {allergen.description && (
                        <p className="text-sm text-gray-600 mt-2">{allergen.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}