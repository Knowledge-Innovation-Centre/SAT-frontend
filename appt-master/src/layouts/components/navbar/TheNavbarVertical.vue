<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div :class="classObj" class="vx-navbar-wrapper">
      <vs-navbar
        :color="navbarColorLocal"
        class="vx-navbar navbar-custom navbar-skelton"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <template v-if="windowWidth >= 992">
          <!-- STARRED PAGES - FIRST 10 -->
          <ul class="vx-navbar__starred-pages">
            <draggable
              v-model="starredPagesLimited"
              :group="{ name: 'pinList' }"
              class="flex cursor-move"
            >
              <li
                v-for="page in starredPagesLimited"
                :key="page.url"
                class="starred-page"
              >
                <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                  <feather-icon
                    :icon="page.labelIcon"
                    svg-classes="h-6 w-6"
                    class="p-2 cursor-pointer"
                    @click="$router.push(page.url).catch(() => {})"
                  />
                </vx-tooltip>
              </li>
            </draggable>
          </ul>

          <!-- STARRED PAGES MORE -->
          <div
            v-if="starredPagesMore.length"
            class="vx-navbar__starred-pages--more-dropdown"
          >
            <vs-dropdown vs-custom-content vs-trigger-click>
              <feather-icon
                icon="ChevronDownIcon"
                svg-classes="h-4 w-4"
                class="cursor-pointer p-2"
              />
              <vs-dropdown-menu>
                <ul class="vx-navbar__starred-pages-more--list">
                  <draggable
                    v-model="starredPagesMore"
                    :group="{ name: 'pinList' }"
                    class="cursor-move"
                  >
                    <li
                      v-for="page in starredPagesMore"
                      :key="page.url"
                      class="starred-page--more flex items-center cursor-pointer"
                      @click="$router.push(page.url).catch(() => {})"
                    >
                      <feather-icon
                        :icon="page.labelIcon"
                        svg-classes="h-5 w-5"
                        class="ml-2 mr-1"
                      />
                      <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                    </li>
                  </draggable>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <!--        <div class="bookmark-container">-->
          <!--          <feather-icon icon="StarIcon" :svgClasses="['stoke-current text-warning', {'text-white': navbarColor != '#fff'}]" class="cursor-pointer p-2" @click.stop="showBookmarkPagesDropdown = !showBookmarkPagesDropdown" />-->
          <!--                    <div v-click-outside="outside" class="absolute bookmark-list w-1/3 xl:w-1/4 mt-4" v-if="showBookmarkPagesDropdown">-->
          <!--          <vx-auto-suggest :autoFocus="true" :data="navbarSearchAndPinList" @selected="selected" @actionClicked="actionClicked" inputClassses="w-full" show-action show-pinned background-overlay></vx-auto-suggest>-->
          <!--          </div>-->
          <!--        </div>-->
        </template>

        <!-- I18N -->
        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="cursor-pointer mr-5"
        >
          <span class="cursor-pointer flex items-center i18n-locale">
            <img :src="i18n_locale_img" :alt="$i18n.locale" class="h-4 w-5" />
            <span class="hidden sm:block ml-2">{{
              getCurrentLocaleData.lang
            }}</span>
          </span>
          <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
            <vs-dropdown-item @click="updateLocale('en')">
              <img
                class="h-4 w-5 mr-2"
                src="@/assets/images/flags/en.png"
                alt="en"
              />
              &nbsp;English
            </vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('sl')"
              ><img
                class="h-4 w-5 mr-2"
                src="@/assets/images/flags/sl.png"
                alt="sl"
              />
              &nbsp;Slovenian</vs-dropdown-item
            >
            <vs-dropdown-item @click="updateLocale('de')"
              ><img
                class="h-4 w-5 mr-2"
                src="@/assets/images/flags/de.png"
                alt="de"
              />
              &nbsp;German</vs-dropdown-item
            >
            <vs-dropdown-item @click="updateLocale('cz')"
              ><img
                class="h-4 w-5 mr-2"
                src="@/assets/images/flags/cz.png"
                alt="cz"
              />
              &nbsp;Czech</vs-dropdown-item
            >
            <vs-dropdown-item @click="updateLocale('hr')"
              ><img
                class="h-4 w-5 mr-2"
                src="@/assets/images/flags/hr.png"
                alt="hr"
              />
              &nbsp;Croatian</vs-dropdown-item
            >
            <!--          <vs-dropdown-item @click="updateLocale('pt')"><img class="h-4 w-5 mr-2" src="@/assets/images/flags/pt.png" alt="pt" /> &nbsp;Portuguese</vs-dropdown-item>-->
          </vs-dropdown-menu>
        </vs-dropdown>

        <vs-spacer />
        <!-- SEARCHBAR -->
        <!--      <div class="search-full-container w-full h-full absolute left-0" :class="{'flex': showFullSearch}" v-show="showFullSearch">-->
        <!--          <vx-auto-suggest-->
        <!--            class="w-full"-->
        <!--            inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus"-->
        <!--            :autoFocus="showFullSearch"-->
        <!--            :data="navbarSearchAndPinList"-->
        <!--            icon="SearchIcon"-->
        <!--            placeholder="Search..."-->
        <!--            ref="navbarSearch"-->
        <!--            @closeSearchbar="showFullSearch = false"-->
        <!--            @selected="selected"-->
        <!--            background-overlay />-->
        <!--          <div class="absolute right-0 h-full z-50">-->
        <!--              <feather-icon icon="XIcon" class="px-4 cursor-pointer h-full close-search-icon" @click="showFullSearch = false"></feather-icon>-->
        <!--          </div>-->
        <!--      </div>-->
        <!--      <feather-icon icon="SearchIcon" @click="showFullSearch = true" class="cursor-pointer navbar-fuzzy-search mr-4"></feather-icon>-->

        <!-- NOTIFICATIONS -->
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <feather-icon
            :badge="unreadNotifications.length"
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
          ></feather-icon>
          <vs-dropdown-menu
            class="notification-dropdown dropdown-custom vx-navbar-dropdown"
          >
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">{{ unreadNotifications.length }} New</h3>
              <p class="opacity-75">App Notifications</p>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              :settings="settings"
              class="scroll-area--nofications-dropdown p-0 mb-10"
            >
              <ul class="bordered-items">
                <li
                  v-for="notification in unreadNotifications.models"
                  :key="notification.id"
                  class="flex justify-between px-4 py-4 notification cursor-pointer"
                >
                  <div class="flex items-start">
                    <feather-icon
                      :icon="notification.icon"
                      :svg-classes="[
                        `text-info`,
                        'stroke-current mr-1 h-6 w-6'
                      ]"
                    ></feather-icon>
                    <div class="mx-2">
                      <span
                        :class="[`text-info`]"
                        class="font-medium block notification-title"
                        >{{ getInfo(notification) }}</span
                      >
                      <small>{{ getInfo(notification) }}</small>
                    </div>
                  </div>
                  <small class="mt-1 whitespace-no-wrap">{{
                    notification.created_at
                  }}</small>
                </li>
              </ul>
            </VuePerfectScrollbar>
            <div
              class="
                                checkout-footer
                                fixed
                                bottom-0
                                rounded-b-lg
                                text-primary
                                w-full
                                p-2
                                font-semibold
                                text-center
                                border
                                border-b-0
                                border-l-0
                                border-r-0
                                border-solid
                                d-theme-border-grey-light
                                cursor-pointer"
            >
              <span @click="viewNotifications()">View All Notifications</span>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>
        <!-- USER META -->
        <div
          v-if="activeUserInfo.username"
          class="the-navbar__user-meta flex items-center"
        >
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <small>{{ user_mainRole }}</small>
          </div>
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <div class="con-img ml-3">
              <img
                v-if="activeUserImg"
                key="onlineImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/profile').catch(() => {})"
                >
                  <feather-icon icon="UserIcon" svg-classes="w-4 h-4" />
                  <span class="ml-2">{{ $t('USERS.PROFILE') }}</span>
                </li>
                <!--              <li-->
                <!--                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
                <!--                @click="$router.push('/apps/email').catch(() => {})">-->

                <!--                <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />-->
                <!--                <span class="ml-2">Inbox</span>-->
                <!--              </li>-->
                <!--              <li-->
                <!--                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
                <!--                @click="$router.push('/apps/todo').catch(() => {})">-->

                <!--                <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />-->
                <!--                <span class="ml-2">Tasks</span>-->
                <!--              </li>-->
                <!--              <li-->
                <!--                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
                <!--                @click="$router.push('/apps/chat').catch(() => {})">-->

                <!--                <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />-->
                <!--                <span class="ml-2">Chat</span>-->
                <!--              </li>-->
                <!--              <li-->
                <!--                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"-->
                <!--                @click="$router.push('/apps/eCommerce/wish-list').catch(() => {})">-->

                <!--                <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />-->
                <!--                <span class="ml-2">Wish List</span>-->
                <!--              </li>-->

                <vs-divider class="m-1"></vs-divider>

                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon icon="LogOutIcon" svg-classes="w-4 h-4" />
                  <span class="ml-2">{{ $t('GLOBALS.LOGOUT') }}</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import { Role } from '../../../models/Role'
