<template>
  <v-card class="mb-5">
    <v-card-title>{{ data.caption }}</v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr class="text-uppercase primary" v-for="(row, index) in data.head" :key="index">
              <th class="white--text">{{ row.title }}</th>
              <th class="white--text text-right" :colspan="row.colspan" v-for="(value, index) in row.col" :key="index">{{ value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in data.body" :key="index">
              <th class="text-uppercase">{{ row.title }}</th>
              <td class="text-right" v-for="(value, index) in data.head[data.head.length - 1].col" :key="index">{{ row.col[value] }}</td>
            </tr>
          </tbody>
          <tfoot v-if="data.foot">
            <tr class="text-uppercase primary">
              <th class="white--text">{{ data.foot.title }}</th>
              <th  class="white--text text-right" v-for="(value, index) in data.head[data.head.length - 1].col" :key="index">{{ data.foot.col[value] }}</th>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>
