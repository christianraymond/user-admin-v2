<template>
  <div id="dashboard">
    <h1>Dashboard | Post lists</h1>
    <p>You're here because you are authenticated!</p>
    <hr />
    <table>
      <caption>Post Request Summary</caption>
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Create-At</th>
          <th>Updated_At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="(serverResult, index) in serverResults" :key="serverResult">
        <td>{{index}}. {{serverResult.title}}</td>
        <td>{{index}}. {{serverResult.body}}</td>
        <td>{{index}}. {{serverResult.created_at}}</td>
        <td>{{index}}. {{serverResult.updated_at}}</td>
        <td>
          <button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true">edit</span>
          </button>
          <button type="button" class="btn btn-danger btn-xs dt-delete">
            <span class="glyphicon glyphicon-remove" aria-hidden="true">delete</span>
          </button>
        </td>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            <nav class="pagination">
              <a v-on:click="prev()" class="button">Previous</a>
              <a v-on:click="next()" class="button">Next page</a>
              <ul>
                <li v-for="p in pageCount" :key="p">
                  <a v-if="pageNo == p" v-on:click="page(p)" class="button is-primary">{{p}}</a>
                  <a v-else v-on:click="page(p)" class="button">{{p}}</a>
                </li>
              </ul>
            </nav>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <button v-on:click="first()" class="button">First</button>
            <button v-on:click="prev()" class="button">Prev</button>
            <span style="padding-top:1em;">{{pageNo}}/{{pageCount}}</span>
            <button v-on:click="next()" class="button">Next</button>
            <button v-on:click="last()" class="button">Last</button>
          </td>
        </tr>
      </tfoot>
    </table>
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
#dashboard {
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(107, 62, 45);
  color: white;
}
table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}
button {
  display: flex;
}
h1,
p {
  text-align: center;
}
p {
  color: black;
}
</style>
