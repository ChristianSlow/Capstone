<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// ** Reactive Variables **
const products = ref([]); // Subjects Data
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({
  code: '',
  name: '',
  units: null,
});
const selectedProducts = ref([]);
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const submitted = ref(false);
const unitOptions = ref([
  { label: '1 Unit', value: 1 },
  { label: '2 Units', value: 2 },
  { label: '3 Units', value: 3 },
]);

const filteredUnits = ref([]);
const searchUnits = (event) => {
  const query = event.query.toLowerCase();
  filteredUnits.value = unitOptions.value.filter((unit) =>
    unit.label.toLowerCase().includes(query)
  );
};

// ** Course & Major Selection **
const courses = ref([]); // Store courses from Firestore
const selectedCourse = ref('');
const selectedMajor = ref('');

// Computed property to filter majors based on selected course
const filteredMajors = computed(() => {
  const course = courses.value.find((c) => c.course === selectedCourse.value);
  return course ? course.majors : [];
});

// Fetch courses and majors from Firestore
const fetchCourses = async () => {
  const querySnapshot = await getDocs(collection(db, 'Courses'));
  courses.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    course: doc.data().course,
    majors: doc.data().majors || [], // Ensure majors exist
  }));
};

// ** Subjects Collection in Firestore **
const subjectsCollection = collection(db, "subjects");

// Fetch subjects from Firestore (Filtered by Course & Major)
const fetchSubjects = async () => {
  if (!selectedCourse.value || !selectedMajor.value) {
    products.value = []; // Clear subjects if no course/major is selected
    return;
  }

  const querySnapshot = await getDocs(subjectsCollection);
  const allSubjects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Filter subjects based on selected course and major
  products.value = allSubjects.filter(
    (subject) => subject.course === selectedCourse.value && subject.major === selectedMajor.value
  );
};

// Watch for Course & Major Changes to Update Subjects
watch([selectedCourse, selectedMajor], () => {
  fetchSubjects();
});

// Add or Edit Subject
const saveProduct = async () => {
  submitted.value = true;
  if (product.value.code.trim() && product.value.name.trim() && selectedCourse.value && selectedMajor.value) {
    const subjectData = {
      ...product.value,
      course: selectedCourse.value,
      major: selectedMajor.value,
    };

    if (product.value.id) {
      const docRef = doc(db, "subjects", product.value.id);
      await updateDoc(docRef, subjectData);
    } else {
      await addDoc(subjectsCollection, subjectData);
    }

    productDialog.value = false;
    product.value = {};
    await fetchSubjects();
  }
};

// Edit Subject
const editProduct = (prod) => {
  product.value = { ...prod };
  productDialog.value = true;
};

// Delete Subject
const deleteProduct = async () => {
  if (product.value.id) {
    const docRef = doc(db, "subjects", product.value.id);
    await deleteDoc(docRef);
    deleteProductDialog.value = false;
    product.value = {};
    await fetchSubjects();
  }
};

// Open Dialog for New Subject
const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};

// Close Dialog
const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};

// Fetch Initial Data when Component Mounts
onMounted(() => {
  fetchCourses();
});

</script>

<template>
  <main class="p-4 md:ml-64 h-auto pt-20 bg-gray-50">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Course Dropdown -->
      <div class="flex flex-wrap gap-2 w-full">
        <label for="course">Course</label>
        <select
          v-model="selectedCourse"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="" disabled>Select Course</option>
          <option v-for="course in courses" :key="course.id" :value="course.course">{{ course.course }}</option>
        </select>
      </div>

      <!-- Major Dropdown (Depends on Course Selection) -->
      <div class="flex flex-wrap gap-2 w-full" v-if="selectedCourse">
        <label for="major">Major</label>
        <select
          v-model="selectedMajor"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="" disabled>Select Major</option>
          <option v-for="major in filteredMajors" :key="major" :value="major">{{ major }}</option>
        </select>
      </div>
    </div>

    <div>
      <Toolbar class="mb-6 bg-white shadow-md rounded-lg p-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" tooltip="Add a new subject" />
        </template>
        <template #center>
          <h4 class="m-0 font-bold text-2xl text-gray-700">Subjects</h4>
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
      >
        <Column field="code" header="Subject Code" style="min-width: 12rem" />
        <Column field="name" header="Descriptive Title" style="min-width: 16rem" />
        <Column field="units" header="Units" style="min-width: 10rem" />

        <Column :exportable="false" style="min-width: 12rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Add/Edit Subject Dialog -->
    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Manage Subject" :modal="true">
      <div class="flex flex-col gap-6">
        <div>
          <label for="subjectcode">Subject Code</label>
          <InputText id="subjectcode" v-model.trim="product.code" required autofocus class="w-full" />
        </div>
        <div>
          <label for="title">Descriptive Title</label>
          <InputText id="title" v-model.trim="product.name" required class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveProduct" />
      </template>
    </Dialog>
  </main>
</template>
