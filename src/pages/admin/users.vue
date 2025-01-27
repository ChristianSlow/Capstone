<template>
    <main class="p-4 md:ml-64 h-auto pt-20 bg-gray-100">
        <div>
            <div class="card">
                <!-- Toolbar -->
                <Toolbar class="mb-6">
                    <template #start>
                        <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
                        <Button 
                            label="Delete" 
                            icon="pi pi-trash" 
                            severity="danger" 
                            outlined 
                            @click="confirmDeleteSelected" 
                            :disabled="!selectedProducts || !selectedProducts.length" 
                        />
                    </template>
                </Toolbar>

                <!-- Data Table -->
                <DataTable
                    ref="dt"
                    v-model:selection="selectedProducts"
                    :value="products"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                >
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between">
                            <h4 class="m-0 text-3xl font-bold">Manage Accounts</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="name" header="Name" style="min-width: 16rem"></Column>
                    <Column field="role" header="Role" style="min-width: 10rem"></Column>
                    <Column :exportable="false" style="min-width: 12rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- Add/Edit Product Dialog -->
            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Add Account" :modal="true">
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <InputText id="name" v-model.trim="product.name" required :invalid="submitted && !product.name" />
                        <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                    </div>
                    <div>
                        <label for="email" class="block font-bold mb-3">Email</label>
                        <InputText id="email" v-model.trim="product.email" required :invalid="submitted && !product.email" />
                        <small v-if="submitted && !product.email" class="text-red-500">Email is required.</small>
                    </div>
                    <div>
                        <label for="password" class="block font-bold mb-3">Password</label>
                        <InputText id="password" v-model.trim="product.password" required :invalid="submitted && !product.password" />
                        <small v-if="submitted && !product.password" class="text-red-500">Password is required.</small>
                    </div>
                    <div>
                        <span class="block font-bold mb-4">Role</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="admin" v-model="product.role" name="role" value="Admin" />
                                <label for="admin">Admin</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="coordinator" v-model="product.role" name="role" value="Ossa Coordinator" />
                                <label for="coordinator">Ossa Coordinator</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="registrar" v-model="product.role" name="role" value="Registrar" />
                                <label for="registrar">Registrar</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <RadioButton id="assistant" v-model="product.role" name="role" value="Assistant" />
                                <label for="assistant">Assistant</label>
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" @click="saveProduct" />
                </template>
            </Dialog>

            <!-- Delete Confirmation Dialog -->
            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle text-3xl" />
                    <span>Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                    <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
                </template>
            </Dialog>

            <!-- Delete Multiple Confirmation Dialog -->
            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle text-3xl" />
                    <span>Are you sure you want to delete the selected accounts?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                </template>
            </Dialog>
        </div>
    </main>
</template>

<script setup>
// Imports
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

// Mock Database
const fromDatabase = [
    { name: 'Christian Mahinay', role: 'Admin', email: 'christianmahinay@gmail.com', password: 'password' },
    { name: 'Roland Clarion', role: 'Registrar', email: 'roland@gmail.com', password: 'password' },
    { name: 'Hann Samm Beleganio', role: 'Ossa Coordinator', email: 'samm@gmail.com', password: 'password' },
    { name: 'Cristian Jay Benigay', role: 'Assistant', email: 'cristian@gmail.com', password: 'password' },
];

// Refs and Variables
const products = ref([]);
const selectedProducts = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const submitted = ref(false);
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

// Lifecycle
onMounted(() => {
    products.value = fromDatabase;
});

// Methods
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name?.trim()) {
        if (product.value.id) {
            products.value = products.value.map((p) => (p.id === product.value.id ? product.value : p));
        } else {
            product.value.id = Date.now();
            products.value.push({ ...product.value });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};

const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((p) => p.id !== product.value.id);
    deleteProductDialog.value = false;
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const deleteSelectedProducts = () => {
    products.value = products.value.filter((p) => !selectedProducts.value.includes(p));
    deleteProductsDialog.value = false;
    selectedProducts.value = [];
};
</script>
