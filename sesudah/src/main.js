import { semua, tambah, alihSemat, hapus, cari } from './state.js';
import { renderCatatan } from './ui.js';

let kataCari = '';

function perbaruiTampilan() {
  const hasil = kataCari.trim() === '' ? semua() : cari(kataCari);
  renderCatatan(hasil, kataCari);
}

function tanganiAksiKartu(event) {
  const tombol = event.target.closest('button[data-aksi]');
  if (!tombol) return;

  const aksi = tombol.dataset.aksi;
  const id = Number(tombol.dataset.id);

  if (aksi === 'semat') {
    alihSemat(id);
    perbaruiTampilan();
  } else if (aksi === 'hapus') {
    if (!confirm('Hapus catatan ini?')) return;
    hapus(id);
    perbaruiTampilan();
  }
}

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const inputJudul = document.getElementById('judul');
  const selectMk = document.getElementById('mk');
  const judul = inputJudul.value.trim();
  if (judul === '') return;

  tambah(judul, selectMk.value);
  inputJudul.value = '';
  perbaruiTampilan();
});

document.getElementById('cari').addEventListener('input', function (e) {
  kataCari = e.target.value;
  perbaruiTampilan();
});

document.getElementById('sematan').addEventListener('click', tanganiAksiKartu);
document.getElementById('semua').addEventListener('click', tanganiAksiKartu);

perbaruiTampilan();