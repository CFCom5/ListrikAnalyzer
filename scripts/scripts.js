// Fungsi untuk menampilkan loading
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
    document.body.classList.add('loaded');
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}

// Loading saat halaman dimuat
window.onload = function() {
    showLoading();
    setTimeout(hideLoading, 2000);
};

// Toggle form token untuk Pasang Baru
function toggleTokenPasangBaru() {
    var jenisPembayaran = document.getElementById('jenisPembayaranPasangBaru').value;
    var tokenDiv = document.getElementById('tokenPasangBaruDiv');
    
    if (jenisPembayaran === 'prabayar') {
        tokenDiv.style.display = 'block';
    } else {
        tokenDiv.style.display = 'none';
    }
}

// Toggle form token untuk Perubahan Daya
function toggleTokenPerubahanDaya() {
    var jenisPembayaran = document.getElementById('jenisPembayaranPerubahanDaya').value;
    var tokenDiv = document.getElementById('tokenPerubahanDayaDiv');
    
    if (jenisPembayaran === 'prabayar') {
        tokenDiv.style.display = 'block';
    } else {
        tokenDiv.style.display = 'none';
    }
}

// Hitung biaya Pasang Baru
function hitungPasangBaru() {
    var daya = parseInt(document.getElementById('dayaPasangBaru').value);
    var jenisPembayaran = document.getElementById('jenisPembayaranPasangBaru').value;
    var tokenInput = document.getElementById('tokenPasangBaru');
    var errorDiv = document.getElementById('errorPasangBaru');
    var hargaPasang = 0;
    var token = 0;
    var adminFee = 1500;

    // Validasi input
    if (isNaN(daya) || jenisPembayaran === '') {
        errorDiv.innerHTML = "Silakan pilih daya dan jenis pembayaran.";
        errorDiv.style.display = 'block';
        return;
    } else if (jenisPembayaran === 'prabayar' && tokenInput && tokenInput.value === '') {
        errorDiv.innerHTML = "Silakan masukkan jumlah token untuk pembayaran prabayar.";
        errorDiv.style.display = 'block';
        return;
    } else {
        errorDiv.style.display = 'none';
    }

    // Harga pasang berdasarkan daya
    switch(daya) {
        case 450: hargaPasang = 421000; break;
        case 900: hargaPasang = 843000; break;
        case 1300: hargaPasang = 1218000; break;
        case 2200: hargaPasang = 2062000; break;
        case 3500: hargaPasang = 3391500; break;
        case 4400: hargaPasang = 4263600; break;
        case 5500: hargaPasang = 5329500; break;
        case 6600: hargaPasang = 6395400; break;
        case 7700: hargaPasang = 7461300; break;
        case 10600: hargaPasang = 10271400; break;
        case 11000: hargaPasang = 10659000; break;
        case 13200: hargaPasang = 12790800; break;
        case 16500: hargaPasang = 15988500; break;
        case 23000: hargaPasang = 22287000; break;
        case 33000: hargaPasang = 31977000; break;
        case 41500: hargaPasang = 40213500; break;
        default: hargaPasang = 0;
    }

    // Tambah token jika prabayar
    if (jenisPembayaran === 'prabayar') {
        token = tokenInput ? parseInt(tokenInput.value) : 0;
        token += adminFee;
    }

    var totalHarga = hargaPasang + token;

    // Tampilkan hasil
    var penjelasan = "<strong>Harga Pemasangan Baru:</strong> Rp " + hargaPasang.toLocaleString('id-ID') + ".";
    if (jenisPembayaran === 'prabayar' && token > 0) {
        penjelasan += "<br><strong>Harga Token:</strong> Rp " + (token - adminFee).toLocaleString('id-ID') + ".";
        penjelasan += "<br><strong>Biaya Administrasi:</strong> Rp " + adminFee.toLocaleString('id-ID') + ".";
    }
    penjelasan += "<br><strong>Total Harga:</strong> Rp " + totalHarga.toLocaleString('id-ID') + ".";
    penjelasan += "<br><em>*Harga tidak termasuk PPN</em>";

    document.getElementById('resultPasangBaru').innerHTML = penjelasan;
}

