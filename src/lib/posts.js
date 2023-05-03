import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc as firestoreDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from './firebaseConfig.js';

const saveTask = async (taskTitle, taskGender, taskAge, taskDescription) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      taskTitle,
      taskGender,
      taskAge,
      taskDescription,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot;
};

export const getTask = async (id) => {
  try {
    const docRef = firestoreDoc(db, 'tasks', id);
    const doc = await getDoc(docRef);
    if (doc.exists()) {
      return doc.data();
    }
    console.log('No such document!');
    return null;
  } catch (e) {
    console.error('Error getting document:', e);
    return null;
  }
};

export const onGetTasks = (callback) => {
  const unsub = onSnapshot(collection(db, 'tasks'), callback);
  return unsub;
};

export const deleteTask = async (id) => {
  console.log(id);
  try {
    await deleteDoc(firestoreDoc(db, 'tasks', id));
    console.log('Document with ID:', id, 'successfully deleted.');
  } catch (e) {
    console.error('Error deleting document:', e);
  }
};

const updateTask = async (id, updateTask) => {
  try {
    const taskRef = firestoreDoc(db, 'tasks', id);
    await updateDoc(taskRef, updateTask);
    console.log('Document with ID:', id, 'successfully updated.');
  } catch (e) {
    console.error('Error updating document:', e);
  }
};

export const submitForm = async (editStatus, id) => {
  const taskTitle = document.querySelector('.task-input-title');
  const taskGender = document.querySelector('.select-gender');
  const taskAge = document.querySelector('.task-age')
  const taskDescription = document.querySelector('.task-description');

  if (!editStatus) {
    await saveTask(taskTitle.value, taskGender.value, taskAge.value, taskDescription.value);
  } else {
    await updateTask(id, {
      taskTitle: taskTitle.value,
      taskGender: taskGender.value,
      taskAge: taskAge.value,
      taskDescription: taskDescription.value,
    });
    const btnTaskForm = document.querySelector('#btnSend');
    btnTaskForm.innerText = 'Enviar';
  }

  // Limpiar los campos del formulario
  taskTitle.value = '';
  taskGender.value = ''; 
  taskAge.value = '';
  taskDescription.value = '';

  await getTasks();
  taskTitle.focus();
};
