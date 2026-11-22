const KUNCI_PENYIMPANAN = 'catatan-kuliah';

export function muatCatatan() {
  return JSON.parse(localStorage.getItem(KUNCI_PENYIMPANAN)) || [];
}

export function simpanCatatan(daftarCatatan) {
  localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(daftarCatatan));
}