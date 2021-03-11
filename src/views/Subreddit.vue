<template>
  <section class="main-contain">
    <router-link :to="{ name: 'subreddits' }"
      ><button class="button is-danger is-outlined is-rounded">
        back to menu
      </button></router-link
    >
    <h4 class="subreddit-title">
      /{{ subreddit.name }} : click post for comments
    </h4>
    <h2 class="subreddit-description">{{ subreddit.description }}</h2>
    <button
      class="button is-warning is-rounded"
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
          <button class="button is-success is-rounded">
            Add Post
          </button>
        </div>
      </div>
    </form>
    <form class="search-term" v-if="filteredPosts.length > 0">
      <label class="label">Search for Post</label>
      <input
        class="input"
        type="text"
        placeholder="Search post"
        v-model="searchTerm"
      />
    </form>
    <div class="empties" v-if="filteredPosts.length == 0">
      No posts in this community yet...
    </div>
    <div class="posts columns is-multiline">
      <div
        class="column is-4"
        v-for="(post, index) in filteredPosts"
        :key="post.id"
      >
        <div class="flex card">
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
                  <a class="post-link" :href="post.URL" target="_blank">{{
                    post.title
                  }}</a>
                </p>
                <p class="subtitle is-6">
                  {{ loadedUserById[post.user_id].name }}
                </p>
              </div>
            </div>
            <router-link
              :to="{
                name: 'post',
                params: { name: $route.params.name, post_id: post.id }
              }"
            >
              <div class="content">
                {{ post.description }}
                <br />
                <time class="timecode">{{ getCreated(index) }}</time>
              </div>
            </router-link>
          </div>
          <div class="testing">
            <!-- TODO ADD FUNCTIONALITY FOR DELETING A POST IF IT MATCHES USER.ID -->
            <!-- TODO THINK ABOUT REFACTOR OF HOW/WHEN COMMENTS ARE INITED - COMMENT COUNT ON POST? -->
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
    searchTerm: '',
    post: {
      title: '',
      description: '',
      URL: ''
    }
  }),
  mounted() {
    this.scrollToTop();
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
    //...mapState('subreddit', ['posts']),
    ...mapState('auth', ['isLoggedIn']),
    ...mapGetters({
      subreddit: 'subreddit/subreddit',
      sortedPosts: 'subreddit/sortedPosts',
      userById: 'users/userById'
    }),

    filteredPosts() {
      if (this.searchTerm) {
        const regex = new RegExp(this.searchTerm, 'gi');
        return this.sortedPosts.filter(post =>
          (post.title + post.description).match(regex)
        );
      }
      return this.sortedPosts;
    },
    loadedUserById() {
      return this.sortedPosts.reduce((byId, post) => {
        byId[post.user_id] = this.userById[post.user_id] || {
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
      if (this.sortedPosts[index].created_at === null) {
        return '0 seconds ago';
      } else {
        return timeSince(this.sortedPosts[index].created_at.seconds * 1000) < 0
          ? '0 seconds ago'
          : `${timeSince(
              this.sortedPosts[index].created_at.seconds * 1000
            )} ago`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
}
.testing {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  text-align: right;
}

.main-contain {
  min-height: 100vh;
  padding: 1.25em;
  background-color: var(--bg-color-primary);
  color: var(--text-color-secondary);
}
.label {
  color: var(--text-color-primary);
}
.input,
.textarea {
  color: var(--text-color-primary);
  background-color: var(--bg-color-secondary);
  border-color: var(--bg-color-primary);
  &::placeholder {
    color: var(--text-color-secondary);
  }
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
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.search-term {
  margin-top: 2em;
}
.post-link:hover {
  color: #3fccbc;
}
.card {
  height: 100%;
  margin: 1%;
  border-radius: 5px;
  background-color: var(--bg-color-secondary);
  word-break: break-word;
}
.title {
  color: var(--text-color-primary);
}
.subtitle {
  color: var(--text-color-secondary);
}
.content {
  color: var(--text-color-secondary);
}
.avatar {
  border-radius: 50px;
}
.timecode {
  font-size: 0.75em;
}
.post-link {
  text-align: center;
}
.empties {
  display: flex;
  justify-content: center;
  margin-top: 1.25em;
}
</style>
