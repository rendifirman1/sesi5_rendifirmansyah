// Tugas sesi 3 : Membuat segitiga dengan menggunakan Loop Statement
// Nama : Rendi Firmansyah

let height = 4; // number of triangle height

for (let i = 1; i <= height; i++){
    let result = "";

    for (let j = 1; j <= i; j++){
        result += "*";
    }
    console.log(result);
}


