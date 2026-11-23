import { semua, tambah, alihSemat, hapus, cari } from './state.js';
import { renderCatatan } from './ui.js';

let kataCari = '';
let peringatanPenyimpanan = '';

function tampilkanPeringatan(tersimpan) {
  peringatanPenyimpanan = tersimpan === false
    ? ' — Penyimpanan lokal tidak tersedia/penuh, perubahan hanya tersimpan di sesi ini.'
    : '';
}

function perbaruiTampilan() {
  const hasil = kataCari.trim() === '' ? semua() : cari(kataCari);
  renderCatatan(hasil, kataCari);

  const info = document.getElementById('info');
  if (info && peringatanPenyimpanan) {
    info.textContent += peringatanPenyimpanan;
  }
}

function tanganiAksiKartu(event) {
  const tombol = event.target.closest('button[data-aksi]');
  if (!tombol) return;

  const aksi = tombol.dataset.aksi;
  const id = Number(tombol.dataset.id);

  if (aksi === 'semat') {
    const tersimpan = alihSemat(id);
    tampilkanPeringatan(tersimpan);
    perbaruiTampilan();
  } else if (aksi === 'hapus') {
    if (!confirm('Hapus catatan ini?')) return;
    const tersimpan = hapus(id);
    tampilkanPeringatan(tersimpan);
    perbaruiTampilan();
  }
}

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const inputJudul = document.getElementById('judul');
  const selectMk = document.getElementById('mk');
  const judul = inputJudul.value.trim();
  if (judul === '') return;

  const hasil = tambah(judul, selectMk.value);
  tampilkanPeringatan(hasil?.tersimpan);
  inputJudul.value = '';
  perbaruiTampilan();
});

const inputCari = document.getElementById('cari');
if (inputCari) {
  inputCari.addEventListener('input', function (e) {
    kataCari = e.target.value;
    perbaruiTampilan();
  });
}

document.getElementById('sematan').addEventListener('click', tanganiAksiKartu);
document.getElementById('semua').addEventListener('click', tanganiAksiKartu);

perbaruiTampilan();