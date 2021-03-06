<template>
  <section class="main-contain">
    <h4 class="subreddit-title">/{{ subreddit.name }}</h4>
    <h2 class="subreddit-description">{{ subreddit.description }}</h2>
    <button
      class="button is-warning"
      v-if="isLoggedIn"
      @click="showForm = !showForm"
    >
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
      <div class="column is-4" v-for="(post, index) in posts" :key="post.id">
        <div class="card">
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
                    class="avatar"
                    :src="loadedUserById[post.user_id].image"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4" v-if="!post.URL">{{ post.title }}</p>
                <p class="title is-4" v-if="post.URL">
                  <a :href="post.URL" target="_blank">{{ post.title }}</a>
                </p>
                <p class="subtitle is-6">
                  {{ loadedUserById[post.user_id].name }}
                </p>
              </div>
            </div>

            <div class="content">
              {{ post.description }}
              <br />
              <time class="timecode">{{ getCreated(index) }}</time>
            </div>
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
    this.initUsers();
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
    ...mapState('auth', ['isLoggedIn']),
    ...mapGetters({
      subreddit: 'subreddit/subreddit',
      userById: 'users/userById'
    }),
    loadedUserById() {
      return this.posts.reduce((byId, post) => {
        byId[post.user_id] = this.userById[post.user_id] || {
          name: 'Loading...',
          image: 'https://bulma.io/images/placeholders/48x48.png'
        };
        return byId;
      }, {});
    }
  },
  methods: {
    isImage(url) {
      return url.match(/(jpg|png|jpeg|gif|webp)$/);
    },
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    ...mapActions('users', { initUsers: 'init' }),
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
    },
    getCreated(index) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return interval + ' years';
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + ' months';
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + ' days';
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + ' hours';
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + ' minutes';
        }
        return Math.floor(seconds) + ' seconds';
      }
      return timeSince(this.posts[index].created_at.seconds * 1000) < 0
        ? '0 seconds ago'
        : `${timeSince(this.posts[index].created_at.seconds * 1000)} ago`;
    }
  }
};
</script>
<style lang="scss" scoped>
.main-contain {
  padding: 1.5em;
}
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
  margin-bottom: 0.5em;
}
.card {
  height: 100%;
  margin: 1%;
  border-radius: 5px;
  background-color: #f5f5f5;
}
.avatar {
  border-radius: 50px;
}
.timecode {
  font-size: 0.75em;
}
</style>
