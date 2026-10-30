const layar = document.getElementById("layar");
const proses = document.getElementById("proses");

let angkaPertama = 0;
let operator = "";
let ekspresi = "";
let inputBaru = true;
let selesai = false;

function masukkanAngka(angka) {
    if (selesai) {
        layar.value = angka === "." ? "0." : angka;
        angkaPertama = 0;
        operator = "";
        ekspresi = "";
        selesai = false;
        inputBaru = false;
    } else if (inputBaru) {
        layar.value = angka === "." ? "0." : angka;
        inputBaru = false;
    } else {
        if (angka === "." && layar.value.includes(".")) return;
        layar.value = layar.value === "0" && angka !== "."
            ? angka
            : layar.value + angka;
    }

    perbaruiProses();
}

function pilihOperator(op) {
    const simbol = simbolOperator(op);

    if (selesai) {
        ekspresi = `${angkaPertama} ${simbol} `;
        operator = op;
        layar.value = "0";
        inputBaru = true;
        selesai = false;
        perbaruiProses();
        return;
    }

    if (operator !== "" && inputBaru) {
        ekspresi = ekspresi.replace(/\s[+−×÷]\s$/, ` ${simbol} `);
        operator = op;
        perbaruiProses();
        return;
    }

    const angkaSekarang = Number(layar.value);

    if (operator !== "") {
        angkaPertama = hitungOperasi(angkaPertama, operator, angkaSekarang);
    } else {
        angkaPertama = angkaSekarang;
    }

    ekspresi += `${angkaSekarang} ${simbol} `;
    operator = op;
    layar.value = "0";
    inputBaru = true;
    perbaruiProses();
}

function hitung() {
    if (operator === "") return;

    const angkaKedua = Number(layar.value);
    const hasil = hitungOperasi(angkaPertama, operator, angkaKedua);
    proses.textContent = `${ekspresi}${layar.value} =`;
    tampilkanHasil(hasil);
    angkaPertama = hasil;
    operator = "";
    ekspresi = "";
    inputBaru = true;
    selesai = true;
}

function hitungOperasi(angka1, op, angka2) {
    if (op === "+") return angka1 + angka2;
    if (op === "-") return angka1 - angka2;
    if (op === "*") return angka1 * angka2;
    if (op === "/") return angka1 / angka2;
}

function simbolOperator(op) {
    return { "+": "+", "-": "−", "*": "×", "/": "÷" }[op];
}

function perbaruiProses() {
    proses.textContent = `${ekspresi}${inputBaru ? "" : layar.value}`;
}

function tampilkanHasil(hasil) {
    layar.value = hasil;
}

function hapusSemua() {
    layar.value = "0";
    angkaPertama = 0;
    operator = "";
    ekspresi = "";
    inputBaru = true;
    selesai = false;
    proses.textContent = "";
}

function hapusSatu() {
    if (inputBaru && operator !== "") {
        operator = "";
        ekspresi = "";
        layar.value = angkaPertama;
        inputBaru = false;
    } else if (!inputBaru && layar.value.length > 1) {
        layar.value = layar.value.slice(0, -1);
    } else if (!inputBaru) {
        layar.value = "0";
    }

    selesai = false;
    perbaruiProses();
}

function ubahTanda() {
    if (selesai) {
        ekspresi = "";
        selesai = false;
    }

    layar.value = Number(layar.value) * -1;
    inputBaru = false;
    perbaruiProses();
}