import {
  submitForm, deleteTask, onGetTasks, getTask,
} from '../lib/posts';

function muro(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h1');
  title.textContent = 'Patitas';
  const buttonReturn = document.createElement('button');
  buttonReturn.textContent = 'inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const container = document.createElement('div');
  container.classList.add('container');

  // prueba post
  const taskContainer = document.createElement('div');
  taskContainer.id = 'task-container';

  // Formulario posts
  const form = document.createElement('form');
  form.id = 'formPost';

  const divFormName = document.createElement('div');
  divFormName.className = 'div-form-name';
  const titleLabel = document.createElement('label');
  titleLabel.className = 'title-label-pets'
  titleLabel.textContent = 'Título';
  const titleInput = document.createElement('input');
  titleInput.classList.add('task-input-title');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.setAttribute("autocomplete", "off");
  divFormName.append(titleLabel, titleInput);

  const divFormGender = document.createElement('div');
  divFormGender.className = 'div-form-gender'
  const genderLabel = document.createElement('label');
  genderLabel.textContent = 'Genero:';
  const genderSelect = document.createElement('select');
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.text = "selecciona una opción";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  genderSelect.appendChild(defaultOption);
  const option1 = document.createElement('option');
  option1.text = 'Hembra';
  option1.value = 'Hembra';
  option1.id = 'female-id'
  genderSelect.appendChild(option1); 
  const option2 = document.createElement('option');
  option2.text = 'Macho';
  option2.value = 'Macho';
  option2.id = 'male-id';
  genderSelect.appendChild(option2);
  genderSelect.className = 'select-gender';
  genderSelect.name = 'gender';
  divFormGender.append(genderLabel, genderSelect);

  const divFormAge = document.createElement('div');
  divFormAge.className = 'div-form-age';
  const ageLabel = document.createElement('label');
  ageLabel.textContent = 'Edad:';
  const ageInput = document.createElement('input');
  ageInput.classList.add('task-age');
  ageInput.name = 'age';
  ageInput.setAttribute("autocomplete", "off");
  divFormAge.append(ageLabel, ageInput);

  const divFormDescription = document.createElement('div');
  divFormDescription.className = 'div-form-description';
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Descripción:';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.classList.add('task-description');
  descriptionInput.name = 'description';
  divFormDescription.append(descriptionLabel, descriptionInput);

  // modal post
  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal');
  const modalContent = document.createElement('div');
  modalContent.setAttribute('class', 'modal-content');
  const text = document.createElement('span');
  text.textContent = '';
  const close = document.createElement('button');
  close.setAttribute('button', 'closeModal-b');
  close.textContent = 'Cerrar';
  modalContent.append(text, close);
  modal.appendChild(modalContent);

  function showModal(mensaje) {
    modal.style.display = 'block'
    text.textContent = mensaje;
    close.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Crea el botón de envío formulario
  const submitBtn = document.createElement('button');
  submitBtn.id = 'btnSend';
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Enviar';
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (titleInput.value === '' || descriptionInput.value === '' ) {
      section.append(modal);
      showModal('Completa todos los campos para enviar');
    } else {
      const editStatus = submitBtn.textContent !== 'Enviar';
      const editPostId = submitBtn.getAttribute('data-editpostid');
      submitForm(editStatus, editPostId);
    }
  });

  // Agrega los elementos al formulario
  form.append(divFormName, divFormGender, divFormAge, divFormDescription, submitBtn);

  // Crea la sección de tareas
  const taskList = document.createElement('div');
  taskList.id = 'task-list';

  document.body.append(form, taskList);

  onGetTasks((querySnapshot) => {
    taskList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      const taskTitle = task.taskTitle;
      const taskDescription = task.taskDescription;
      const taskGender = task.taskGender;
      const taskAge = task.taskAge;
      taskList.innerHTML += `<div class='container-post'>
                            <div class= 'title-post'>
                              <h2>${taskTitle}</h2>
                            </div>
                            <div class='gender-post'>
                              <span>Genero: </span>
                              <span>${taskGender}</span>
                            </div>
                            <div class='age-post'>
                              <span>Edad: </span>
                              <span>${taskAge}</span>
                            </div>
                            <div class='description-post'
                              <p>${taskDescription}</p>
                            </div>
                            <div class='buttons-post'>
                              <button class='like-button'><i class="fa-regular fa-heart"></i></button>
                              <button class="edit-button" data-id="${task.id}"><i class="fa-regular fa-pen-to-square"></i></button>
                              <button class="delete-button" data-id="${task.id}"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            </div>`;

                            //codigo para que el corazon se pinte al poner me gusta: <i class="fa-solid fa-heart" style="color: #e80005;"></i>

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

          submitBtn.setAttribute('data-editpostid', taskId);
          form.title.value = newTask.taskTitle;
          form.description.value = newTask.taskDescription;
          form.gender.value = newTask.taskGender;
          form.age.value = newTask.taskAge;
          const btnTaskForm = document.querySelector('#btnSend');
          btnTaskForm.innerText = 'Actualizar';
        });
      });
    });
  });

  container.append(title, form, taskList, buttonReturn);
  section.appendChild(container);

  return section;
}

export default muro;
