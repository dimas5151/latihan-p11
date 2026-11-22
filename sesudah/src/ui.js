function buatKartuHTML(c, labelSemat) {
  const tanggal = new Date(c.dibuat).toLocaleDateString('id-ID');
  return (
    '<div class="kartu">' +
      '<small>' + c.mk + '</small>' +
      '<h3>' + c.judul + '</h3>' +
      '<small>' + tanggal + '</small>' +
      '<div class="aksi">' +
        '<button type="button" data-aksi="semat" data-id="' + c.id + '">' + labelSemat + '</button>' +
        '<button type="button" data-aksi="hapus" data-id="' + c.id + '">Hapus</button>' +
      '</div>' +
    '</div>'
  );
}

export function renderCatatan(daftar, kataCari = '') {
  const sematan = document.getElementById('sematan');
  const semua = document.getElementById('semua');
  const info = document.getElementById('info');

  sematan.innerHTML = '';
  semua.innerHTML = '';

  let jumlahSemat = 0;
  let htmlSemat = '';
  let htmlSemua = '';

  for (let i = 0; i < daftar.length; i++) {
    const c = daftar[i];
    if (c.disematkan) {
      jumlahSemat++;
      htmlSemat += buatKartuHTML(c, 'Lepas');
    }
    htmlSemua += buatKartuHTML(c, c.disematkan ? 'Lepas' : 'Sematkan');
  }

  sematan.innerHTML =
    jumlahSemat === 0
      ? '<p class="kosong">Belum ada catatan yang disematkan.</p>'
      : htmlSemat;

  semua.innerHTML =
    daftar.length === 0
      ? '<p class="kosong">Tidak ada catatan.</p>'
      : htmlSemua;

  const suffixCari = kataCari ? ' (filter: "' + kataCari + '")' : '';
  info.textContent = daftar.length + ' catatan, ' + jumlahSemat + ' disematkan' + suffixCari;
}