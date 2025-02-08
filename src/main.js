import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'flowbite';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


import Dropdown from 'primevue/dropdown';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import InputText from 'primevue/inputtext';
import TreeTable from 'primevue/treetable';
import AppState from './plugins/appState.js';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import Noir from './presets/Noir.js';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice'; // Import ToastService
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import FileUpload from 'primevue/fileupload';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Rating from 'primevue/rating';
import Select from 'primevue/select';
import 'primeicons/primeicons.css';
import Tag from 'primevue/tag';
import Fluid from 'primevue/fluid';
import Textarea from 'primevue/textarea';
import { FormField } from '@primevue/forms';
import Password from 'primevue/password';
import Message from 'primevue/message';
import AutoComplete from 'primevue/autocomplete';
import Toast from 'primevue/toast';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app')
app.component('Stepper', Stepper);
app.component('StepList', StepList);
app.component('StepPanels', StepPanels);
app.component('StepItem', StepItem);
app.component('Step', Step);
app.component('StepPanel', StepPanel);
app.component('Button', Button);   
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('TreeTable', TreeTable)
app.use('AppState', AppState);
app.component('ThemeSwitcher', ThemeSwitcher);
app.component('Noir', Noir);
app.use('ConfirmationService', ConfirmationService);
app.use('DialogService', DialogService);
app.component('Toolbar', Toolbar);
app.component('Dialog', Dialog);
app.component('InputNumber', InputNumber);
app.component('RadioButton', RadioButton);
app.component('FileUpload', FileUpload);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('Rating', Rating);
app.component('Select', Select);
app.component('Tag', Tag);
app.component('Fluid', Fluid);
app.component('Textarea', Textarea);
app.component('FormField', FormField);
app.component('Password', Password);
app.component('Message', Message);
app.component('AutoComplete', AutoComplete);
app.use(ToastService); // Register ToastService globally
app.component('Toast', Toast);
app.component('Dropdown', Dropdown); // Global Registration

// app.component('')