/* helper rupiah */
const idr = n => n.toLocaleString('id-ID');

document.querySelectorAll('.product-card').forEach(card => {
  const name      = card.dataset.name;
  const priceEl   = card.querySelector('.price');
  const weightSel = card.querySelector('.weight');
  const qtyInput  = card.querySelector('.qty');
  const optsWrap  = card.querySelector('.order-options');
  const btn       = card.querySelector('.action');
  const btnLabel  = card.querySelector('.btn-text');

  /* hitung & tampilkan total */
  function refresh() {
    const unit  = Number(weightSel.selectedOptions[0].dataset.price);
    const qty   = Math.max(1, Number(qtyInput.value));
    const total = unit * qty;
    priceEl.textContent = idr(total);

    /* simpan link WA di dataset */
    const msg = encodeURIComponent(
      `Halo, saya mau pesan ${qty} × ${weightSel.options[weightSel.selectedIndex].text} ${name} (total Rp ${idr(total)})`
    );
    btn.dataset.href = `https://wa.me/6281234567890?text=${msg}`;
  }

  /* ganti perilaku tombol */
  btn.addEventListener('click', e => {
    if (optsWrap.classList.contains('hidden')) {
      // tahap pertama: buka opsi
      optsWrap.classList.remove('hidden');
      btnLabel.textContent = 'Beli Sekarang';
      refresh();                 // hitung total awal
    } else {
      // tahap kedua: redirect ke WhatsApp
      window.open(btn.dataset.href, '_blank');
    }
  });

  /* pastikan total di-update jika user ganti input */
  weightSel.addEventListener('change', refresh);
  qtyInput .addEventListener('input',  refresh);
});