import { NotificationCollection } from '../../../models/Notification'

export default {
  name: 'TheNavbar',
  directives: {
    'click-outside': {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      },

      unbind: function(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  },
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: '',
      showFullSearch: false,
      unreadNotifications: new NotificationCollection(),
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    }
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' ? '#10163a' : this.navbarColor
    },
    // HELPER
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth == 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth) return 'navbar-full'
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList
    },
    starredPages() {
      return this.$store.state.starredPages
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10)
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list)
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10)
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesMore', list)
      }
    },

    // PROFILE
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
    user_displayName() {
      return (
        this.activeUserInfo.first_name + ' ' + this.activeUserInfo.last_name
      )
    },
    user_mainRole() {
      let roles = new Role()
      roles = roles.getRoles()
      return roles.find(role => role.id === this.activeUserInfo.roles[0]).name
    },
    activeUserImg() {
      let photo = 'no-photo.jpg'
      if (this.$store.state.AppActiveUser.photoURL) {
        photo = this.$store.state.AppActiveUser.photoURL
      }

      return require(`@/assets/images/profile/user-uploads/${photo}`)
    },

    // I18N
    getCurrentLocaleData() {
      const locale = this.$i18n.locale
      if (locale == 'en') return { flag: 'us', lang: 'English' }
      else if (locale == 'sl') return { flag: 'br', lang: 'Slovenian' }
      else if (locale == 'pt') return { flag: 'br', lang: 'Portuguese' }
      else if (locale == 'fr') return { flag: 'fr', lang: 'French' }
      else if (locale == 'de') return { flag: 'de', lang: 'German' }
      else if (locale == 'cz') return { flag: 'cz', lang: 'Czech' }
      else if (locale == 'hr') return { flag: 'hr', lang: 'Croatian' }
    },
    i18n_locale_img() {
      return require(`@/assets/images/flags/${this.$i18n.locale}.png`)
    }
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
    }
  },
  mounted() {
    this.unreadNotifications.fetchUnread(this.activeUser.username)
  },
  methods: {
    updateLocale(locale) {
      this.$store.dispatch('updateLanguage', locale)
      this.$i18n.locale = locale
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    },
    selected(item) {
      this.$router.push(item.url).catch(() => {})
      this.showFullSearch = false
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', {
        index: item.index,
        val: !item.highlightAction
      })
    },
    showNavbarSearch() {
      this.showFullSearch = true
    },
    showSearchbar() {
      this.showFullSearch = true
    },
    elapsedTime(startTime) {
      let x = new Date(startTime)
      let now = new Date()
      var timeDiff = now - x
      timeDiff /= 1000

      var seconds = Math.round(timeDiff)
      timeDiff = Math.floor(timeDiff / 60)

      var minutes = Math.round(timeDiff % 60)
      timeDiff = Math.floor(timeDiff / 60)

      var hours = Math.round(timeDiff % 24)
      timeDiff = Math.floor(timeDiff / 24)

      var days = Math.round(timeDiff % 365)
      timeDiff = Math.floor(timeDiff / 365)

      var years = timeDiff

      if (years > 0) {
        return years + (years > 1 ? ' Years ' : ' Year ') + 'ago'
      } else if (days > 0) {
        return days + (days > 1 ? ' Days ' : ' Day ') + 'ago'
      } else if (hours > 0) {
        return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago'
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago'
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? ' sec ago' : 'just now')
      }

      return 'Just Now'
    },
    logout() {
      this.$store.dispatch('updateUserRole', {
        aclChangeRole: this.$acl.change,
        role: 'public'
      })
      this.$acl.change('public')

      this.$http.get('/logout')
      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false
    },

    // Method for creating dummy notification time
    randomDate({ hr, min, sec }) {
      let date = new Date()

      if (hr) date.setHours(date.getHours() - hr)
      if (min) date.setMinutes(date.getMinutes() - min)
      if (sec) date.setSeconds(date.getSeconds() - sec)

      return date
    },
    getInfo(ntf) {
      return ntf.data.info
    },
    viewNotifications() {
      this.$router.push({
        name: 'notifications'
      })
    }
  }
}
</script>
