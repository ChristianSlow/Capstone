<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
// import { useToast } from 'primevue/usetoast';
import { ProductService } from '../../service/ProductService';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import { updateDoc } from "firebase/firestore";

import { useToast } from 'primevue/usetoast';
const toast = useToast();

const data = ref ({
    course: '',
    majors: [],
})        

const removeMajor = (index) => {
    data.value.majors.splice(index, 1);
};

const major = ref('')

const addMajor = () => {
    data.value.majors.push(major.value)
    major.value = ''
}

const fromDatabase =     [
            {       
                course: 'Batchelor of Science in Business',
                major: 'Major in Financial Management',
                inventoryStatus:'',

            },
        ]
        
        
        // const toast = useToast();
        const dt = ref();
        const products = ref([]);
        const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const isLoading = ref(false)
const getData = async () => {
    products.value = []
    isLoading.value = true
    const querySnapshot = await getDocs(collection(db, "Courses"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        products.value.push({id: doc.id, ...doc.data()});
        console.log(doc.data());
    });
    isLoading.value = false
};

onMounted(() => {
    getData();
})

const submitted = ref(false);
const statuses = ref([
    {label: 'INSTOCK', value: 'instock'},
    {label: 'LOWSTOCK', value: 'lowstock'},
    {label: 'OUTOFSTOCK', value: 'outofstock'}
]);

const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
};
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    if (product.value.id) {
        // Update existing course in Firestore
        const courseRef = doc(db, "Courses", product.value.id);
        await updateDoc(courseRef, {
            course: data.value.course,
            majors: data.value.majors
        });
    } else {
        // Add a new course
        await addDoc(collection(db, "Courses"), data.value);
    }
    
    productDialog.value = false;
    getData(); // Refresh the list
};

const editProduct = (prod) => {
    product.value = { ...prod }; // Store the whole product
    data.value.course = prod.course; // Load course name
    data.value.majors = [...(prod.majors || [])]; // Copy existing majors (to avoid reference issues)
    productDialog.value = true;
};

const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = async () => {
    console.log(product.value)
    await deleteDoc(doc(db, "Courses", product.value.id));
    toast.add({ severity: 'success', summary: 'Deleted', detail: 'Course deleted successfully', life: 3000 });
    deleteProductDialog.value = false;
    product.value = {};
    getData()
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
</script>

<template>
    <main class="md:ml-64 h-auto pt-14 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-base md:text-lg">
        <div class="card bg-white dark:bg-gray-800 p-2 md:p-3 shadow-md border border-gray-200 dark:border-gray-700">
            <!-- 🔹 Toolbar Section -->
            <Toolbar class="mb-4 md:mb-6 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center">
                <template #start>
                    <Button label="New Course" icon="pi pi-plus" class="mr-2 w-full md:w-auto" severity="primary" @click="openNew" />
                </template>
                <template #center>
                    <h1 class="m-0 text-lg md:text-xl font-semibold text-gray-700 dark:text-white tracking-wide text-center md:text-left">Courses Management</h1>
                </template>
                <template #end>
                    <Button label="Export" icon="pi pi-upload" class="w-full md:w-auto" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <!-- 🔹 Data Table -->
            <DataTable
                ref="dt"
                v-model:selection="selectedProducts"
                :value="products"
                dataKey="id"
                :loading="isLoading"
                :rows="10"
                paginator
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} courses"
                class="p-datatable-striped p-datatable-hoverable-rows text-base md:text-lg"
                responsiveLayout="scroll"
            >
                <!-- Course Name -->
                <Column field="course" header="Course" sortable style="min-width: 12rem"></Column>

                <!-- Majors List -->
                <Column header="Majors" style="min-width: 14rem">
                    <template #body="slotProps">
                        <ul class="text-gray-600 dark:text-gray-300 text-base md:text-lg list-disc pl-3">
                            <li v-for="major in slotProps.data.majors" :key="major">{{ major }}</li>
                        </ul>
                    </template>
                </Column>

                <!-- Status Column -->
                <Column header="Status" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" class="px-2 py-1 text-base md:text-lg font-medium" />
                    </template>
                </Column>

                <!-- Actions Column -->
                <Column :exportable="false" style="min-width: 8rem; text-align: center;">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 p-button-md p-button-text" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" class="p-button-md p-button-text" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- 🔹 Course Dialog -->
        <Dialog v-model:visible="productDialog" :style="{ width: '90%', maxWidth: '500px' }" header="Add Course" modal class="p-dialog-md bg-white dark:bg-gray-800">
            <div class="grid gap-4 text-base md:text-lg">
                <div>
                    <label for="course" class="block text-base md:text-lg font-semibold text-gray-700 dark:text-white">Course Name</label>
                    <InputText id="course" v-model="data.course" required autofocus class="w-full p-inputtext-md rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                    <small v-if="submitted && !data.course" class="text-red-500">Course is required.</small>
                </div>
                <div>
                    <label class="block text-base md:text-lg font-semibold text-gray-700 dark:text-white">Majors</label>
                    <ul class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                        <li v-for="(major, index) in data.majors" :key="index" class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm mb-2">
                            <InputText v-model="data.majors[index]" class="flex-1 text-base md:text-lg p-inputtext-md mr-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                            <Button icon="pi pi-trash" severity="danger" text class="p-button-md" @click="removeMajor(index)" />
                        </li>
                    </ul>
                </div>
                <div class="flex items-center gap-2">
                    <InputText v-model="major" placeholder="Add new major..." class="flex-1 p-inputtext-md rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                    <Button label="Add" icon="pi pi-plus" severity="primary" class="p-button-md" @click="addMajor" />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text class="p-button-md" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" severity="success" class="p-button-md" @click="saveProduct" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" modal>
            <div class="confirmation-content text-center text-lg">
                <i class="pi pi-exclamation-triangle mr-3 text-3xl text-red-500" />
                <span>Are you sure you want to delete <strong>{{ product.course }}</strong>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" severity="danger" @click="deleteProduct" />
            </template>
        </Dialog>
    </main>
</template>
