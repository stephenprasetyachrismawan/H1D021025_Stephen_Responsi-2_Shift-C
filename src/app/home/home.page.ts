import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nama: any; //init variable nama untuk namauser
  token: any;
  dataInventory: any;
  modal_tambah = false;
  id: any;
  namabarang: any;
  jumlah: any;
  modal_edit = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public _apiService: ApiService,
    private modal: ModalController
  ) {}
  ngOnInit() {
    this.loadToken();
    this.getInventory();
  }
  //ceksesi untuk mengambil nama user
  loadToken() {
    this.token = localStorage.getItem('token-saya');
    console.log(this.token);
    this.nama = localStorage.getItem('namasaya');
    if (this.token) {
      console.log(this.nama);
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  //membuat fungsi logout
  logout() {
    this.authService.logout(); // lempar ke authService lalu cari fungsi logout
    location.reload();
  }

  getInventory() {
    this._apiService.tampil('tampildata.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataInventory = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  reset_model() {
    this.id = null;
    this.nama = '';
    this.jumlah = '';
  }
  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilInventory(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }
  tambahInventory() {
    if (this.nama != '' && this.jumlah != '') {
      let data = {
        nama: this.nama,
        jumlah: this.jumlah,
      };
      this._apiService.tambah(data, '/tambahdata.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah Inventory');
          this.getInventory();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah Inventory');
        },
      });
    } else {
      console.log('gagal tambah Inventory karena masih ada data yg kosong');
    }
  }
  hapusInventory(id: any) {
    this._apiService.hapus(id, '/hapusdatabyid.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getInventory();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }
  ambilInventory(id: any) {
    this._apiService.lihat(id, '/lihatdatabyid.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let Inventory = hasil;
        this.id = Inventory.id;
        this.nama = Inventory.nama;
        this.jumlah = Inventory.jumlah;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }
  editInventory() {
    let data = {
      id: this.id,
      nama: this.nama,
      jumlah: this.jumlah,
    };
    this._apiService.edit(data, '/editdatabyid.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getInventory();
        console.log('berhasil edit Inventory');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Inventory');
      },
    });
  }
}
