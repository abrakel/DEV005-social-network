/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';

/* import {
  collection, addDoc, getDocs, onSnapshot, doc as firestoreDoc, deleteDoc, getDoc,
} from 'firebase/firestore'; */
import { auth /* db */ } from './firebaseConfig.js';
/* ---------------------------- Ingreso ---------------------------------------------*/

export const revision = (email, password, error1) => new Promise((resolve, reject) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      resolve(userCredential);
    })
    .catch((error) => {
      error1.textContent = 'Ha ocurrido un error';
      if (error.code === 'auth/invalid-email') {
        error1.textContent = 'Correo electrónico inválido';
      } else if (error.code === 'auth/wrong-password') {
        error1.textContent = 'La contraseña es incorrecta. Por favor, intenta de nuevo.';
      }
      reject(error1.textContent);
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

/* ---------------------------- Ingreso---------------------------------------------*/
export const loginGoogle1 = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // eslint-disable-next-line no-console
  console.log(token);
  const user = result.user;
  console.log(user);
  console.log(credential);
};

/* ---------------------------- Post ---------------------------------------------*/

/* let editStatus = false;
let id = '';

const saveTask = async (taskTitle, taskDescription) => {
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

const onGetTasks = (callback) => {
  const unsub = onSnapshot(collection(db, 'tasks'), callback);
  return unsub;
};

const deleteTask = async (id) => {
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

let btnTaskForm;
window.addEventListener('DOMContentLoaded', async () => {
  const taskList = document.querySelector('#task-list');
  const form = document.querySelector('#formPost');
  btnTaskForm = document.querySelector('#btnSend');

  onGetTasks((querySnapshot) => {
    taskList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      const taskTitle = task.taskTitle;
      const taskDescription = task.taskDescription;
      const taskItem = document.createElement('div');
      taskItem.innerHTML = `<h2>${taskTitle}</h2>
                      <p>${taskDescription}</p>
                      <button class="delete-button" data-id="${task.id}">Eliminar</button>
                      <button class="edit-button" data-id="${task.id}">Editar</button>
                      <button>Me gusta</button>`;
      taskList.appendChild(taskItem);

      const btnsDelete = document.querySelectorAll('.delete-button');
      btnsDelete.forEach((btnDelete) => {
        btnDelete.addEventListener('click', async (e) => {
          const taskId = e.target.dataset.id;
          await deleteTask(taskId);
        });
      });

      const btnsEdit = document.querySelectorAll('.edit-button');
      btnsEdit.forEach((btnEdit) => {
        btnEdit.addEventListener('click', async (e) => {
          const taskId = e.target.dataset.id;
          const newDoc = await getTask(taskId);
          const newTask = newDoc;

          editStatus = true;
          id = taskId;

          form.title.value = newTask.taskTitle;
          form.description.value = newTask.taskDescription;

          // Mover esta línea aquí
          btnTaskForm.innerText = 'Actualizar';
        });
      });
    });
  });

  // Mover esta línea aquí
  btnTaskForm.innerText = 'Enviar';
});

export const submitForm = async () => {
  const taskTitle = document.querySelector('.task-title');
  const taskDescription = document.querySelector('.task-description');

  if (!editStatus) {
    await saveTask(taskTitle.value, taskDescription.value);
  } else {
    await updateTask(id, {
      taskTitle: taskTitle.value,
      taskDescription: taskDescription.value,
    });

    editStatus = false;
    btnTaskForm.innerText = 'Enviar';
  }

  // Limpiar los campos del formulario
  taskTitle.value = '';
  taskDescription.value = '';

  await getTasks();
  taskTitle.focus();
};

export const loginPatitas = () => {
  const email = document.getElementById('mail').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.code);
      console.log(err.message);
    });
}; */
