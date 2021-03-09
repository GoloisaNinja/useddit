<template>
  <section class="main-contain">
    <router-link
      :to="{ name: 'subreddit', params: { name: $route.params.name } }"
      ><button class="button is-danger is-outlined is-rounded">
        /{{ $route.params.name }}
      </button></router-link
    >
    <article class="post media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            class="avatar"
            :src="loadPostUser.image"
            alt="Placeholder image"
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ clickedPost.title }}</strong>
            <br />
            {{ clickedPost.description }}
            <br />
          </p>
        </div>
      </div>
    </article>
    <button
      class="button is-warning is-rounded"
      v-if="isLoggedIn"
      @click="showForm = !showForm"
    >
      Toggle Comment Form
    </button>
    <form class="comment-form" v-if="showForm">
      <div class="field">
        <label class="label">Comment</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Add your comment"
            v-model="comment.description"
          />
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-success is-rounded">Add Comment</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    showForm: false,
    comment: {
      description: ''
    }
  }),
  mounted() {
    this.initPost(this.$route.params.post_id);
  },
  watch: {
    '$route.params.post_id'() {
      this.initPost(this.$route.params.post_id);
    }
  },
  computed: {
    ...mapState('post', ['post']),
    ...mapState('auth', ['isLoggedIn']),
    ...mapGetters({
      clickedPost: 'post/clickedPost',
      userById: 'users/userById'
    }),
    loadPostUser() {
      return (
        this.userById[this.clickedPost.user_id] || {
          name: 'Loading...',
          image: 'https://bulma.io/images/placeholders/48x48.png'
        }
      );
    }
  },
  methods: {
    ...mapActions('post', ['initPost'])
  }
};
</script>
<style lang="scss" scoped>
.main-contain {
  padding: 1em;
}
.post {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  background-color: #f5f5f5;
  padding: 1em;
}
.avatar {
  border-radius: 50px;
}
.comment-form {
  margin-top: 1.25em;
}
</style>
