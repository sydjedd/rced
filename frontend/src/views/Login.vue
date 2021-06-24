<template>
  <v-main>
    <v-container fill-height justify-center>
      <v-form v-model="valid" @submit.prevent="login">
        <v-card class="elevation-5" width="400" :loading="loading">
          <v-card-title class="text-h4 text-center d-block">
            {{ this.$store.state.common.appName }}
          </v-card-title>

          <v-card-text>
            <v-alert :value="error" dense text outlined type="error">
              Problème d'authentification
            </v-alert>

            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              autocomplete="username"
              label="Identifiant"
              prepend-icon="mdi-account-circle"
            />

            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              autocomplete="current-password"
              label="Mot de passe"
              prepend-icon="mdi-lock"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn type="submit" block :disabled="!valid" color="primary">
              Se connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      valid: false,
      showPassword: false,
      username: '',
      password: '',
      loading: false,
      error: false,
      rules: {
        required (value) {
          return !!value || 'Obligatoire'
        }
      }
    }
  },
  methods: {
    async login () {
      this.error = false
      const { username, password } = this
      if (username !== '' && password !== '') {
        this.loading = true
        const logged = await this.$store.dispatch('user/login', {
          username,
          password
        })
        if (logged) {
          // TODO gerer retour etat precedent
          this.$router.push('/home')
        }
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>
