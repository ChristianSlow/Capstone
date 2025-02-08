<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// ** Reactive Variables **
const products = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({ code: '', name: '', units: null });
const selectedProducts = ref([]);
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const submitted = ref(false);
const unitOptions = ref([
  { label: '1 Unit', value: 1 },
  { label: '2 Units', value: 2 },
  { label: '3 Units', value: 3 },
]);

const courses = ref([]);
const selectedCourse = ref('');
const selectedMajor = ref('');
const subjectToDelete = ref(null);

// ** Computed Property to Filter Majors Based on Selected Course **
const filteredMajors = computed(() => {
  const course = courses.value.find((c) => c.course === selectedCourse.value);
  return course ? course.majors : [];
});

// ** Compute Total Units **
const totalUnits = computed(() => {
  return products.value.reduce((sum, subject) => sum + (subject.units || 0), 0);
});

// Fetch courses and majors from Firestore
const fetchCourses = async () => {
  const querySnapshot = await getDocs(collection(db, 'Courses'));
  courses.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    course: doc.data().course,
    majors: doc.data().majors || [],
  }));
};

// ** Subjects Collection in Firestore **
const subjectsCollection = collection(db, "subjects");

// Fetch subjects from Firestore (Filtered by Course & Major)
const fetchSubjects = async () => {
  if (!selectedCourse.value || !selectedMajor.value) {
    products.value = [];
    return;
  }
  const querySnapshot = await getDocs(subjectsCollection);
  const allSubjects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  products.value = allSubjects.filter(
    (subject) => subject.course === selectedCourse.value && subject.major === selectedMajor.value
  );
};

// Watch for Course & Major Changes to Update Subjects
watch([selectedCourse, selectedMajor], fetchSubjects);

// Add or Edit Subject
const saveProduct = async () => {
  submitted.value = true;
  if (product.value.code.trim() && product.value.name.trim() && selectedCourse.value && selectedMajor.value && product.value.units) {
    const subjectData = { ...product.value, course: selectedCourse.value, major: selectedMajor.value };
    if (product.value.id) {
      const docRef = doc(db, "subjects", product.value.id);
      await updateDoc(docRef, subjectData);
    } else {
      await addDoc(subjectsCollection, subjectData);
    }
    productDialog.value = false;
    product.value = { code: '', name: '', units: null };
    await fetchSubjects();
  }
};

// Edit Subject
const editProduct = (prod) => {
  product.value = { ...prod };
  productDialog.value = true;
};

// Open Delete Confirmation Dialog
const deleteProductConfirm = (prod) => {
  subjectToDelete.value = prod;
  deleteProductDialog.value = true;
};

// Delete Subject
const deleteProduct = async () => {
  if (subjectToDelete.value && subjectToDelete.value.id) {
    const docRef = doc(db, "subjects", subjectToDelete.value.id);
    await deleteDoc(docRef);
    deleteProductDialog.value = false;
    subjectToDelete.value = null;
    await fetchSubjects();
  }
};

// Open Dialog for New Subject
const openNew = () => {
  product.value = { code: '', name: '', units: null };
  submitted.value = false;
  productDialog.value = true;
};

// Fetch Initial Data when Component Mounts
onMounted(fetchCourses);
</script>

<template>
  <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-50 min-h-screen">
    <!-- Course & Major Selection -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="font-medium text-gray-700">Course</label>
          <select v-model="selectedCourse" class="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Select Course</option>
            <option v-for="course in courses" :key="course.id" :value="course.course">{{ course.course }}</option>
          </select>
        </div>
        <div v-if="selectedCourse">
          <label class="font-medium text-gray-700">Major</label>
          <select v-model="selectedMajor" class="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Select Major</option>
            <option v-for="major in filteredMajors" :key="major" :value="major">{{ major }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Subjects Table -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-xl font-semibold text-gray-800">Subjects</h4>
        <Button label="New" icon="pi pi-plus" class="p-button-rounded p-button-primary" @click="openNew" />
      </div>

      <DataTable :value="products" dataKey="id" class="shadow-sm rounded-lg overflow-hidden">
        <Column field="code" header="Subject Code" style="width: 20%" />
        <Column field="name" header="Descriptive Title" style="width: 40%" />
        <Column field="units" header="Units" style="width: 15%" />
        <Column :exportable="false" style="width: 25%" class="text-right">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-info" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger ml-2" @click="deleteProductConfirm(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <!-- ✅ Total Units Display -->
      <div class="mt-4 flex justify-end">
        <p class="text-lg font-semibold text-gray-800">Total Units: {{ totalUnits }}</p>
      </div>
    </div>

    <!-- Add/Edit Subject Dialog -->
    <Dialog v-model:visible="productDialog" header="Manage Subject" :modal="true" class="w-96">
      <div class="space-y-4">
        <div>
          <label class="font-medium text-gray-700">Subject Code</label>
          <InputText v-model.trim="product.code" class="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label class="font-medium text-gray-700">Descriptive Title</label>
          <InputText v-model.trim="product.name" class="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label class="font-medium text-gray-700">Units</label>
          <Dropdown v-model="product.units" :options="unitOptions" optionLabel="label" optionValue="value" placeholder="Select Units" class="w-full p-2 border rounded-lg" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" class="p-button-text" @click="productDialog = false" />
        <Button label="Save" class="p-button-primary" @click="saveProduct" />
      </template>
    </Dialog>

    <!-- ❌ Delete Confirmation Dialog -->
    <Dialog v-model:visible="deleteProductDialog" header="Confirm Delete" :modal="true" class="w-96">
      <p>Are you sure you want to delete this subject?</p>
      <template #footer>
        <Button label="No" class="p-button-text" @click="deleteProductDialog = false" />
        <Button label="Yes" class="p-button-danger" @click="deleteProduct" />
      </template>
    </Dialog>
  </main>
</template>
