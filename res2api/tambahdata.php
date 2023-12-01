<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$nama = trim($data['nama']);
$jumlah = trim($data['jumlah']);
http_response_code(201);
if ($nama != '' and $jumlah != '') {
    $query = mysqli_query($con, "insert into item(nama,jumlah) values('$nama','$jumlah')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($con);
