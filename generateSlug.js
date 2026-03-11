import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function generateSlug(title, id) {

  if (!title) {
    return `product-${id}`;
  }

  let slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true
  });

  if (!slug) {
    slug = `product-${id}`;
  }

  return slug;
}

async function updateSlugs() {

  const { data: products } = await supabase
    .from("products")
    .select("id,title");

  for (const product of products) {

    const slug = generateSlug(product.title, product.id);

    await supabase
      .from("products")
      .update({ slug })
      .eq("id", product.id);

    console.log("updated:", slug);
  }

}

updateSlugs();