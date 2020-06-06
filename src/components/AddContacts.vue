<template>
  <div>
    <div id="search">
      <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
      <input v-model="searchText" type="text" placeholder="Filter by email or name..." />
    </div>
    <div id="contacts">
      <ul>
        <li
          class="contact"
          v-for="user in filteredUsers"
          :key="user.uid"
          @click.prevent="addContact(user.uid)"
        >
          <div class="wrap">
            <img :src="user.imageUrl" alt="" />
            <div class="meta">
              <p class="name">{{ user.name }}</p>
              <p class="preview">{{ user.email }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { contacts$write } from '@/firebase/database.js';
export default {
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    ...mapGetters({ allUsers: 'allUsers', user: 'user', contacts: 'contacts' }),

    userData() {
      return this.user.data || {};
    },

    filteredUsers() {
      return this.allUsers
        .filter((user) => {
          // remove self
          return user.uid !== this.userData.uid;
        })
        .filter((user) => {
          // remove existing contacts
          return !this.contacts.find((contact) => contact.uid === user.uid);
        })
        .filter((user) => {
          // filter by search text
          return (
            user.name.search(this.searchText) !== -1 || user.email.search(this.searchText) !== -1
          );
        });
    },
  },

  created() {
    this.allUsers$fetch();
  },

  methods: {
    ...mapActions({ allUsers$fetch: 'allUsers$fetch', contacts$fetch: 'contacts$fetch' }),

    addContact(contactId) {
      try {
        contacts$write(this.userData.uid, contactId);
        this.contacts$fetch({ userId: this.userData.uid });
        this.$toasted.info('Contact added successfully');
      } catch (e) {
        this.$toasted.error(e && e.message);
      }
    },
  },
};
</script>
