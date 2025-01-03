let lastClickedFish = "";  // Menyimpan ikan yang terakhir diklik

function showFishInfo(fishType) {
    var infoBox = document.getElementById('fish-info-box');
    var infoImage = document.getElementById('info-image');
    var infoName = document.getElementById('info-name');
    var infoDescription = document.getElementById('info-description');
    var infoVariations = document.getElementById('info-variations');

    // Jika jenis ikan yang diklik sama dengan ikan yang terakhir diklik, sembunyikan info
    if (lastClickedFish === fishType) {
        infoBox.style.display = 'none'; // Sembunyikan kotak info
        lastClickedFish = ""; // Reset status klik
        return;  // Keluar dari fungsi
    }

    // Set default values untuk ikan yang baru diklik
    var name = "";
    var description = "";
    var variations = [];
    var imageSrc = "";

    // Data untuk setiap ikan
    if (fishType === "oranda") {
        name = "Oranda";
        description = `Negara Asal: China<br>
        Keluarga: Cyprinidae<br>
        Nama Ilmiah: Carassius auratus<br>
        Lingkungan: Ikan air tawar<br>
        Suhu: 19° - 24°C<br>
        Jenis: Twin Tail<br>
        Jenis Makanan: Omnivora<br>
        Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
        Ukuran Dewasa: 6-10 "(inci)<br>
        Umur: 10-15 tahun atau lebih<br>
        Perawatan Level: Mudah - Medium`;
        variations = [
            { name: "Red Cap", image: "orandaredcap.jpg" },
            { name: "Snow White", image: "orandasnowwthite.jpg" },
            { name: "Black Gold Rosetail", image: "orandablackgoldrosetail.jpg" }
        ];
        imageSrc = "oranda.webp";
    } else if (fishType === "ranchu") {
        name = "Ranchu";
        description = `Negara Asal: Jepang<br>
        Keluarga: Cyprinidae<br>
        Nama Ilmiah: Carassius auratus<br>
        Lingkungan: Ikan air tawar<br>
        Suhu: 19° - 26°C<br>
        Jenis: Twin Tail<br>
        Jenis Makanan: Omnivora<br>
        Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
        Ukuran Dewasa: 5-8 "(inci)<br>
        Umur: 10-15 tahun atau lebih<br>
        Perawatan Level: Medium`;
        variations = [
            { name: "Red Ranchu", image: "redranchu.jpg" },
            { name: "Tri Color Ranchu", image: "tricolorranchu.jpg" },
            { name: "White Ranchu", image: "whiteranchu.jpg" }
        ];
        imageSrc = "ranchu.jpg";
    } else if (fishType === "black-moor") {
        name = "Black Moor";
        description = `Negara Asal: China<br>
        Keluarga: Cyprinidae<br>
        Nama Ilmiah: Carassius auratus<br>
        Lingkungan: Ikan air tawar<br>
        Suhu: 19° - 26°C<br>
        Jenis: Twin Tail<br>
        Jenis Makanan: Omnivora<br>
        Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
        Ukuran Dewasa: 4-8 "(inci)<br>
        Umur: 10-15 tahun atau lebih<br>
        Perawatan Level: Mudah`;
        variations = [
            { name: "Standard Black Moor", image: "blackmoor.jpg" },
            { name: "Panda Moor", image: "pandamoor.jpg" }
        ];
        imageSrc = "bmoor.jpg";
    } else if (fishType === "ryukin") {
      name = "Ryukin";
      description = `Negara Asal: China<br>
      Keluarga: Cyprinidae<br>
      Nama Ilmiah: Carassius auratus<br>
      Lingkungan: Ikan air tawar<br>
      Suhu: 19° - 26°C<br>
      Jenis: Twin Tail<br>
      Jenis Makanan: Omnivora<br>
      Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
      Ukuran Dewasa: 4-8 "(inci)<br>
      Umur: 10-15 tahun atau lebih<br>
      Perawatan Level: Mudah`;
      variations = [
          { name: "Calico Ryukin", image: "ryukincalico.jpg" },
          { name: "Broad Tail", image: "ryukinbroadtail.jpg" },
          { name: "Long Tail", image: "ryukinlongtail.jpg" }
      ];
      imageSrc = "ryukin1.jpg";
    } else if (fishType === "lionhead") {
      name = "Lionhead";
      description = `Negara Asal: China<br>
      Keluarga: Cyprinidae<br>
      Nama Ilmiah: Carassius auratus<br>
      Lingkungan: Ikan air tawar<br>
      Suhu: 19° - 26°C<br>
      Jenis: Twin Tail<br>
      Jenis Makanan: Omnivora<br>
      Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
      Ukuran Dewasa: 5-6 "(inci)<br>
      Umur: 10-15 tahun atau lebih<br>
      Perawatan Level: Medium`;
      variations = [
          { name: "Lionchu", image: "lionchu.jpg" },
          { name: "Lionhead Tricolor", image: "lionheadtri.jpg" }
      ];
      imageSrc = "lionhead.jpg";
    } else if (fishType === "fantail") {
      name = "Fantail";
      description = `Negara Asal: China dan Jepang<br>
      Keluarga: Cyprinidae<br>
      Nama Ilmiah: Carassius auratus<br>
      Lingkungan: Ikan air tawar<br>
      Suhu: 13° - 26°C<br>
      Jenis: Twin Tail<br>
      Jenis Makanan: Omnivora<br>
      Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
      Ukuran Dewasa: 6-8 "(inci)<br>
      Umur: 10-15 tahun atau lebih<br>
      Perawatan Level: Mudah`;
      variations = [
          { name: "Veiltail Fantail", image: "veiltailfantail.jpg" },
          { name: "Calico Fantail", image: "calicofantail.jpg" }
      ];
      imageSrc = "fantail.jpg";
    } else if (fishType === "bubble eye") {
      name = "Bubble Eye";
      description = `Negara Asal: China<br>
      Keluarga: Cyprinidae<br>
      Nama Ilmiah: Carassius auratus<br>
      Lingkungan: Ikan air tawar<br>
      Suhu: 19° - 26°C<br>
      Jenis: Twin Tail<br>
      Jenis Makanan: Omnivora<br>
      Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
      Ukuran Dewasa: 6-8 "(inci)<br>
      Umur: 10-15 tahun atau lebih<br>
      Perawatan Level: Medium`;
      variations = [
          { name: "Calico Bubble Eye", image: "calicobbe.jpg" },
          { name: "Red Bubble Eye", image: "rbbe.jpg" }
      ];
      imageSrc = "BubbleEye.jpg";
    } else if (fishType === "telescope eye") {
      name = "Telescope Eye";
      description = `Negara Asal: China<br>
      Keluarga: Cyprinidae<br>
      Nama Ilmiah: Carassius auratus<br>
      Lingkungan: Ikan air tawar<br>
      Suhu: 19° - 26°C<br>
      Jenis: Twin Tail<br>
      Jenis Makanan: Omnivora<br>
      Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
      Ukuran Dewasa: 6-8 "(inci)<br>
      Umur: 10-15 tahun atau lebih<br>
      Perawatan Level: Mudah - Medium`;
      variations = [
          { name: "White Ranchu", image: "ranchu-white.jpg" },
          { name: "Orange Ranchu", image: "ranchu-orange.jpg" }
      ];
      imageSrc = "ranchu.jpg";
    } else if (fishType === "pearlscale") {
      name = "Pearlscale";
      description = `Negara Asal: China dan Jepang<br>
      Keluarga: Cyprinidae<br>
      Nama Ilmiah: Carassius auratus<br>
      Lingkungan: Ikan air tawar<br>
      Suhu: 19° - 26°C<br>
      Jenis: Twin Tail<br>
      Jenis Makanan: Omnivora<br>
      Makanan: Pelet, makanan hidup, sayuran dan buah-buahan<br>
      Ukuran Dewasa: 4-6 "(inci)<br>
      Umur: 10-15 tahun atau lebih<br>
      Perawatan Level: Mudah - Medium`;
      variations = [
          { name: "White Ranchu", image: "ranchu-white.jpg" },
          { name: "Orange Ranchu", image: "ranchu-orange.jpg" }
      ];
      imageSrc = "ranchu.jpg";
  }

    // Update konten kotak informasi
    infoName.textContent = name;
    infoDescription.innerHTML = description;
    infoImage.src = imageSrc;

    // Tampilkan gambar variasi
    infoVariations.innerHTML = variations.map(function(variation) {
        return `
            <div class="variation-item">
                <img class="variation-img" src="${variation.image}" alt="${variation.name}">
                <p class="variation-name">${variation.name}</p>
            </div>
        `;
    }).join('');

    // Tampilkan kotak info
    infoBox.style.display = 'flex';
    window.scrollTo({
        top: infoBox.offsetTop,
        behavior: 'smooth'
    });

    // Simpan ikan yang terakhir diklik
    lastClickedFish = fishType;
}
