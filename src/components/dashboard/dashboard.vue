<template>
  <div id="dashboard">
    <h1>Dashboard | Post lists</h1>
    <p>You're here because you are authenticated!</p>
    <hr />
    <div class="fixed-action-btn">
      <router-link to="/new-post" class="btn-floating btn-large red">
        <i class="fa fa-plus">New post</i>
      </router-link>
    </div>
    <div class="post-content">
      <h3>{{title}}</h3>
      <div v-for="postItem in postItems" v-bind:key="postItem.id">
        <strong>User ID: <b>{{postItem.id}}</b> |</strong>
        <strong>Title: {{postItem.title}}</strong>
        <p class="post-body">{{postItem.body}}</p>
        <p class="post-body">{{postItem.created_at}} || {{postItem.updated_at}}</p>
        <button v-on:click="remove(postItem.id)">Delete post</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dashboard",
  data() {
    return {
      title: "Post Request Summary",
      postItems: []
    };
  },
  methods: {
    remove: function(postItems, id) {
      if (confirm("Are you sure?")) {
        axios
          .delete("https://gorest.co.in/public-api/posts/" + id)
          .then(response => {
            this.postItems.splice(id, 1);
            return response(),
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getData() {
      axios
        .get("https://gorest.co.in/public-api/posts")
        .then(res => {
          console.log(res);
          this.postItems = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>




<style scoped>
#dashboard {
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
}
.post-body {
  color: gray;
  text-align: justify; /* For Edge */
  -moz-text-align-last: left; /* For Firefox prior 58.0 */
  text-align-last: left;

  border: 1px solid #eee;
  box-shadow: 0 12px 13px #ccc;
  padding: 6px;
  margin: 10px auto;
  box-sizing: border-box;
  background-color: white;
}
.post-content {
  margin: 40px;
}
h1,
p {
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
h3 {
  text-align: center;
  text-decoration: underline;
  color: ivory;
}
button {
  background-color: #d73a49;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
b{
  color:#d2691e;
  font-size: 18px;
  border: 2px solid blue;
  border-radius: 35px 10px;
}
button {
  transition-duration: 0.4s;
}

button:hover {
  background-color: #f44336; /*#be2525*/
  color: white;
}
</style>
