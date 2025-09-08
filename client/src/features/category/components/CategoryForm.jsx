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

const CategoryForm = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: null, // now we expect a File object, not a URL
      isActive: initialData?.isActive ?? true,
    },
  });

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("isActive", data.isActive);

      if (data.image instanceof File) {
        formData.append("image", data.image); // send file directly
      }

      const formDataObject = [...formData.entries()].reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {}
      );
      console.log(formDataObject);

      await onSubmit(formData); // send to backend
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Category name */}
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Category title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Appetizers" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of this category"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Active switch */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <FormDescription>
                  Active categories will be visible to customers
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

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
