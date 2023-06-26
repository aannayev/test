<template>
  <div>
    <div class="title">
      <h3>Список сотрудников</h3>
      <button @click="addEmployerForm=true">Добавить сотрудника</button>
    </div>

    <div>
      <list-of-employers :employee_id="null"/>
      <employer-form v-if="addEmployerForm" @closeDialog="addEmployerForm=false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EmployerForm from '../components/EmployerForm.vue'
import ListOfEmployers from '../components/ListOfEmployers.vue'
import {ref} from "vue";

let addEmployerForm = ref(false)

</script>

<style lang="scss">
.title {
  display: flex;
  padding: 10px 5px;
  color: #2c3e50;
  justify-content: space-between;

  h3 {
    font-weight: 800;
    font-size: 30px;
  }

  button {
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 2px 10px;
    font-size: 14px;
  }

  button:hover {
    cursor: pointer;
  }
}


</style>