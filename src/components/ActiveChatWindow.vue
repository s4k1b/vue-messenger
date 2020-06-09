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
    <div class="messages" ref="messagesContainer">
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
        <form @submit.prevent="sendMessege">
          <input v-model="message" type="text" placeholder="Write your message..." />
          <button class="submit" type="submit">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  messages$write,
  messages$on,
  messages$off,
  lastContacted$write,
} from '@/firebase/database.js';

export default {
  data() {
    return { message: '' };
  },

  computed: {
    ...mapGetters({
      user: 'user',
      activeChat: 'activeChat',
      messages: 'messages',
      contacts: 'contacts',
    }),
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
      if (this.message) {
        const date = new Date();
        const time = date.getTime();
        messages$write(this.senderId, this.receiverId, this.message, time);
        this.message = '';

        // set last contacted person
        // remove previous last contacted person
        this.contacts.forEach((contact) => {
          lastContacted$write(this.senderId, contact.uid, false);
        });
        // set the new one
        lastContacted$write(this.senderId, this.receiverId, true);
      }
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

    scrollToEnd() {
      const messagesContainer = this.$refs.messagesContainer;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
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

    messages: {
      deep: true,
      immediate: true,
      async handler() {
        // scroll to bottom
        await this.$nextTick();
        this.scrollToEnd();
      },
    },
  },
};
</script>
