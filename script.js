const newTaskBtn = document.querySelector(".newTaskBtn")
const TaskBtn = document.querySelector(".TaskBtn")
const newTask = document.querySelector(".newTask")
const part2 = document.querySelector(".part-2")
const error = document.querySelector(".error")
const errorBtn = document.querySelector("#btn")

const editTaskCard = document.querySelector(".editTaskCard")
const editTaskTitle = document.querySelector(".taskTitle")
const editSave = document.querySelector(".editSave")
const editableTask = document.querySelector(".editableTask")

const title = document.querySelector(".titleText")
const disk = document.querySelector(".diskText")

const cancleBtn = document.querySelector(".cancleBtn")
const saveBtn = document.querySelector(".saveBtn")

const clearBtn = document.querySelector(".clearBtn")

const tasksContainer = document.querySelector(".tasks-container")

// =======================
// Animation Helpers
// =======================

function animShow(el, animClass = "anim-slide-in") {
    el.classList.remove("hide")
    el.classList.remove("anim-slide-out", "anim-pop-out", "anim-fade-out")
    void el.offsetWidth
    el.classList.add(animClass)
}

function animHide(el, animClass = "anim-slide-out") {
    el.classList.remove("anim-slide-in", "anim-pop-in", "anim-fade-in")
    void el.offsetWidth
    el.classList.add(animClass)
    el.addEventListener("animationend", function handler(e) {
        if (e.target !== el) return;
        e.stopPropagation();
        el.classList.remove(animClass)
        el.classList.add("hide")
        el.removeEventListener("animationend", handler)
    })
}

// =======================
// Create Task Card
// =======================

const saveTask = (taskTitle = title.value, taskDisc = disk.value, save = true) => {

    const box2 = document.createElement("div")
    tasksContainer.append(box2)
    box2.classList.add("tasks")
    box2.classList.add("anim-fade-in")

    part2.classList.remove("hide")
    part2.classList.add("anim-slide-in")

    const head = document.createElement("h2")
    box2.append(head)
    head.classList.add("saveTitle")
    head.innerText = taskTitle

    const box3 = document.createElement("div")
    box2.append(box3)
    box3.classList.add("saveTask")
    box3.innerText = taskDisc

    const box4 = document.createElement("div")
    box2.append(box4)
    box4.classList.add("markedBtn")

    const butt = document.createElement("button")
    box4.append(butt)
    butt.classList.add("mark")
    butt.classList.add("sameBtn")
    butt.innerText = "Marked"

    const delBtn = document.createElement("button")
    box4.append(delBtn)
    delBtn.innerText = "Delete"
    delBtn.classList.add("mark")
    delBtn.classList.add("sameBtn")
    delBtn.classList.add("hide")

    title.value = ""
    disk.value = ""

    const editBtn = document.createElement("button")
    box4.append(editBtn)
    editBtn.classList.add("mark")
    editBtn.classList.add("sameBtn")
    editBtn.innerText = "Edit Task"


    butt.addEventListener("click", () => {
        box2.classList.add("mark-anim")
        delBtn.classList.remove("hide")
        butt.classList.add("hide")
        editBtn.classList.add("hide")
    })


    delBtn.addEventListener("click", () => {
        localStorage.removeItem(head.innerText)
        box2.classList.add("anim-fade-out")
        setTimeout(() => {
            box2.remove()
            if (tasksContainer.children.length === 0) {
                animHide(part2, "anim-slide-out")
            }
        }, 350)
    })

    editBtn.addEventListener("click", () => {
        animShow(editTaskCard, "anim-slide-in")
        animHide(TaskBtn, "anim-slide-out")
        animHide(part2, "anim-slide-out")
        cancleBtn.classList.add("hide")
        saveBtn.classList.add("hide")
        editTaskTitle.innerText = taskTitle
        editableTask.value = taskDisc
    })

    if (save) {
        localStorage.setItem(taskTitle, taskDisc)
    }

    editSave.addEventListener("click", () => {
        const newValueOfTask = editableTask.value
        animHide(editTaskCard, "anim-slide-out")
        animShow(TaskBtn, "anim-slide-in")
        animShow(part2, "anim-slide-in")
        cancleBtn.classList.remove("hide")
        saveBtn.classList.remove("hide")
        localStorage.setItem(taskTitle, newValueOfTask)
        box3.innerText = editableTask.value
    })
}

// =======================
// Error Message
// =======================

const errorMsg = () => {
    if (title.value == "" || disk.value == "") {
        animHide(TaskBtn, "anim-slide-out")
        animHide(newTask, "anim-slide-out")
        animShow(error, "anim-pop-in")
        setTimeout(() => {
            error.classList.add("anim-shake")
            error.addEventListener("animationend", function handler(e) {
                if (e.target !== error) return;
                e.stopPropagation();
                error.classList.remove("anim-shake")
                error.removeEventListener("animationend", handler)
            })
        }, 400)
        animHide(part2, "anim-slide-out")
    } else {
        saveTask()
    }
}

errorBtn.addEventListener("click", () => {
    animHide(error, "anim-pop-out")
    animShow(TaskBtn, "anim-slide-in")
})

newTaskBtn.addEventListener("click", () => {
    animHide(TaskBtn, "anim-slide-out")
    animShow(newTask, "anim-slide-in")
})

cancleBtn.addEventListener("click", () => {
    animShow(TaskBtn, "anim-slide-in")
    animHide(newTask, "anim-slide-out")
    title.value = ""
    disk.value = ""
})

saveBtn.addEventListener("click", () => {
    animShow(TaskBtn, "anim-slide-in")
    animHide(newTask, "anim-slide-out")
    errorMsg()
})

clearBtn.addEventListener("click", () => {
    const allTasks = tasksContainer.querySelectorAll(".tasks")
    allTasks.forEach((task, i) => {
        task.style.animationDelay = `${i * 0.05}s`
        task.classList.add("anim-fade-out")
    })
    setTimeout(() => {
        tasksContainer.innerHTML = ""
        localStorage.clear()
        animHide(part2, "anim-slide-out")
    }, allTasks.length * 50 + 300)
})

// =======================
// Load Tasks After Refresh
// =======================

window.addEventListener("DOMContentLoaded", () => {
    Object.keys(localStorage).forEach((key) => {
        const value = localStorage.getItem(key)
        saveTask(key, value, false)
    })
})