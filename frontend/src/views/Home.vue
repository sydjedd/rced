<template>
  <v-card>
    <v-card-title class="pt-0">
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab>FAQ</v-tab>
        <v-tab>Contact</v-tab>
        <v-tab>Mentions légales</v-tab>
      </v-tabs>
    </v-card-title>

    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item class="text-body-2">
          <div class="text-h6">
            Accès
          </div>

            <div class="text-subtitle-1 mt-3">
              Qui peut accéder au site ?
            </div>
            <div class="ml-7">
              Les utilisateurs du site appartiennent à :
              <ul>
                <li>Pour le niveau national :
                  <ul>
                    <li>La Direction générale de la Santé (DGS, Ministère des Solidarités et de la Santé)</li>
                    <li>La DINUM (Direction interministérielle du numérique)</li>
                    <li>L’ANSP (Agence nationale de santé publique = Santé Publique France)</li>
                    <li>L’Inserm (Institut National de la Santé et de la Recherche Médicale)</li>
                  </ul>
                </li>
                <li>Pour le niveau régional :
                  <ul>
                    <li>Les Agences régionales de santé (ARS)</li>
                  </ul>
                </li>
                <li>Pour le niveau établissement :
                  <ul>
                    <li>Les établissements de santé utilisant la certification électronique des décès</li>
                  </ul>
                </li>
              </ul>
            </div>

          <div class="text-h6 mt-6">
            Données
          </div>

            <div class="text-subtitle-1 mt-3">
              Quelle est leur Origine ?
            </div>
            <div class="ml-7">
              <p>
                Pour l’essentiel, les données proviennent des bases de données du CépiDc-Inserm (Centre d’épidémiologie sur les causes médicales de décès), qui a pour mission de recueillir et mettre en qualité le contenu de la partie médicale des certificats de décès.
              </p>

              <div>
                Des données complémentaires proviennent de :
              </div>
              <ul>
                <li>l’Insee : fichier des personnes décédées</li>
                <li>la Drees (Direction de la recherche, des études, de l'évaluation et des statistiques, Ministère des Solidarités et de la Santé) : référentiel des établissements de santé (Finess)</li>
                <li>l’ATIH (Agence technique de l'information sur l'hospitalisation, Ministère des Solidarités et de la Santé) : nombre de décès en établissement de santé (issu du Pmsi)"</li>
              </ul>
            </div>

            <div class="text-subtitle-1 mt-3">
              Quelles sont leurs limitations ?
            </div>
            <div class="ml-7">
              <ul class="mb-3">
                <li>Certificats électroniques : les données arrivent en quasi temps réel au CépiDCc.</li>
                <li>Certificats papier : mettent de 3 à 6 mois à parvenir au CépiDCc.</li>
                <li>Total des décès (provenance Insee) : retard d’environ 4 semaines.</li>
                <li>Nombre de décès par établissement de santé (ATIH) : retard d’environ 3 mois</li>
              </ul>
            </div>

            <div class="text-subtitle-1 mt-3">
              Quelle est leur fréquence de leur mise à jour ?
            </div>
            <div class="ml-7">
              Les données provenant de l’Inserm, de l’Insee et de la Drees sont mises à jour une fois par semaine; celles provenant de l’ATIH, une fois par mois.
            </div>

          <div class="text-h6 mt-6">
            Représentations
          </div>

            <div class="text-subtitle-1 mt-3">
              Quelles formes prennent les statistiques ?
            </div>
            <div class="ml-7">
              <ul>
                <li>Elles sont présentées sous forme de tableaux, le plus souvent avec une répartition temporelle (année, trimestre, mois et/ou semaine) en colonne et une répartition géographique (région département et/ou ville) ou par type de lieu de décès en ligne. Dans de nombreux cas, il est possible de faire varier les critères d’affichage.</li>
                <li>Des représentations graphiques sont proposées,</li>
                <li>de même que la possibilité de télécharger les données ayant servi à générer un tableau ou un graphique (cf. ci-dessous).</li>
              </ul>
            </div>

            <div class="text-subtitle-1 mt-3">
              Que trouve-t-on comme données nationales ?
            </div>
            <div class="ml-7">
              Les données nationales disponibles dans RCED concernent le suivi de l'activité de certification électronique globale sur le territoire, la certification électronique en et hors établissement réalisée sur ordinateur ou application mobile, l'identification des établissements raccordés à CertDc ainsi que l'évolution du nombre de médecins certifiant électroniquement en France.
            </div>

            <div class="text-subtitle-1 mt-3">
              Que trouve-t-on comme données régionales ?
            </div>
            <div class="ml-7">
              Les données régionales disponibles dans RCED concernent le suivi de l'activité de certification électronique par régions en et hors établissement.
            </div>

            <div class="text-subtitle-1 mt-3">
              Que trouve-t-on comme données à l'échelle d'un établissement ?
            </div>
            <div class="ml-7">
              Les données à l'échelle d'un établissement concernent le nombre et le taux de certification électronique, évoluant au cours de l'année actuelle et par rapport à l'année précédente.
            </div>

          <div class="text-h6 mt-6">
            Téléchargement des données
          </div>

            <div class="text-subtitle-1 mt-3">
              A quelles données peut-on avoir accès ?
            </div>
            <div class="ml-7">
              Un utilisateur peut télécharger les données ayant servi à générer un tableau ou un graphique auquel il a le droit d’accéder.
            </div>

            <div class="text-subtitle-1 mt-3">
              Quels sont les formats de fichier proposées
            </div>
            <div class="ml-7">
              csv et xls
            </div>

            <div class="text-subtitle-1 mt-3">
              Quelle aide peut-on avoir pour exploiter ces données ?
            </div>
            <div class="ml-7">
              Un dictionnaire des données sera disponible.
            </div>

          <div class="text-h6 mt-6">
            Développement du site
          </div>

            <div class="text-subtitle-1 mt-3">
              Qui l’a conçu et développé ?
            </div>
            <div class="ml-7">
              Le Département des Systèmes d’Information de l’Inserm;
            </div>

            <div class="text-subtitle-1 mt-3">
              Qui l’héberge et le maintient ?
            </div>
            <div class="ml-7">
              La DGS et le CépiDcC jouant le rôle de maîtrise d’ouvrage durant la phase projet.
            </div>
        </v-tab-item>

        <v-tab-item class="text-body-2">
          <v-form v-model="valid" ref="form" @submit.prevent="sendEmail">
            <div class="text-h6 mb-7">Déposez votre message</div>

            <v-text-field v-model="name"  :rules="nameRules" type="text" label="Nom"></v-text-field>
            <v-text-field v-model="phone" :rules="phoneRules" type="text" label="Numéro de éléphone"></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" type="text" label="Courriel"></v-text-field>

            <v-radio-group v-model="to" :rules="toRules" label="Votre question porte sur" class="mb-7">
              <v-radio value="cepidc" label="les données [envoyer au CépiDC]"></v-radio>
              <v-radio value="tma" label="le fonctionnement du site [envoyer à la TMA]"></v-radio>
              <v-radio value="cds" label="l’accès au site (compte, navigateur, etc.) [envoyer au CdS]"></v-radio>
            </v-radio-group>

            <v-textarea v-model="message" :rules="messageRules" label="Votre texte" class="mb-7"></v-textarea>

            <v-alert :value="alert" dense text outlined :type="alertType" class="mb-7">
              {{ alertMessage }}
            </v-alert>

            <v-btn
              :loading='loading'
              :disabled="!valid"
              type="sybmit"
              color="primary"
            >
              Envoyer
            </v-btn>
          </v-form>
        </v-tab-item>

        <v-tab-item class="text-body-2">
          <div class="text-h6">
            Hébergement
          </div>

            <div class="mt-3">
              RCED est hébergé par le DSI de l’Inserm, sur le site du <a href="https://www.cines.fr/" target="blank">Cines</a> (Centre Informatique National de l'Enseignement Supérieur) à Montpellier.
            </div>

          <div class="text-h6 mt-6">
            Conception et réalisation
          </div>

          <div class="mt-3">
            <p>
              RCED a été conçu et réalisé par le DSI de l’Inserm, qui en assure également l’exploitation et la maintenance :
              <ul>
                <li>Chef de projet opérationnel : Dominique Pigeon</li>
                <li>Chefs de projet techniques : Bruno Urbero, Sylvain Gérard, Salim Ydjedd</li>
              </ul>
            </p>

            <p>
              Ont participé aux spécifications : la DGS (Direction générale de la Santé, Ministère des Solidarités et de la Santé), Santé Publique France (ANSP, Agence nationale de santé publique) et le CépiDc-Inserm (Centre d'épidémiologie sur les causes médicales de Décès).
            </p>
          </div>

          <div class="text-h6 mt-6">
            Origine des données
          </div>

            <div class="mt-3">
              <p>
                Pour l’essentiel, les données proviennent des bases de données du CépiDc-Inserm, qui a pour mission de recueillir et mettre en qualité le contenu de la partie médicale des certificats de décès.
              </p>

              <p>
                Des données complémentaires proviennent de :
                <ul>
                  <li>l’Insee : fichier des personnes décédées</li>
                  <li>la <a href="https://drees.solidarites-sante.gouv.fr/" target="blank">Drees</a> (Direction de la recherche, des études, de l'évaluation et des statistiques, Ministère des Solidarités et de la Santé) : référentiel des établissements de santé (Finess)</li>
                  <li>l’ATIH (Agence technique de l'information sur l'hospitalisation, Ministère des Solidarités et de la Santé) : nombre de décès en établissement de santé (issu du Pmsi)</li>
                </ul>
              </p>
            </div>

          <div class="text-h6 mt-6">
            Contenu du site
          </div>

            <div class="mt-3">
              L'Inserm s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées, au moment de leur mise en ligne sur le site. Cependant, les données sont non finalisées, provisoires et susceptibles d’évoluer au cours du temps, et l'Inserm ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur le site. Les informations présentes sur le site sont non-contractuelles.
            </div>

          <div class="text-h6 mt-6">
            Données personnelles
          </div>

            <div class="mt-3">
              Les données de connexion sont protégées selon les normes en vigueur.
            </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import http from '@/helpers/http.js'

export default {
  name: 'Home',
  data () {
    return {
      tab: null,
      loading: false,
      radio: '',
      valid: false,
      alert: false,
      alertType: 'info',
      alertMessage: '',
      name: '',
      nameRules: [
        v => !!v || 'Le nom est obligatoire.'
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Le numéro de éléphone est obligatoire.',
        v => (!!v && /^[0-9]+$/.test(v)) || 'Votre numéro de éléphone est invalide.'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Le courriel est obligatoire.',
        v => (!!v && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)) || 'Votre courriel de récupération est invalide.'
      ],
      to: '',
      toRules: [
        v => !!v || 'Le sujet est obligatoire.'
      ],
      message: '',
      messageRules: [
        v => !!v || 'Le texte est obligatoire.'
      ]
    }
  },
  methods: {
    async sendEmail () {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.alert = false
      this.alertMessage = ''
      const data = new FormData()
      data.append('name', this.name)
      data.append('phone', this.phone)
      data.append('email', this.email)
      data.append('to', this.to)
      data.append('message', this.message)
      this.loading = true
      const retour = await http.post('email/send/', data)
      this.loading = false
      if (!retour) {
        this.alertType = 'error'
        this.alertMessage = 'Erreur de connexion'
        this.alert = true
      }
      if (retour.status === 'error') {
        this.alertType = 'error'
        this.alertMessage = retour.message
        this.alert = true
      }
      if (retour.status === 'fail') {
        this.alertType = 'error'
        this.alertMessage = Object.values(retour.data).join(' ')
        this.alert = true
      }
      if (retour.status === 'success') {
        this.alertType = 'success'
        this.alertMessage = retour.message
        this.alert = true
        this.show = false
        this.emailRecoveryAlert = false
        this.emailRecoveryField = false
      }
    }
  }
}
</script>
