<template>
  <v-app>
    <v-app-bar v-if="this.$route.meta.loggedOnly" color="primary" dense dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-if="this.$route.meta.loggedOnly" v-model="drawer" app>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ this.$store.state.common.appName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-avatar color="primary" class="white--text">
            {{ initial }}
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ this.$store.state.user.first_name + ' ' + this.$store.state.user.last_name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ this.$store.state.user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-power</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider v-if="this.$store.state.user.is_staff"></v-divider>

      <v-list v-if="this.$store.state.user.is_staff" dense nav>
        <v-list-item href="/api/admin/">
          <v-list-item-icon>
            <v-icon>mdi-tune</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Administration</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.link" link router>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-alert class="ma-3 text-caption text-justify" dense outlined text color="blue">
        Les données de 2018 et suivantes ne sont pas finalisées (il peut y avoir à la marge quelques certificats «doublons» ou des décès «manquants», qui sont traités au moment de la finalisation de l'année).
        <br>
        L'année considérée est l'année de décès (et non l’année de déclaration du décès).
        <br>
        Sauf indication contraire, le lieu considéré lors de l’affectation d’un décès à un département ou une région est celui de sa survenue et non celui de sa déclaration ou du domicile du défunt.
        <br>
        edc déclarés en établissement et hors établissement : on fait référence ici à la pratique du médecin certifiant. Un médecin libéral pouvant certifier au sein d’un établissement, un certificat de ce type sera cependant comptabilisé ici comme «hors établissement».
      </v-alert>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <v-container fluid :fill-height="!this.$route.meta.loggedOnly">
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- v-footer app></v-footer -->
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      drawer: true,
      items: [
        { title: 'Accueil', icon: 'mdi-home', link: '/home' },
        { title: 'National', icon: 'mdi-flag', link: '/national' },
        { title: 'Régional', icon: 'mdi-city', link: '/regional' },
        { title: 'Établissement', icon: 'mdi-hospital-building', link: 'etablissement' }
      ]
    }
  },

  computed: {
    initial () {
      const nom = this.$store.state.user.first_name ? this.$store.state.user.first_name.charAt(0).toLocaleUpperCase() : ''
      const prenom = this.$store.state.user.last_name ? this.$store.state.user.last_name.charAt(0).toLocaleUpperCase() : ''
      return nom + prenom
    }
  },

  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/')
    }
  }
}
</script>
