<template>
  <div class="pop-up-background">
    <b-card
        title="Добавить сотрудника "
        class="pup-card-class">
      <hr>
      <b-card-text>
        <div class="input-place">
          <b-form-input v-model="fio_text" placeholder="ФИО:" debounce="500"></b-form-input>
          <div style="position: relative">
            <b-list-group class="suggestions" v-if="show_suggestions">
              <b-list-group-item button @click="closeSuggestions" class="close-suggestions">Close suggestions
              </b-list-group-item>
              <b-list-group-item v-for="suggestion in suggestions" button @click="chooseSuggestion(suggestion)">
                {{ suggestion?.value }}
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>

        <div class="input-place">
          <b-form-input v-model="age" type="number" placeholder="Возраст:"></b-form-input>
        </div>
        <div class="input-place">
          <b-form-input v-model="location" placeholder="Местоположение :"></b-form-input>
        </div>
        <div class="input-place">
          <b-form-select v-model="boss_id" :options="store.getEmployers" text-field="full_name" value-field="id"
                         style="width: 100%"></b-form-select>
        </div>
        <div class="card-actions">

          <b-button @click="closeDialog" class="m-2">Cancel</b-button>
          <b-button @click="resetData" class="m-2">Reset</b-button>
          <b-button @click="pushOneToEmployers" class="m-2" variant="success">Save</b-button>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script setup lang="ts">

import {computed, ref, watch} from "vue";
import axios from "axios";
import {useEmployersStore} from "@/stores/employers";

interface Suggestion {
  value: string,
  age: number | null,
  data: {
    name: string | null,
    surname: string | null,
    patronymic: string | null,
    gender: string | null
  }
}


interface Employee {
  id: number,
  first_name: String | null,
  last_name: String | null,
  father_name: String | null,
  gender: String | null,
  age: number,
  location: String | null,
  boss_id: number | null
}

const store = useEmployersStore()


var suggestions = ref<Suggestion[]>([])
var show_suggestions = ref(false)
const API_KEY = '5b9b34781d705471a6dedf3d4a4b1acd1d6dee48'
let fio_text = ref('')
let age = ref(0)
let location = ref(null)
let boss_id = ref(null)
let selected_suggestion: Suggestion|null = null
watch(fio_text, ((value) => {
  fetchSuggestions()
}))

async function fetchSuggestions() {
  await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio', {
    query: fio_text.value
  }, {
    headers: {
      Authorization: `Token ${API_KEY}`
    }
  }).then((res) => {
    suggestions.value = res.data.suggestions
    if (suggestions.value.length) {
      show_suggestions.value = true
    }
  })
}

function chooseSuggestion(suggestion:Suggestion) {
  selected_suggestion = suggestion
  fio_text.value = suggestion.value
  suggestions.value = []
}

const emit = defineEmits(['closeDialog'])

function closeSuggestions() {
  suggestions.value = []
  show_suggestions.value = false
}

function resetData() {
  age.value = 0
  fio_text.value = ''
  boss_id.value = null
  location.value = null
}

function closeDialog() {
  emit('closeDialog')
}


function pushOneToEmployers() {
  if (!selected_suggestion) {
    alert("Enter name of employee")
    return
  }
  let employee: Employee = {
    id: store.getNextIndex,
    first_name: selected_suggestion.data.name,
    last_name: selected_suggestion.data.surname,
    father_name: selected_suggestion.data.patronymic,
    gender: selected_suggestion.data.gender,
    age: age.value,
    location: location.value,
    boss_id: boss_id.value
  }
  store.push_one_employer(employee)
  resetData()
}

</script>

<style>
.pop-up-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
}

.pup-card-class {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: white;
  border-radius: 3px;
}

.input-place {
  padding: 5px 0;
}

.suggestions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.close-suggestions {
  background-color: #e9e9e9 !important;
}

.card-actions {
  display: flex;
  justify-content: right;
}
</style>