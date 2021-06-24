<template>
  <v-card>
    <v-card-title class="pt-0">
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab>FAQ</v-tab>
        <v-tab>CONTACT</v-tab>
        <v-tab>RGPD</v-tab>
      </v-tabs>
    </v-card-title>

    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <p>
            Accès
            <br />
            La plateforme est accessible uniquement aux utilisateurs de :
          </p>
          <ul>
            <li>Direction générale de la Santé (Ministère de la santé)</li>
            <li>
              Santé Publique France (= ANSP, Agence nationale de santé publique)
            </li>
            <li>Inserm</li>
            <li>Agences régionales de santé (ARS)</li>
            <li>Etablissements de santé</li>
          </ul>

          <br />

          <p>Données</p>
          <ul>
            <li>Quelle est leur Origine?</li>
            <li>Quelles sont leurs limitations?</li>
            <li>Quand sont-elles mises à jour?</li>
            <li>etc.</li>
          </ul>

          <br />

          <p>Représentations: que trouve-t-on au niveau</p>
          <ul>
            <li>National?</li>
            <li>Régional?</li>
            <li>Etablissement?</li>
          </ul>

          <br />

          <p>Habilitations</p>
          <ul>
            <li>Quelles en sont les règles?</li>
            <li>Comment sont-elles gérées?</li>
            <li>etc.</li>
          </ul>

          <br />

          <p>Développement du site</p>
          <ul>
            <li>Qui l’a conçu ?</li>
            <li>Qui l’a développé ?</li>
            <li>Qui l’héberge ?</li>
            <li>Qui le maintient ?</li>
          </ul>

          <br />

          <p>etc.</p>
        </v-tab-item>

        <v-tab-item>
          <span class="text-h5">Déposez votre message</span>

          <p>
            <v-text-field type="text" label="Nom"></v-text-field>
            <v-text-field type="text" label="Numéro de éléphone"></v-text-field>
            <v-text-field type="text" label="Courriel"></v-text-field>
          </p>

          <p>
            <span class="text-body-1">Votre question porte sur</span>
            <v-radio-group>
              <v-radio label="les données [envoyer au CépiDC]"></v-radio>
              <v-radio
                label="le fonctionnement du site [envoyer à la TMA]"
              ></v-radio>
              <v-radio
                label="l’accès au site (compte, navigateur, etc.) [envoyer au CdS]"
              ></v-radio>
            </v-radio-group>
          </p>

          <v-textarea label="Votre texte"></v-textarea>

          <div class="text-center d-block">
            <v-btn color="primary"> Envoyer </v-btn>
          </div>
        </v-tab-item>

        <v-tab-item>
          <span class="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            doloremque incidunt eum voluptates nostrum perspiciatis inventore
            beatae reiciendis placeat, ex, voluptatum ea odit? Adipisci possimus
            non et consequatur necessitatibus, fugiat pariatur ipsam dignissimos
            sequi quae, corrupti vero tempora quidem, officiis expedita optio
            ut! Fugiat vitae aut quaerat recusandae quo nihil iste maiores
            doloremque atque, omnis praesentium optio error ea! Facere, quos ad.
            Aliquam, animi adipisci, provident delectus commodi fugit sed,
            accusantium natus maxime voluptatem at iure dignissimos voluptatum
            obcaecati consectetur sunt numquam repellendus suscipit quia! Fugiat
            modi velit odio numquam amet maiores minima magni vitae ex hic!
            Beatae, magni consequuntur?
          </span>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      tab: null
    }
  }
}
</script>