// Hitung biaya Perubahan Daya
function hitungPerubahanDaya() {
    var dayaLama = parseInt(document.getElementById('dayaLama').value);
    var dayaBaru = parseInt(document.getElementById('dayaBaru').value);
    var jenisPembayaran = document.getElementById('jenisPembayaranPerubahanDaya').value;
    var tokenInput = document.getElementById('tokenPerubahanDaya');
    var errorDiv = document.getElementById('errorPerubahanDaya');
    var adminFee = 1500;

    // Validasi input
    if (isNaN(dayaLama) || isNaN(dayaBaru) || jenisPembayaran === '') {
        errorDiv.innerHTML = "Silakan pilih daya lama, daya baru, dan jenis pembayaran.";
        errorDiv.style.display = 'block';
        return;
    } else if (jenisPembayaran === 'prabayar' && tokenInput && tokenInput.value === '') {
        errorDiv.innerHTML = "Silakan masukkan jumlah token untuk pembayaran prabayar.";
        errorDiv.style.display = 'block';
        return;
    } else if (dayaLama >= dayaBaru) {
        errorDiv.innerHTML = "Daya baru harus lebih besar dari daya lama.";
        errorDiv.style.display = 'block';
        return;
    } else {
        errorDiv.style.display = 'none';
    }

    var token = tokenInput ? parseInt(tokenInput.value) : 0;

    // Data biaya perubahan daya
    var biayaPerubahan = {
        "450-900": 421650,
        "450-1300": 796450,
        "450-2200": 1639750,
        "450-3500": 2955450,
        "450-4400": 3827550,
        "450-5500": 4893450,
        "450-6600": 5959350,
        "450-7700": 7025250,
        "450-10600": 9835350,
        "450-11000": 10222950,
        "450-13200": 12354750,
        "450-16500": 15552450,
        "450-23000": 21850950,
        "450-33000": 31540950,
        "450-41500": 39777450,
        "900-1300": 374800,
        "900-2200": 1218100,
        "900-3500": 2519400,
        "900-4400": 3391500,
        "900-5500": 4457400,
        "900-6600": 5523300,
        "900-7700": 6589200,
        "900-10600": 9399300,
        "900-11000": 9786900,
        "900-13200": 11918700,
        "900-16500": 15116400,
        "900-23000": 21414900,
        "900-33000": 31104900,
        "900-41500": 39341400,
        "1300-2200": 843300,
        "1300-3500": 2131800,
        "1300-4400": 3003900,
        "1300-5500": 4069800,
        "1300-6600": 5135700,
        "1300-7700": 6201600,
        "1300-10600": 9011700,
        "1300-11000": 9399300,
        "1300-13200": 11531100,
        "1300-16500": 14728800,
        "1300-23000": 21027300,
        "1300-33000": 30717300,
        "1300-41500": 38953800,
        "2200-3500": 1259700,
        "2200-4400": 2131800,
        "2200-5500": 3197700,
        "2200-6600": 4263600,
        "2200-7700": 5329500,
        "2200-10600": 8139600,
        "2200-11000": 8527200,
        "2200-13200": 10659000,
        "2200-16500": 13856700,
        "2200-23000": 20155200,
        "2200-33000": 29845200,
        "2200-41500": 38081700,
        "3500-4400": 872100,
        "3500-5500": 1938000,
        "3500-6600": 3003900,
        "3500-7700": 4069800,
        "3500-10600": 6879900,
        "3500-11000": 7267500,
        "3500-13200": 9399300,
        "3500-16500": 12597000,
        "3500-23000": 18895500,
        "3500-33000": 28585500,
        "3500-41500": 36822000,
        "4400-5500": 1065900,
        "4400-6600": 2131800,
        "4400-7700": 3197700,
        "4400-10600": 6007800,
        "4400-11000": 6395400,
        "4400-13200": 8527200,
        "4400-16500": 11724900,
        "4400-23000": 18023400,
        "4400-33000": 27713400,
        "4400-41500": 35949900,
        "5500-6600": 1065900,
        "5500-7700": 2131800,
        "5500-10600": 4941900,
        "5500-11000": 5329500,
        "5500-13200": 7461300,
        "5500-16500": 10659000,
        "5500-23000": 16957500,
        "5500-33000": 26647500,
        "5500-41500": 34884000,
        "6600-7700": 1065900,
        "6600-10600": 3876000,
        "6600-11000": 4263600,
        "6600-13200": 6395400,
        "6600-16500": 9593100,
        "6600-23000": 15891600,
        "6600-33000": 25581600,
        "6600-41500": 33818100,
        "7700-10600": 2810100,
        "7700-11000": 3197700,
        "7700-13200": 5329500,
        "7700-16500": 8527200,
        "7700-23000": 14825700,
        "7700-33000": 24515700,
        "7700-41500": 32752200,
        "10600-11000": 387600,
        "10600-13200": 2519400,
        "10600-16500": 5717100,
        "10600-23000": 12015600,
        "10600-33000": 21705600,
        "10600-41500": 29942100,
        "11000-13200": 2131800,
        "11000-16500": 5329500,
        "11000-23000": 11628000,
        "11000-33000": 21318000,
        "11000-41500": 29554500,
        "13200-16500": 3197700,
        "13200-23000": 9496200,
        "13200-33000": 19186200,
        "13200-41500": 27422700,
        "16500-23000": 6298500,
        "16500-33000": 15988500,
        "16500-41500": 24225000,
        "23000-33000": 9690000,
        "23000-41500": 17926500,
        "33000-41500": 8236500
    };

    var key = dayaLama + "-" + dayaBaru;
    var tarif = biayaPerubahan[key] || 0;

    // Tambah token dan biaya admin jika prabayar
    if (jenisPembayaran === 'prabayar' && token > 0) {
        tarif += token + adminFee;
    }

    // Tampilkan hasil
    var penjelasan = "<strong>Biaya Perubahan Daya:</strong> Rp " + tarif.toLocaleString('id-ID') + ".";
    if (jenisPembayaran === 'prabayar' && token > 0) {
        penjelasan += "<br><strong>Harga Token:</strong> Rp " + token.toLocaleString('id-ID') + ".";
        penjelasan += "<br><strong>Biaya Administrasi:</strong> Rp " + adminFee.toLocaleString('id-ID') + ".";
    }
    penjelasan += "<br><strong>Total Harga:</strong> Rp " + tarif.toLocaleString('id-ID') + ".";
    penjelasan += "<br><em>*Harga tidak termasuk PPN</em>";

    document.getElementById('resultPerubahanDaya').innerHTML = penjelasan;
}
