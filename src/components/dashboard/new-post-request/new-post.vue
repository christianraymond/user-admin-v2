<template>
  <div id="new-user">
    <h5 class="center"><b>New Post</b></h5>
    <div class="row">
      <form @submit.prevent="saveUser" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Post Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="post" required />
            <label>Post Description</label>
          </div>
        </div>>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="user_id" required />
            <label>Post Id</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "new-user",
  data() {
    return {
      post_id: null,
      post_title: null,
      post_desc: null,
    };
  },
};
</script>