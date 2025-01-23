<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '../../service/CustomerService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase';



const students = ref([])

const isLoading = ref(false)
const getData = async () => {
    students.value = []
    isLoading.value = true
    const querySnapshot = await getDocs(collection(db, "StudentInformation"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        students.value.push({id: doc.id, ...doc.data()});
        console.log(doc.data());
    });
    isLoading.value = false
};

onMounted(() => {
    getData();
})

const customers = ref();
const selectedCustomer = ref();
const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    }
);
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

onMounted(() => {
    CustomerService.getCustomersSmall().then((data) => (customers.value = data));
});

const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warn';

        case 'renewal':
            return null;
    }
};

</script>
<template>
    <main class="p-4 md:ml-64 h-auto pt-20 bg-gray-100">
            <h1 class="text-center text-4xl font-bold bg-gray-200 border-b border-gray-200 p-3">STUDENTS LIST</h1>
            <!-- <template> -->
        <!-- <ThemeSwitcher /> -->
        <div class="card">
            <DataTable v-model:filters="filters" v-model:selection="selectedCustomer" :value="students"
                    stateStorage="session" stateKey="dt-state-demo-session" paginator :rows="5" filterDisplay="menu"
                    selectionMode="single" dataKey="id" :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">
                <template #header>
                    <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Search name here" />
                </IconField>
                </template>
                <Column field="fname" header="Students Name" style="width: 25%">
                    <template #body="{ data }">
                        <div class="flex items-center gap-2">
                            <span>{{ data.fname }}  {{ data.mname }} {{ data.lname }}</span>
                        </div>
                    </template>
                </Column>
                <Column header="Course" style="width: 25%">
                    <template #body="{ data }">
                        <div class="flex items-center gap-2">
                            <span>{{ data.selectedCourse }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="major" header="Major" style="width: 25%">
                </Column>
                <!-- <Column header="Major" sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="width: 25%">
                    <template #body="{ data }">
                        <div class="flex items-center gap-2">
                            <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                            <span>{{ data.representative.name }}</span>
                        </div>
                    </template>
                    <template #filter="{ filterModel }">
                        <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any">
                            <template #option="slotProps">
                                <div class="flex items-center gap-2">
                                    <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                                    <span>{{ slotProps.option.name }}</span>
                                </div>
                            </template>
                        </MultiSelect>
                    </template>
                </Column>
            -->
                <Column header="Action" style="width: 25%">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2"/>
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"/>
                    </template>
                </Column> 
                <template #empty> No customers found. </template>
            </DataTable>
        </div>
    </main>
</template>
