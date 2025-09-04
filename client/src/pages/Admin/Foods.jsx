import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  UtensilsCrossed,
  Filter
} from 'lucide-react';
import { Link } from 'react-router';
import FoodForm from '@/components/Admin/FoodForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import toast from 'react-hot-toast';

const Foods = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
 

  useEffect(() => {
    // Simulate loading food items and categories
    const mockCategories = [
      { id: 1, name: 'Appetizers' },
      { id: 2, name: 'Main Courses' },
      { id: 3, name: 'Desserts' },
      { id: 4, name: 'Beverages' }
    ];

    const mockFoodItems = [
      {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
        price: 18.50,
        categoryId: 2,
        categoryName: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1564936281932-c6c4d1c5d030?w=300',
        isAvailable: true,
        ingredients: ['Tomato sauce', 'Mozzarella', 'Fresh basil', 'Olive oil'],
        allergens: ['Gluten', 'Dairy'],
        cookingTime: 15,
        calories: 285
      },
      {
        id: 2,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan cheese and croutons',
        price: 12.99,
        categoryId: 1,
        categoryName: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300',
        isAvailable: true,
        ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        cookingTime: 5,
        calories: 180
      },
      {
        id: 3,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate ganache',
        price: 8.50,
        categoryId: 3,
        categoryName: 'Desserts',
        image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300',
        isAvailable: false,
        ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar'],
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        cookingTime: 45,
        calories: 450
      },
      {
        id: 4,
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 5.99,
        categoryId: 4,
        categoryName: 'Beverages',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300',
        isAvailable: true,
        ingredients: ['Fresh oranges'],
        allergens: [],
        cookingTime: 2,
        calories: 110
      }
    ];

    setCategories(mockCategories);
    setFoodItems(mockFoodItems);
    setFilteredItems(mockFoodItems);
  }, []);

  useEffect(() => {
    let filtered = foodItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.categoryId === parseInt(filterCategory));
    }

    if (filterAvailability !== 'all') {
      filtered = filtered.filter(item => 
        filterAvailability === 'available' ? item.isAvailable : !item.isAvailable
      );
    }

    setFilteredItems(filtered);
  }, [foodItems, searchTerm, filterCategory, filterAvailability]);

  const handleCreateItem = (itemData) => {
    const selectedCategory = categories.find(cat => cat.id === parseInt(itemData.categoryId));
    const newItem = {
      id: Date.now(),
      ...itemData,
      categoryName: selectedCategory?.name || '',
      price: parseFloat(itemData.price),
      cookingTime: parseInt(itemData.cookingTime),
      calories: parseInt(itemData.calories)
    };
    setFoodItems(prev => [newItem, ...prev]);
    setIsFormOpen(false);
    toast({
      title: "Success",
      description: "Food item created successfully!",
    });
  };

  const handleUpdateItem = (itemData) => {
    const selectedCategory = categories.find(cat => cat.id === parseInt(itemData.categoryId));
    setFoodItems(prev => prev.map(item =>
      item.id === editingItem.id ? { 
        ...item, 
        ...itemData, 
        categoryName: selectedCategory?.name || '',
        price: parseFloat(itemData.price),
        cookingTime: parseInt(itemData.cookingTime),
        calories: parseInt(itemData.calories)
      } : item
    ));
    setEditingItem(null);
    setIsFormOpen(false);
    toast({
      title: "Success",
      description: "Food item updated successfully!",
    });
  };

  const handleDeleteItem = (itemId) => {
    setFoodItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Success",
      description: "Food item deleted successfully!",
    });
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Food Items</h2>
          <p className="text-muted-foreground">
            Manage your restaurant's menu items
          </p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Food Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Food Item' : 'Create New Food Item'}
              </DialogTitle>
            </DialogHeader>
            <FoodForm
              initialData={editingItem}
              categories={categories}
              onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterAvailability} onValueChange={setFilterAvailability}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Food Items Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300`;
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant={item.isAvailable ? 'default' : 'secondary'}>
                  {item.isAvailable ? 'Available' : 'Out of Stock'}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                  {item.categoryName}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <span>{item.cookingTime}min</span>
                    <span>•</span>
                    <span>{item.calories}cal</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link to={`/food/${item.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditForm(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No food items found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Foods;