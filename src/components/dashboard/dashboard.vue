<template>
  <div id="dashboard">
    <h1>Dashboard | Post lists</h1>
    <p>You're here because you are authenticated!</p>
    <hr />
    <ul class="collection with-header">
      <li class="collection-header" v-for="(serverResult, index) in serverResults" :key="serverResult">
        <strong>Post Title</strong>: {{index}}. {{serverResult.title}}
      </li>
    </ul>
     <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deletePost" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-post', params: { user_id: user_id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dashboard",
  data() {
    return {
      serverResults: []
    };
  },
  mounted() {
    axios
      .get("https://gorest.co.in/public-api/posts")
      .then(res => {
        console.log(res);
        this.serverResults = res.data.data;
        console.log(JSON.parse(JSON.stringify(this.serverResults.title)));
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    sendData() {
      this.$http
        .post("https://gorest.co.in/public-api/posts", this.input, {
          headers: { "content-type": "application/json" }
        })
        .then(
          result => {
            this.response = result.data;
          },
          error => {
            console.error(error);
          }
        );
    }
  }
};
</script>




<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: black;
}
</style>
