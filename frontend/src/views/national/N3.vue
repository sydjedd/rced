<template>
  <div>
    <!-- v-alert dense dismissible border="left" type="warning" outlined prominent text -->
    <v-alert dense dismissible border="left" type="warning">
      Attention, le nombre de e-certificats est partiel pour l'année en cours
      (septembre à la date de production de ce rapport) et considère les e-dc
      déclarés en établissement et hors établissement. L'année considérée est
      celle de la date de validation du certificat électronique (et non la date
      du décès). Pour les 2 années antérieures, il peut y avoir à la marge
      quelques certificats "doublons" qui sont traités au moment de la
      finalisation de l'année. L'évolution est celle du nombre de e-dc par
      rapport à l'année antérieure.
    </v-alert>

    <v-card>
      <v-card-text>
        <N30 />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import N30 from '@/components/national/N30'

export default {
  name: 'National',
  components: {
    N30
  }
}
</script>
