<template>
  <mdb-navbar expand="large" dark color="indigo">
    <mdb-navbar-brand href="#">
      ANWALU
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <mdb-nav-item  @click="logout" >Keluar</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'navbar',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem
    },
    methods:{
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>