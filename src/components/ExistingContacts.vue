<template>
  <div>
    <div id="search">
      <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
      <input v-model="searchText" type="text" placeholder="Search contacts..." />
    </div>
    <div id="contacts">
      <ul>
        <li
          class="contact"
          :class="{ active: activeChat.uid === contact.uid }"
          v-for="contact in filteredContacts"
          :key="contact.uid"
          @click.prevent="setActiveChat(contact)"
        >
          <div class="wrap">
            <!-- <span class="contact-status online"></span> -->
            <img :src="contact.imageUrl" alt="" />
            <div class="meta">
              <p class="name">{{ contact.name }}</p>
              <p class="preview">No messages yet</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    ...mapGetters({ user: 'user', contacts: 'contacts', activeChat: 'activeChat' }),
    userData() {
      return this.user.data || {};
    },

    filteredContacts() {
      return this.contacts.filter((contact) => {
        return (
          contact.name.search(this.searchText) !== -1 ||
          contact.email.search(this.searchText) !== -1
        );
      });
    },
  },

  async created() {
    this.contacts$fetch({ userId: this.userData.uid });
  },

  methods: {
    ...mapActions({ contacts$fetch: 'contacts$fetch' }),
    setActiveChat(contact) {
      this.$store.commit('activeChat$set', contact);
    },
  },
};
</script>
