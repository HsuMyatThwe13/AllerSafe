import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Search, AlertTriangle, Heart, User, Star, Settings, Lightbulb, Edit } from 'lucide-react';
import { getMockMeals, getMockAllergens, type Meal, type Allergen } from '../lib/mockData';

interface UserDashboardProps {
  userId: string;
  userName: string;
}

interface AllergenProfile {
  allergenId: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface DietaryPreference {
  id: string;
  name: string;
}

interface MealRating {
  mealId: string;
  rating: number;
  review: string;
  date: Date;
}

export function UserDashboard({ userId, userName }: UserDashboardProps) {
  const [allergenProfile, setAllergenProfile] = useState<AllergenProfile[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<MealRating[]>([]);
  const [showRatingForm, setShowRatingForm] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  
  // Profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState('user@allersafe.com');
  const [editPhone, setEditPhone] = useState('');
  const [tempAllergenProfile, setTempAllergenProfile] = useState<AllergenProfile[]>([]);
  const [tempDietaryPreferences, setTempDietaryPreferences] = useState<string[]>([]);

  const allergens = getMockAllergens();
  const meals = getMockMeals();

  const dietaryPreferenceOptions: DietaryPreference[] = [
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'halal', name: 'Halal' },
    { id: 'kosher', name: 'Kosher' },
    { id: 'low-carb', name: 'Low Carb' },
    { id: 'keto', name: 'Keto' },
    { id: 'paleo', name: 'Paleo' },
    { id: 'organic', name: 'Organic Only' },
  ];

  const updateAllergenSeverity = (allergenId: string, severity: 'mild' | 'moderate' | 'severe' | null) => {
    if (severity === null) {
      setAllergenProfile(prev => prev.filter(ap => ap.allergenId !== allergenId));
    } else {
      setAllergenProfile(prev => {
        const existing = prev.find(ap => ap.allergenId === allergenId);
        if (existing) {
          return prev.map(ap => ap.allergenId === allergenId ? { ...ap, severity } : ap);
        }
        return [...prev, { allergenId, severity }];
      });
    }
  };

  const toggleDietaryPreference = (prefId: string) => {
    setDietaryPreferences(prev =>
      prev.includes(prefId) ? prev.filter(id => id !== prefId) : [...prev, prefId]
    );
  };

  const toggleFavorite = (mealId: string) => {
    setFavorites(prev =>
      prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
    );
  };

  const openEditProfile = () => {
    setTempAllergenProfile([...allergenProfile]);
    setTempDietaryPreferences([...dietaryPreferences]);
    setIsEditingProfile(true);
  };

  const saveProfileChanges = () => {
    setAllergenProfile(tempAllergenProfile);
    setDietaryPreferences(tempDietaryPreferences);
    setIsEditingProfile(false);
  };

  const cancelProfileEdit = () => {
    setIsEditingProfile(false);
  };

  const updateTempAllergenSeverity = (allergenId: string, severity: 'mild' | 'moderate' | 'severe' | null) => {
    if (severity === null) {
      setTempAllergenProfile(prev => prev.filter(ap => ap.allergenId !== allergenId));
    } else {
      setTempAllergenProfile(prev => {
        const existing = prev.find(ap => ap.allergenId === allergenId);
        if (existing) {
          return prev.map(ap => ap.allergenId === allergenId ? { ...ap, severity } : ap);
        }
        return [...prev, { allergenId, severity }];
      });
    }
  };

  const toggleTempDietaryPreference = (prefId: string) => {
    setTempDietaryPreferences(prev =>
      prev.includes(prefId) ? prev.filter(id => id !== prefId) : [...prev, prefId]
    );
  };

  const submitRating = (mealId: string) => {
    const rating: MealRating = {
      mealId,
      rating: newRating,
      review: newReview,
      date: new Date(),
    };
    setRatings(prev => [...prev.filter(r => r.mealId !== mealId), rating]);
    setShowRatingForm(null);
    setNewRating(5);
    setNewReview('');
  };

  const getMealRating = (mealId: string) => {
    return ratings.find(r => r.mealId === mealId);
  };

  const checkMealAllergens = (meal: Meal): { allergen: Allergen; severity: string }[] => {
    const mealAllergenIds = new Set<string>();
    meal.ingredients.forEach(ingredient => {
      ingredient.allergens.forEach(allergenId => {
        mealAllergenIds.add(allergenId);
      });
    });

    return allergenProfile
      .filter(ap => mealAllergenIds.has(ap.allergenId))
      .map(ap => ({
        allergen: allergens.find(a => a.id === ap.allergenId)!,
        severity: ap.severity,
      }));
  };

  const getSuggestions = (meal: Meal): string[] => {
    const suggestions: string[] = [];
    const warnings = checkMealAllergens(meal);
    
    warnings.forEach(warning => {
      if (warning.allergen.name === 'Milk') {
        suggestions.push('Try almond or oat milk as substitute');
      } else if (warning.allergen.name === 'Wheat' || warning.allergen.name === 'Gluten') {
        suggestions.push('Look for gluten-free alternatives');
      } else if (warning.allergen.name === 'Peanuts') {
        suggestions.push('Sunflower seed butter works as substitute');
      } else if (warning.allergen.name === 'Eggs') {
        suggestions.push('Consider flax eggs or egg replacer');
      }
    });
    
    return suggestions;
  };

  const filteredMeals = useMemo(() => {
    return meals.filter(meal =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [meals, searchQuery]);

  const favoriteMeals = useMemo(() => {
    return meals.filter(meal => favorites.includes(meal.id));
  }, [meals, favorites]);

  const renderMealCard = (meal: Meal, showInFavorites: boolean = false) => {
    const warnings = checkMealAllergens(meal);
    const isFavorite = favorites.includes(meal.id);
    const userRating = getMealRating(meal.id);
    const suggestions = getSuggestions(meal);
    const isRatingFormOpen = showRatingForm === meal.id;

    return (
      <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100 relative">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => !isFavorite && toggleFavorite(meal.id)}
              disabled={isFavorite}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all disabled:cursor-default"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-emerald-700">{meal.name}</h3>
            {userRating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{userRating.rating}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-3">{meal.description}</p>

          {warnings.length > 0 && (
            <Alert className={`mb-3 ${
              warnings.some(w => w.severity === 'severe') ? 'border-red-500 bg-red-50' :
              warnings.some(w => w.severity === 'moderate') ? 'border-orange-300 bg-orange-50' :
              'border-yellow-300 bg-yellow-50'
            }`}>
              <AlertTriangle className={`w-4 h-4 ${
                warnings.some(w => w.severity === 'severe') ? 'text-red-600' :
                warnings.some(w => w.severity === 'moderate') ? 'text-orange-600' :
                'text-yellow-600'
              }`} />
              <AlertDescription className={`text-sm ${
                warnings.some(w => w.severity === 'severe') ? 'text-red-800' :
                warnings.some(w => w.severity === 'moderate') ? 'text-orange-800' :
                'text-yellow-800'
              }`}>
                <strong>
                  {warnings.some(w => w.severity === 'severe') ? '⚠️ SEVERE ALLERGEN WARNING!' :
                   warnings.some(w => w.severity === 'moderate') ? 'Moderate Allergen Warning' :
                   'Mild Allergen Notice'}
                </strong>
                <br />
                Contains: {warnings.map(w => `${w.allergen.name} (${w.severity})`).join(', ')}
              </AlertDescription>
            </Alert>
          )}

          {suggestions.length > 0 && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <strong>Suggestions:</strong>
                  <ul className="mt-1 space-y-1">
                    {suggestions.map((suggestion, idx) => (
                      <li key={idx}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm">
              <strong className="text-gray-700">Ingredients:</strong>
              <div className="mt-1 flex flex-wrap gap-1">
                {meal.ingredients.map(ingredient => (
                  <Badge key={ingredient.id} variant="secondary" className="text-xs">
                    {ingredient.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t space-y-2">
            {!isFavorite && !showInFavorites && (
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => toggleFavorite(meal.id)}
              >
                <Heart className="w-4 h-4" />
                Add to Favorites
              </Button>
            )}

            {showInFavorites && isFavorite && (
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={() => toggleFavorite(meal.id)}
              >
                <Heart className="w-4 h-4 fill-current" />
                Remove from Favorites
              </Button>
            )}

            {!isRatingFormOpen && !userRating && (
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => {
                  setShowRatingForm(meal.id);
                }}
              >
                <Star className="w-4 h-4" />
                Rate This Meal
              </Button>
            )}

            {isRatingFormOpen && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-xs">Your Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review" className="text-xs">Review (optional)</Label>
                  <Textarea
                    id="review"
                    placeholder="Share your thoughts..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => submitRating(meal.id)} className="flex-1">
                    Submit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowRatingForm(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {userRating && (
              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= userRating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(userRating.date).toLocaleDateString()}
                  </span>
                </div>
                {userRating.review && (
                  <p className="text-xs text-gray-700 italic">"{userRating.review}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Profile Sidebar */}
      <div className="lg:col-span-1">
        <div className="space-y-4 sticky top-6">
          {/* User Profile Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                <h2 className="text-emerald-700">Profile</h2>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={openEditProfile}
                className="gap-1"
              >
                <Edit className="w-3 h-3" />
                Edit
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="text-gray-900">{editName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900">{editEmail}</p>
              </div>
              {editPhone && (
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="text-gray-900">{editPhone}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Selected Allergens Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-emerald-700">My Allergens</h3>
            </div>
            {allergenProfile.length > 0 ? (
              <div className="space-y-2">
                {allergenProfile.map(ap => {
                  const allergen = allergens.find(a => a.id === ap.allergenId);
                  return allergen ? (
                    <div key={ap.allergenId} className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{allergen.name}</p>
                        <p className="text-xs text-gray-500">{allergen.category}</p>
                      </div>
                      <Badge
                        variant={ap.severity === 'severe' ? 'destructive' : 'secondary'}
                        className={`text-xs ${
                          ap.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                          ap.severity === 'mild' ? 'bg-yellow-100 text-yellow-800' : ''
                        }`}
                      >
                        {ap.severity}
                      </Badge>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No allergens selected</p>
            )}
          </Card>

          {/* Dietary Preferences Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-emerald-600" />
              <h3 className="text-emerald-700">Dietary Preferences</h3>
            </div>
            {dietaryPreferences.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {dietaryPreferences.map(prefId => {
                  const pref = dietaryPreferenceOptions.find(p => p.id === prefId);
                  return pref ? (
                    <Badge key={prefId} variant="secondary" className="text-xs">
                      {pref.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No preferences set</p>
            )}
          </Card>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile & Allergens</DialogTitle>
            <DialogDescription>
              Update your profile information and allergen preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Profile Information */}
            <div className="space-y-4">
              <h3 className="text-emerald-700">Profile Information</h3>
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone (optional)</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+1 (234) 567-8900"
                />
              </div>
            </div>

            {/* Allergens */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-emerald-700">Allergen Profile</h3>
              <p className="text-sm text-gray-600">
                Select your allergens and set severity levels
              </p>
              <div className="space-y-3">
                {allergens.map(allergen => {
                  const profile = tempAllergenProfile.find(ap => ap.allergenId === allergen.id);
                  return (
                    <div key={allergen.id} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`edit-${allergen.id}`}
                          checked={!!profile}
                          onCheckedChange={(checked) => {
                            if (!checked) {
                              updateTempAllergenSeverity(allergen.id, null);
                            } else {
                              updateTempAllergenSeverity(allergen.id, 'moderate');
                            }
                          }}
                        />
                        <label
                          htmlFor={`edit-${allergen.id}`}
                          className="text-sm cursor-pointer flex-1 leading-tight"
                        >
                          <div>{allergen.name}</div>
                          <div className="text-xs text-gray-500">{allergen.category}</div>
                        </label>
                      </div>
                      {profile && (
                        <RadioGroup
                          value={profile.severity}
                          onValueChange={(value) => updateTempAllergenSeverity(allergen.id, value as any)}
                          className="ml-8 space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mild" id={`edit-${allergen.id}-mild`} />
                            <label htmlFor={`edit-${allergen.id}-mild`} className="text-xs cursor-pointer">
                              Mild
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id={`edit-${allergen.id}-moderate`} />
                            <label htmlFor={`edit-${allergen.id}-moderate`} className="text-xs cursor-pointer">
                              Moderate
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="severe" id={`edit-${allergen.id}-severe`} />
                            <label htmlFor={`edit-${allergen.id}-severe`} className="text-xs cursor-pointer">
                              Severe
                            </label>
                          </div>
                        </RadioGroup>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-emerald-700">Dietary Preferences</h3>
              <div className="space-y-2">
                {dietaryPreferenceOptions.map(pref => (
                  <div key={pref.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`edit-pref-${pref.id}`}
                      checked={tempDietaryPreferences.includes(pref.id)}
                      onCheckedChange={() => toggleTempDietaryPreference(pref.id)}
                    />
                    <label htmlFor={`edit-pref-${pref.id}`} className="text-sm cursor-pointer">
                      {pref.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelProfileEdit}>
              Cancel
            </Button>
            <Button onClick={saveProfileChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="search" className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="ratings" className="gap-2">
              <Star className="w-4 h-4" />
              My Ratings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMeals.map(meal => renderMealCard(meal))}
            </div>

            {filteredMeals.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No meals found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            {favoriteMeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteMeals.map(meal => renderMealCard(meal, true))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No favorite meals yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Click "Add to Favorites" on any meal to save it here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            {ratings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ratings.map(rating => {
                  const meal = meals.find(m => m.id === rating.mealId);
                  return meal ? renderMealCard(meal) : null;
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No ratings yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Rate meals to help the community
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}