<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
// import { useToast } from 'primevue/usetoast';
import { ProductService } from '../../service/ProductService';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import { updateDoc } from "firebase/firestore";

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
    <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
        <div class="card bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <!-- 🔹 Toolbar Section -->
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New Course" icon="pi pi-plus" class="mr-2" severity="primary" @click="openNew" />
                </template>
                <template #center>
                    <h1 class="m-0 text-xl font-semibold text-gray-700 tracking-wide">Courses Management</h1>
                </template>
                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
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
                class="p-datatable-striped p-datatable-hoverable-rows"
            >
                <!-- Search Input -->
                <!-- <template #header>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-600 text-sm">Search Courses:</span>
                        <div class="relative w-72">
                            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <InputText v-model="filters['global'].value" class="pl-10 w-full p-inputtext-sm rounded-lg" />
                        </div>
                    </div>
                </template> -->

                <!-- Course Name -->
                <Column field="course" header="Course" sortable style="min-width: 14rem"></Column>

                <!-- Majors List -->
                <Column header="Majors" style="min-width: 16rem">
                    <template #body="slotProps">
                        <ul class="text-gray-600 text-sm list-disc pl-4">
                            <li v-for="major in slotProps.data.majors" :key="major">{{ major }}</li>
                        </ul>
                    </template>
                </Column>

                <!-- Status Column -->
                <Column header="Status" style="min-width: 10rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" class="px-3 py-1 text-xs font-medium" />
                    </template>
                </Column>

                <!-- Actions Column -->
                <Column :exportable="false" style="min-width: 10rem; text-align: center;">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 p-button-sm p-button-text" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" class="p-button-sm p-button-text" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- 🔹 Course Dialog -->
        <Dialog v-model:visible="productDialog" :style="{ width: '500px' }" header="Add Course" modal class="p-dialog-sm">
            <div class="grid gap-4">
                <!-- Course Name -->
                <div>
                    <label for="course" class="block text-sm font-semibold text-gray-700">Course Name</label>
                    <InputText id="course" v-model="data.course" required autofocus class="w-full p-inputtext-sm rounded-md" />
                    <small v-if="submitted && !data.course" class="text-red-500">Course is required.</small>
                </div>

                <!-- Majors List -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700">Majors</label>
                    <ul class="bg-gray-100 p-2 rounded-md">
                        <li v-for="(major, index) in data.majors" :key="index" class="flex items-center justify-between bg-white p-2 rounded-md shadow-sm mb-2">
                            <InputText v-model="data.majors[index]" class="flex-1 text-sm p-inputtext-sm mr-2" />
                            <Button icon="pi pi-trash" severity="danger" text class="p-button-sm" @click="removeMajor(index)" />
                        </li>
                    </ul>
                </div>

                <!-- Add New Major -->
                <div class="flex items-center gap-2">
                    <InputText v-model="major" placeholder="Add new major..." class="flex-1 p-inputtext-sm rounded-md" />
                    <Button label="Add" icon="pi pi-plus" severity="primary" class="p-button-sm" @click="addMajor" />
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text class="p-button-sm" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" severity="success" class="p-button-sm" @click="saveProduct" />
            </template>
        </Dialog>

        <!-- 🔹 Delete Confirmation Dialog -->
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '420px' }" header="Confirm Deletion" modal class="p-dialog-sm">
            <div class="flex items-center gap-4 text-gray-700">
                <i class="pi pi-exclamation-triangle text-3xl text-red-500" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.course }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text class="p-button-sm" @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" severity="danger" class="p-button-sm" @click="deleteProduct" />
            </template>
        </Dialog>
    </main>
</template>
