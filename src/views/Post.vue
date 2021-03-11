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
            <span class="post-name">{{ clickedPost.title }}</span>
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
    <form
      class="comment-form"
      v-if="showForm"
      @submit.prevent="onCreateComment()"
    >
      <div class="field">
        <label class="label">Comment</label>
        <div class="control">
          <textarea
            class="textarea"
            required
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
    <div class="comment-separator">
      <p class="sep-text">Comment Section</p>
    </div>
    <article class="post media" v-for="comment in comments" :key="comment.id">
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            class="avatar"
            :src="loadCommentUser[comment.user_id].image"
            alt="Placeholder image"
          />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <span class="post-name">{{
              loadCommentUser[comment.user_id].name
            }}</span>
            <br />
            {{ comment.description }}
            <br />
          </p>
        </div>
      </div>
    </article>
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
    this.scrollToTop();
    this.initPost(this.$route.params.post_id);
  },
  watch: {
    '$route.params.post_id'() {
      this.initPost(this.$route.params.post_id);
    },
    clickedPost() {
      if (this.clickedPost.id) {
        this.initComments(this.$route.params.post_id);
      }
    }
  },
  computed: {
    ...mapState('post', ['post', 'comments']),
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
    },
    loadCommentUser() {
      return this.comments.reduce((byId, comment) => {
        byId[comment.user_id] = this.userById[comment.user_id] || {
          name: 'Loading...',
          image: 'https://bulma.io/images/placeholders/48x48.png'
        };
        return byId;
      }, {});
    }
  },
  methods: {
    scrollToTop() {
      window.scroll(0, 0);
      return null;
    },
    ...mapActions('post', ['initPost', 'initComments', 'createComment']),
    async onCreateComment() {
      if (this.comment.description) {
        this.createComment(this.comment);
        this.comment = {
          description: ''
        };
        this.showForm = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  background-color: var(--bg-color-primary);
}
.main-contain {
  min-height: 100vh;
  padding: 1.25em;
}
.media + .media {
  border-top: none;
}
.label {
  color: var(--text-color-primary);
}
.textarea {
  color: var(--text-color-primary);
  background-color: var(--bg-color-secondary);
  border-color: var(--bg-color-primary);
  &::placeholder {
    color: var(--text-color-secondary);
  }
}
.post {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  background-color: var(--bg-color-secondary);
  padding: 1em;
  border-radius: 5px;
  color: var(--text-color-primary);
}
.post-name {
  font-weight: 700;
}
.avatar {
  border-radius: 50px;
}
.comment-form {
  margin-top: 1.25em;
}
.comment-separator {
  display: flex;
  border-radius: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 1.25em;
  color: #fff;
  background-color: #3fccbc;
  margin-bottom: 0.25em;
}
.sep-text {
  font-weight: 700;
  text-transform: uppercase;
}
</style>
