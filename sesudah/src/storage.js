export const KUNCI = 'catatan-kuliah:v1';

let cadanganMemori = [];

function adalahCatatanSah(item) {
  return Boolean(
    item &&
    typeof item === 'object' &&
    typeof item.judul === 'string'
  );
}

export function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (mentah === null) {
      return [...cadanganMemori];
    }

    const parsed = JSON.parse(mentah);
    if (!Array.isArray(parsed)) {
      return [...cadanganMemori];
    }

    const sah = parsed.filter(adalahCatatanSah);
    cadanganMemori = [...sah];
    return [...sah];
  } catch {
    return [...cadanganMemori];
  }
}

export function simpan(data) {
  const sah = Array.isArray(data) ? data.filter(adalahCatatanSah) : [];
  cadanganMemori = [...sah];

  try {
    localStorage.setItem(KUNCI, JSON.stringify(sah));
    return true;
  } catch {
    return false;
  }
}