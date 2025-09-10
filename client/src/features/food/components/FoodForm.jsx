import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../../category/categoryThunks";

const FoodForm = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm({
    defaultValues: {
      name: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price?.toString() || "",
      categoryId: initialData?.categoryId?.toString() || "",
      image: initialData?.image || "",
      isAvailable: initialData?.isAvailable ?? true,
      ingredients: initialData?.ingredients?.join(", ") || "",
      allergens: initialData?.allergens?.join(", ") || "",
      cookingTime: initialData?.cookingTime?.toString() || "",
      calories: initialData?.calories?.toString() || "",
    },
  });

  const categories = useSelector((state) => state.category.items);
  const dispatch = useDispatch();
  console.log(categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories({}));
    }
  }, [categories, dispatch]);

  const handleSubmit = (data) => {
    const processedData = {
      ...data,
      ingredients: data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      allergens: data.allergens
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      price: parseFloat(data.price),
      cookingTime: parseInt(data.cookingTime),
      calories: parseInt(data.calories),
    };

    const formData = new FormData();
    Object.entries(processedData).forEach(([key, value]) =>
      formData.set(key, value)
    );

    console.log(
      "formData ====> ",
      formData.keys().reduce((acc, curr) => {
        acc[curr] = formData.get(curr);
        return acc;
      }, {})
    );
    onSubmit(formData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Food item title is required" }}
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
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.title}
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
          rules={{ required: "Description is required" }}
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
              required: "Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Please enter a valid price",
              },
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

          {/* <FormField
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
          /> */}

          {/* <FormField
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
          /> */}
        </div>

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              {field.value && field.value instanceof File && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(field.value)}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                </div>
              )}
              <FormDescription>
                Upload an image for this category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
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
        /> */}

        {/* <FormField
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
        /> */}

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
            {initialData ? "Update Food Item" : "Create Food Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FoodForm;
