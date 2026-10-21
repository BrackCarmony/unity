// Builds the Poke Graph's local data from PokéAPI so the page never calls the API at runtime.
//   node scripts/build-pokemon.mjs
// Writes public/pokemon/pokemon.json (stats, types, generation for every species' default form)
// and downloads each sprite to public/pokemon/media/sprites/<id>.png. Re-run when new Pokémon come out;
// sprites that already exist are skipped.
import { mkdir, writeFile, access } from "node:fs/promises";

const API = "https://pokeapi.co/api/v2";
const OUT = new URL("../public/pokemon/", import.meta.url);
const SPRITES = new URL("media/sprites/", OUT);
const CONCURRENCY = 8;

const getJson = async (url, tries = 3) => {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return await res.json();
    } catch (e) {
      if (i >= tries) throw e;
      await new Promise(r => setTimeout(r, 1000 * i));
    }
  }
};
const idFromUrl = url => Number(url.match(/\/(\d+)\/?$/)[1]);
const exists = path => access(path).then(() => true, () => false);

// Run fn over items with a few requests in flight at once, to be polite to PokéAPI.
async function pool(items, fn) {
  const results = new Array(items.length);
  let next = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
      if (++done % 100 === 0) console.log(`  ${done}/${items.length}`);
    }
  }));
  return results;
}

const generations = (await getJson(`${API}/generation/`)).results;
const genBySpecies = new Map();
const genNames = [];
for (const [index, g] of generations.entries()) {
  const gen = await getJson(g.url);
  const number = index + 1;
  genNames.push({ number, name: gen.name, region: gen.main_region?.name ?? null });
  for (const s of gen.pokemon_species) genBySpecies.set(idFromUrl(s.url), number);
}
const ids = [...genBySpecies.keys()].sort((a, b) => a - b);
console.log(`${ids.length} species across ${genNames.length} generations`);

await mkdir(SPRITES, { recursive: true });
const stat = (p, name) => p.stats.find(s => s.stat.name === name).base_stat;

const pokemon = await pool(ids, async id => {
  // A species' id matches its default form's /pokemon id.
  const p = await getJson(`${API}/pokemon/${id}`);
  const spriteUrl = p.sprites.front_default;
  const spriteFile = new URL(`${id}.png`, SPRITES);
  if (spriteUrl && !(await exists(spriteFile))) {
    const res = await fetch(spriteUrl);
    if (res.ok) await writeFile(spriteFile, Buffer.from(await res.arrayBuffer()));
  }
  const entry = {
    id, name: p.name, gen: genBySpecies.get(id), types: p.types.map(t => t.type.name),
    hp: stat(p, "hp"), attack: stat(p, "attack"), defense: stat(p, "defense"),
    sp_atk: stat(p, "special-attack"), sp_def: stat(p, "special-defense"), speed: stat(p, "speed"),
    exp: p.base_experience ?? 0, sprite: spriteUrl ? `media/sprites/${id}.png` : null,
  };
  entry.total = entry.hp + entry.attack + entry.defense + entry.sp_atk + entry.sp_def + entry.speed;
  return entry;
});

await writeFile(new URL("pokemon.json", OUT), JSON.stringify({ generations: genNames, pokemon }));
console.log(`Wrote pokemon.json (${pokemon.length} Pokémon, ${pokemon.filter(p => !p.sprite).length} without sprites)`);
