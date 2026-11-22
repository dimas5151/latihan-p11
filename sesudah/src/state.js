import { muatCatatan, simpanCatatan } from './storage.js';

let catatan = muatCatatan();

export function semua() {
  return catatan;
}

export function tambah(judul, mk) {
  const itemBaru = {
    id: Date.now(),
    judul,
    mk,
    dibuat: new Date().toISOString(),
    disematkan: false,
  };
  catatan = [...catatan, itemBaru];
  simpanCatatan(catatan);
  return itemBaru;
}

export function alihSemat(id) {
  catatan = catatan.map((item) =>
    item.id === id ? { ...item, disematkan: !item.disematkan } : item
  );
  simpanCatatan(catatan);
}

export function hapus(id) {
  catatan = catatan.filter((item) => item.id !== id);
  simpanCatatan(catatan);
}

export function cari(kata) {
  const kueri = String(kata || '').toLowerCase();
  if (!kueri) return semua();
  return catatan.filter((item) => item.judul.toLowerCase().includes(kueri));
}