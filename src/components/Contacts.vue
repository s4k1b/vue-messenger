<template>
  <div>
    <existing-contacts v-if="!addingContacts" />
    <add-contacts v-else />
    <div id="bottom-bar">
      <button id="addcontact" @click.prevent="switchContactsMode">
        <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>
        <span>{{ contactButtonText }}</span>
      </button>
      <button id="settings">
        <i class="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<script>
import AddContacts from '@/components/AddContacts';
import ExistingContacts from '@/components/ExistingContacts';

export default {
  data() {
    return { addingContacts: false };
  },
  components: {
    AddContacts,
    ExistingContacts,
  },

  computed: {
    contactButtonText() {
      if (this.addingContacts) return 'Return';
      else return 'Add contact';
    },
  },

  methods: {
    switchContactsMode() {
      this.addingContacts = !this.addingContacts;
    },
  },
};
</script>
