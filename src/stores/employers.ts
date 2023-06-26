import {ref, computed} from 'vue'
import {defineStore} from 'pinia'


export const useEmployersStore = defineStore('employers', () => {
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

    const employers = ref<Employee[]>([])
    const getEmployers = computed(() => employers.value.map((x: Employee) => {
        return {
            ...x,
            full_name: `${x.first_name} ${x.last_name} ${x.father_name}`
        }
    }))
    const getNextIndex = computed(() => employers.value.length)


    function push_one_employer(data: Employee) {
        employers.value.push(data)
    }

    return {push_one_employer, getEmployers, getNextIndex}
})
