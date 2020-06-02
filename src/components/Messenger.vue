<template>
  <div id="frame">
    <div id="sidepanel">
      <div id="profile">
        <div class="wrap">
          <img
            id="profile-img"
            :src="userData.photoURL"
            class="online"
            alt=""
            @click.prevent="isDropdownActive = !isDropdownActive"
          />
          <p>{{ userData.displayName }}</p>
          <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
          <div id="status-options" :class="{ active: isDropdownActive }">
            <ul>
              <!-- <li id="status-online" class="active">
                <span class="status-circle"></span>
                <p>Online</p>
              </li>
              <li id="status-away">
                <span class="status-circle"></span>
                <p>Away</p>
              </li>
              <li id="status-busy">
                <span class="status-circle"></span>
                <p>Busy</p>
              </li> -->
              <li id="status-busy" @click.prevent="userLogout()">
                <span class="status-circle"></span>
                <p>Logout</p>
              </li>
            </ul>
          </div>
          <div id="expanded">
            <label for="twitter"><i class="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
            <input name="twitter" type="text" value="mikeross" />
            <label for="twitter"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
            <input name="twitter" type="text" value="ross81" />
            <label for="twitter"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
            <input name="twitter" type="text" value="mike.ross" />
          </div>
        </div>
      </div>
      <contacts />
    </div>
    <active-chat-window />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { userSignOut } from '@/firebase/auth';
import Contacts from '@/components/Contacts.vue';
import ActiveChatWindow from '@/components/ActiveChatWindow';

export default {
  data() {
    return {
      isDropdownActive: false,
    };
  },

  components: { Contacts, ActiveChatWindow },

  computed: {
    ...mapGetters({ user: 'user' }),
    userData() {
      return this.user.data || {};
    },
  },

  methods: {
    async userLogout() {
      await userSignOut();
    },
  },
};
</script>
