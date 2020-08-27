<template>
  <div id="signin">
    <div class="signin-form">
      <form method="post" @submit.prevent="postLoginDetails">
        <div class="input">
          <label for="email">Your email</label>
          <input type="email" id="email" v-model="email" placeholder="example@gmail.com"/>
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="password"/>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      message: '{}'
    };
  },
  methods: {
    postLoginDetails() {
      const formData = {
        email: this.email,
        password: this.password,
        token: this.token,
      };
      console.log(formData);
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password,
        token: formData.token
      });
    }
  }
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  border-radius: 7px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid none;
  background-color: #eee;
}

.submit button {
  border: 1px solid #ccc;
  color: green;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
  border-radius: 18px;
}

.submit button:hover,
.submit button:active {
  background-color: green;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
