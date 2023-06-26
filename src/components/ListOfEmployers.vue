<template>
  <div>
    <div v-for="employe in employer_list" :key="employe.id">
      <b-card>
        <b-card-text>
          {{ employe.full_name }}<br>
          Age:{{ employe.age }}<br>
          Location:{{ employe.location }}
        </b-card-text>
      </b-card>
      <div class="list-of-employers">
        <ListOfEmployers :employee_id="employe.id"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListOfEmployers from './ListOfEmployers.vue'
import {useEmployersStore} from "../stores/employers";
import {computed} from "vue";

const props = defineProps<{
  employee_id: number | null
}>()
const store = useEmployersStore()

interface EmployeeWithFullname {
  id: number,
  first_name: String | null,
  last_name: String | null,
  father_name: String | null,
  gender: String | null,
  age: number,
  location: String | null,
  boss_id: number | null,
  full_name: String
}

let employer_list = computed<EmployeeWithFullname[]>({
  get() {
    return store.getEmployers.filter(em => em.boss_id === props.employee_id)
  },
  set() {

  }
})

</script>

<style>
.list-of-employers {
  margin: 10px 5px 5px 20px;
}
</style>