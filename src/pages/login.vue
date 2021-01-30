<template>
  <div class="bg">
    <div class="container-fluid bg">
      <div class="row">
        <div class="col-md-12">
          <div class="loginPage">
            <div class="card" id="cardLogin">
              <span class="text-center mb-5"
                ><h3 class="mt-2" style="color: black">WELCOME</h3></span
              >
              <div class="card-body mt-5">
                <form role="form" @submit.prevent="login">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control mb-3 inputEmail"
                      id="email"
                      placeholder="Username"
                      v-model="email"
                    />
                    <input
                      type="password"
                      class="form-control inputPass"
                      id="password"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>
                  <button class="btn btn-primary btnLogin mt-4" type="submit">
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$axios({
        method: "POST",
        url: "/login",
        data: {
          email: this.email,
          password: this.password,
        },
      }).then((res) => {
        console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push("/");
        
      }).catch(() =>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Periksa Kembali Email dan Password anda !",
          });
      })
    },
  },
};
</script>
<style scoped>
.loginPage {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 120px;
}

.inputEmail {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: transparent;
}

.inputEmail:focus {
  outline: none;
  box-shadow: none;
}

.inputPass {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  background-color: transparent;
}

::placeholder {
  color: black;
  opacity: 0.5; /* Firefox */
}

.inputPass:focus {
  outline: none;
  box-shadow: none;
  background-color: none;
  outline-color: transparent;
}

#cardLogin {
  color: black;
  width: 30rem;
  border-radius: 20px;
  background-color: transparent;
  -webkit-box-shadow: 8px 3px 20px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 3px 20px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 3px 20px -1px rgba(0, 0, 0, 0.75);
}

.btnLogin {
  width: 100%;
  border-radius: 25px;
  height: 3rem;
}

.descLogin {
  margin-top: 6rem;
  float: left;
}

.progress-spinner {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 40%;
  bottom: 0;
  right: 50%;
}
</style>