<template>
  <p class="preview">{{ lastMessage }}</p>
</template>

<script>
import { mapGetters } from 'vuex';
import { lastMessage$read } from '@/firebase/database';

export default {
  props: {
    contact: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      lastMessage: 'No messages yet',
    };
  },

  computed: {
    ...mapGetters({ user: 'user' }),
    userId() {
      return this.user.data && this.user.data.uid;
    },
    contactId() {
      return this.contact.uid;
    },
  },

  created() {
    this.fetchLastMessage();
  },

  methods: {
    async fetchLastMessage() {
      try {
        const messageSnapshot = await lastMessage$read(this.userId, this.contactId);
        const message = messageSnapshot.val();
        const lastMessageObj = Object.values(message)[0];
        this.lastMessage = lastMessageObj.message;

        if (lastMessageObj.senderId === this.userId) {
          this.lastMessage = `Me: ${this.lastMessage}`;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
