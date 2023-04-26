/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
/* import {
  collection, addDoc, getDocs, onSnapshot, doc as firestoreDoc, deleteDoc, getDoc,
} from 'firebase/firestore'; */
import { auth /* db */ } from './firebaseConfig.js';

/* ---------------------------- Ingreso ---------------------------------------------*/

export const revision = (email, password) => new Promise((resolve, reject) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      resolve(userCredential);
    })
    .catch((error) => {
      let mensaje = 'Ha ocurrido un error';
      if (error.code === 'auth/invalid-email') {
        mensaje = 'Correo electrónico inválido';
      } if (error.code === 'auth/wrong-password') {
        mensaje = 'La contraseña es incorrecta. Por favor, intenta de nuevo.';
      }
      reject(mensaje);
    });
});
/* ---------------------------- Registro---------------------------------------------*/

export const autenticacion = (email, password) => new Promise((resolve, reject) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      resolve(userCredential);
    })
    .catch((error) => {
      let mensaje = 'Ha ocurrido un error';
      if (error.code === 'auth/email-already-in-use') {
        mensaje = 'Usuario existente';
      } else if (error.code === 'auth/invalid-email') {
        mensaje = 'Correo electrónico inválido';
      } else if (error.code === 'auth/weak-password') {
        mensaje = 'La contraseña debe tener al menos 6 caracteres';
      }
      reject(mensaje);
    });
});

/* ---------------------------- Post ---------------------------------------------*/

/* const saveTask = async (taskTitle, taskDescription) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      taskTitle,
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

const onGetTasks = (callback) => {
  const unsub = onSnapshot(collection(db, 'tasks'), callback);
  return unsub;
};

const deleteTask = async (id) => {
  try {
    await deleteDoc(firestoreDoc(db, 'tasks', id));
    console.log('Document with ID:', id, 'successfully deleted.');
  } catch (e) {
    console.error('Error deleting document:', e);
  }
};

const getTask = async (id) => {
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

window.addEventListener('DOMContentLoaded', async () => {
  const taskList = document.querySelector('#task-list');
  const form = document.querySelector('#formPost');

  onGetTasks((querySnapshot) => {
    taskList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      const taskTitle = task.taskTitle;
      const taskDescription = task.taskDescription;
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `<h2>${taskTitle}</h2>
                      <p>${taskDescription}</p>
                      <button class="delete-button" data-id="${task.id}">Eliminar</button>
                      <button class="edit-button" data-id="${task.id}">Editar</button>`;
      taskList.appendChild(taskItem);

      const btnsDelete = document.querySelectorAll('.delete-button');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const taskId = btn.dataset.id;
          await deleteTask(taskId);
        });
      });

      const btnsEdit = document.querySelectorAll('.edit-button');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const newDoc = await getTask(e.target.dataset.id);
          const newTask = newDoc;

          form.title.value = newTask.taskTitle;
          form.description.value = newTask.taskDescription;
        });
      });
    });
  });
});

export const submitForm = async () => {
  const taskTitle = document.querySelector('.task-title');
  const taskDescription = document.querySelector('.task-description');

  await saveTask(taskTitle.value, taskDescription.value);

  // Limpiar los campos del formulario
  taskTitle.value = '';
  taskDescription.value = '';

  await getTasks();
  taskTitle.focus();
}; */
