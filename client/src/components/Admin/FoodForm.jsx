import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FoodForm = ({ initialData, categories, onSubmit, onCancel }) => {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price?.toString() || '',
      categoryId: initialData?.categoryId?.toString() || '',
      image: initialData?.image || '',
      isAvailable: initialData?.isAvailable ?? true,
      ingredients: initialData?.ingredients?.join(', ') || '',
      allergens: initialData?.allergens?.join(', ') || '',
      cookingTime: initialData?.cookingTime?.toString() || '',
      calories: initialData?.calories?.toString() || '',
    }
  });

  const handleSubmit = (data) => {
    const processedData = {
      ...data,
      ingredients: data.ingredients.split(',').map(item => item.trim()).filter(Boolean),
      allergens: data.allergens.split(',').map(item => item.trim()).filter(Boolean),
      categoryId: parseInt(data.categoryId),
      price: parseFloat(data.price),
      cookingTime: parseInt(data.cookingTime),
      calories: parseInt(data.calories)
    };
    onSubmit(processedData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: 'Food item name is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Margherita Pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description of the food item"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            rules={{ 
              required: 'Price is required',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Please enter a valid price'
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookingTime"
            rules={{ required: 'Cooking time is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Time (min)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="15"
                    type="number"
                    min="1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="250"
                    type="number"
                    min="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional: Add an image URL for this food item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tomato sauce, Mozzarella, Fresh basil, Olive oil"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Separate ingredients with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergens</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Gluten, Dairy, Nuts"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Separate allergens with commas (leave empty if none)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Available</FormLabel>
                <FormDescription>
                  Available items will be visible to customers
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Food Item' : 'Create Food Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FoodForm;