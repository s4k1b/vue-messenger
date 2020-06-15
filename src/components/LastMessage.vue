<template>
  <p class="preview">{{ lastMessage || contact.email }}</p>
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
      lastMessage: '',
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

  mounted() {
    this.fetchLastMessage();
  },

  watch: {
    userId() {
      this.fetchLastMessage();
    },
    contactId() {
      this.fetchLastMessage();
    },
  },

  methods: {
    async fetchLastMessage() {
      console.log('hi');
      if (this.userId && this.contactId) {
        console.log('hi2');
        try {
          const messageSnapshot = await lastMessage$read(this.userId, this.contactId);
          console.log(messageSnapshot);
          const message = messageSnapshot.val();
          const lastMessageObj = Object.values(message)[0];
          this.lastMessage = lastMessageObj.message;

          if (lastMessageObj.senderId === this.userId) {
            this.lastMessage = `Me: ${this.lastMessage}`;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
