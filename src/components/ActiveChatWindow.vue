<template>
  <div class="content">
    <div class="contact-profile">
      <img :src="activeChat.imageUrl" alt="" />
      <p>{{ activeChat.name }}</p>
      <div class="social-media">
        <i class="fa fa-facebook" aria-hidden="true"></i>
        <i class="fa fa-twitter" aria-hidden="true"></i>
        <i class="fa fa-instagram" aria-hidden="true"></i>
      </div>
    </div>
    <div class="messages">
      <ul>
        <li :class="getClass(message)" v-for="message in messages" :key="message.time">
          <img :src="getImageUrl(message)" alt="" />
          <p>
            {{ message.message }}
          </p>
        </li>
      </ul>
    </div>
    <div class="message-input">
      <div class="wrap">
        <input v-model="message" type="text" placeholder="Write your message..." />
        <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
        <button class="submit">
          <i class="fa fa-paper-plane" aria-hidden="true" @click.prevent="sendMessege"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { messages$write, messages$on, messages$off } from '@/firebase/database.js';

export default {
  data() {
    return { message: '' };
  },

  computed: {
    ...mapGetters({ user: 'user', activeChat: 'activeChat', messages: 'messages' }),
    senderImageUrl() {
      return this.user.data && this.user.data.photoURL;
    },
    senderId() {
      return this.user.data && this.user.data.uid;
    },
    receiverId() {
      return this.activeChat.uid;
    },
  },

  methods: {
    sendMessege() {
      const date = new Date();
      const time = date.getTime();
      messages$write(this.senderId, this.receiverId, this.message, time);
      this.message = '';
    },

    getTypeOfMessage(m) {
      if (m.senderId === this.senderId) return 'sender';
      else return 'receiver';
    },
    getClass(m) {
      const type = this.getTypeOfMessage(m);

      if (type === 'sender') return 'sent';
      else return 'replies';
    },
    getImageUrl(m) {
      const type = this.getTypeOfMessage(m);

      if (type === 'sender') return this.senderImageUrl;
      else return this.activeChat.imageUrl;
    },
  },

  watch: {
    activeChat: {
      deep: true,
      immediate: true,
      handler(n, o) {
        if (o) {
          // remove old listener
          messages$off();
        }

        if (Object.keys(n).length)
          // first attatch event listener
          messages$on('child_added', this.senderId, n.uid);
      },
    },
  },
};
</script>
