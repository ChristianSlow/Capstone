<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
// import { useToast } from 'primevue/usetoast';
import { ProductService } from '../../service/ProductService';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

const data = ref ({
    course: '',
    majors: [],
})           

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
    const result = await addDoc(collection(db, "Courses"), data.value)
    console.log(result);
    // submitted.value = true;

    // if (product?.value.name?.trim()) {
    //     if (product.value.id) {
    //         product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
    //         products.value[findIndexById(product.value.id)] = product.value;
    //         toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //     }
    //     else {
    //         product.value.id = createId();
    //         product.value.code = createId();
    //         product.value.image = 'product-placeholder.svg';
    //         product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
    //         products.value.push(product.value);
    //         toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //     }

    //     product.value = {};
    // }
    productDialog.value = false;
    getData()
};
const editProduct = (prod) => {
    product.value = {...prod};
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
    <main class="p-4 md:ml-64 h-auto pt-20 bg-gray-100">
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    <!-- <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
                </template>
                <template #center>
                    <h1 class="m-0 font-bold text-4xl">COURSES</h1>
                </template>
                <template #end>
                    <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" /> -->
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedProducts"
                :value="products"
                dataKey="id"
                :loading="isLoading"
                :rows="10"
                :filters="filters"
                >
                <!-- :paginator="true" -->
                <!-- paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" -->
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center ">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <!-- <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column> -->
                <Column field="course" header="Course" v-model="data.course" style="min-width: 12rem"></Column>
                <Column field="inventoryStatus" header="Major" style="min-width: 12rem">
                    <template #body="slotProps">
                        <ul>
                            <li v-for="item in slotProps.data.majors">{{ item }}</li>
                        </ul>
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Status" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Add Course" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />
                <div>
                    <label for="course" class="block font-bold mb-3">Course</label>
                    <InputText id="course" v-model="data.course" required="true" autofocus :invalid="submitted && !product.course" fluid />
                    <small v-if="submitted && !data.course" class="text-red-500">Course is required.</small>
                </div>
                <div>
                    <span>Major:</span>
                    <ul>
                        <li v-for="major in data.majors" :key="major.id"> {{major}}</li>
                    </ul>
                </div>
                <div>
                    <label for="major" class="block font-bold mb-3">Major</label>
                    <InputText id="major" v-model="major" required="true" autofocus :invalid="submitted && !product.major" fluid />
                    <small v-if="submitted && !major" class="text-red-500">Major is required.</small>  
                    <Button label="Add" @click="addMajor"/> 
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />  
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.course }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected course?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
	</div>
</main>
</template>