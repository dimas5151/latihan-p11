export function KartuCatatan(catatan, { onSematkan, onHapus } = {}) {
  const kartu = document.createElement('div');
  kartu.className = 'kartu';

  const mkEl = document.createElement('small');
  mkEl.textContent = catatan.mk ?? '';

  const judulEl = document.createElement('h3');
  judulEl.textContent = catatan.judul ?? '';

  const tglEl = document.createElement('small');
  tglEl.textContent = catatan.dibuat
    ? new Date(catatan.dibuat).toLocaleDateString('id-ID')
    : '';

  const btnSemat = document.createElement('button');
  btnSemat.type = 'button';
  btnSemat.dataset.aksi = 'semat';
  btnSemat.dataset.id = String(catatan.id ?? '');
  btnSemat.textContent = catatan.disematkan ? 'Lepas' : 'Sematkan';
  btnSemat.addEventListener('click', () => {
    if (typeof onSematkan === 'function') onSematkan(catatan.id);
  });

  const btnHapus = document.createElement('button');
  btnHapus.type = 'button';
  btnHapus.dataset.aksi = 'hapus';
  btnHapus.dataset.id = String(catatan.id ?? '');
  btnHapus.textContent = 'Hapus';
  btnHapus.addEventListener('click', () => {
    if (typeof onHapus === 'function') onHapus(catatan.id);
  });

  const aksi = document.createElement('div');
  aksi.className = 'aksi';
  aksi.append(btnSemat, btnHapus);

  kartu.append(mkEl, judulEl, tglEl, aksi);
  return kartu;
}

export function PesanKosong(teks) {
  const p = document.createElement('p');
  p.className = 'kosong';
  p.textContent = teks;
  return p;
}