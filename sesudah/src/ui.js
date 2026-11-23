import { KartuCatatan, PesanKosong } from './komponen.js';

export function renderCatatan(daftar, kataCari = '') {
  const sematan = document.getElementById('sematan');
  const semua = document.getElementById('semua');
  const info = document.getElementById('info');

  const elemenSemat = [];
  const elemenSemua = [];

  for (let i = 0; i < daftar.length; i++) {
    const c = daftar[i];
    if (c.disematkan) {
      elemenSemat.push(KartuCatatan(c));
    }
    elemenSemua.push(KartuCatatan(c));
  }

  sematan.replaceChildren(
    ...(elemenSemat.length === 0
      ? [PesanKosong('Belum ada catatan yang disematkan.')]
      : elemenSemat)
  );

  semua.replaceChildren(
    ...(elemenSemua.length === 0
      ? [PesanKosong('Tidak ada catatan.')]
      : elemenSemua)
  );

  const suffixCari = kataCari ? ' (filter: "' + kataCari + '")' : '';
  info.textContent = daftar.length + ' catatan, ' + elemenSemat.length + ' disematkan' + suffixCari;
}