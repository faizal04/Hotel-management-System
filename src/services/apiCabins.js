import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
  }
  return data;
}
export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be Deleted");
  }
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //Create/Edit cabin
  let query = supabase.from("cabins");

  //insert data in row
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("cabins could not be Created");
  }
  //eslint-disable-next-line
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    console.log(data);
    deleteCabins(data[0].id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }
  return data;
}
