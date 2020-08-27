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
        <strong>User ID:{{postItem.id}} |</strong>
        <strong>Title: {{postItem.title}}</strong>
        <p class="post-body">{{postItem.body}}</p>
        <p class="post-body">{{postItem.created_at}} || {{postItem.updated_at}}</p>
        <button v-on:click="remove" type="button">Delete post</button>
        <span :span="postItem" v-on:remove="removePostItem"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  methods: {
    remove: function() {
      if (confirm("Are you sure?")) {
        this.$emit("remove", this.postItem.id);
      }
    }
  },
  name: "dashboard",
  data() {
    return {
      title: "Post Request Summary",
      postItems: []
    };
  },
  mounted() {
    axios
      .get("https://gorest.co.in/public-api/posts")
      .then(res => {
        console.log(res);
        this.postItems = res.data.data;
        console.log(JSON.parse(JSON.stringify(this.postItems.title)));
      })
      .catch(err => {
        console.log(err);
      });
  },
  method: {
    removePostItem(id) {
      this.postItem = _.remove(this.postItem, function(postItem) {
        return postItem.id !== id;
      });
    }
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
button {
  transition-duration: 0.4s;
}

button:hover {
  background-color: #f44336; /*#be2525*/
  color: white;
}
</style>
