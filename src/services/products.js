import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';
import { slugify } from '../utils/slugify.jsx';

const table =
  import.meta.env.VITE_SUPABASE_PRODUCTS_TABLE?.trim() || 'tge_product';

/**
 * Live Supabase `products` shape (your project):
 * id, name, image_url, description, specification, size, feature, material,
 * custom_design (boolean), category, price, in_stock, created_at, updated_at, festival
 *
 * URL segment `/accessories/:type` matches slugify(category) unless `type` is set on the row.
 */

function parseGallery(row) {
  let gallery = row.gallery_urls ?? row.images;
  if (typeof gallery === 'string') {
    try {
      gallery = JSON.parse(gallery);
    } catch {
      gallery = [];
    }
  }
  if (!Array.isArray(gallery)) gallery = [];
  return gallery.filter(Boolean);
}

function displayName(row) {
  const n = row.name?.trim();
  if (n) return n;
  const d = row.description?.trim();
  if (d) {
    const one = d.split(/\s+/).slice(0, 8).join(' ');
    return d.length > one.length ? `${one}…` : one;
  }
  return 'Product';
}

function customDesignText(row) {
  if (typeof row.custom_design === 'boolean') {
    return row.custom_design
      ? 'Yes — contact us for custom options.'
      : 'Standard catalog styles.';
  }
  if (row.custom_design != null && row.custom_design !== '') {
    return String(row.custom_design);
  }
  return '';
}

/** URL slug for a product row (matches `/accessories/:type` and menu links). */
export function getProductNavSlug(row) {
  if (row.type != null && String(row.type).trim() !== '') {
    return String(row.type).trim();
  }
  if (row.category != null && String(row.category).trim() !== '') {
    return slugify(String(row.category));
  }
  return '';
}

function rowTypeSlug(row) {
  return getProductNavSlug(row);
}

function formatCategoryLabel(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .toLowerCase()
    .split(/(\s+|\/)/)
    .map((segment) => {
      if (!segment || segment === '/' || /^\s+$/.test(segment)) return segment;
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join('');
}

/**
 * Distinct category slugs from products (uses `type` if set, else slugify(category)).
 */
export async function fetchDistinctProductCategories() {
  if (!isSupabaseConfigured || !supabase) {
    return { categories: [], error: null };
  }

  const { data, error } = await supabase.from(table).select('category');

  if (error) return { categories: [], error };

  const bySlug = new Map();
  for (const row of data ?? []) {
    const slug = slugify(row.category ?? '');
    if (!slug) continue;
    const rawLabel = row.category?.trim() || slug;
    if (!bySlug.has(slug)) bySlug.set(slug, rawLabel);
  }

  const categories = [...bySlug.entries()]
    .map(([slug, raw]) => ({
      slug,
      label: formatCategoryLabel(raw),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return { categories, error: null };
}

export async function fetchDistinctFestivals() {
  if (!isSupabaseConfigured || !supabase) {
    return { festivals: [], error: null };
  }

  const { data, error } = await supabase.from(table).select('festival');

  if (error) return { festivals: [], error };

  const bySlug = new Map();
  for (const row of data ?? []) {
    const festival = row.festival?.trim();
    if (!festival) continue;
    const slug = slugify(festival);
    if (!bySlug.has(slug)) bySlug.set(slug, festival);
  }

  const festivals = [...bySlug.entries()]
    .map(([slug, label]) => ({
      slug,
      label: formatCategoryLabel(label),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return { festivals, error: null };
}

export function mapProductRow(row) {
  const imageUrl =
    row.image_url ?? row.image ?? row.thumbnail_url ?? '';
  const gallery = parseGallery(row);
  const images = gallery.length > 0 ? gallery : imageUrl ? [imageUrl] : [];

  const sizeSection = [row.size, row.specification, row.description]
    .filter(Boolean)
    .join('\n\n');

  const additionalParts = [
    row.festival,
    row.additional_info,
    row.updated_at && `Last updated: ${row.updated_at}`,
  ].filter(Boolean);

  return {
    id: row.id,
    name: displayName(row),
    price: Number(row.price ?? 0),
    color: row.color ?? '',
    size: row.size ?? '',
    inStock: row.in_stock !== false && row.in_stock !== 'false',
    image: imageUrl,
    type: rowTypeSlug(row),
    category: row.category ?? '',
    festival: row.festival ?? '',
    description: sizeSection,
    washCare: row.feature ?? '',
    shipping: row.material ?? row.material_used ?? '',
    colors: customDesignText(row),
    additionalInfo: additionalParts.join('\n\n'),
    images,
    createdAt: row.created_at ?? null,
  };
}

export async function fetchProductsByType(typeSlug) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: [],
      error: new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'),
    };
  }

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { data: [], error };
  const mapped = (data ?? []).map(mapProductRow);
  const filtered = mapped.filter((p) => p.type === typeSlug || slugify(p.category || '') === typeSlug || slugify(p.festival || '') === typeSlug);
  return { data: filtered, error: null };
}

export async function fetchAllProducts() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: [],
      error: new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'),
    };
  }

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { data: [], error };
  return { data: (data ?? []).map(mapProductRow), error: null };
}

export async function fetchProductById(productId) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'),
    };
  }
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', productId)
    .maybeSingle();

  if (error) return { data: null, error };
  if (!data) return { data: null, error: null };
  return { data: mapProductRow(data), error: null };
}

export async function fetchTrendingProducts() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: [],
      error: new Error('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'),
    };
  }

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) return { data: [], error };
  return { data: (data ?? []).map(mapProductRow), error: null };
}
