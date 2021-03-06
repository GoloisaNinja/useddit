<template>
  <section>
    <h4 class="subreddit-title">/{{ subreddit.name }}</h4>
    <h2 class="subreddit-description">{{ subreddit.description }}</h2>
    <button class="button is-primary" @click="showForm = !showForm">
      Toggle Post Form
    </button>
    <form class="post-form" v-if="showForm" @submit.prevent="onCreatePost()">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input"
            required
            type="text"
            placeholder="Title of post"
            v-model="post.title"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Post Content</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Your post"
            v-model="post.description"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">URL</label>
        <div class="control">
          <input
            class="input"
            type="url"
            placeholder="Post URL"
            v-model="post.URL"
          />
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-success">Add Post</button>
        </div>
      </div>
    </form>
    <div class="posts columns is-multiline">
      <div class="post card column is-4" v-for="post in posts" :key="post.id">
        <div class="card-image" v-if="isImage(post.URL)">
          <figure class="image">
            <img :src="post.URL" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4" v-if="!post.URL">{{ post.title }}</p>
              <p class="title is-4" v-if="post.URL">
                <a :href="post.URL" target="_blank">{{ post.title }}</a>
              </p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            {{ post.description }}
            <br />
            <time datetime="2016-1-1">{{ post.created_at }}</time>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  data: () => ({
    showForm: false,
    post: {
      title: '',
      description: '',
      URL: ''
    }
  }),
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  watch: {
    '$route.params.name'() {
      this.initSubreddit(this.$route.params.name);
    },
    subreddit() {
      if (this.subreddit.id) {
        this.initPosts(this.subreddit.id);
      }
    }
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapGetters('subreddit', ['subreddit'])
  },
  methods: {
    isImage(url) {
      return url.match(/(jpg|png|jpeg|gif|webp)$/);
    },
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          URL: ''
        };
        this.showForm = false;
      }
    }
  }
};
</script>
<style scoped>
.posts {
  margin: 0 auto;
  margin-top: 1em;
}
.post-form {
  margin-top: 1em;
  margin-bottom: 1em;
}
.subreddit-description {
  margin-bottom: 1em;
}
.subreddit-title {
  font-size: 0.75em;
}
</style>
