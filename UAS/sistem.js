document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('waterQualityForm');
    const resultSection = document.getElementById('resultSection');
    const diagnosisStatus = document.getElementById('diagnosisStatus');
    const percentageResult = document.getElementById('percentageResult');
    const percentageDescription = document.getElementById('percentageDescription');
    const userTemp = document.getElementById('userTemp');
    const userPH = document.getElementById('userPH');
    const userOxygen = document.getElementById('userOxygen');
    const userTurbidity = document.getElementById('userTurbidity');
    const userOdor = document.getElementById('userOdor');
    const solutionText = document.getElementById('solutionText');
    const recommendationText = document.getElementById('recommendationText');
    const resetButton = document.getElementById('resetButton');

    // Fungsi untuk menampilkan/menghilangkan input manual
    function toggleManualInput(selectElement, manualInputId) {
        const manualInput = document.getElementById(manualInputId);
        if (selectElement.value === 'manual') {
            manualInput.style.display = 'block';
            manualInput.required = true;
        } else {
            manualInput.style.display = 'none';
            manualInput.required = false;
            manualInput.value = ''; // Reset nilai input manual
        }
    }

    // Tambahkan event listener untuk dropdown yang mendukung input manual
    document.getElementById('temperature').addEventListener('change', function () {
        toggleManualInput(this, 'manualTemperature');
    });
    document.getElementById('ph').addEventListener('change', function () {
        toggleManualInput(this, 'manualPH');
    });
    document.getElementById('oxygen').addEventListener('change', function () {
        toggleManualInput(this, 'manualOxygen');
    });

    // Fungsi untuk membaca nilai dari dropdown atau input manual
    function getInputValue(selectId, manualInputId) {
        const selectElement = document.getElementById(selectId);
        const manualInputElement = document.getElementById(manualInputId);

        if (selectElement.value === 'manual') {
            const manualValue = parseFloat(manualInputElement.value);
            if (isNaN(manualValue)) {
                alert(`Nilai manual untuk ${selectId} tidak valid!`);
                throw new Error(`Nilai manual untuk ${selectId} tidak valid!`);
            }
            return manualValue;
        } else {
            return parseFloat(selectElement.value);
        }
    }

    // Fungsi utama untuk menangani form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        try {
            // Ambil input dari dropdown atau input manual
            const temperature = getInputValue('temperature', 'manualTemperature');
            const ph = getInputValue('ph', 'manualPH');
            const oxygen = getInputValue('oxygen', 'manualOxygen');
            const turbidity = parseFloat(document.getElementById('turbidity').value);
            const odor = parseFloat(document.getElementById('odor').value);

            // Validasi input
            if ([temperature, ph, oxygen, turbidity, odor].some(value => isNaN(value) || value < 0)) {
                alert('Semua parameter harus diisi dengan nilai yang valid.');
                return;
            }

            // Hitung fuzzy untuk setiap parameter
            const tempFuzzy = fuzzyTemperature(temperature);
            const phFuzzy = fuzzyPH(ph);
            const turbidityFuzzy = fuzzyTurbidity(turbidity);
            const oxygenFuzzy = fuzzyOxygen(oxygen);
            const odorFuzzy = fuzzyOdor(odor);

            // Evaluasi aturan fuzzy
            const rules = fuzzyRules(tempFuzzy, phFuzzy, turbidityFuzzy, oxygenFuzzy, odorFuzzy);

            // Hitung output crisp menggunakan defuzzifikasi
            const crispOutput = defuzzification(rules);

            // Tentukan status kelayakan
            const status =
                crispOutput >= 8 ? 'Layak' :
                crispOutput >= 6 ? 'Cukup Layak' :
                crispOutput >= 4 ? 'Kurang Layak' :
                'Sangat Tidak Layak';

            // Solusi berdasarkan status
            let solution = '';
            if (status === 'Layak') {
                solution = 'Jaga terus kualitas air agar tetap optimal.';
            } else if (status === 'Cukup Layak') {
                solution = 'Gunakan sistem filtrasi yang baik untuk menjaga kualitas air.';
            } else if (status === 'Kurang Layak') {
                solution = 'Gunakan filtrasi dan cek kondisi air secara berkala.';
            } else {
                solution = 'Cari sumber air lain yang lebih bersih dan sesuai.';
            }

            // Rekomendasi berdasarkan parameter input
            let recommendation = '';
            if (temperature < 22 || temperature > 26) {
                recommendation += 'Gunakan heater untuk menjaga suhu optimal. ';
            }
            if (ph < 6.8 || ph > 7.2) {
                recommendation += 'Gunakan garam ikan untuk menstabilkan pH. ';
            }
            if (oxygen < 5) {
                recommendation += 'Gunakan aerator untuk meningkatkan kadar oksigen. ';
            }
            if (turbidity > 6) {
                recommendation += 'Gunakan sistem filtrasi untuk meningkatkan kejernihan air. ';
            }
            if (odor > 5) {
                recommendation += 'Ganti air secara rutin untuk menghilangkan bau menyengat. ';
            }

            // Tampilkan hasil
            diagnosisStatus.textContent = `${status}`;
            percentageResult.textContent = `Persentase Kelayakan: ${Math.round((crispOutput / 10) * 100)}%`;
            percentageDescription.textContent = status === 'Layak'
                ? 'Air sangat baik untuk ikan mas koki.'
                : status === 'Cukup Layak'
                    ? 'Air cukup baik, tetapi masih ada beberapa kekurangan kecil.'
                    : status === 'Kurang Layak'
                        ? 'Air memadai, tetapi memerlukan perhatian lebih.'
                        : 'Air sangat buruk, segera lakukan perbaikan kualitas.';
            solutionText.textContent = solution;
            recommendationText.textContent = recommendation;

            userTemp.textContent = `${temperature.toFixed(1)}°C`;
            userPH.textContent = ph.toFixed(1);
            userOxygen.textContent = `${oxygen.toFixed(1)} mg/L`;
            userTurbidity.textContent = turbidity.toFixed(1);
            userOdor.textContent = odor.toFixed(1);

            resultSection.style.display = 'block';
        } catch (error) {
            console.error(error.message);
        }
    });

    // Fungsi untuk tombol reset
    resetButton.addEventListener('click', function () {
        // Reset semua input form
        form.reset();

        // Reset input manual
        document.getElementById('manualTemperature').value = '';
        document.getElementById('manualPH').value = '';
        document.getElementById('manualOxygen').value = '';

        // Reset hasil evaluasi
        resultSection.style.display = 'none';
        diagnosisStatus.textContent = '';
        percentageResult.textContent = '';
        percentageDescription.textContent = '';
        solutionText.textContent = '';
        recommendationText.textContent = '';
        userTemp.textContent = '-';
        userPH.textContent = '-';
        userOxygen.textContent = '-';
        userTurbidity.textContent = '-';
        userOdor.textContent = '-';
    });

    // Fungsi keanggotaan fuzzy
    function fuzzyTemperature(value) {
        return {
            dingin: value <= 20 ? 1 : value <= 22 ? (22 - value) / 2 : 0,
            optimal: value <= 20 || value >= 28 ? 0 : value >= 22 && value <= 26 ? 1 : Math.min((value - 20) / 2, (28 - value) / 2),
            panas: value <= 26 ? 0 : value <= 30 ? (value - 26) / 4 : 1
        };
    }

    function fuzzyPH(value) {
        return {
            asam: value <= 6.5 ? 1 : value <= 7 ? (7 - value) / 0.5 : 0,
            netral: value <= 6.5 || value > 7.5 ? 0 : value >= 6.8 && value <= 7.2 ? 1 : Math.min((value - 6.5) / 0.3, (7.5 - value) / 0.3),
            basa: value <= 7 ? 0 : value <= 8 ? (value - 7) / 0.5 : 1
        };
    }

    function fuzzyTurbidity(value) {
        return {
            keruh: value <= 4 ? 1 : value <= 6 ? (6 - value) / 2 : 0,
            agakKeruh: value <= 4 || value > 8 ? 0 : value >= 5 && value <= 7 ? 1 : Math.min((value - 4) / 1, (8 - value) / 1),
            jernih: value <= 6 ? 0 : value <= 8 ? (value - 6) / 2 : 1
        };
    }

    function fuzzyOxygen(value) {
        return {
            rendah: value <= 4 ? 1 : value <= 5 ? (5 - value) / 1 : 0,
            cukup: value <= 4 || value >= 7 ? 0 : value >= 4.5 && value <= 6 ? 1 : Math.min((value - 4) / 1.5, (7 - value) / 1.5),
            tinggi: value <= 6 ? 0 : value <= 8 ? (value - 6) / 2 : 1
        };
    }

    function fuzzyOdor(value) {
        return {
            menyengat: value <= 3 ? 1 : value <= 5 ? (5 - value) / 2 : 0,
            tidakMenyengat: value <= 3 || value > 8 ? 0 : value >= 4 && value <= 7 ? 1 : Math.min((value - 3) / 2, (8 - value) / 2),
            tidakAdaBau: value <= 8 ? 0 : value <= 10 ? (value - 8) / 2 : 1
        };
    }

    function fuzzyRules(temp, ph, turbidity, oxygen, odor) {
        return {
            sangatTidakLayak: Math.max(
                Math.min(temp.dingin, ph.asam, oxygen.rendah, turbidity.keruh, odor.menyengat),
                Math.min(temp.panas, ph.basa, oxygen.rendah, turbidity.keruh, odor.menyengat),
                Math.min(temp.dingin, ph.asam, oxygen.rendah, turbidity.agakKeruh, odor.menyengat),
                Math.min(temp.panas, ph.basa, oxygen.rendah, turbidity.jernih, odor.menyengat),
                Math.min(temp.dingin, ph.asam, oxygen.rendah, turbidity.keruh, odor.tidakMenyengat)
            ),
            kurangLayak: Math.max(
                Math.min(temp.optimal, ph.netral, oxygen.rendah, turbidity.agakKeruh, odor.tidakMenyengat),
                Math.min(temp.panas, ph.netral, oxygen.cukup, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.dingin, ph.asam, oxygen.cukup, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.dingin, ph.asam, oxygen.rendah, turbidity.jernih, odor.tidakMenyengat),
                Math.min(temp.optimal, ph.basa, oxygen.rendah, turbidity.keruh, odor.menyengat),
                Math.min(temp.optimal, ph.asam, oxygen.cukup, turbidity.jernih, odor.menyengat)
            ),
            cukupLayak: Math.max(
                Math.min(temp.optimal, ph.netral, oxygen.cukup, turbidity.agakKeruh, odor.tidakMenyengat),
                Math.min(temp.optimal, ph.netral, oxygen.cukup, turbidity.jernih, odor.tidakMenyengat),
                Math.min(temp.dingin, ph.netral, oxygen.cukup, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.panas, ph.basa, oxygen.cukup, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.optimal, ph.netral, oxygen.tinggi, turbidity.agakKeruh, odor.tidakMenyengat),
                Math.min(temp.optimal, ph.netral, oxygen.cukup, turbidity.keruh, odor.tidakMenyengat)
            ),
            layak: Math.max(
                Math.min(temp.optimal, ph.netral, oxygen.cukup, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.optimal, ph.netral, oxygen.tinggi, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.optimal, ph.netral, oxygen.cukup, turbidity.jernih, odor.tidakMenyengat),
                Math.min(temp.optimal, ph.basa, oxygen.cukup, turbidity.jernih, odor.tidakAdaBau),
                Math.min(temp.optimal, ph.netral, oxygen.tinggi, turbidity.jernih, odor.tidakMenyengat)
            )
        };
    }

    function defuzzification(rules) {
        const totalWeight = rules.sangatTidakLayak + rules.kurangLayak + rules.cukupLayak + rules.layak;
        if (totalWeight === 0) return 0; // Cegah pembagian dengan 0
        return (
            (rules.sangatTidakLayak * 2 +
                rules.kurangLayak * 5 +
                rules.cukupLayak * 7 +
                rules.layak * 9) / totalWeight
        );
    }
});
