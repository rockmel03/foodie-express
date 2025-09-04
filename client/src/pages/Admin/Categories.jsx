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
  FolderOpen 
} from 'lucide-react';
import { Link } from 'react-router';
import CategoryForm from '@/components/Admin/CategoryForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  useEffect(() => {
    // Simulate loading categories
    const mockCategories = [
      {
        id: 1,
        name: 'Appetizers',
        description: 'Start your meal with our delicious appetizers',
        image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300',
        itemCount: 8,
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z'
      },
      {
        id: 2,
        name: 'Main Courses',
        description: 'Hearty main dishes to satisfy your hunger',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
        itemCount: 15,
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z'
      },
      {
        id: 3,
        name: 'Desserts',
        description: 'Sweet treats to end your meal perfectly',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300',
        itemCount: 6,
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z'
      },
      {
        id: 4,
        name: 'Beverages',
        description: 'Refreshing drinks and hot beverages',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300',
        itemCount: 12,
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z'
      }
    ];
    setCategories(mockCategories);
    setFilteredCategories(mockCategories);
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const handleCreateCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData,
      itemCount: 0,
      createdAt: new Date().toISOString()
    };
    setCategories(prev => [newCategory, ...prev]);
    setIsFormOpen(false);
    toast({
      title: "Success",
      description: "Category created successfully!",
    });
  };

  const handleUpdateCategory = (categoryData) => {
    setCategories(prev => prev.map(cat =>
      cat.id === editingCategory.id ? { ...cat, ...categoryData } : cat
    ));
    setEditingCategory(null);
    setIsFormOpen(false);
    toast({
      title: "Success", 
      description: "Category updated successfully!",
    });
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    toast({
      title: "Success",
      description: "Category deleted successfully!",
    });
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Categories</h2>
          <p className="text-muted-foreground">
            Organize your menu items into categories
          </p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              initialData={editingCategory}
              onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300`;
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant={category.isActive ? 'default' : 'secondary'}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <FolderOpen className="h-4 w-4" />
                  <span>{category.itemCount} items</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link to={`/categories/${category.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditForm(category)}
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
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{category.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No categories found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Categories;