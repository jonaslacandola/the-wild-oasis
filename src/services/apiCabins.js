import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.imageURL?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.imageURL.name}`.replace(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.imageURL
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //For creating and editing cabins
  let query = supabase.from("cabins");

  //Creating new cabin
  if (!id) query = query.insert([{ ...newCabin, imageURL: imagePath }]);

  //Editing cabin
  if (id)
    query = query.update({ ...newCabin, imageURL: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.imageURL);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    console.log(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
