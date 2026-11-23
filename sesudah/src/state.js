import { muat, simpan } from './storage.js';

let catatan = muat();

export function semua() {
  catatan = muat();
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
  const tersimpan = simpan(catatan);
  return { item: itemBaru, tersimpan };
}

export function alihSemat(id) {
  catatan = catatan.map((item) =>
    item.id === id ? { ...item, disematkan: !item.disematkan } : item
  );
  return simpan(catatan);
}

export function hapus(id) {
  catatan = catatan.filter((item) => item.id !== id);
  return simpan(catatan);
}

export function cari(kata) {
  const kueri = String(kata || '').toLowerCase();
  if (!kueri) return semua();
  return catatan.filter((item) => item.judul.toLowerCase().includes(kueri));
}