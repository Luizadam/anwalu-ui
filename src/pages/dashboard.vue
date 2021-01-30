<template>
  <section class="dashboard">
    <navbar></navbar>
    <div class="row">
      <div class="col">
        <div class="btnUser" style="float: right">
          <button
            class="btn btn-primary"
            @click="modal = true"
            style="background-color: #3f51b5; float: right"
          >
            Tambah Orang
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-3">
    <div class="col ">
      <mdb-list-group v-for="user in dataUser.data " :key="user.id">
        <mdb-list-group-item class="mt-3" style="border-color:black" >
          <div class="d-inline" style="margin-right:0;margin-left:0;margin:auto" @click="$router.push('/kasbon/' + user._id)" >
              <h5 class="mb-2 h4">{{user.fullname}}</h5>
              <small style="margin:">{{user.date | formatDate}}</small>
          </div>
          <div class="d-inline">
            <button class="btn btn-danger" @click="deleteConfirm(user.fullname,user._id)">Hapus</button>
          </div>
        </mdb-list-group-item>
      </mdb-list-group>
    </div>
    </div>
    <template>
      <mdb-modal :show="modal" @close="modal = false">
        <mdb-modal-header>
          <mdb-modal-title>Tambah Orang</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-input label="Nama " v-model="nama" />
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="secondary" @click.native="modal = false"
            >Batal</mdb-btn
          >
          <mdb-btn color="primary" @click="submitUser">Simpan</mdb-btn>
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
  nama: "dashboard",
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
    mdbListGroupItem,
  },
  data() {
    return {
      modal: false,
      nama: "",
      dataUser:[]
    };
  },
  created(){
    this.getUser()
  },
  methods: {
    submitUser() {
      this.$axios({
        method:'POST',
        url:'/data/user',
        data:{
          fullname:this.nama
        }
      })
      .then((res) =>{
        console.log(res)
        this.modal = false
        this.nama = ""
        this.getUser()
      })
    },

    getUser(){
      this.$axios({
        methods:"GET",
        url:'/data/user',
      })
      .then((res)=>{
        this.dataUser = res.data
        console.log(this.dataUser)
      })
    },

    deleteConfirm(event,id) {
      Swal.fire({
        title: 'anda yakin ingin menghapus ' + event + '?',
        type: "warning",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
            this.deleteUser(id)
        }
      });
    },

    deleteUser(event){
      console.log(event)
      this.$axios({
        method:'DELETE',
        url:"/data/user/" + event
      })
      .then(()=>{
        this.getUser()
      })
    },
    router(id){
      console.log(id)
      this.$router.push('/kasbon/' + id) 
    }
  },
};
</script>
<style scoped>
.dashboard{
  overflow-x: hidden
}
</style>
