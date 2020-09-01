<template>
  <div id="new-user">
    <form @submit.prevent="submitPost">
      <label for="title">Post Title</label>
      <input
        type="text"
        id="title"
        title="postTile"
        v-model="title"
        required
        placeholder="Type post title..."
      />

      <label for="body">Post Body</label>
      <input
        type="text"
        id="body"
        title="postBody"
        v-model="body"
        required
        placeholder="Type post body..."
      />

      <label for="postId">Post ID</label>
      <input
        type="text"
        id="postId"
        title="postId"
        v-model=" user_id"
        required
        placeholder="Type post Id..."
      />

      <input type="submit" value="Submit" />
      <div>
        <h3>Data retrieved from server:</h3>
        <p v-if="success">{{ success }}</p>
        <pre>{{ response }}</pre>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "new-user",
  data() {
    return {
      ID: 1,
      title: "",
      body: "",
      user_id: "",
      response: "",
      success: "",
      activeClass: "active"
    };
  },
  methods: {
    submitPost() {
      axios
        .post("https://gorest.co.in/public-api/posts", {
          userID: this.userID,
          title: this.title,
          body: this.body,
          user_id: this.user_id
        })
        .then(response => {
          // console.log(response);
          // this.response = response.data
          this.success = "Data saved successfully";
          this.response = JSON.stringify(response, null, 2);
        })
        .catch(error => {
          this.response = "Error: " + error.response.status;
        });
      this.title = "";
      this.body = "";
      this.user_id = "";
    }
  }
};
</script>





<style scoped>
input[type="text"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>