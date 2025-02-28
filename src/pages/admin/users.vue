<script setup>
import { ref, onMounted } from 'vue';
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase config file
import { FilterMatchMode } from '@primevue/core/api';

// Refs
const products = ref([]);
const selectedProducts = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({});
const submitted = ref(false);
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

// Fetch accounts from Firestore
const fetchAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    products.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Save or Update Account
const saveProduct = async () => {
    submitted.value = true;
    if (product.value.name?.trim()) {
        if (product.value.id) {
            // Update existing account
            const docRef = doc(db, 'users', product.value.id); // Use 'users' collection to match the delete operation
            await updateDoc(docRef, { ...product.value });
        } else {
            // Add new account
            await addDoc(collection(db, 'users'), product.value); // Insert into Firestore
        }
        productDialog.value = false;
        fetchAccounts(); // Refresh data
    }
};

// Delete Account
const deleteProduct = async () => {
    const docRef = doc(db, 'users', product.value.id); // Ensure we're working with the 'users' collection
    await deleteDoc(docRef);
    deleteProductDialog.value = false;
    product.value = {}; // Clear selected product
    fetchAccounts(); // Refresh data
};

// Lifecycle Hook
onMounted(fetchAccounts);

// Dialog functions
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const confirmDeleteProduct = (prod) => {
    product.value = prod; // Store the selected product to delete
    deleteProductDialog.value = true; // Show delete confirmation dialog
};

const editProduct = (prod) => {
    product.value = { ...prod }; // Populate form with the selected product's data
    productDialog.value = true; // Open the edit dialog
};

// Handle selected rows
const confirmDeleteSelected = () => {
    deleteProductDialog.value = true;
};
</script>

<template>
    <main class="md:ml-64 h-auto pt-14 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div>
        <div class="card bg-white dark:bg-gray-800 shadow-md p-4">
          <!-- Toolbar -->
          <Toolbar class="mb-4">
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
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} accounts"
          >
            <template #header>
              <div class="flex flex-wrap gap-2 items-center justify-between">
                <h4 class="m-0 text-3xl font-bold text-gray-800 dark:text-white">Manage Accounts</h4>
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Search..." class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" />
                </IconField>
              </div>
            </template>
  
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Name" style="min-width: 16rem"></Column>
            <Column field="email" header="Email" style="min-width: 16rem"></Column>
            <Column field="role" header="Role" style="min-width: 10rem"></Column>
            <Column :exportable="false" style="min-width: 12rem">
              <template #body="slotProps">
                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
              </template>
            </Column>
          </DataTable>
        </div>
  
        <!-- Add/Edit Account Dialog -->
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Add/Edit Account" :modal="true">
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
              </div>
            </div>
          </div>
          <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" @click="saveProduct" />
          </template>
        </Dialog>
      </div>
    </main>
</template>
  