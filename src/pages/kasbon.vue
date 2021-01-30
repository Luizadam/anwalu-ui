<template>
  <section class="kasbon">
    <navbar></navbar>
    <div class="row">
      <div class="col">
        <div class="btnUser" style="float: right">
            
          <button
            class="btn btn-primary"
            @click="modal = true"
            style="background-color: #3f51b5; float: right"
          >
            Tambah Kasbon
          </button>
          <router-link to="/">
          <button
            class="btn btn-primary"
            style="background-color: #3f51b5; float: right"
          >
            Kembali
          </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <mdb-list-group v-for="user in dataKasbon.data" :key="user.id">
          <mdb-list-group-item class="mt-3" style="border-color: black">
            <div
              class="d-inline"
              style="margin-right: 0; margin-left: 0; margin: auto"
            >
              <h5 class="mb-2 h4">{{ user.name }}</h5>
              <small style="margin: ">{{ user.date | formatDate }}</small>
            </div>
            <div
              class="d-inline"
              style="margin-right: 0; margin-left: 0; margin: auto"
            >
              <span class="mb-2">{{ $currency.format(user.value) }}</span>
              <button class="btn btn-danger" @click="deleteConfirm(user.name,user._id)">
                Hapus
              </button>
            </div>
          </mdb-list-group-item>
        </mdb-list-group>
        <hr class="mt-3" style="color: black; background-color: black" />
        <div class="d-inline mr-3" style="float: right">
          <h4>TOTAL : {{ $currency.format(this.total) }}</h4>
        </div>
      </div>
    </div>
    <template>
      <mdb-modal :show="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title>Tambah Kasbon</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-input label="Nama " v-model="nama" />
          <mdb-input label="Harga" type="number" v-model="harga" />
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="secondary" @click.native="modal = false"
            >Batal</mdb-btn
          >
          <mdb-btn color="primary" @click="submitKasbon">Simpan</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
    </template>
  </section>
</template>
<script>
import navbar from "../components/navbar";
import Swal from 'sweetalert2'
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbInput,
  mdbListGroup,
  mdbListGroupItem,
} from "mdbvue";
export default {
  nama: "kasbon",
  components: {
    navbar,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput,
    mdbListGroup,
    mdbListGroupItem
  },
  data() {
    return {
      modal: false,
      nama: "",
      harga: "",
      total: 0,
      dataKasbon: [],
    };
  },
  created() {
    this.getKasbon();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getKasbon() {
      this.$axios({
        method: "GET",
        url: "/data/kasbon/" + this.$route.params.id,
      }).then((res) => {
        console.log(res);
        this.dataKasbon = res.data;
        this.total = this.dataKasbon.total;
      });
    },
    submitKasbon() {
      console.log(this.nama, this.harga);
      this.$axios({
        method: "POST",
        url: "/data/kasbon",
        data: {
          name: this.nama,
          value: this.harga,
          createdBy: this.$route.params.id,
        },
      }).then(() => {
        this.getKasbon();
        this.nama = "";
        this.harga = "";
        this.modal = false;
      });
    },
    deleteConfirm(event,id) {
        console.log(event)
      Swal.fire({
        title: 'anda yakin ingin menghapus ' + event + '?',
        type: "warning",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
            this.deleteKasbon(id)
        }
      });
    },
    deleteKasbon(event) {
      this.$axios({
        method: "DELETE",
        url: "/data/kasbon/" + event,
      }).then(() => {
        this.getKasbon();
      });
    },
  },
};
</script>
<style scoped>
.kasbon {
  overflow-x: hidden;
}
</style>