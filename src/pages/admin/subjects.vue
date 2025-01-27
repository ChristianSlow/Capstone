      <script setup>
      import { ref, onMounted } from 'vue';
      import { FilterMatchMode } from '@primevue/core/api';
      import { db } from '../../firebase';
      import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
      
      // Reactive variables
      const products = ref([]);
      const productDialog = ref(false);
      const deleteProductDialog = ref(false);
      const product = ref({
        code: '', // Subject code
        name: '', // Descriptive title
        units: null, // Units, matching the type in unitOptions
      });
      const selectedProducts = ref([]);
      const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
      const submitted = ref(false);
      const unitOptions = ref([
        { label: '1 Unit', value: 1 },
        { label: '2 Units', value: 2 },
        { label: '3 Units', value: 3 },
      ]);

      const filteredUnits = ref([]); // Holds filtered unit options

      const searchUnits = (event) => {
        const query = event.query.toLowerCase();
        filteredUnits.value = unitOptions.value.filter((unit) =>
          unit.label.toLowerCase().includes(query)
        );
      };

      
      // Firestore collection reference
      const subjectsCollection = collection(db, "subjects");
      
      // Fetch data from Firestore
      const fetchSubjects = async () => {
        const querySnapshot = await getDocs(subjectsCollection);
        products.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      };
      
      // Add or edit subject
      const saveProduct = async () => {
        submitted.value = true;
        if (product?.value.code?.trim() && product?.value.name?.trim()) {
          if (product.value.id) {
            // Update existing document
            const docRef = doc(db, "subjects", product.value.id);
            await updateDoc(docRef, { ...product.value });
          } else {
            // Add a new document
            await addDoc(subjectsCollection, { ...product.value });
          }
          productDialog.value = false;
          product.value = {};
          await fetchSubjects(); // Refresh the list
        }
      };
      
      // Edit subject
      const editProduct = (prod) => {
        product.value = { ...prod };
        productDialog.value = true;
      };
      
      // Delete subject
      const deleteProduct = async () => {
        if (product.value.id) {
          const docRef = doc(db, "subjects", product.value.id);
          await deleteDoc(docRef);
          deleteProductDialog.value = false;
          product.value = {};
          await fetchSubjects(); // Refresh the list
        }
      };
      
      // Open dialog for adding new subject
      const openNew = () => {
        product.value = {};
        submitted.value = false;
        productDialog.value = true;
      };
      
      // Close dialog
      const hideDialog = () => {
        productDialog.value = false;
        submitted.value = false;
      };
      
      // Fetch subjects when the component is mounted
      onMounted(() => {
        fetchSubjects();
      });
      
      // Row styling
      const rowClass = (data) => (data.id % 2 === 0 ? 'bg-gray-50' : '');
      </script>
<template>
  <main class="p-4 md:ml-64 h-auto pt-20 bg-gray-50">
    <div>
      <!-- Toolbar -->
      <Toolbar class="mb-6 bg-white shadow-md rounded-lg p-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="mr-2"
            @click="openNew"
            tooltip="Add a new subject"
          />
        </template>
        <template #center>
          <h4 class="m-0 font-bold text-2xl text-gray-700">Subjects</h4>
        </template>
        <template #end>
          <Button
            label="Export"
            icon="pi pi-upload"
            severity="secondary"
            @click="exportCSV($event)"
            tooltip="Export as CSV"
          />
        </template>
      </Toolbar>

      <!-- DataTable -->
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
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} subjects"
        class="shadow-md rounded-lg overflow-hidden"
        :rowClass="rowClass"
      >
        <!-- <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0 text-lg font-semibold">Manage Subjects</h4>
            <div class="flex items-center gap-2">
              <i class="pi pi-search text-gray-500"></i>
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..."
                class="p-inputtext-sm w-full max-w-xs"
              />
            </div>
          </div>
        </template> -->

        <Column
          field="code"
          header="Subject Code"
          headerStyle="font-weight: bold;"
          style="min-width: 12rem"
        />
        <Column
          field="name"
          header="Descriptive Title"
          style="min-width: 16rem"
        />
        <Column 
          field="units" 
          header="Units" 
          style="min-width: 10rem" />
        <Column :exportable="false" style="min-width: 12rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Add/Edit Dialog -->
    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Manage Subject"
      :modal="true"
      class="shadow-lg"
    >
      <div class="flex flex-col gap-6">
        <div>
          <label for="subjectcode" class="block font-bold mb-1">Subject Code</label>
          <InputText
            id="subjectcode"
            v-model.trim="product.code"
            required
            autofocus
            :invalid="submitted && !product.code"
            class="w-full p-inputtext-sm"
          />
          <small
            v-if="submitted && !product.code"
            class="text-red-500"
          >Subject code is required.</small>
        </div>
        <div>
          <label for="title" class="block font-bold mb-1">Descriptive Title</label>
          <InputText
            id="title"
            v-model.trim="product.name"
            required
            autofocus
            :invalid="submitted && !product.name"
            class="w-full p-inputtext-sm"
          />
          <small
            v-if="submitted && !product.name"
            class="text-red-500"
          >Descriptive title is required.</small>
        </div>
        <div>
          <label for="units" class="block font-bold mb-1">Units</label>
          <AutoComplete
            id="units"
            v-model="product.units"
            :suggestions="filteredUnits"
            field="label"
            class="w-full p-inputtext-sm"
            @complete="searchUnits"
            placeholder="Select units"
          />
          <small
            v-if="submitted && !product.units"
            class="text-red-500"
          >
            Units are required.
          </small>
        </div>
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveProduct" />
      </template>
    </Dialog>

    <!-- Confirm Delete Dialog -->
    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      class="shadow-lg"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl text-red-500" />
        <span v-if="product">
          Are you sure you want to delete <b>{{ product.name }}</b>?
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteProductDialog = false"
        />
        <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
      </template>
    </Dialog>
  </main>
</template>

