<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$id = trim($data['id']);
$nama = trim($data['nama']);
$jumlah = trim($data['jumlah']);
http_response_code(201);
if ($nama != '' and $jumlah != '') {
    $query = mysqli_query($con, "update item set nama='$nama',jumlah='$jumlah' where
id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($con);
