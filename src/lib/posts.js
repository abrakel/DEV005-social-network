/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc as firestoreDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { auth, db } from './firebaseConfig.js';


//guardar los datos en firebase en la coleccion tasks
const saveTask = async (taskTitle, taskGender, taskAge, taskDescription, owner) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      taskTitle,
      taskGender,
      taskAge,
      taskDescription,
      date: serverTimestamp(), // obtener la marca de tiempo del servidor de Firebase
      likes: [],
      owner,
      taskUserId: getCurrentUserId(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  }
  return null;
};


export const getEmail = () => {
  const user = auth.currentUser;
  if (user) {
    return user.email;
  }
  return null;
};

//devuelve todos los documentos guardados en la coleccion tasks de la base de datos
const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot;
};

// obtener un documento especifico de la base de datos con id y traer sus datos
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

// para cambios en la coleccion tasks de la base de datos
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

export const updateTask = async (id, updateTask) => {
  try {
    const taskRef = firestoreDoc(db, 'tasks', id);
    await updateDoc(taskRef, updateTask);
    console.log('Document with ID:', id, 'successfully updated.');
  } catch (e) {
    console.error('Error updating document:', e);
  }
};

// Like
export const updateLike = (idDoc, idUser) => {
  const taskRef = firestoreDoc(db, 'tasks', idDoc);
  updateDoc(taskRef, { likes: arrayUnion(idUser) });
};

export const updateDislike = (idDoc, idUser) => {
  const taskRef = firestoreDoc(db, 'tasks', idDoc);
  updateDoc(taskRef, { likes: arrayRemove(idUser) });
};


//postear
export const submitForm = async (editStatus, id) => {
  const taskTitle = document.querySelector('.task-input-title');
  const taskGender = document.querySelector('input[name="radiobuttons"]:checked');
  const taskAge = document.querySelector('.task-age');
  const taskDescription = document.querySelector('.task-description');

  if (!editStatus) {
    await saveTask(taskTitle.value, taskGender.value, taskAge.value, taskDescription.value, getEmail());
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
  taskGender.checked = false;
  taskAge.value = '0';
  taskDescription.value = '';

  await getTasks();
  taskTitle.focus();
};
